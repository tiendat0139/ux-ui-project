import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSetting } from "./theme";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const theme = createTheme(themeSetting());

  return (
    <div className="app">
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={3000}
      ></ToastContainer>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {router.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
