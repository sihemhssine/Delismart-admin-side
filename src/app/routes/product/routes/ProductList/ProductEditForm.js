import React from 'react';
import { connect } from 'react-redux';
import { editProduct } from '../../../../../actions/Product';

 
  export  class ProductEditForm extends React.Component {
  constructor(props) {
    super(props);
     this.state = { 
      product: props.product.product, 
      label : props.product.product.label, 
      description: props.product.product.description, 
      color: props.product.product.color, 
      TVA: props.product.product.TVA, 
      quatity: props.product.product.quantity, 
      reduction: props.product.product.reduction, 
      pricettc: props.product.product.pricettc
    };
  }  

  onSubmit = (product) => {
    var product = this.state.product;
    product.label = this.state.label;
    product.description = this.state.description;
    product.color= this.state.color; 
    product.TVA= this.state.TVA; 
    product.quantity= this.state.quatity;    
    product.reduction= this.state.reduction; 
    product.pricettc= this.state.pricettc; 
    this.setState({
      product:product
    },()=>{
      this.props.editProduct(
        this.state.product._id, 
        this.state.product 
      ); 
    }) 
  };
  render() {
    return ( 
          <div style={{ justifyContent: 'center' }}>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
        Name:  <input
             className="form-control"
             type="text"
             value= {this.state.label} 
             onChange={(e)=>{
               this.setState({
                 label:e.target.value
               })
             }} 
            /> 
        Description:   <input
             className="form-control"
              type="text"
             value= {this.state.description}
             onChange={(e)=>{
               this.setState({
                 description:e.target.value
               })
             }}/>
             Color:
             <input
             className="form-control"
              type="text"
             value= {this.state.color}
             onChange={(e)=>{
               this.setState({
                 color:e.target.value
               })
             }}/>

             TVA: 
              <input
             className="form-control"
              type="text"
             value= {this.state.TVA}
             onChange={(e)=>{
               this.setState({
                TVA:e.target.value
               })
             }}/>
             Quantity: 
            <input
             className="form-control"
              type="number"
             value= {this.state.quatity}
             onChange={(e)=>{
               this.setState({
                 quantity:e.target.value
               })
             }}/>
            Reduction   
           <input
             className="form-control"
              type="number"
             value= {this.state.reduction}
             onChange={(e)=>{
               this.setState({
                 reduction:e.target.value
               })
             }}/>
             PriceTTC
             <input
             className="form-control"
              type="number"
             value= {this.state.pricettc}
             onChange={(e)=>{
               this.setState({
                 pricettc:e.target.value
               })
             }}/>

             <div className="form-group" style={{ justifyContent: 'center' }} >
             <button type="submit"   className="btn btn-primary">Save edits </button>
           </div> 
           </div>
        </form>
      </div>  
       )
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  editProduct:(id) => {
    dispatch(editProduct(id, props.product))
 }
});

export default  
connect(
    null,
    mapDispatchToProps
)(ProductEditForm);



