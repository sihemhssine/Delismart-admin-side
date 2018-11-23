import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { deleteUser , editUser} from '../../../../../actions/User';
import {UncontrolledAlert} from 'reactstrap';
import moment from 'moment'; 
 const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

var input = navigator.onLine ? true : false ;
class UserList extends React.Component { 
constructor(props){
    super(props); 
    this.state= {
        status : false ,
        confirmBtn : "Confirm"
    }

}


    render(){
        if( input === false ) {
      return(
              <div>
                <UncontrolledAlert className="alert-addon-card bg-dark bg-dark text-white shadow-lg">
                    <span className="icon-addon alert-addon">
                        <i className="zmdi zmdi-wifi zmdi-hc-fw zmdi-hc-lg" />
                    </span>
                    <span className="d-inline-block">No Network connection or failed to connect  — check it out!</span>
                </UncontrolledAlert>
              </div>
            )   
             }
                if(!this.props.users.length) {
                    return (
                      <div> 
            
                     Sorry, No user found 
                      </div>
                    )
                  }
        return (
        <Paper  >
                    <Table  >
                        <TableHead>
                            <TableRow>
        
                    <CustomTableCell>Full Name </CustomTableCell>
                    <CustomTableCell>Country </CustomTableCell>
                    <CustomTableCell numeric>Address </CustomTableCell>
                    <CustomTableCell numeric>Tel </CustomTableCell>
                    <CustomTableCell numeric> Email</CustomTableCell>
                    <CustomTableCell >Enrolment date </CustomTableCell>
                    <CustomTableCell > Confirm Subscription </CustomTableCell>
                
                </TableRow>
            </TableHead>
            <TableBody>
                {this.props.users.map(user => {
                   return (
                        <TableRow  key={user._id}>
                            <CustomTableCell>{user.fullname}</CustomTableCell>
                            <CustomTableCell>{ user.country }</CustomTableCell>                                
                            <CustomTableCell>{user.addr}</CustomTableCell>
                            <CustomTableCell numeric>{user.tel}</CustomTableCell>
                            <CustomTableCell>{ user.email }</CustomTableCell>
                            <CustomTableCell>{ moment(user.enrolmentdate).format('LL') }</CustomTableCell>
                            <CustomTableCell>
                            {user.status 
                            ?<p> Confirmed</p>
                            : <button  onClick={ ()=> {
                            this.props.onEdit( user); this.setState({confirmBtn: "Confirmed"}) 
                            }}>  {this.state.confirmBtn} </button>
                           }
                            </CustomTableCell> 
                            <CustomTableCell> <button  onClick={() => this.props.onDelete(user._id)}> delete </button></CustomTableCell>
                    </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </Paper>
            );
    }
 
}
  
const mapStateToProps = state => {
    return {
      users: state.users
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onDelete: id => { 
        dispatch(deleteUser(id));
      }, 
      onEdit:   user  => {
        dispatch(editUser(user._id, user))
     }
    };
  };
   

  export default compose(
    withStyles(styles, { name: 'UserList' }),
    connect(
        mapStateToProps,
        mapDispatchToProps
      )  )(UserList);
