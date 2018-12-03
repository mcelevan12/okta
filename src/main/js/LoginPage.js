import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import EmployeeList from './EmployeeList';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';  
import Security from '@material-ui/icons/Security';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';



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


class LoginPage extends React.Component {
  
functionname = () => {
// Sending and receiving data in JSON format using POST method
//
var xhr = new XMLHttpRequest();
var url = "/api/login";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.loginuser + ", " + json.loginpw);
    }
};
var data = JSON.stringify({"loginuser": this.state.loginuser, "firstname": this.state.loginpw});
xhr.send(data);
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
    loginuser: '',
    loginpw: '',
  };

  loginfunction = () => {
      this.props.LoginCallback(this.state.loginuser);
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
        <CardContent>
          <form className={classes.container} noValidate autoComplete="off">
          <TextField
          id="login-user"
          label="User"
          type="text"
          className={classes.textField}
          value={this.state.loginuser}
          onChange={this.handleChange('loginuser')}
          margin="normal"
        /> 
        <TextField
        id="login-pw"
        label="Password"
        type="password"
        className={classes.textField}
        value={this.state.loginpw}
        onChange={this.handleChange('loginpw')}
        margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={this.loginfunction}>
        <Security className={classes.leftIcon} />
          Log In!
        </Button>
        </form>
        </CardContent>
      </Card>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);