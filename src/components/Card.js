import React from 'react';
import '../styles/teacher_dashboard.css';

const Card = ({ icon, count, label, color }) => {
  return (
    <div className={`card ${color}`}>
      <i className={icon}></i>
      <div>
        <h3>{count}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Card;
