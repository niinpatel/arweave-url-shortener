import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
}));

const Navbar = ({ walletAddress }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          Arweave URL Shortener
        </Typography>
        <Typography variant="body2">{walletAddress}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
