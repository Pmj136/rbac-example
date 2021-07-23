import React, {useEffect, useState} from 'react'
import {Button, Drawer, message, Space, Spin, Tree} from "antd";
import {list, edit} from "../../../api/role-perm";

function AssignPermDrawer(props) {
    const [treeData, setTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([])

    const [checkedIds, setCheckedIds] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchRolePerm = () => {
        setLoading(true)
        list({roleId: props.role.id}).then(res => {
            setTreeData(res.data.treeData)
            setCheckedKeys(res.data.checkedKeys)
        }).finally(() => {
            setLoading(false)
        })
    }

    const saveData = () => {
        if (checkedIds == null) {
            message.warning("未作更改")
            return
        }
        const {id} = props.role
        const rolePerms = checkedIds.map(v => ({roleId: id, permId: v}))
        edit({id, rows: rolePerms}).then(res => {
            message.success(res.msg, 1.5)
        }).finally(() => {
            onClose()
        })
    }

    const onClose = () => {
        setTreeData([])
        setCheckedKeys([])
        props.onClose && props.onClose()
    }

    const onCheck = (checkedKeysValue, e) => {
        setCheckedKeys(checkedKeysValue);

        let ids = checkedKeysValue.map(v => +v)
        ids.push(...e.halfCheckedKeys.map(v => +v))
        setCheckedIds(ids)
    };
    useEffect(() => {
        if (props.visible) {
            fetchRolePerm()
        }
    }, [props.visible])

    return (
        <Drawer
            title={<span>正在为 <span style={{color: 'red'}}> {props.role?.name} </span>分配权限</span>}
            closeIcon={false}
            width={380}
            destroyOnClose
            visible={props.visible}
            onClose={onClose}
            footer={
                <Space>
                    <Button type="primary" onClick={saveData}>保存</Button>
                    <Button onClick={onClose}>取消</Button>
                </Space>
            }
        >
            {
                loading
                    ? (
                        <div className="flex-center">
                            <Spin/>
                        </div>
                    )
                    : (
                        treeData.length === 0
                            ? <div className="flex-center">暂无数据</div>
                            : <Tree
                                showLine
                                checkable
                                defaultExpandAll
                                treeData={treeData}
                                checkedKeys={checkedKeys}
                                onCheck={onCheck}
                            />
                    )
            }
        </Drawer>
    )
}

export default AssignPermDrawer