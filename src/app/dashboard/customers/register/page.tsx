import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomerForm from "../CustomerForm";

const RegisterCustomer = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            bgcolor: "white",
            height: "100vh",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Registrar Cliente
          </Typography>
          <CustomerForm />
        </Box>
      </Container>
    </>
  );
};

export default RegisterCustomer;
