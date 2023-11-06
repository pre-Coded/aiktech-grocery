import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

class Modal extends Component {
  render() {
    const { show, children, onClose, unset } = this.props;
    const showHideClassName = show ? `modal displayBlock` : `modal displayNone`;

    if (!show) {
      return null;
    }
    return (
      <div className={showHideClassName} onClick={onClose}>
        <section
          className={!unset ? "modal-section" : "modal-section modal-unset"}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </section>{" "}
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
  children: null,
};

export default Modal;
