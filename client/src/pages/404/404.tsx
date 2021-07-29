import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Error404: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      404
      <br />
      Page Not Found :(
      <br />
      <Link to="/">Go to home</Link>
    </Box>
  );
};

export default Error404;
