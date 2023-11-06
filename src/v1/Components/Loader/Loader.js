import React from "react";
import "./loader.scss";
import { useSelector } from "react-redux";

const mapStateToProps = ({ message }) => ({
  message,
});
function Loader(props) {
  return (
    <div className="modal-loader">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>{" "}
      <div className="modal-message">{props.message}</div>
    </div>
  );
}

export default Loader;
