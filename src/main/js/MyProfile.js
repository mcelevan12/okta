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
import Profile from './Profile';

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

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { lastname: '',
            firstname: '',
            jobtitle: '',
            workphone: '',
            country: '',
            city: '',
            username: '',
            biography: '',}

  getrequest() {
    client({method: 'GET', path:'/acme/api/employee/' + this.props.loginuser}).done(response => {
      console.log(response.entity)
      this.setState({lastname: response.entity.PersonalInformation.lastName,
                    firstname: response.entity.PersonalInformation.firstName,
                         city: response.entity.PersonalInformation.city,
                      country: response.entity.PersonalInformation.country,
                     jobtitle: response.entity.PersonalInformation.jobTitle,
                    workphone: response.entity.PersonalInformation.workPhoneNumber,
                    biography: response.entity.PersonalInformation.biography,
                     username: response.entity.PersonalInformation.username,
      });
		});
  }

  componentDidMount() {
		this.getrequest();
  }

  render() {
    const { classes } = this.props;

    return (
        <Profile lastname={this.state.lastname} 
                 firstname={this.state.firstname} 
                 loginuser={this.props.loginuser}
                 city={this.state.city} 
                 country={this.state.country} 
                 jobtitle={this.state.jobtitle}
                 workphone={this.state.workphone}
                 biography={this.state.biography}
                 username={this.state.username}
                 callbackFromParent={this.props.callbackFromParent}
        />
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfile);