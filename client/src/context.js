import { createContext } from "react";


const AppContext = createContext({
  client: {},
  token: undefined,
  username: undefined,
  confirmpassword: undefined,
  setToken: () => {},
});

export default AppContext;