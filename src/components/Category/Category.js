import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

export default ({ category: { name, description, image , _id }, onDelete }) => {
  return (
    <div style={ styles }>
      <h2>{ name}</h2>
      <h2>{description}</h2>
      <h2>{image}</h2>

      <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
        Remove
      </button>
    </div>
  );
};