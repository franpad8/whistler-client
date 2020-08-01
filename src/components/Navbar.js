import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function ButtonAppBar({isAuthenticated, onClickLogout}) {
  const classes = useStyles();
  let history = useHistory()
  const mClickLogout = () => {
    onClickLogout()
    history.push('login')
  }
  const mClickLogin = () => {
    history.push('login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Whistler
          </Typography>
          {
            isAuthenticated 
                ? <Button color="inherit" onClick={mClickLogout}>Logout</Button>
                : <Button color="inherit" onClick={mClickLogin}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}