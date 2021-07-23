import React, {useEffect, useRef, useState} from 'react'
import {Form, Input, message, Modal, Select, Spin} from "antd";
import {list, edit} from "../../../api/user-role";

const {Option} = Select
let rawData = null

function AssignRoleModal(props) {
    const formRef = useRef()
    const [rolesList, setRolesList] = useState([])
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchUserRole = () => {
        setLoading(true)
        const {account, id} = props.user
        list({userId: id}).then(res => {
            const {allRoles, hasRoles} = res.data
            setRolesList(allRoles)
            rawData = allRoles
            const roleIds = hasRoles.map(v => v.roleId)
            formRef.current?.setFieldsValue({
                account,
                roleIds
            })
        }).finally(() => {
            setLoading(false)
        })
    }
    const onModalOk = () => {
        setConfirmLoading(true)
        const {roleIds} = formRef.current.getFieldsValue()
        const {id} = props.user
        const rows = []
        for (const roleId of roleIds) {
            rows.push({userId: id, roleId})
        }
        edit({id, rows})
            .then(res => {
                if (res.code === 200) {
                    message.success(res.msg, 1.5)
                }
            })
            .catch(() => {
                fetchUserRole()
            })
            .finally(() => {
                setConfirmLoading(false)
                props.onCancel()
            })
    }
    const onSearch = value => {
        if (value.trim() === "")
            setRolesList(rawData)
        else
            setRolesList(rawData.filter(v => v.name.includes(value)))

    }
    useEffect(() => {
        if (props.visible) {
            fetchUserRole()
        }
    }, [props.visible])
    return (
        <Modal
            title="分配角色"
            visible={props.visible}
            confirmLoading={confirmLoading}
            cancelText="取消"
            okText="保存"
            centered
            destroyOnClose
            onOk={onModalOk}
            onCancel={props.onCancel}
        >
            <Form
                ref={formRef}
                labelCol={{span: 3}}
                wrapperCol={{span: 18}}
            >
                {
                    loading
                        ? (
                            <div className="flex-center">
                                <Spin/>
                            </div>
                        )
                        : (
                            <>
                                <Form.Item
                                    label="账号"
                                    name="account"
                                >
                                    <Input disabled/>
                                </Form.Item>

                                <Form.Item
                                    label="角色"
                                    name="roleIds"
                                >
                                    <Select
                                        showSearch
                                        onSearch={onSearch}
                                        mode="multiple"
                                        showArrow={false}
                                        filterOption={false}
                                        placeholder="为此用户分配一个或多个角色"
                                    >
                                        {
                                            rolesList.map((v, i) => {
                                                return <Option key={i} value={v.id}>
                                                    {v.name}
                                                </Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </>
                        )
                }
            </Form>
        </Modal>
    )
}

export default AssignRoleModal