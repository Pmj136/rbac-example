import React, {useState} from 'react'
import {Form, Input, Select} from "antd";

function ModalForm(props) {
    const [permType, setPermType] = useState(null)
    const {record, menu} = props
    return (
        <>
            <Form.Item
                label="权限名称"
                name="title"
                rules={[{required: true, message: '请输入权限名称！'}]}
            >
                <Input autoComplete="off" placeholder="输入一个权限名称"/>
            </Form.Item>

            <Form.Item
                label="权限类型"
                name="type"
                rules={[{required: true, message: '请选择权限类型！'}]}
            >
                <Select disabled={record.children != null} placeholder="选择权限类型" onChange={setPermType}>
                    <Select.Option value="menu">菜单</Select.Option>
                    <Select.Option value="action">按钮</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label={(permType || record.type) == null ? 'URL/ACTION' : ((permType || record.type) === 'menu' ? 'URL' : 'ACTION')}
                name="str"
                rules={[{required: true, message: permType === 'menu' ? '请填写菜单路径' : '请填写资源标识'}]}
            >
                <Input
                    autoComplete="off"
                    placeholder={permType == null ? '请先选择权限类型'
                        : (permType === 'menu' ? '输入菜单路径' : '输入资源标识')}/>
            </Form.Item>
            <Form.Item
                label="父级菜单"
                name="parentId"
                rules={[{required: true, message: '请选择父级菜单！'}]}
            >
                <Select
                    allowClear
                    showArrow
                    showSearch
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    placeholder="选择一个父级菜单"
                    notFoundContent={null}
                >
                    {menu.map(d => <Select.Option key={d.id} value={d.id}>{d.title}</Select.Option>)}
                </Select>
            </Form.Item>
        </>
    )
}

export default ModalForm