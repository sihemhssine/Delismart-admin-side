import { connect } from 'react-redux';
import { createCategory } from '../actions';
import NewCategory from '../components/Category/NewCategory';

const mapDispatchToProps = dispatch => {
  return {
    onAddCategory: category => {
      dispatch(createCategory(category));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewCategory);  