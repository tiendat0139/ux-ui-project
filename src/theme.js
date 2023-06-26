export const themeSetting = () => ({
  palette: {
    primary: {
      main: "#083AA9",
      dark: "#1E1E6D",
      light: "#E6F2FF",
    },
    secondary: {
      main: "#079799",
    },
    info: {
      light: "#54b7d3",
      main: "#3865A3",
      dark: "#2683FF"
    },
    warning: {
      main: "#FFCC00",
    },
    danger: {
      main: "#F0440A",
    },
    success: {
      main: "#00a640",
    },
    text: {
      light: "#4A5974",
      dark: "#3d474d"
    },
    background: {
      light: "#F1F5F9",
      main: "#E7EBEF",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 26,
    },
    h4: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Outfit", "San-serif"].join(","),
      fontSize: 14,
    },
    htmlFontSize: 10,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "16px",
          top: 2,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: "16px",
        },
      },
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#083AA9",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1rem",
        },
      },
    },
    
  },
});
