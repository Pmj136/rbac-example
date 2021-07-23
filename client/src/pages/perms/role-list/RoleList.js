import React, {useState} from 'react'
import CommonTable from "../../../components/CommonTable";
import {add, del, edit, list} from "../../../api/role";
import {Button, Form, Input} from "antd";
import AssignPermDrawer from "./AssignPermDrawer";

const columns = [
    {
        align: "center",
        title: "ID",
        dataIndex: "id",
    },
    {
        align: "center",
        title: "角色名称",
        dataIndex: "name",
    },
    {
        align: "center",
        title: "创建人",
        dataIndex: "account",
        render: text => {
            if (text == null) return <span style={{color: "red"}}>开发者</span>
            return text
        }
    },
    {
        align: "center",
        title: "创建时间",
        dataIndex: "createAt",
    }
]

function RoleList() {
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [currRole, setCurrRole] = useState(null)

    const showDrawer = role => {
        setCurrRole(role)
        setDrawerVisible(true)
    }

    const onClose = () => {
        setDrawerVisible(false)
    }

    const renderModal = () => {
        return (
            <>
                <Form.Item
                    label="角色名称"
                    name="name"
                    rules={[{required: true, message: '请输入角色名称！'}]}
                >
                    <Input autoComplete="off" placeholder="输入一个角色名称"/>
                </Form.Item>
            </>
        )
    }
    const renderRowBtn = record => {
        return (
            <>
                <Button type="dashed" danger onClick={() => showDrawer(record)}>分配权限</Button>
            </>
        )
    }
    return (
        <>
            <CommonTable
                columns={columns}
                api={{add, edit, del, list}}
                renderRowExtraBtn={renderRowBtn}
                renderModal={renderModal}/>
            <AssignPermDrawer
                visible={drawerVisible}
                role={currRole}
                onClose={onClose}
            />
        </>
    )
}

export default RoleList