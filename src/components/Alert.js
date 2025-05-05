import React from "react";

export default function Alert(props) {
  return (
    <>
      <div className="alert alert-primary p-2" role="alert">
        {props.message}
      </div>
    </>
  );
}
