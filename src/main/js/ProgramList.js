import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ProgramListItem from './ProgramListItem';
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


class ProgramList extends React.Component {

  // getDefaultProps() {
  //   return {
  //     programlist:[]
  //   };
  // }

  static defaultProps = {
    programlist: [],
  }
  
	constructor(props) {
    super(props);
  }
  
  //  componentDidMount() {
	//  	client({method: 'GET', path: './api/myprograms/' + this.props.username }).done(response => {
	//  		this.setState({programlist: response.entity._embedded.employees});
  //   });
  //  }

  render() {
    const { classes } = this.props;
    return (
      <List>
{/*
[{"EmployeeProgram": {"username":"rko", "programId":"1", "programName":"SPSS", "accessLevel":"Manager"}}]
//Pass as Props to this

*/}


        {
          ///programlist/rko
          this.props.programlist.map(value => (
          <ProgramListItem 
                key={value.EmployeeProgram.username + value.EmployeeProgram.programId + value.EmployeeProgram.accessLevel} 
                username={value.EmployeeProgram.username} 
                programid={value.EmployeeProgram.programId} 
                programname={value.EmployeeProgram.programName} 
                accesslevel={value.EmployeeProgram.accessLevel}
                callbackFromParent={this.props.callbackFromParent}
                />
        )
        )
        }
      </List>
    );
  }
}

ProgramList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgramList);