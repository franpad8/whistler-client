import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Menu, MenuItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'
import MoreVertIcon from '@material-ui/icons/MoreVert';

import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: '1rem auto'
    },
    text: {
        textAlign: 'left'
    },
    avatar: {
      backgroundColor: red[500],
    },
}));

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default ({ id, text, creatorName, createdAt, onWhistleDeleted, onFollow, onUnfollow, creatorId }) => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickDelete = () => {
        handleClose()
        onWhistleDeleted(id)
    }

    const onClickFollow = () => {
        handleClose()
        onFollow(creatorId)
    }

    const onClickUnfollow = () => {
        onUnfollow(creatorId)
    }

    return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {creatorName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <div>
          <IconButton aria-label="settings" onClick={handleClick} >
            <MoreVertIcon  />
            
          </IconButton>
          <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
          >
                <StyledMenuItem onClick={ onClickDelete }>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </ StyledMenuItem>
                <StyledMenuItem onClick={ onClickFollow }>
                    <ListItemIcon>
                        <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Follow" />
                </ StyledMenuItem>
                <StyledMenuItem onClick={ onClickUnfollow }>
                    <ListItemIcon>
                        <PersonAddDisabledIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Unfollow" />
                </ StyledMenuItem>
          </ Menu>
          </div>
        }
        title={`@${creatorName}`}
        subheader={moment(createdAt).calendar()}
      />
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p" className={classes.text}>
          { text }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      
    </Card>  )
    
}
