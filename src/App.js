import React, { useState, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from './components/Navbar';
import KeyUpload from './components/KeyUpload';
import ShortenUrl from './components/ShortenUrl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const App = () => {
  const [wallet, setWallet] = useState(null);

  const classes = useStyles();
  return (
    <Fragment>
      <Navbar />
      <Container fixed>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          {wallet ? (
            <ShortenUrl wallet={wallet} />
          ) : (
            <KeyUpload setWallet={setWallet} />
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default App;
