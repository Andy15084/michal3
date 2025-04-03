"use client";

import {
  Button,
  Container,
  Typography,
  Box,
  useTheme,
  Link,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/navigation";

export default function SignInView() {
  const router = useRouter();
  const theme = useTheme();

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
          Welcome Back
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "center" }}>
          Sign in to continue to your account
        </Typography>

        {/* Google Sign In */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => signIn("google")}
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
          Continue with Google
        </Button>

        {/* GitHub Sign In */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GitHubIcon />}
          onClick={() => signIn("github")}
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
          Continue with GitHub
        </Button>

        <Divider sx={{ width: "100%", mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            component="button"
            onClick={() => router.push("/auth/registracia")}
            sx={{ 
              cursor: "pointer",
              color: theme.palette.primary.main,
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}



