import Alert from "@mui/material/Alert";

const SuccessMessage = ({ successMessage }) => {
  if(!successMessage) {
    return null;
  }
  return <Alert severity="info">{successMessage}</Alert>
};

export default SuccessMessage;
