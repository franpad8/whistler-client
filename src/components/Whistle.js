import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
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

export default ({ text, creatorName, createdAt }) => {

    const classes = useStyles();

    return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {creatorName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
