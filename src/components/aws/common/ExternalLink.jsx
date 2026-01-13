import { Typography } from "@mui/joy";

const ExternalLink = ({ href, children }) => {
  return (
    <Typography
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "#0A3CA2",
        textDecoration: "underline",
        fontWeight: "bold",
      }}
    >
      {children}
    </Typography>
  );
};

export default ExternalLink;
