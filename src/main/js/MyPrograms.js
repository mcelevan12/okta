import React from 'react';
import PropTypes from 'prop-types';
import client from './client';
import Card from '@material-ui/core/Card';
import ProgramList from './ProgramList';

class MyPrograms extends React.Component {

  state = { programlist: []
  }

  get(){
		client({method: 'GET', path:'/api/myprograms/' + this.props.loginuser}).done(response => {
      console.log(response.entity)
      this.setState({programlist: response.entity
      });
    });
  };
    
  componentDidMount() {
    this.get();
  }

  render() {
    return (
      <Card>
        <ProgramList programlist={this.state.programlist} callbackFromParent={this.props.callbackFromParent}/>
      </Card>
    );
  }
}

export default MyPrograms;