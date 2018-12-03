import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card'
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
    searchblock: '',
    // firstname: '',
    // city: '',
    // country: '',
    // username: '',
    // jobtitle: '',
    // workphone: '',
    employeelist: [],
    searchterms: '',
  };

onclickfunction () {
  this.handleterms();
  this.searchfunction();
}

  
searchfunction = () => {
  
  console.log("handleterms this.state.searchblock" + this.state.searchblock)
  var searchParameters = this.state.searchblock.replace(' ', '+');
  
  if (searchParameters[searchParameters.length-1] == '+'){
    searchParameters = searchParameters.substring(0, searchParameters.length - 1)
  }
  this.setState({searchterms: searchParameters,});
  // var searchPOST = new XMLHttpRequest();
  // searchPOST.open('POST', '/api/searchemployee/', true);
  // searchPOST.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  // var data = JSON.stringify({"SearchTerms": {"lastName": this.state.lastname, "firstName": this.state.firstname, "city": this.state.city, "username": this.state.username}});
  // console.log(data);
  // searchPOST.send(data);
  console.log('searchfunction this.state.searchterms' + this.state.searchterms);
  console.log('searchfunctionsearchParameterss' + searchParameters);
  if (searchParameters != ''){
    client({method: 'GET', path: '/acme/api/searchemployee/' + searchParameters}).done(response => {
          console.log(response.entity);
          this.setState({employeelist: response.entity});
        });
  } else { console.log('SEARCH TERMS ARE EMPTY DO SOMETHING')};
};


  handleterms = () => {
    var searchParameters = ''
    console.log("handleterms this.state.searchblock" + this.state.searchblock)
    var searchParameters = this.state.searchblock.replace(' ', '+');
    for (var i=0; i++; i<searchParameters.length){
      combinedterms = combinedterms + serachParameters[i] + '+'
    }
    if (combinedterms[combinedterms.length-1] == '+'){
      combinedterms = combinedterms.substring(0, combinedterms.length - 1)
    }
    this.setState({searchterms: combinedterms,});
    // if (this.state.lastname != '') {
    //   combineterms = combineterms + this.state.lastname;
    // }
    // if (this.state.firstname != '') {
    //   combineterms = combineterms + "+" + this.state.firstname;
    // }
    // if (this.state.country != '') {
    //   combineterms = combineterms + "+" +  this.state.country;
    // }
    // if (this.state.username != '') {
    //   combineterms = combineterms + "+" +  this.state.username;
    // }
    // if (this.state.jobtitle != '') {
    //   combineterms = combineterms + "+" +  this.state.jobtitle;
    // }
    // if (this.state.workphone != '') {
    //   combineterms = combineterms + "+" +  this.state.workphone;
    // }
    // this.setState({
    //   combinedsearchterms: combineterms,
    // })
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
          id="standard-searchblock"
          label="Search for a User"
          type="search"
          className={classes.textField}
          value={this.state.searchblock}
          onChange={this.handleChange('searchblock')}
          margin="normal"
          style={{float: 'left'}}
        />
      <Button variant="contained" color="primary" className={classes.button} onClick={this.searchfunction} style={{height: '40px'}}>
      <SearchIcon className={classes.leftIcon} />
        Search
      </Button>
      </form>
      {this.state.employeelist != [] &&
      <EmployeeList employeelist={this.state.employeelist} callbackFromParent={this.props.callbackFromParent}/>
      }
      </Card>
    );
  }
}

SearchFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchFields);