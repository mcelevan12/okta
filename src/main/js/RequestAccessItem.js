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

function RequestAccess(props) {

    //doesnt 100% work

    //GET list of programs

   state = {
    programlist: [],
    currentProgram: '',
    accesslevel: '',
   }

    return (
        <div>
            {
                this.state.employeelist.map(value => (
                <RequestAccessItem programname={value.programname} accesslevel={value.accesslevel}/>
            )
            )
            }
        </div>
    );
  }

export default (RequestAccess);