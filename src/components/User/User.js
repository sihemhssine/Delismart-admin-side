import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

export default ({ user: { fullname, country, addr, accountid, tel, email, enrolmentdate, _id }, onDelete }) => {
  return (
    <div style={styles}>
      <h2>{fullname}</h2>
      <p> {country}</p>
      <p>{addr}</p>
      <p>{tel}</p>
      <p>{email}</p>
      <p>{accountid}</p>
      <p>{enrolmentdate}</p>

      <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
        Remove
      </button>
    </div>
  );
};