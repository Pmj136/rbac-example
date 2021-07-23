import React, {useRef, useState} from 'react'
import CommonTable from "../../../components/CommonTable";
import {add, del, edit, list} from "../../../api/user";
import {Button, Form, Input, Switch} from "antd";
import AssignRoleModal from "./AssignRoleModal";

const columns = [
    {
        align: "center",
        title: "ID",
        dataIndex: "id",
    },
    {
        align: "center",
        title: "用户账号",
        dataIndex: "account",
    },
    {
        align: "center",
        title: "创建时间",
        dataIndex: "createAt",
    },
    {
        align: "center",
        title: "状态",
        dataIndex: "available",
        render: flag => {
            let color = 'red', text = "已停用"
            if (flag) {
                color = "green";
                text = "使用中"
            }
            return <span style={{color}}> {text}</span>
        }
    }
]

function UserList() {
    const tableRef = useRef();
    const [assignRoleModalVisible, setAssignRoleModalVisible] = useState(false)
    const [currUser, setCurrUser] = useState(null)
    const showRoleModal = user => {
        setCurrUser(user)
        setAssignRoleModalVisible(true)
    }

    const onAssignRoleModalCancel = () => {
        setAssignRoleModalVisible(false)
    }

    const renderModal = ({type}) => {
        return (
            <>
                <Form.Item
                    label="用户账号"
                    name="account"
                    rules={[{required: true, message: '请输入角色名称！'}]}
                >
                    <Input autoComplete="off" placeholder="输入一个角色名称"/>
                </Form.Item>
                <Form.Item
                    label={type === 'add' ? '设置密码' : '重置密码'}
                    name="pwd"
                    rules={[{required: true, message: '请输入角色名称！'}]}
                >
                    <Input.Password autoComplete="off" placeholder="输入一个角色名称"/>
                </Form.Item>

                <Form.Item
                    label="状态"
                    name="available"
                    valuePropName="checked"
                >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭"/>
                </Form.Item>
            </>
        )
    }
    const renderRowBtn = record => {
        return (
            <>
                <Button type="dashed" danger onClick={() => showRoleModal(record)}>分配角色</Button>
            </>
        )
    }
    return (
        <>
            <CommonTable
                ref={tableRef}
                columns={columns}
                api={{add, edit, del, list}}
                renderModal={renderModal}
                renderRowExtraBtn={renderRowBtn}
            />
            <AssignRoleModal
                visible={assignRoleModalVisible}
                user={currUser}
                onCancel={onAssignRoleModalCancel}/>
        </>
    )
}

export default UserList