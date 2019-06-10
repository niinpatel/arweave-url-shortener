import React, { useState, useEffect, Fragment } from 'react';
import { getLongUrl } from '../api';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ShortToLongUrl = ({ shortUrlPath }) => {
  const [notFound, setnotFound] = useState(false);

  useEffect(() => {
    getLongUrl(shortUrlPath).then(longUrl => {
      if (longUrl == null) {
        setnotFound(true);
      } else window.location.href = longUrl;
    });
    return () => {};
  }, [shortUrlPath]);

  return (
    <Grid container justify="center" alignItems="center" direction="column">
      {notFound ? (
        <Fragment>
          <Typography variant="h5" color="error">
            URL not found.
          </Typography>
          <Typography variant="body1">
            If you have added it recently, wait for some time for it to reflect
            on the network.
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <CircularProgress size={200} />
          <Typography variant="h5">Redirecting...</Typography>
        </Fragment>
      )}
    </Grid>
  );
};

export default ShortToLongUrl;
