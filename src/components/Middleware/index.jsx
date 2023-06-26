import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const Middleware = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // const navigate = useNavigate();
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, [userId]);

  return (
    <>
      {userId ? (
        <React.Fragment> {children}</React.Fragment>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

Middleware.propTypes = {
  children: PropTypes.node,
};

export default Middleware;
