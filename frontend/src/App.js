import './App.css';
import 'fontsource-roboto';
import React from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>
            <IconButton href="/" style={{ color: "white" }}>
              <DeveloperModeIcon></DeveloperModeIcon>
            </IconButton>
            <Typography variant='h4'>
              CodeBox
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container direction="column" align="center">
            <LandingPage />
          </Grid>
        </Container>
      </header>
    </div>
  );
};

export default App;