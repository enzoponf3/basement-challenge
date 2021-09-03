import * as React from "react";

const Modal: React.FC = ({children}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-75  z-20">{children}</div>;
};

export default Modal;
