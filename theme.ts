import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      800: "#006030",
      500: "#318973",
      300: "#36A88B",
      200: "#007A3D",
      "200/10": "#007A3D1a",
    },
    danger: {
      200: "#F04438",
      300: "#A30D1E",
      500: "#CE1126",
    },
    Egray: "#6E7887",
  },
  fonts: {
    body: "'Aljazeera', sans-serif",
    heading: "'Aljazeera', sans-serif",
  },
  breakpoints: {
    base: "0px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1480px",
    "2xl": "1536px",
  },
  sizes: {
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1480px",
    },
  },
});

export default theme;
