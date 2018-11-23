import React from 'react'; 
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { deleteCategory } from '../../../../../actions/Category';
import { UncontrolledAlert } from 'reactstrap';
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

var input = navigator.onLine ? true : false;
function CategoryList({ categories, onDelete }) {

    if (input === false) {

        return (
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
    if (!categories.length) {
        return (
            <div>
                Sorry, No category found
       
          </div>
        )
    }
    return (

        <Paper  >
            <Table  >
                <TableHead>
                    <TableRow>
                        <CustomTableCell>name  </CustomTableCell>
                        <CustomTableCell> description  </CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map(category => {
                        return (
                            <TableRow key={category._id}>
                                <CustomTableCell>{category.name}</CustomTableCell>
                                <CustomTableCell>{category.description}</CustomTableCell>
                                <CustomTableCell> <button onClick={() => onDelete(category._id)}> delete </button></CustomTableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}




const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteCategory(id));
        }
    };
};


export default compose(
    withStyles(styles, { name: 'CategoryList' }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(CategoryList);
