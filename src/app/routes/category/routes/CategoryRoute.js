import React, { Component } from 'react';
import NewCategory from './NewCategory';
import CategoryList from './CategoryList/CategoryList';

const stylesApp = {
  marginTop: 40
}

class CategoryRoute extends Component {
  render() {
    return (
      <div>
        <NewCategory />
        <CategoryList />
      </div>
    );
  }
}

export default CategoryRoute;
