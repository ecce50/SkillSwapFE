// Accordion.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../../style/accordion.css";

function Accordion({ title, children, isOpen: isOpenProp, onToggle }) {
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  // Sync internal state with prop
  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

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
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
};

Accordion.defaultProps = {
  isOpen: false,
  onToggle: null,
};

export default Accordion;
