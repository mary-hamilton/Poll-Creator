import { useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography } from "@mui/material";

import AppContext from "./context";
import Home from './Home';
import Signup from "./Signup";

const App = () => {

  const { client, username } = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation();
  const showSUButton = (location.pathname === "/signup") ? "" :
    <Button variant='outlined' onClick={() => navigate("/signup")}>Sign Up</Button>;
  const signedIn = username ? `Signed in as ${username}` : ``;

  const signInOut = () => {
    if (username) {
      return (
        <Button variant="contained" onClick={client.signOut}>Sign Out</Button>
      )
    } else {
      return (
        <Button variant="contained" onClick={() => navigate('/')}>Sign In</Button>
      )
    }
  };

  return (
    <Container>
      <header>
        <Grid container alignItems="center">
          <Grid item flexGrow={1}>
            {showSUButton}
          </Grid>
          <Grid item>
            <Typography>{signedIn}</Typography>
          </Grid>
          <Grid item m={1}>
            {signInOut()}
          </Grid>
        </Grid>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<h1>You're in trouble</h1>}/>
        </Routes>
      </main>
    </Container>
  )
}

export default App;