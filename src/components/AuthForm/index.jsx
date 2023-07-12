import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Divider,
  alpha,
  Input,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";

import google from "../../assets/img/google.svg";
import microsoft from "../../assets/img/microsoft.svg";

import twitter from "../../assets/img/twitter.svg";
import auth from "../../assets/img/auth.svg";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginInput = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if(loginInfo.email === "tiendat@gmail.com" && loginInfo.password === "123456") {
      localStorage.setItem("userId", 1);
      navigate("/");
      toast.success("Login Success");
    }
  };

  return (
    <Box display="flex" fullWidth sx={{ height: "100vh" }}>
      <Box
        style={{
          backgroundColor: palette.primary.dark,
          flex: "1 1 50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            backgroundImage: `url(${auth})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#cce4ff",
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
            boxShadow: "1rem 1rem 2rem -2px rgba(0,0,0,0.1)",
          }}
        ></Box>
      </Box>
      <Box
        sx={{ backgroundColor: palette.primary.light, flex: "1 1 50%" }}
        display="flex"
        alignItems="center"
        justifyContent="start"
      >
        <Box
          sx={{
            width: "80%",
            height: "80%",
            backgroundColor: "white",
            p: `${type === "login" ? "4rem 10rem" : "4rem 10rem 1rem 10rem"}`,
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            boxShadow: "1rem 1rem 2rem -2px rgba(0,0,0,0.1)",
          }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h2" textAlign="center" fontWeight={500}>
            Welcome Back
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {type === "register" && (
              <Input name="name" type="text" label="Name" />
            )}
            <TextField
              name="email"
              type="text"
              label="Email"
              value={loginInfo.email}
              onChange={(e) => handleLoginInput(e)}
            />
            <Box>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  onChange={(e) => handleLoginInput(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {type === "login" && (
                <Typography
                  variant="h6"
                  color={palette.primary.main}
                  textAlign="right"
                >
                  Forgot password?
                </Typography>
              )}
            </Box>
          </form>
          <Box display="flex" flexDirection="column" gap="2.5rem">
            <Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: palette.primary.main,
                  py: "1rem",
                  fontSize: "1.4rem",
                }}
                onClick={handleSubmit}
              >
                {type === "login" ? "Login" : "Sign up"}
              </Button>
              {type === "register" && (
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ float: "bottom", mt: "1rem" }}
                >
                  Have an account?{" "}
                  <Link to="#" style={{ color: palette.primary.main }}>
                    <span
                      style={{ display: "inline-block", paddingLeft: "0.4rem" }}
                    >
                      Sign in
                    </span>
                  </Link>
                </Typography>
              )}
            </Box>
            {type === "login" && (
              <Divider sx={{ color: alpha("#000", 0.3), fontSize: "1.2rem" }}>
                OR
              </Divider>
            )}
            {type === "login" && (
              <Box
                display="flex"
                justifyContent="space-around"
                sx={{ px: "20%" }}
              >
                <img src={google} width="30px" height="auto" />
                <img src={twitter} width="40px" height="auto" />
                <img src={microsoft} width="40px" height="auto" />
              </Box>
            )}
          </Box>
          {type === "login" && (
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ float: "bottom" }}
            >
              Don’t have account yet?
              <Link to="#" style={{ color: palette.primary.main }}>
                <span
                  style={{ display: "inline-block", paddingLeft: "0.4rem" }}
                >
                  Sign up
                </span>
              </Link>
            </Typography>
          )}
          {type === "register" && (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.2rem",
                color: "rgba(0,0,0,0.6)",
                padding: "0 8rem",
              }}
            >
              By signing up, you are agree to
              <span style={{ color: palette.primary.main, fontWeight: "500" }}>
                Term of service
              </span>
              and
              <span style={{ color: palette.primary.main, fontWeight: "500" }}>
                Privacy Policy
              </span>
            </p>
          )}
        </Box>
      </Box>
    </Box>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(["login", "register"]),
};

export default AuthForm;
