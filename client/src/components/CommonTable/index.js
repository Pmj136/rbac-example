import React, {forwardRef, useEffect, useState, useRef, useImperativeHandle, useMemo} from 'react'
import {Table, Space, Button, Modal, Form, Input, message} from "antd";

import {PlusOutlined, SearchOutlined, Loading3QuartersOutlined} from '@ant-design/icons';
import style from "./style.module.css"
import "./reset.css"
import PropTypes from "prop-types";

const CommonTable = forwardRef(function (props, ref) {
    const [tableColumns, setTableColumns] = useState([]);//表格数据
    const [tableData, setTableData] = useState([]);//表格数据
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null)
    const [tableDataLoading, setTableDataLoading] = useState(true);//控制获取表格数据时 loading
    const [modalConfirmLoading, setModalConfirmLoading] = useState(false);//控制Modal确认按钮 loading
    const [modalForm, setModalForm] = useState({})//记录当前编辑的行 的键值对
    const [searchKeyWord, setSearchKeyword] = useState("")

    const formRef = useRef(null)

    const fetchData = () => {
        setTableDataLoading(true)
        props.api['list']().then(res => {
            setTableData(res.data)
        }).finally(() => {
            setTableDataLoading(false)
        })
    }

    const onSearch = () => {
        const search = props.api['search']
        if (!search) {
            message.info("功能开发中")
            return
        }
        if (searchKeyWord.trim() !== "") {
            setTableDataLoading(true)
            search({keyword: searchKeyWord}).then(res => {
                setTableData(res.data)
            }).finally(() => {
                setTableDataLoading(false)
            })
        }
    }

    const onCreate = () => {
        formRef.current?.resetFields()
        formRef.current?.setFieldsValue({available: true})
        setModalForm({})
        setModalType("add")
        setModalVisible(true)
    }

    const onUpdate = record => {
        formRef.current?.setFieldsValue(record)
        setModalForm(record)
        setModalType("edit")
        setModalVisible(true)
    }

    const onDelete = id => {
        const modal = Modal.confirm({
            style: {
                top: 200
            },
            content: "确认删除这条记录吗？",
            cancelText: "取消",
            okText: "确定",
            onOk: async () => {
                try {
                    const res = await props.api['del'](id)
                    if (res.data) {
                        fetchData()
                    } else {
                        message.warning(res.msg)
                    }
                } catch (e) {

                } finally {
                    modal.destroy();
                }
            },
            afterClose() {
                modal.destroy();
            }
        })

    }

    const onModalOk = async () => {
        try {
            await formRef.current?.validateFields()
            const data = formRef.current?.getFieldsValue()
            setModalConfirmLoading(true)
            const res = await props.api[modalType](Object.assign(modalForm, data))
            if (res.code !== 200) {
                message.warn(res.msg)
                return
            }
            fetchData()
            setModalVisible(false)
        } finally {
            setModalConfirmLoading(false)
            props.onModalClose && props.onModalClose()
        }
    }

    const onModalCancel = () => {
        setModalVisible(false)
        props.onModalClose && props.onModalClose()
    }

    const initTableColumns = () => {
        setTableColumns([
            ...props.columns,
            {
                align: "center",
                title: "操作",
                render: (t, record) => (
                    <Space size="small">
                        {
                            props.renderRowExtraBtn &&
                            props.renderRowExtraBtn(record)
                        }
                        {
                            props.api.edit &&
                            <Button type="primary" onClick={() => onUpdate(record)}>编辑</Button>
                        }
                        {
                            props.api.del &&
                            <Button type="primary" danger onClick={() => onDelete(record.id)}>删除</Button>
                        }
                    </Space>
                )
            }
        ])
    }


    const formItems = useMemo(() => {
        return props.renderModal({
            type: modalType,
            record: modalForm
        })
    }, [modalVisible])

    useImperativeHandle(ref, () => (
        {
            setTableDataLoading,
            fetchData
        }
    ))

    useEffect(() => {
        initTableColumns()
    }, [])

    useEffect(() => {
        if (searchKeyWord.trim() === '') fetchData()
    }, [searchKeyWord])

    return (
        <>
            <div className={style['search-wrap']}>
                <Space>
                    <Input allowClear value={searchKeyWord} onChange={e => setSearchKeyword(e.target.value)}
                           autoComplete="off"
                           placeholder="输入关键字进行搜索"/>
                    <Button type="primary" icon={<SearchOutlined/>} onClick={onSearch}>搜索</Button>
                    <Button type="primary" icon={<Loading3QuartersOutlined/>} onClick={fetchData}>刷新</Button>
                    <Button type="primary" icon={<PlusOutlined/>} onClick={onCreate}>添加</Button>
                </Space>
            </div>
            <Table
                {...props}
                rowKey="id"
                bordered={props.bordered || true}
                pagination={props.pagination || false}
                columns={tableColumns}
                loading={tableDataLoading}
                dataSource={tableData}
            />
            <Modal
                title={modalType === 'add' ? '新增' : '编辑'}
                visible={modalVisible}
                confirmLoading={modalConfirmLoading}
                centered
                forceRender
                cancelText="取消"
                okText="确定"
                onOk={onModalOk}
                onCancel={onModalCancel}>
                <Form
                    ref={formRef}
                    labelCol={{span: 5}}
                    wrapperCol={{span: 18}}
                >
                    {formItems}
                </Form>
            </Modal>
        </>
    )
})

CommonTable.propTypes = {
    columns: PropTypes.array.isRequired,
    api: PropTypes.object.isRequired,
    renderModal: PropTypes.func.isRequired,
    renderRowExtraBtn: PropTypes.func,
}
export default CommonTable