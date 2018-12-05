import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

import amber from '@material-ui/core/colors/amber';

import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import BallotIcon from '@material-ui/icons/Ballot';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import Backspace from '@material-ui/icons/Backspace';

import client from './client';
import myTeam from './myTeam';
import SearchTabs from './SearchTabs';
import SearchPage from './SearchPage';
import Profile from './Profile';
import MyProfile from './MyProfile';
import EmployeeList from './EmployeeList';
import EditProfile from './EditProfile';
import MyPrograms from './MyPrograms';
import RequestAccess from './RequestAccess';

const drawerWidth = 240;

const styles = theme => ({
  titlebar:{
    height: '40px',
    ...theme.typography.h6,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'vertical',
    backgroundColor: amber,
    padding: theme.spacing.unit,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  // logoutbutton: {
  //   justifyContent: 'right',
  //   alignItems: 'right',
  //   display: 'flex',
  // },
  rightIcon: {
    marginLeft: '4px',
  },
  iconbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  listItem: {
    background: 'linear-gradient(wheat, white)',
  }
});


class PermanentDrawerLeft extends React.Component {

  editProfileCallback = (dataFromChild) => {
    this.setState({
      passlastname: dataFromChild.lastname,
      passfirstname: dataFromChild.firstname,
          passcity: dataFromChild.city,
        passcountry: dataFromChild.country,
      passjobtitle: dataFromChild.jobtitle,
      passworkphone: dataFromChild.workphone,
      passbiography: dataFromChild.biography,
      passusername: dataFromChild.username,
      maindisplay: 'Edit Profile',
  });
  }

  profileCallback = (dataFromChild) => {
    this.setState({
      passlastname: dataFromChild.lastname,
      passfirstname: dataFromChild.firstname,
          passcity: dataFromChild.city,
        passcountry: dataFromChild.country,
      passjobtitle: dataFromChild.jobtitle,
      passworkphone: dataFromChild.workphone,
      passbiography: dataFromChild.biography,
      passusername: dataFromChild.username,
      maindisplay: 'Profile',
  });
  }

  myCallback = (dataFromChild) => {
    this.setState({maindisplay: dataFromChild})
  }

  programCallback = (dataFromChild) => {
    console.log(dataFromChild);
    this.setState({maindisplay: 'Program',
                   passprogramname: dataFromChild.programname,
                   passprogramid: dataFromChild.programid,
                   passaccesslevel: dataFromChild.accesslevel,
                  })
  }
  

  logoutfunction = () => {
    this.props.logout();
}


  state = {
    maindisplay: '',
    lastname: '',
    firstname: '',
    jobtitle: '',
    workphone: '',
    country: '',
    city: '',
    username: '',
    biography: '',
    passmaindisplay: '',
    passlastname: '',
    passfirstname: '',
    passjobtitle: '',
    passworkphone: '',
    passcountry: '',
    passcity: '',
    passusername: '',
    passbiograpy: '',
    };

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
                    username: response.entity.PersonalInformation.username

        });
      });
    }

    componentDidMount() {
      this.getrequest();
    }

handleClick(itemSelected){
  // console.log('ItemSelected');
  // console.log(itemSelected);
  this.setState({
    maindisplay: itemSelected,
  }) 
  // console.log('maindisplay: ');
  // console.log(this.state.maindisplay);
};

render() {
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div style={{ width: '100%' }}>
          <div style={{ float: 'left', height: '40px', verticalAlign: 'middle'}}>
          <div className={this.props.classes.titlebar}>
            Welcome to Acme, {this.state.firstname} {this.state.lastname}. Logged in as: {this.state.username}
          </div>
          </div>
          <div style={{ float: 'right' }}>
          <div style={{ textAlign: 'right' }}>
          <Button variant="contained" className={classes.rightIcon} color="secondary" onClick={this.logoutfunction}>Log Out  <Backspace/> </Button>
          </div>
          </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.iconbar}>
        <img src='./images/acme.png' alt="acmelogo" />
        </div>
        <Divider />
        <List>
        {['Search', 'My Team', 'My Profile', 'My Programs'].map((text, index) => (

            <ListItem button key={text} className={classes.listItem} onClick={() => { this.handleClick(text)}}>
              <ListItemIcon>{index === 0 ? <SearchIcon /> : index === 1 ? <GroupIcon /> : index === 2 ? <PersonIcon /> : index === 3 ? <DeveloperBoardIcon /> : <MailIcon /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button key='Request Access' className={classes.listItem} onClick={() => {this.handleClick('Request Access')}}>
              <ListItemIcon><BallotIcon /></ListItemIcon>
              <ListItemText primary='Request Access' />
            </ListItem>
            <ListItem button key='Review Requests' className={classes.listItem} >
              <ListItemIcon><ThumbsUpDownIcon /></ListItemIcon>
              <ListItemText primary='Review Requests' secondary={"Requests: (1)"}/>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.state.maindisplay === 'Search' && <SearchTabs loginuser={this.props.loginuser} callbackFromParent={this.profileCallback}/>
        }{this.state.maindisplay === 'My Team' && <myTeam loginuser={this.props.loginuser} callbackFromParent={this.profileCallback}/>
        }{this.state.maindisplay === 'My Profile' && <MyProfile loginuser={this.props.loginuser} callbackFromParent={this.editProfileCallback}/>
        }{this.state.maindisplay === 'My Programs' && <MyPrograms loginuser={this.props.loginuser} callbackFromParent={this.programCallback}/>
        }{this.state.maindisplay === 'Edit Profile' && <EditProfile loginuser={this.props.loginuser} 
                                                           callbackFromParent={this.myCallback}
                                                           lastname={this.state.passlastname}
                                                           firstname={this.state.passfirstname}
                                                           city={this.state.passcity}
                                                           country={this.state.passcountry}
                                                           username={this.state.passusername}
                                                           biography={this.state.passbiography}
                                                           jobtitle={this.state.passjobtitle}
                                                           workphone={this.state.passworkphone}
                                                           />
        }{this.state.maindisplay === 'Profile' && <Profile loginuser={this.props.loginuser} 
                                                           callbackFromParent={this.editProfileCallback}
                                                           lastname={this.state.passlastname}
                                                           firstname={this.state.passfirstname}
                                                           city={this.state.passcity}
                                                           country={this.state.passcountry}
                                                           username={this.state.passusername}
                                                           biography={this.state.passbiography}
                                                           jobtitle={this.state.passjobtitle}
                                                           workphone={this.state.passworkphone}
                                                           /> // && console.log("permdrawleft state.passbiography" + this.state.passbiography)
      }{this.state.maindisplay === 'Program' && "PlaceHolder; Currently Loading [pretending to load] program " + this.state.passprogramname + " with program id of " + this.state.passprogramid + " at access level of: " + this.state.passaccesslevel + "."
      }{this.state.maindisplay === 'Request Access' && <RequestAccess loginuser={this.props.loginuser} />
    }
      </main>
    </div>
  );
}
}
PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);