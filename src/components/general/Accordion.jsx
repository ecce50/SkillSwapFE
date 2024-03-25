// Accordion.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../style/accordion.css";

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="accordion">
      <div className="accordion-title" onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
