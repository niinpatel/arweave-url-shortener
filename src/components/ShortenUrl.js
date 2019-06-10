import React, { useState } from 'react';
import isUrl from 'is-url';
import { shortenUrlAndSave } from '../api';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  }
}));

const ShortenUrl = ({ wallet }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const shortenUrl = async () => {
    try {
      setInProgress(true);
      if (!longUrl) return;

      if (!isUrl(longUrl)) {
        alert('not a valid url');
        return;
      }

      const shortUrl = await shortenUrlAndSave(longUrl, wallet);
      setShortUrl(shortUrl);
    } catch (e) {
      console.log(e);
      alert('something went wrong');
    } finally {
      setLongUrl('');
      setInProgress(false);
    }
  };

  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Input
        type="url"
        name="url"
        placeholder="Enter the long url"
        value={longUrl}
        onChange={e => setLongUrl(e.target.value)}
        fullWidth
      />

      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={shortenUrl}
        size="large"
        disabled={inProgress}
      >
        Shorten
      </Button>

      {shortUrl ? (
        <Typography variant="body1">
          Result: <a href={shortUrl}>{shortUrl}</a>
        </Typography>
      ) : null}

      {inProgress ? <CircularProgress /> : null}
    </Grid>
  );
};

export default ShortenUrl;
