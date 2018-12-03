import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import CategoryIcon from '@material-ui/icons/Category';

import amber from '@material-ui/core/colors/amber';

function ProgramListItem(props) {

  // <ProgramListItem 
  //               key={value.EmployeeProgram.username + value.EmployeeProgram.programId + value.EmployeeProgram.accessLevel} 
  //               username={value.EmployeeProgram.username} 
  //               programid={value.EmployeeProgram.programId} 
  //               programname={value.EmployeeProgram.programName} 
  //               accesslevel={value.EmployeeProgram.acessLevel}
  //               callbackFromParent={this.props.callbackFromParent}
  //               />

  var callbackWithProps = () => {
    props.callbackFromParent({
      programid: props.programid,
      programname: props.programname,
      accesslevel: props.accesslevel,
      username: props.username,
    })
  };
 
    return (

            <ListItem dense button onClick={callbackWithProps}>
            {/* src={"/images/" + props.username + ".png"} */}
              <Avatar alt={props.programname} style={{margin: 10, color: '#000', backgroundColor: amber[500],}}>
                <CategoryIcon />
              </Avatar>
              <ListItemText primary={props.programname} secondary={"Access Level for user " + props.username + ": " + props.accesslevel}/>
            </ListItem>
    );
  }

export default (ProgramListItem);