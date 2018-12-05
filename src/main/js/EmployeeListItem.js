import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import EmployeeList from './EmployeeList';

function EmployeeListItem(props) {

  // <EmployeeListItem 
  //               key={value.PersonalInformation.username} 
  //               lastname={value.PersonalInformation.lastName} 
  //               firstname={value.PersonalInformation.firstName} 
  //               city={value.PersonalInformation.city} 
  //               country={value.PersonalInformation.country}
  //               username={value.PersonalInformation.username}
  //               bio={value.PersonalInformation.biography}
  //               jobtitle={value.PersonalInformation.jobTitle}
  //               workphone={value.PersonalInformation.workPhoneNumber}
  //               />

  var callbackWithProps = () => {
    props.callbackFromParent({
      lastname: props.lastname,
      firstname: props.firstname,
      city: props.city,
      country: props.country,
      username: props.username,
      biography: props.biography,
      jobtitle: props.jobtitle,
      workphone: props.workphone,
    })
  };
 
    return (

            <ListItem dense button onClick={callbackWithProps}>
              <Avatar alt={props.username} src={"/images/" + props.username + ".png"}  imgProps={{ onError: (e) => { e.target.src = "./images/DEFAULT.png"}}}/>
              <ListItemText primary={props.firstname + " " + props.lastname + ", Username: " + props.username} secondary={props.jobtitle + " at the " + 
              props.city + " office in " + props.country}/>
            </ListItem>
    );
  }

export default (EmployeeListItem);