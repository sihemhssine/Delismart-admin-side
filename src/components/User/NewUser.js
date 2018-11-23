import React from 'react';

import countryList from 'react-select-country-list';
import Select from 'react-select';
import moment from 'moment';

class NewUser extends React.Component {


  options = countryList().getData()
  enrolmentdate = moment().format('LL');
  state = {
    fullname: '',
    addr: '',
    accountid: '',
    tel: '',
    email: '',
    country: '',
    options: this.options,
    enrolmentdate: this.enrolmentdate

  };

  onSelectCountry = (event) => {
    console.log(this.refs.country.selected);

  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
       
   };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.fullname.trim() && this.state.addr.trim() && this.state.email.trim() && this.state.tel !== '' && this.state.accountid !== '') {

      this.props.onAddUser(this.state);
      this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      fullname: '',
      addr: '',
      accountid: '',
      tel: '',
      email: '',
      enrolmentdate: '',
      country: '',
      value: ''
    });
  };

  changeHandler = (value, e) => {
    this.setState({
      value: value,
      country: value.label
    });
    console.log(value.label);
  }

  render() {
    return (

      <div style={{ justifyContent: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Fullname"
              className="form-control"
              name="fullname"
              onChange={this.handleInputChange}
              value={this.state.fullname}
            />
          </div>
          <Select
            options={this.state.options}
            value={this.state.value}
            onChange={this.changeHandler}
            placeholder="Select Country"

          />


          <div className="form-group">
            <textarea
              cols="8"
              rows="8"
              placeholder="Address"
              className="form-control"
              name="addr"
              onChange={this.handleInputChange}
              value={this.state.addr}>
            </textarea>
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="AccountID"
              className="form-control"
              name="accountid"
              onChange={this.handleInputChange}
              value={this.state.accountid}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Tel "
              className="form-control"
              name="tel"
              onChange={this.handleInputChange}
              value={this.state.tel}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email  "
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add User </button>
            <button type="button" className="btn btn-warning" onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewUser;
