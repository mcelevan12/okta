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
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

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

  state = {
            imagefail: false,
          }

  defaultImage() {
    this.setState({imagefail: true,});
    return("images/DEFAULT.png");
  }

  editfunction = () => {
    this.props.callbackFromParent({
      lastname: this.props.lastname,
      firstname: this.props.firstname,
      city: this.props.city,
      country: this.props.country,
      username: this.props.username,
      biography: this.props.biography,
      jobtitle: this.props.jobtitle,
      workphone: this.props.workphone,
    })
    
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={ this.props.username != '' &&
            <Avatar alt={this.props.username} src={"./images/" + this.props.username + ".png"} imgProps={{ onError: (e) => { e.target.src = this.defaultImage(); } }}/>
          }
          action={
            <ProfileMenu username={this.props.username} editprofile={this.editfunction} loginuser={this.props.loginuser}/>
          }
          title={this.props.firstname + " " + this.props.lastname + ", Username: " + this.props.username} 
          subheader={this.props.jobtitle + " at the " + this.props.city + " office in " + this.props.country}
        />
        <center> {/*Aligning with css refused to work no matter how hard I tried, so I'm using a deprecated html tag. sue me.*/}
        <Card className={classes.subcard}>
        {this.props.username != '' &&
        <CardMedia
          className={classes.media}
          image={"./images/" + this.props.username + ".png"}
          alt={this.props.username}
          title={this.props.username}
        />
        } 
        {this.state.imagefail === true &&
        <CardMedia
          className={classes.media}
          image={"./images/DEFAULT.png"}
          alt={this.props.username}
          title={this.props.username}
        />
        }
        
        </Card>
        </center>
        <CardContent>
          <div>
          <div style={{float: "left", paddingBottom: "6px", marginRight: "6px", paddingRight: "6px", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "amber"}}>
          <Typography component="p">
            {/* {this.props.lastname}, {this.props.firstname} : {this.props.username}
            <br/>
            {this.props.firstname} is a {this.props.jobtitle} Located at the {this.props.city} office, in {this.props.country}.
            <br/> */}
            <PersonIcon style={{verticalAlign: "bottom"}} />Name: {this.props.firstname} {this.props.lastname} <br/>
            <BusinessCenterIcon style={{verticalAlign: "bottom"}}/>Job Title: {this.props.jobtitle} <br />
            <PublicIcon style={{verticalAlign: "bottom"}}/>Country: {this.props.country} <br />
            <LocationCityIcon style={{verticalAlign: "bottom"}}/>City: {this.props.city}

          </Typography>
          </div>
          <div style={{paddingLeft: "6px", paddingBottom: "6px",}}>
            <div style={{paddingLeft: "6px"}}>
              <Typography paragraph>
                {this.props.biography}
              </Typography>
            </div>
            <Typography paragraph>
              Phone Number: {this.props.workphone}
            </Typography>
            </div>
            </div>
          </CardContent>
      </Card>
    );
  }
}

UserProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfileCard);