import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import EmployeeList from './EmployeeList';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class EmployeeListItem extends React.Component {
  state = {
      lastname: 'Devito',
      firstname: 'Danny',
      city: 'Philadelphia',
      username: 'Trashman',
  };

  // handleToggle = value => () => {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked,
  //   });
  // };

  render() {
    const { classes } = this.props;



    return (

            <ListItem dense button>
              <Avatar alt="DannyDevito" src={"/images/" + {username} + ".jpg"}/>
              <ListItemText primary="trashman" />
            </ListItem>
    );
  }
}

{/* <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(value)}
                  checked={this.state.checked.indexOf(value) !== -1}
                />
  </ListItemSecondaryAction> */}

EmployeeListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeListItem);