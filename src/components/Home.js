import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Navbar from './Navbar';
import KeyUpload from './KeyUpload';
import ShortenUrl from './ShortenUrl';
import { makeStyles } from '@material-ui/core/styles';
import useWallet from '../hooks/useWallet';
import SavedUrls from './SavedUrls';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Home = () => {
  const [{ wallet, walletAddress }, setWallet] = useWallet();

  const classes = useStyles();
  return (
    <Fragment>
      <Navbar walletAddress={walletAddress} />
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

        {walletAddress ? <SavedUrls walletAddress={walletAddress} /> : null}
      </Container>
    </Fragment>
  );
};

export default Home;
