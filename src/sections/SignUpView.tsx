"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  useTheme,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";

export default function SignUpView() {
  const router = useRouter();
  const theme = useTheme();
  const [agreeToGdpr, setAgreeToGdpr] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToGdpr(event.target.checked);
  };
  
  const handleSignUp = (provider: string) => {
    if (!agreeToGdpr) {
      alert("You must agree to the terms of use and GDPR to continue.");
      return;
    }
    signIn(provider);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: "20px",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          maxWidth: "400px",
          width: "100%",
          borderRadius: "16px",
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
        }}
      >
        {/* Logo / Title */}
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 2,
            bgcolor: theme.palette.primary.main,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            S
          </Typography>
        </Avatar>
        
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Create Account
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
          Join our community and start sharing your moments
        </Typography>

        {/* Google Sign Up */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => handleSignUp("google")}
          sx={{
            mb: 2,
            py: 1.2,
            borderRadius: "8px",
            borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Sign up with Google
        </Button>

        {/* GitHub Sign Up */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GitHubIcon />}
          onClick={() => handleSignUp("github")}
          sx={{
            mb: 3,
            py: 1.2,
            borderRadius: "8px",
            borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
            color: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
              backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          Sign up with GitHub
        </Button>

        <Divider sx={{ width: "100%", mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        {/* GDPR Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToGdpr}
              onChange={handleCheckboxChange}
              color="primary"
              sx={{
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          }
          label={
            <Typography variant="body2" color="text.secondary">
              I agree to the{" "}
              <Link
                component="button"
                onClick={() => router.push("/gdpr")}
                sx={{ 
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                GDPR
              </Link>{" "}
              and{" "}
              <Link
                component="button"
                onClick={() => router.push("/podmienky")}
                sx={{ 
                  cursor: "pointer",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Terms of Use
              </Link>
            </Typography>
          }
          sx={{ mb: 3, width: "100%" }}
        />

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            component="button"
            onClick={() => router.push("/auth/prihlasenie")}
            sx={{ 
              cursor: "pointer",
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}











