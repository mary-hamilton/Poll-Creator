import {useContext} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Button, Container, Grid, Typography} from "@mui/material";

import AppContext from "./context";
import Home from './Home';
import Signup from "./Signup";

const App = () => {

    const {client} = useContext(AppContext);
    const navigate = useNavigate()
    const location = useLocation();

    // language=JavaScript
    const showSUButton = (location.pathname === "/signup") ? "" :  <Button onClick={() => navigate("/signup")}>Sign Up</Button> ;
    const signedIn = client.username ? `Signed in as ${client.username}` : ``;
    return (
        <Container>
            <header>
                <Grid container>
                    <Grid item>
                        {showSUButton}
                    </Grid>
                    <Grid item>
                        <Typography>{signedIn}</Typography>
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