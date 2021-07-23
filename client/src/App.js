import React from 'react'
import store from "./redux"
import RouterView from "./router";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <RouterView/>
        </Provider>
    )
}

export default App