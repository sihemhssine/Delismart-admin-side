import React from 'react';   
import { UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../../../actions/Product';
import List from '@material-ui/core/List';
import {Modal, ModalHeader} from 'reactstrap';
import Button from '@material-ui/core/Button';
 import IconButton from '@material-ui/core/IconButton';
 import CloseIcon from '@material-ui/icons/Close';
 import ProductEditForm from './ProductEditForm'; 
 var input = navigator.onLine ? true : false;

class ProductList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        openModel: false , 
        product: null,  
        isReduced : false 
        }; 
     }
  
    setModal= ()=>{
        this.setState({openModel: true }) ; 
    }
    componentDidMount(){
    }
    
    
    render() {
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
        if (!this.props.products.length){
            return (
                <div>
                    Sorry, No product found
              </div>
            )
        }
        return(
        <div>
        <List>

 {this.props.products.map((product) => (
//to avoir error : each child must have key. 
    <span key = {product._id}> 
    <div className="card product-item-vertical " >
    <div className="row d-flex align-items-sm-center">
        <div className="col-xl-3 col-lg-4 col-md-3 col-12">
            <div className="card-header border-0 p-0">
                <div className="card-image">
                    <div className="grid-thumb-equal">
                        <a className="grid-thumb-cover" href="javascript:void(0)">
                            <img className="img-fluid" src={product.img}  />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-xl-6 col-lg-5 col-md-6 col-12">
            <div className="card-body">
                <div className="product-details">
                    <h3 className="card-title fw-regular">{product.label}
                        <small className="text-grey text-darken-2">{', ' + product.color}</small>
                    </h3>
                    {product.reduction !== "" && product.reduction !==0 ? <div className="d-flex ">
                        <h3 className="card-title">{product.pricettc - (product.pricettc * product.reduction )/100} € </h3>
                        <h5 className="text-muted px-2">
                            <del>{product.pricettc }</del>
                        </h5> 
                        <h5 className="text-success">{product.reduction}%off</h5>
                    </div> : 
                     <div className="d-flex ">
                        <h3 className="card-title">{ product.pricettc } € </h3>
                     </div> }
               
                      <div className="d-flex ">
                        <h3 className="card-title">{product.quantity} <small className="text-grey text-darken-2"> Stored pieces</small>
                        </h3>
                  </div>

                    <p>{product.description}</p>
                </div>
            </div>
        </div>  
        <div className="col-xl-3 col-lg-3 col-md-3 col-12">
            <div className="card-footer border-0 text-center bg-white">
                <div className="cart-btn mb-2">
                    <Button  className="bg-primary text-white"  onClick={() => { this.props.onDelete(product._id); 
                 this.deletePhotoUploads(product.img);    }} >  Delete </Button>
                </div>
                <div className="cart-btn mb-2">
                    <Button   className="bg-primary text-white" onClick={()=>{ this.setState({openModel: true , product: {product}})}}>  Update </Button>
                </div>
        </div>
        </div>
    </div>
</div>
</span>
))}
 </List>
 <Modal className="modal-box"  isOpen= {this.state.openModel}>
        <ModalHeader className="modal-box-header bg-primary">
        <label>  Updating product  </label>
            <IconButton className="text-white" onClick={()=>{ this.setState({openModel: false  })}}>
            <CloseIcon/>
            </IconButton>
        </ModalHeader>

        <div className="modal-box-content">
           
           <ProductEditForm  product={ this.state.product} />  
         </div>                 
    </Modal> 
  </div>
    )}
}

const updateProduct = ()=>{
    this.setState({openModel: true}) 
}
const mapStateToProps = state => {
     return {
        products: state.products 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteProduct(id));
        }
    }
};

export default  
connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
