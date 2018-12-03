'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
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

import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import BallotIcon from '@material-ui/icons/Ballot';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';


import MailIcon from '@material-ui/icons/Mail';
const drawerWidth = 240;

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';

const muiTheme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: yellow,
  },    
});

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {				
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },

});
// end::vars[]


// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
		this.page = {pageid};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}

	render() {
		return (
      <div className={styles.root}>
			<EmployeeList employees={this.state.employees}/>  
			
      {/* <CssBaseline /> */}
	  
	<MuiThemeProvider theme={muiTheme}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
            Permanent drawer
        </Toolbar>
      </AppBar>
	</MuiThemeProvider>
      <Drawer
        className={styles.drawer}
        variant="permanent"
        classes={{
          paper: styles.drawerPaper,
        }}
        anchor="left"
      >
	  {/*<div className={styles.toolbar} />*/}
        <Divider />
{/*Search
Request Access
Review Access Requests (1)
My Team
My Profile
My Programs
*/}

	<MuiThemeProvider theme={muiTheme}>
        <List>

            {/* <ListItem button key={text}>
              <ListItemIcon>{listicon}</ListItemIcon>
              <ListItemText primay={text} />
            </ListItem> */}

          {['Search', 'My Team', 'My Profile', 'My Programs'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index === 0 ? <SearchIcon /> : index === 1 ? <GroupIcon /> : index === 2 ? <PersonIcon /> : index === 3 ? <DeveloperBoardIcon /> : <MailIcon /> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            
          ))}
{/*           
            <ListItem button key='Search'>
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary='Search' />
            </ListItem>
            <ListItem button key='My Team'>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary='My Team' />
            </ListItem>
            <ListItem button key='My Profile'>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary='My Profile' />
            </ListItem>
            <ListItem button key='My Programs'>
              <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
              <ListItemText primary='My Programs' />
</ListItem>*/}
        </List>
		</MuiThemeProvider>
        <Divider />
        <List>
          <ListItem button key='Request Access'>
              <ListItemIcon><BallotIcon /></ListItemIcon>
              <ListItemText primary='Request Access' />
            </ListItem>
            <ListItem button key='Review Requests'>
              <ListItemIcon><ThumbsUpDownIcon /></ListItemIcon>
              <ListItemText primary='Review Requests' secondary={"Requests: (1)"}/>
          </ListItem>
          {/* {['Request Access', 'Review Access Requests', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <main className={styles.content}>
		  {/*<div className={styles.toolbar} />*/}
		  
		  {
        
      </main>
    </div>
		)
	}
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}
// end::employee[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
