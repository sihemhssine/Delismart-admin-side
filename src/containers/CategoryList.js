import React from 'react';
import { connect } from 'react-redux';
import Category from '../components/Category/Category';
import { deleteCategory } from '../actions/Category';
   
function CategoryList({ categories, onDelete }) {
  if (!categories.length) {
    return (
      <div>
        No Category
      </div>
    )
  }


  return (
    <div>
      {categories.map(category => {
        return (
          <Category category={category} onDelete={onDelete} key={category._id} />
        );
      })}
    </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);