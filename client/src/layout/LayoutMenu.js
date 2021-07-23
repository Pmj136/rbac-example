import React, {useEffect, useState} from 'react'
import {useHistory, useLocation} from "react-router-dom"
import {Menu} from 'antd';

const {SubMenu, Item} = Menu

function getOpenKeys(arr, target, parent = null) {
    for (const v of arr) {
        if (v.str === target) {
            if (parent == null) return []
            return [parent]
        }
        if (v.children?.length > 0)
            return getOpenKeys(v.children, target, v.str)
    }
    return []
}

function LayoutMenu(props) {
    const history = useHistory();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState("");
    const [openKeys, setOpenKeys] = useState([])

    const handleItemClick = e => {
        setSelectedKeys(e.str)
        history.replace(e.str)
    }
    const onOpenChange = (e) => {
        setOpenKeys(e)
    }
    const renderMenu = (arr) => {
        return arr.map(v => {
            if (v.children?.length > 0) {
                return (
                    <SubMenu key={v.str} title={v.title} icon={v.icon}>
                        {renderMenu(v.children)}
                    </SubMenu>
                )
            }
            return <Item key={v.str} icon={v.icon} onClick={() => handleItemClick(v)}>{v.title}</Item>
        })
    }
    useEffect(() => {
        setSelectedKeys(location.pathname)
        setOpenKeys(getOpenKeys(props.data, location.pathname))
    }, [location.pathname])
    return (
        <Menu theme="dark"
              mode="inline"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
        >
            {renderMenu(props.data)}
        </Menu>
    )
}

export default LayoutMenu