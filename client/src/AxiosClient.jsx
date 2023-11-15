import axios from 'axios';
import {useState} from 'react';

import App from './App'
import AppContext from "./context";

const AxiosClient = () => {

    const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';

    const [token, setToken] = useState(undefined)
    const [username, setUsername] = useState(undefined)

    const apiCall = ({method, url, data}) => {
        return axios({
            method,
            url: `${baseUrl}${url}`,
            data,
            headers: {
                authorization: token
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const signUp = (username, password, confirmpassword) => apiCall({
        method: "post",
        url: "/api/users/signup",
        data: {username, password, confirmpassword}
    })
        .then(({data}) => {
                setToken(data.token)
                setUsername(data.username)
            }
        )

    const logIn = (username, password, confirmpassword) => apiCall({
        method: "post",
        url: "/api/users/login",
        data: {username, password}
    })
        .then(({data}) => {
                setToken(data.token)
                setUsername(data.username)
            }
        )

    const client = {apiCall, signUp, logIn}

    return (
        <AppContext.Provider
            value={{
                client,
                token,
                setToken,
                username,
            }}
        >
            <App/>
        </AppContext.Provider>
    )
}

export default AxiosClient;
