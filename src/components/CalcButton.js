import React from 'react';


const CalcButton = (props) => {
  const { className, children, onClick } = props;
  const extraClass = className || '';
  return (
    <button
      className={`calc-btn ${extraClass}`}
      onClick={() => onClick(children)}
    >
      {children}
    </button>
  );
};


CalcButton.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default CalcButton;
