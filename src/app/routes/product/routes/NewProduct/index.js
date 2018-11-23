import { connect } from 'react-redux';
import { createProduct } from '../../../../../actions/Product';
import NewProduct from '../../../../../components/Product/NewProduct';
///components/product/NewProduct 
const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: product => {
      dispatch(createProduct( product ));
    }
  };
};
  
export default connect(
  null,
  mapDispatchToProps
)(NewProduct);  