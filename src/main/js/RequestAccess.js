import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import client from './client';
import TextField from '@material-ui/core/TextField';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));




class RequestAccess extends React.Component {
    
    state = {
        open: false,
        programlist: [],
        currentProgram: '',
        accesslevel: '',
        comment: '',
       }

       
  // / /api/requestaccess/[username]
  // Will post Program name, access level, comment, username
    POSTfunction = () => {
      var editPOST = new XMLHttpRequest();
      editPOST.open('POST', '/api/requestaccess/' + this.state.username, true);
      editPOST.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      var data = JSON.stringify({"RequestAccess": {"programName": this.state.currentProgram, "accessLevel": this.state.accesslevel, "comment": this.state.comment, "username": this.props.loginuser}});
        console.log(data);
      editPOST.send(data);
      this.props.callbackFromParent("My Profile")
    };


    get(){
        client({method: 'GET', path:'/api/programlist/'}).done(response => {
    console.log("THIS IS THE GET " + response.entity)
    this.setState({programlist: response.entity
    });
    });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    
    
    componentDidMount() {
        this.get();
    }
        
    
    
render(){
const { classes } = this.props;
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };

        return (
           <React.Fragment>
            {/* <Button
              aria-owns={open ? 'programName' : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              Open Menu
            </Button>
            <Menu id="programName" anchorEl={anchorEl} open={open} onClose={handleClose}>
            {this.state.programlist != [] &&
                this.state.programlist.map(value => (
                 <MenuItem key={value.ValidProgram.programName + value.ValidProgram.accessLevel}onClick={handleClose}><b>Name: </b> {value.ValidProgram.programName}  <b>Access Level: </b> {value.ValidProgram.accessLevel}</MenuItem>
            ))}
            </Menu> */}
            <TextField
                id="program"
                select
                label="Select"
                // className={classes.textField}
                value={this.state.programname}
                onChange={this.handleChange('programname')}
                // SelectProps={{
                //     MenuProps: {
                //     className: classes.menu,
                //     },
                // }}
                helperText="Please select A Program"
                margin="normal"
                >
                {this.state.programlist.map(value => (
                        <MenuItem key={value.ValidProgram.programName}onClick={handleClose}>{value.ValidProgram.programName}</MenuItem>
                ))}
            </TextField>
            
            <TextField
                id="accessLevel"
                select
                label="Select"
                // className={classes.textField}
                value={this.state.accesslevel}
                onChange={this.handleChange('accesslevel')}
                // SelectProps={{
                //     MenuProps: {
                //     className: classes.menu,
                //     },
                // }}
                helperText="Please select an Access Level"
                margin="normal"
                >
                {this.state.programlist.map(value => (
                        <MenuItem key={value.ValidProgram.accessLevel}onClick={handleClose}>{value.ValidProgram.accessLevel}</MenuItem>
                ))}
            </TextField>
            <TextField
                multiline
                id="standard-comment"
                label="Comment"
                // className={classes.textField}
                value={this.state.comment}
                margin="normal"
                variant="outlined"
                />

          </React.Fragment>
        );
      }}
    </WithState>
  );
    }
}

export default RequestAccess;