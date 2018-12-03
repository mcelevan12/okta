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

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';

class RequestAccess extends React.Component {
    //doesnt 100% work

    //GET list of programs

   state = {
    open = false,
    programlist: [],
    currentProgram: '',
    accesslevel: '',
   }

    get(){
        client({method: 'GET', path:'/acme/api/programlist/' + this.props.loginuser}).done(response => {
    console.log(response.entity)
    this.setState({programlist: response.entity
    });
    });
    };

    handleclose() {
        this.setState({open = false})
    }


    componentDidMount() {
    this.get();
    }
    

    
  render() {
    const { classes } = this.props;
    return (
        <div>
            <Menu id="render-props-menu" open={this.state.open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            
            { this.state.programlist.map(value => (
                 <MenuItem onClick={handleClose}>{value.programname}</MenuItem>
            )
            )
            }
            </Menu>
        </div>
    );
  }
}

export default (RequestAccess);