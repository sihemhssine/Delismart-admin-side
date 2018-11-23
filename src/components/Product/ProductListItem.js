import React from 'react';
import Button from '@material-ui/core/Button';
 import IntlMessages from 'util/IntlMessages';
import { connect } from 'react-redux';

const ProductListItem = ({product, onDelete}) => {
    const {  label, description, category, pricettc, tva, expdate, proddate, unity, color, reduction } = product;
    return (
        <div className="card product-item-vertical hoverable animation flipInX">
            <div className="row d-flex align-items-sm-center">
                <div className="col-xl-3 col-lg-4 col-md-3 col-12">
                    <div className="card-header border-0 p-0">
                        <div className="card-image">
                            <div className="grid-thumb-equal">
                                <a className="grid-thumb-cover" href="javascript:void(0)">
                                    <img className="img-fluid" src={`uploads/${product.img}`}  />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-lg-5 col-md-6 col-12">
                    <div className="card-body">
                        <div className="product-details">
                            <h3 className="card-title fw-regular">{label}
                                <small className="text-grey text-darken-2">{', ' + color}</small>
                            </h3>
                            <div className="d-flex ">
                                <h3 className="card-title">{pricettc} </h3>
                                <h5 className="text-muted px-2">
                                    <del>{pricettc }</del>
                                </h5>
                                <h5 className="text-success">{reduction} off</h5>
                            </div>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-3 col-12">
                    <div className="card-footer border-0 text-center bg-white">
                        <div className="cart-btn mb-2">
                            <Button variant="raised" className="bg-primary text-white"  onClick={() => onDelete(product._id)} >  Delete </Button>
                        </div>

                        <Button color="primary"><IntlMessages id="eCommerce.readMore"/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
};
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
    };
};

 

export default  
connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListItem);
