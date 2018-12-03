import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  link: {
    color: black,
    textDecoration: none, /* no underline */
    backgroundColor: none,
  },
});

class ProfileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'profile-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
         <MoreVertIcon />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        
            <MenuItem onClick={this.handleClose }>
            <div className="link">
            <a href={"mailto:" + this.props.username + "@acme.org"}>
            <MailIcon style={{verticalAlign: "bottom"}}/> Send an Email</a></div>
            </MenuItem>
            {this.props.loginuser === this.props.username &&
          <MenuItem onClick={this.handleClose && this.props.editprofile}><EditIcon /> Edit Profile</MenuItem>}
          {/* <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}

          
        </Menu>
      </div>
    );
  }
}

export default ProfileMenu;