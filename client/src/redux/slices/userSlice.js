import {createSlice} from '@reduxjs/toolkit'
import Cookie from "js-cookie"
import {get, set, remove} from "../../utils/storage";
// export const login = createAsyncThunk(
//     'user/login',
//     async (data) =>{
//         await doLogin(data)
//     }
// )
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: Cookie.get("token"),
        info: get("userInfo", {}),
        menuTree: get("menuTree") || []
    },
    reducers: {
        saveUser(state, action) {
            state.isLogin = true
            const {info, perms} = action.payload
            set("userInfo", info)
            state.info = info
            state.menuTree = perms.menuTree
            set("menuTree", action.payload)
        },
        clearUser(state) {
            state.isLogin = false
            state.info = {}
            state.menuTree = []
            remove("userInfo")
            remove("menuTree")
            Cookie.remove("token")
        },
        setMenuTree(state, action) {
            state.menuTree = action.payload
            set("menuTree", action.payload)
        }
    },
    // extraReducers(builder) {
    //     builder.addCase(login.fulfilled, (state) => {
    //         console.log(state)
    //         // state.value += 1
    //     })
    // }
})
export const {saveUser, clearUser, setMenuTree} = userSlice.actions
export default userSlice.reducer