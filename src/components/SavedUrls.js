import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { getAllSavedUrls } from '../api';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 650
    }
  })
);

const SavedUrls = ({ walletAddress }) => {
  const classes = useStyles();
  const [tableRowData, setTableRowData] = useState([]);

  useEffect(() => {
    getAllSavedUrls(walletAddress).then(setTableRowData);
    return () => {};
  }, [walletAddress]);

  if (!tableRowData.length) {
    return (
      <Typography variant="body1">Your saved urls will appear here!</Typography>
    );
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Long URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowData.map(({ longUrl, shortUrl }) => (
            <TableRow key={shortUrl}>
              <TableCell>
                <a href={shortUrl}>{shortUrl}</a>
              </TableCell>
              <TableCell>{longUrl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SavedUrls;
