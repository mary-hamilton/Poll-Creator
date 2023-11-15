import { createContext } from "react";


const AppContext = createContext({
  client: {},
  token: undefined,
  username: undefined,
  setToken: () => {
  },
});

export default AppContext;