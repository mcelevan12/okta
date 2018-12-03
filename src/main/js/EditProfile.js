import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import client from './client';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import EmployeeList from './EmployeeList';
import EditIcon from '@material-ui/icons/Edit';

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


class EditProfile extends React.Component {


  state = { lastname: '',
            firstname: '',
            jobtitle: '',
            workphone: '',
            country: '',
            city: '',
            username: '',
            biography: '',}

  

  componentDidMount() {
		this.setState({
      lastname: this.props.lastname,
      firstname: this.props.firstname,
      city: this.props.city,
      country: this.props.country,
      username: this.props.username,
      jobtitle: this.props.jobtitle,
      biography: this.props.biography,
      workphone: this.props.workphone,
    })
  }
  
editfunction = () => {
  var editPOST = new XMLHttpRequest();
  editPOST.open('POST', '/api/myprofile/' + this.state.username, true);
  editPOST.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  var data = JSON.stringify({"PersonalInformation": {"biography": this.state.biography, "jobTitle": this.state.jobtitle, "workPhoneNumber": this.state.workphone, "lastName": this.state.lastname, "firstName": this.state.firstname, "city": this.state.city, "country": this.state.country, "username": this.state.username}});
    console.log(data);
  editPOST.send(data);
  this.props.callbackFromParent("My Profile")
};

 
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card>
      <div>
      {this.props.loginuser === this.props.username &&
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
          id="standard-firstname"
          label="First Name"
          className={classes.textField}
          value={this.state.firstname}
          onChange={this.handleChange('firstname')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="standard-lastname"
          label="Last Name"
          className={classes.textField}
          value={this.state.lastname}
          onChange={this.handleChange('lastname')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled
          id="standard-city"
          label="City"
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')} //TODO: DROPDOWN
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled
          id="standard-country"
          label="Country"
          className={classes.textField}
          value={this.state.country} //TODO: MAP DIRECTly WITH CITY
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled
          multiline
          id="standard-jobtitle"
          label="Job Title"
          className={classes.textField}
          value={this.state.jobtitle}
          margin="normal"
          variant="outlined"
        />
        <TextField
          multiline
          id="standard-biography"
          label="Biography"
          className={classes.textField}
          value={this.state.biography}
          margin="normal"
          variant="outlined"
        />
        <TextField
          disabled
          id="standard-username"
          variant="outlined"
          label="Username"
          className={classes.textField}
          margin="normal"
          value={this.state.username}
        />
        <TextField
          id="standard-workphone"
          label="Phone Number"
          className={classes.workphone}
          margin="normal"
          value={this.state.workphone}
          onChange={this.handleChange('workphone')}
          variant="outlined"
        />
      <Button variant="contained" color="primary" className={classes.button} onClick={this.editfunction} style={{height: '40px'}}>
      <EditIcon className={classes.leftIcon} />
        Update Info!
      </Button>
      </form>
      }
      {this.props.loginuser != this.props.username &&
      "SOMETHING Else HAS BROKEN TERRIBLY"
      }
      {this.props.loginuser != this.state.username &&
      "SOMETHING HAS BROKEN TERRIBLY"
      }
      </div>
      </Card>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProfile);