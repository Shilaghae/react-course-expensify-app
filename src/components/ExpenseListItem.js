import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  const date =  moment(createdAt).format("MMM Do YY");
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>{amount / 100} - {date}</p>
    </div>
  )
};

export default ExpenseListItem;
