import React from 'react';
import { connect } from 'react-redux';
import Product from '../components/Product/Product';
import { deleteProduct } from '../actions/Product';
function ProductList({ products, onDelete }) {
  if (!products.length) {
    return (
      <div>
        No Product
      </div>
    )
  }

  return (
    <div>
      {products.map(product => {
        return (
          <Product product={product} onDelete={onDelete} key={product._id} />
        );
      })}
    </div>
  );
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);