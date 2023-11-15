import axios from 'axios';
import { useState } from 'react';
import App from './App'
import AppContext from "./context";

const AxiosClient = () => {

  const baseUrl = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
  const [token, setToken] = useState(undefined)
  const [username, setUsername] = useState(undefined)

  const apiCall = ({ method, url, data }) => {
    return axios({
      method,
      url: `${baseUrl}${url}`,
      data,
      headers: {
        Authorization: token
      }
    }).catch((error) => {
      throw error;
    })
  }

  const signUp = (username, password, confirmpassword) => apiCall({
    method: "post",
    url: "/api/users/signup",
    data: { username, password, confirmpassword }
  })
    .then(({ data }) => {
        setToken(data.token)
        setUsername(data.username)
      }
    )

  const logIn = (username, password) => apiCall({
    method: "post",
    url: "/api/users/login",
    data: { username, password }
  })
    .then(({ data }) => {
        setToken(data.token)
        setUsername(data.username)
      }
    )

  const signOut = () => {
    setToken(undefined)
    setUsername(undefined)
  }

  const getPolls = () => apiCall({
    headers: { Authorization: token },
    method: "get",
    url: "/api/polls"
  })
    .then(({ data }) => {
      console.log(data)
      setPolls(data)
    })

  const vote = (id, optionid) => apiCall({
    headers: { Authorization: token },
    method: "patch",
    url: `/api/polls/${id}/${optionid}`
  })
    .then(() => getPolls())
    .catch((error) => console.log(error));

  const client = { apiCall, signUp, logIn, signOut, getPolls, vote }

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
