import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

export default ({ product: { label, description, category,
  image, weight, TVA, pricettc, tva, expdate, proddate, unity, color, reduction, _id }, onDelete }) => {
  return (
    <div style={styles}>
      <h2>{label}</h2>
      <h2>{description}</h2>
      <h2>{category}</h2>
    <button className="btn btn-danger" type="button" onClick={() => onDelete(_id)}>
        Remove
      </button>
    </div>
  );
};