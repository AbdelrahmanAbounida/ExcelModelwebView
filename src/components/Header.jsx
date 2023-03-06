import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={"grey"}
        fontWeight="bold"
        sx={{ m: "0 0 2px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={"primary.light"} sx={{fontWeight:"bold"}}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;