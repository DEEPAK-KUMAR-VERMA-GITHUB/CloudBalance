import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: "#1976d2",
        },
        neutral: {
          solidBg: "#f5f5f5",
        },
        background: {
          body: "#fafafa",
          surface: "#ffffff",
        },
      },
    },
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
});

export default theme;
