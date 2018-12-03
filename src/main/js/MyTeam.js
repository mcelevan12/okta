import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import client from './client';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MailIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import EmployeeList from './EmployeeList';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class MyTeam extends React.Component {

  state = { employeelist: []
  }

  get(){
		client({method: 'GET', path:'/api/myteam/' + this.props.loginuser}).done(response => {
      console.log(response.entity)
      this.setState({employeelist: response.entity
      });
    });
  };
    
    
  componentDidMount() {
    this.get();
  }

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <EmployeeList employeelist={this.state.employeelist} callbackFromParent={this.props.callbackFromParent}/>
      </Card>
    );
  }
}

MyTeam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTeam);