import React from 'react';
 import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UncontrolledAlert} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';   
 
 
var uuid = require('uuid');
const apiUrl = 'http://localhost:4000/products';

class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log('rrr',  this.props.categories); 
   }
  proddate  = moment().format('LL');
  expdate  = moment().format('LL');

  state = { 
    selectC: 'select', 
    label: '',
    description: '',
    category:  {},
    img:'',
    weight: '',
    TVA: '',
    pricettc: '',
    tva: '',
    proddate:  moment(),
    expdate:  moment(),
    unity: '',
    reduction: '',
    color: '', 
    quantity:'', 
    open: false, 
    message: '', 
    title: 'Entries verification', 
    success: false 
  };
  
  handleRequestClose = () => {
    this.setState({open: false});
  }; 

  handleChangeProdDate= (date) => {
    this.setState({
      proddate: date
    });
  }
  
  handleChangeExpDate= (date)=>  {
    this.setState({
      expdate: date
    });
  }
  uploadImage = (e)=>{ 
    var file  =   e.target.files[0];  
    let data = new FormData()
    data.set('file', file); 
    axios.post( `${apiUrl}/file`, data )
     .then((result) => {
      console.log('succeess' , result) 
     })
     .catch((err)=>{ 
       console.log('errr', err )
     }); 
  
     }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }); 
   };
  changeSelect = (e) => {
    this.setState({
      category: e.target.value
    }, ()=>{ 
      console.log("dd", this.state.category)
    });
  }
  handleSetAlertMessage = (message)=>{ 
      this.setState({
        message: message, 
        open: true
      })
  }
  handleSubmit = (e) => { 
     e.preventDefault();
    if(this.state.label === ''){ 
      this.handleSetAlertMessage('Please provide label')
    }  
    else 
    if(this.state.category === ''){ 
      this.handleSetAlertMessage('Please choose category')
    }  
    else 
    if(this.state.TVA === ''){ 
      this.handleSetAlertMessage('Please provide TVA')
    }  
    else 
    if(this.state.pricettc === ''){ 
      this.handleSetAlertMessage('Please provide  priceTTC')
    }  
    else   
      if( this.state.expdate < this.state.proddate){
      this.setState({
        open:true , 
        message: 'Expiration date must be greater than production date.'
      })
    }  
    else {
       
        this.props.onAddProduct(this.state);
        this.handleReset();
        this.setState(
        {success: true }, () => {
          console.log(this.state.success )  
        }) ; 
    }       

  };

  changeHandler=(colors)=> {
    console.log(colors);
}
  handleReset = (e) => {
      this.setState({
      label: '',
      description: '',
      category: '',
      weight: '',
      TVA: '',
      pricettc: '',
      tva: '',
      unity: '',
      reduction: '',
      color: '', 
      quantity: '', 
      img:'', 
      proddate:  moment(),
      expdate:  moment(),
    
    });
  }

  render() {
    return (

      <div style={{ justifyContent: 'center' }}>
    <form onSubmit={this.handleSubmit}>
      <div className="form-group">
            <input
              type="text"
              placeholder="Label"
              className="form-control"
              name="label"
              onChange={this.handleInputChange}
              value={this.state.label}
            />
          </div>
          <div className="form-group">
             <textarea
              type="text"
              placeholder="Descritpion"
              className="form-control"
              name="description"
              onChange={this.handleInputChange}
              value={this.state.description}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Color "
              className="form-control"
              name="color"
              onChange={this.handleInputChange}
              value={this.state.color}
            />
          </div>

          <div className="form-group">
          <input type= "file" name="file" onChange= {this.uploadImage} placeholder="Choose image "/>
       </div> 
          <div className="form-group">
             <select 
                onChange={this.changeSelect}  
                 className='form-control'
                style={{ display: 'inline-block'}}
               >
               <option value = 'none'> Select Category</option>
                   {this.props.categories.map(category => {
                return (  
                   <option value={category.name} key = {category.name} > {category.name} </option>
                    );
              })}
             </select>
 
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="TVA"
              className="form-control"
              name="TVA"
              onChange={this.handleInputChange}
              value={this.state.TVA}
              max="100"
              min = "0" 
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="PriceTTC"
              className="form-control"
              name="pricettc"
              onChange={this.handleInputChange}
              value={this.state.pricettc}
              min = "0"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Quantity"
              className="form-control"
              name="quantity"
              onChange={this.handleInputChange}
              value={this.state.quantity}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Reduction %"
              className="form-control"
              name="reduction"
              onChange={this.handleInputChange}
              value={this.state.reduction}
              max="100"
              min = "0" 
            />
          </div>
          
          <div className="form-group">
            <label> Production date </label>
            <DatePicker
              selected={this.state.proddate}
              onChange={this.handleChangeProdDate}
            />
          </div>

          <div className="form-group">
            <label> Expiration  date </label>
            <DatePicker
              selected={this.state.expdate}
              onChange={this.handleChangeExpDate}
             
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Product  </button>
            <button type="button" className="btn btn-warning" onClick={this.handleReset}>
              Reset
            </button>
          <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>
                        {this.state.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                         {this.state.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="secondary">
                            Ok, i understand. 
                        </Button>
                    
                    </DialogActions>
                </Dialog>
            
          </div>
          { this.state.success && <UncontrolledAlert className="bg-success text-white shadow-lg">
                   Product added with success — check it out in product list!
                </UncontrolledAlert>}

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories , 
    products: state.products 
  };
};

export default
  connect(mapStateToProps)(NewProduct);
