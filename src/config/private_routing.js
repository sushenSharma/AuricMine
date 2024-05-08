// private_routing.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../constants/routerConstant';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to={PATHS.DEFAULT_LOGIN} />;
};

export default PrivateRoute;
