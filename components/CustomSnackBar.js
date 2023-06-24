import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleSnackbarOpen = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackbarClose}>
      <Alert severity={severity} onClose={handleSnackbarClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
