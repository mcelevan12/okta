import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import EmployeeListItem from './EmployeeListItem';
import List from '@material-ui/core/List';
import fetch from 'whatwg-fetch'

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


class EmployeeList extends React.Component {

  // getDefaultProps() {
  //   return {
  //     employeelist:[]
  //   };
  // }

  static defaultProps = {
    employeelist: [],
  }
  
	constructor(props) {
    super(props);
    // defaultprops
		// this.state = {
    //   employeelist: [
    //   {
    //     lastname: 'Devito',
    //     firstname: 'Danny',
    //     city: 'New York',
    //     username: 'trashman'
    //   },
    //   {
    //     lastname: 'Hoskins',
    //     firstname: 'Bob',
    //     city: 'New York',
    //     username: 'bobhoskins'
    //   },
    //   {
    //     lastname: 'Hopper',
    //     firstname: 'Dennis',
    //     city: 'Los Angeles',
    //     username: 'thehopper'
    //   }
  
    // ]
    // };
  }
  
  // loadFromServer(pageSize) {
  //   follow(client, root, [
  //     {rel: 'employees', params: {size: pageSize}}]
  //   ).then(employeeCollection => {
  //     return client({
  //       method: 'GET',
  //       path: employeeCollection.entity._links.profile.href,
  //       headers: {'Accept': 'application/schema+json'}
  //     }).then(schema => {
  //       this.schema = schema.entity;
  //       return employeeCollection;
  //     });
  //   }).done(employeeCollection => {
  //     this.setState({
  //       employees: employeeCollection.entity._embedded.employees,
  //       attributes: Object.keys(this.schema.properties),
  //       pageSize: pageSize,
  //       links: employeeCollection.entity._links});
  //   });
  // }

  // fetch('./api/employees', {
  //   method: 'GET',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     firstParam: 'yourValue',
  //     secondParam: 'yourOtherValue',
  //   })
  // })
  
  //  componentDidMount() {
	//  	client({method: 'GET', path: './api/employees'}).done(response => {
	//  		this.setState({employeelist: response.entity._embedded.employees});
  //   });
  //  }

  render() {
    const { classes } = this.props;


    // PersonalInformation:
        // biography: "Director for the honors program and literally the best."
        // city: "Los Angeles"
        // country: "USA"
        // firstName: "Snyder"
        // jobTitle: "Accounting Intern"
        // lastName: "James"
        // profilePicture: "C:\\Administrator\Pictures\ProfilePictures\djsnydes.jpeg"
        // username: "djsnydes"
        // workPhoneNumber: "23423454828"
    

    return (
      <List>
        {
          this.props.employeelist.map(value => (
          <EmployeeListItem 
                key={value.PersonalInformation.username} 
                lastname={value.PersonalInformation.lastName} 
                firstname={value.PersonalInformation.firstName} 
                city={value.PersonalInformation.city} 
                country={value.PersonalInformation.country}
                username={value.PersonalInformation.username}
                biography={value.PersonalInformation.biography}
                jobtitle={value.PersonalInformation.jobTitle}
                workphone={value.PersonalInformation.workPhoneNumber}
                callbackFromParent={this.props.callbackFromParent}
                />
        )
        )
        }
      </List>
    );
  }
}

EmployeeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeList);