import "./Button.scss";
import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.clicker}
      className={"btn " + props.classname}
      style={{
        width: props.width,
        margin: props.margin,
        fontSize: props.size,
        backgroundColor: props.bgcolor,
        color: props.textcolor,
      }}
      type={props.type}
      disabled={props.loading}
    >
      {props.loading ? (
        <>
          <div className="button-loader"></div> Loading...
        </>
      ) : (
        props.text
      )}
    </button>
  );
};

export default Button;
