import Home from "../pages/perms/home/Home";
import PermList from "../pages/perms/perm-list/PermList";
import RoleList from "../pages/perms/role-list/RoleList";
import UserList from "../pages/perms/user-list/UserList";

const routes=[
    {
        path:"/home",
        component:Home
    },
    {
        path:"/permission-manage",
        children:[
            {
                path:"/permission-manage/permission-list",
                component:PermList
            },
            {
                path:"/permission-manage/role-list",
                component:RoleList
            },
            {
                path:"/permission-manage/user-list",
                component:UserList
            }
        ]
    }
]

export default routes