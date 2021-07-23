import React, {useEffect, useState} from 'react'
import LayoutMenu from "./LayoutMenu";
import LayoutHeader from "./layout-header";
import {Layout} from "antd";
import "./index.css"
import {Redirect, Route, Switch} from "react-router-dom";
import {getPermission} from "../api/user";
import routes from "../router/routes";

import NotFound from "../components/not-found/NotFound";
import {clearUser, setMenuTree} from "../redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import NoPermission from "../components/NoPermission/NoPermission";

const {Sider, Content} = Layout


function renderRoutes(routes, menus) {
    if (menus.length === 0) return
    return routes.map(v => {
        if (v.children?.length > 0) return renderRoutes(v.children, menus)
        if (menus.indexOf(v.path) !== -1)
            return <Route key={v.path} path={v.path} component={v.component}/>
        return (
            <Route key={v.path} exact path={v.path}>
                <Redirect to="/no-permission"/>
            </Route>
        )
    })
}

function AppLayout() {
    const dispatch = useDispatch();
    const {menuTree} = useSelector(state => state.user);

    const [menus, setMenus] = useState([])
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    useEffect(() => {
        getPermission().then(res => {
            dispatch(setMenuTree(res.data.menuTree))
            setMenus(res.data.menus)
        }).catch(e => {
            if (e.code && e.code === 403) {
                dispatch(clearUser())
            }
        })
    }, [])
    return (
        <section className="app-layout">
            <Sider trigger={null} collapsed={collapsed}>
                <div className="logo"/>
                <LayoutMenu data={menuTree}/>
            </Sider>
            <Layout className="layout-views">
                <LayoutHeader collapsed={collapsed} onCollapsedChange={toggleCollapsed}/>
                <Content style={{padding: '15px'}}>
                    <Switch>
                        {
                            menus.length > 0 &&
                            <Route path="/" exact>
                                <Redirect to={menus[0]}/>
                            </Route>
                        }
                        <Route path="/no-permission" exact component={NoPermission}/>
                        {renderRoutes(routes, menus)}
                        {
                            menus.length > 0 &&
                            <Route path="*" component={NotFound}/>
                        }
                    </Switch>
                </Content>
            </Layout>
        </section>
    )
}

export default AppLayout