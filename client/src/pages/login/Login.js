import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {saveUser} from "../../redux/slices/userSlice";
import {doLogin} from "../../api/user";

function Login() {
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const history = useHistory()
    const handleLogin = () => {
        doLogin({
            account,
            password
        }).then(res => {
            dispatch(saveUser(res.data))
            history.push("/")
        })
    }
    return (
        <div>
            <input type="text" value={account} onChange={e => setAccount(e.target.value)}/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>登录</button>
        </div>
    )
}

export default Login