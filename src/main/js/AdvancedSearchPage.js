import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import client from './client';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import EmployeeList from './EmployeeList';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class SearchFields extends React.Component {


searchfunction = () => {
  
  var combinedterms = this.combineterms();
  console.log("combinedterms: " + combinedterms);
  // var searchPOST = new XMLHttpRequest();
  // searchPOST.open('POST', '/api/searchemployee/', true);
  // searchPOST.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  // var data = JSON.stringify({"SearchTerms": {"lastName": this.state.lastname, "firstName": this.state.firstname, "city": this.state.city, "username": this.state.username}});
  // console.log(data);
  // searchPOST.send(data);
  client({method: 'GET', path: '/acme/api/searchemployee/' + combinedterms}).done(response => {
        console.log(response.entity);
    		this.setState({employeelist: response.entity});
    	});

};

  // componentDidMount() {
	// 	client({method: 'GET', path: '/api/employees'}).done(response => {
	// 		this.setState({employeelist: response.entity._embedded.employees});
	// 	});
  // }

  /*

  
  //               key={value.PersonalInformation.username} 
  //               lastname={value.PersonalInformation.lastName} 
  //               firstname={value.PersonalInformation.firstName} 
  //               city={value.PersonalInformation.city} 
  //               country={value.PersonalInformation.country}
  //               username={value.PersonalInformation.username}
  //               bio={value.PersonalInformation.biography}
  //               jobtitle={value.PersonalInformation.jobTitle}
  //               workphone={value.PersonalInformation.workPhoneNumber}
  */
  
  state = {
    lastname: '',
    firstname: '',
    city: '',
    country: '',
    username: '',
    jobtitle: '',
    workphone: '',
    employeelist: [],
    // combinedsearchterms: '',
  };

  combineterms = () => {
    var combineterms = '';
    if (this.state.lastname != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" + this.state.lastname;
    }
    if (this.state.firstname != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" + this.state.firstname;
    }
    if (this.state.country != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" +  this.state.country;
    }
    if (this.state.username != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" +  this.state.username;
    }
    if (this.state.jobtitle != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" +  this.state.jobtitle;
    }
    if (this.state.workphone != '' && this.state.lastname != null) {
      combineterms = combineterms + "+" +  this.state.workphone;
    }
    combineterms = combineterms.substr(1, combineterms.length)
    console.log('combineterms: ' + combineterms)
    // this.setState({
      // combinedsearchterms: combineterms,
    // })
    return(combineterms);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // updatesearch(){
  // this.combineterms();
  // console.log("this.combinedsearchterms: " + this.state.combinedsearchterms);
  // }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
          id="standard-firstname"
          label="First Name"
          type="search"
          className={classes.textField}
          value={this.state.firstname}
          onChange={this.handleChange('firstname')}
          margin="normal"
        />
        <TextField
          id="standard-lastname"
          label="Last Name"
          type="search"
          className={classes.textField}
          value={this.state.lastname}
          onChange={this.handleChange('lastname')}
          margin="normal"
        />
        <TextField
          id="standard-country"
          label="Country"
          type="search"
          className={classes.textField}
          value={this.state.country}
          onChange={this.handleChange('country')}
          margin="normal"
        />
        <TextField
          id="standard-jobtitle"
          label="Job Title"
          type="search"
          className={classes.textField}
          value={this.state.jobtitle}
          onChange={this.handleChange('jobtitle')} /* TODO: REPLACE THIS WITH DROPDOWN */
          margin="normal"
        />
        <TextField
          id="standard-city"
          label="City"
          type="search"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          margin="normal"
        />
        <TextField
          id="standard-usernamesearch"
          label="Username"
          type="search"
          className={classes.textField}
          margin="normal"
          value={this.state.username}
          onChange={this.handleChange('username')}
        />
        <TextField
          id="standard-workphone"
          label="Phone Number"
          type="search"
          className={classes.workphone}
          margin="normal"
          value={this.state.workphone}
          onChange={this.handleChange('workphone')}
        />
      <Button variant="contained" color="primary" className={classes.button} onClick={this.searchfunction}  style={{height: '40px'}}>
      <SearchIcon className={classes.leftIcon} />
        Search
      </Button>
      </form>
      {this.state.employeelist != [] &&
      <EmployeeList employeelist={this.state.employeelist}/>
      }
      </div>
    );
  }
}

SearchFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchFields);