import React from 'react';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import arweave from '../api/arweaveSetup';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5)
  }
}));

const KeyUpload = ({ setWallet }) => {
  const classes = useStyles();

  const handleFileUpload = event => {
    const filereader = new FileReader();

    filereader.addEventListener('loadend', async event => {
      try {
        const wallet = JSON.parse(event.target.result);
        const walletAddress = await arweave.wallets.jwkToAddress(wallet);

        if (!walletAddress) {
          throw new Error('No wallet address found');
        }

        setWallet(wallet);
      } catch (e) {
        alert(
          'Something want wrong, make sure you have uploaded the correct file'
        );
        console.log(e);
      }
    });

    filereader.readAsText(event.target.files[0]);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="body1">
        Drop a wallet keyfile to create a Short URL
      </Typography>
      <Input type="file" onChange={handleFileUpload} />
    </Paper>
  );
};

export default KeyUpload;
