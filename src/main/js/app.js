'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const Nest = require ('./nest').default;
const PermanentDrawerLeft = require ('./PermanentDrawerLeft').default;

// import Nest from './nest';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';

const muiTheme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: yellow,
  }
});
// end::vars[]


// tag::app[]
class App extends React.Component {
  state = {
    loginstatus: true,
    loginuser: 'djsnydes',
  };

// //[[${#httpServletRequest.remoteuser}]] 
//   componentDidMount () {

//     this.setState({loginuser:  '${httpServletRequest.remoteuser}' })
//   }


  // componentDidMount() {
	// 	client({method: 'GET', path: '/api/username'}).done(response => {
	// 		this.setState({loginuser: response.entity});
  //  });
  // }
  
  // LoginCallback = (dataFromChild) => {
  //   this.setState({loginuser: dataFromChild});
  //   this.setState({loginstatus: true});
  // }

  // logoutCallback = () => {
  //   this.setState({loginstatus: false})
  //   this.setState({loginuser: ''})
  // }

	render() {
		return (
      <Card style={{width: "100%", height: "100%",}}>
        <CardContent>
          <MuiThemeProvider theme={muiTheme}>          
          <div> {this.state.loginUser} </div>
          {this.state.loggedout == true && 
            <Typography style={{aligncontent: "center"}}> Logged out. Thank you for using Acme.  </Typography>
          } 
          {this.state.loginstatus == false && 
            <LoginPage style={{aligncontent: "center"}} LoginCallback={this.LoginCallback} />
          }
          {this.state.loginstatus == true &&
            <PermanentDrawerLeft loginuser={this.state.loginuser} logout={this.logoutCallback}/>
          }
          </MuiThemeProvider>
        </CardContent>
      </Card>
		);
	}
}
// end::app[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
