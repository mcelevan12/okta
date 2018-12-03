import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import client from './client';
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
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ProfileMenu from './ProfileMenu';

const styles = theme => ({
  card: {
    // display: 'flex',
    // maxWidth: 400,
    // align: 'center',
    // maxWidth: 640,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  subcard: {
  //   align: 'center',
    maxWidth: 640,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  },
  media: {
    paddingTop: '56.25%', // 16:9
    // maxWidth: 400,
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
  center: {
    margin: 'auto',
    width: '50%',
    border: 3,
    padding: 10,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UserProfileCard extends React.Component {
  constructor(props) {
    super(props);
    // this.onclick = this.onclick.bind(this);
  }

  state = { expanded: false ,
            imagefail: false,
            lastname: '',
            firstname: '',
            jobtitle: '',
            workphone: '',
            country: '',
            city: '',
            username: '',
            bio: '',}

  getrequest() {
    client({method: 'GET', path:'/acme/api/employee/' + this.props.username}).done(response => {
      console.log(response.entity)
      this.setState({lastname: response.entity.PersonalInformation.lastName,
                    firstname: response.entity.PersonalInformation.firstName,
                         city: response.entity.PersonalInformation.city,
                      country: response.entity.PersonalInformation.country,
                     jobtitle: response.entity.PersonalInformation.jobTitle,
                    workphone: response.entity.PersonalInformation.workPhoneNumber,
                          bio: response.entity.PersonalInformation.biography,
                     username: response.entity.PersonalInformation.username,
                    imagefail: false
      });
		});
  }

  componentDidMount() {
		this.getrequest();
  }

  // onclick() {
  //   if (this.state.username == 'djsnydes'){
  //     this.state.username = 'rko';
  //   } else if (this.state.username == 'rko'){
  //     this.state.username = 'thehopper';
  //   } else if (this.state.username == 'thehopper'){
  //     this.state.username = 'bobhoskins';
  //   } else if (this.state.username == 'bobhoskins'){
  //     this.state.username = 'trashman';
  //   } else if (this.state.username == 'trashman'){
  //     this.state.username = '0';
  //   }
  //   else{
  //     var newusername = parseInt(this.state.username);
  //     console.log(newusername);
  //     newusername++;
  //     this.state.username = newusername.toString();
  //   if (this.state.username == '1000'){
  //     this.state.username = 'djsnydes';
  //   } 
  //   }
  //   console.log("this.state.username before get request" + this.state.username)
  //   this.getrequest();
  // }

  defaultImage() {
    this.setState({imagefail: true,});
    return("images/DEFAULT.png");
  }

  editfunction = () => {
    this.props.callbackFromParent("EditProfile");
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt={this.state.username} src={"./images/" + this.state.username + ".png"} imgProps={{ onError: (e) => { e.target.src = this.defaultImage(); } }}/>
          }
          action={
            // <IconButton>
            //   <MoreVertIcon />
            // </IconButton>
            <ProfileMenu username={this.state.username} editprofile={this.editfunction}/>
          }
          // <Button onClick={this.onclick} variant="contained" color="secondary">
          title={this.state.username}
          //  </Button>}
          subheader="Profile"
        />
        <center> {/*Aligning with css refused to work no matter how hard I tried, so I'm using a deprecated html tag. sue me.*/}
        <Card className={classes.subcard}>
        {this.state.imagefail === false &&
        // <img
        // alt={this.state.username}
        // src={"./images/" + this.state.username + ".png"}
        // />
        <CardMedia
          className={classes.media}
          image={"./images/" + this.state.username + ".png"}
          alt={this.state.username}
          title={this.state.username}
        />
        } 
        {this.state.imagefail === true &&
        // <img
        // alt={this.state.username}
        // src={"./images/DEFAULT.png"}
        // />
        <CardMedia
          className={classes.media}
          image={"./images/DEFAULT.png"}
          alt={this.state.username}
          title={this.state.username}
        />
        }
        
        </Card>
        </center>
        <CardContent>
          <Typography component="p">
            {this.state.lastname}, {this.state.firstname} : {this.state.username}
            <br/>
            {this.state.firstname} is a {this.state.jobtitle} Located at the {this.state.city} office, in {this.state.country}.
          </Typography>
            <br />
            <Typography paragraph>
              {this.state.bio}
            </Typography>
            <Typography paragraph>
              Phone Number: {this.state.workphone}
            </Typography>
          {/* <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
          
            <ExpandMoreIcon />
          </IconButton> */}
          </CardContent>
      </Card>
    );
  }
}

UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfileCard);