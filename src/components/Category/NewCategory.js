import React from 'react';
  

class NewCategory extends React.Component {  
 
  state = {
  name : '', 
  description : 'ddd', 
  image : ''
    
  };
 
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
 
   };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() && this.state.description.trim()) {
      this.props.onAddCategory(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      name : '', 
      description : '', 
      image : ''
        
    });
  };
  

  render() {
    return (
 
      <div   style={{ justifyContent: 'center'}}>
          <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
              <input
              type="text"
              placeholder="Name"
              className="form-control"
              name="name"
              onChange={ this.handleInputChange }
              value={ this.state.name }
            />
          </div>
       


          <div className="form-group">
            <textarea
              cols="8"
              rows="8"
              placeholder="Description"
              className="form-control"
              name="description"
              onChange={ this.handleInputChange }
              value={ this.state.description  }>
            </textarea>
          </div>
          
            
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Category </button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewCategory ;
 