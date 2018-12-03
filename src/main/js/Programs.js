import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MailIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserProfileCard extends React.Component {
  state = { 
      
            expanded: false ,
            lastname: 'Hopper',
            firstname: 'Dennis',
            city: 'Los Angeles',
            username: 'thehopper',
            bio: 'I am an American actor, director, writer, film editor, photographer and artist. I attended the Actors Studio, made my first television appearance in 1954, and soon after appeared alongside James Dean in Rebel Without a Cause, and Giant and Gunfight at the OK Corral. In the next ten years I made myself a name in television, and by the end of the 1960s, I had appeared in several films.'};


            
  // componentDidMount() {
	// 	client({method: 'GET', path: '/api/myprograms' + username}).done(response => {
	// 		this.setState({employees: response.entity._embedded.employee});
	// 	});
  // }

  // [EmployeeProgram{username:djsnydes, programId:1, programName:SPSS, accessLevel:Manager}]

 

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt={this.state.username} src={"/images/" + this.state.username + ".jpg"}/>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.state.username}
          subheader="Profile"
        />
        <CardMedia
          className={classes.media}
          image={"/images/" + this.state.username + ".jpg"}
          title={this.state.username}
        />
        <CardContent>
          <Typography component="p">
            {this.state.lastname}, {this.state.firstname} : {this.state.username}
          </Typography>
          <div id = "UserName">{this.state.firstname}  {this.state.lastName}</div><br />
            <Typography paragraph>
              {this.state.bio}
            </Typography>
            <Typography paragraph>
              Phone Number: {this.state.phonenumber}
            </Typography>
            <Typography>
              Some Other Things?
            </Typography>
        {/* </CardContent>
        <CardActions className={classes.actions} disableActionSpacing> */}
          <IconButton aria-label="Send Email">
            <MailIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          
            <ExpandMoreIcon />
          </IconButton>
        {/* </CardActions> */}
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div id = "UserName">{this.state.firstname}  {this.state.lastName}</div><br />
            <Typography paragraph>
              {this.state.bio}
            </Typography>
            <Typography paragraph>
              Phone Number: {this.state.phonenumber}
            </Typography>
            <Typography>
              Some Other Things?
            </Typography> */}
          </CardContent>
        {/* </Collapse> */}
      </Card>
    );
  }
}

UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfileCard);