// src/sections/NonAuthHomeView.tsx
"use client";
import React from "react";
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  useTheme,
  Grid,
  Container
} from "@mui/material";
import { 
  PhotoCamera as PhotoCameraIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import Link from "next/link";

// This component renders the home page for non-authenticated users
const NonAuthHomeView: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Welcome to Our Social Platform
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Share your moments with the world
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                component={Link} 
                href="/auth/registracia" 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ 
                  borderRadius: '8px',
                  px: 4,
                  py: 1.5,
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Sign Up
              </Button>
              <Button 
                component={Link} 
                href="/auth/prihlasenie" 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderRadius: '8px',
                  px: 4,
                  py: 1.5,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Features Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Share Photos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload and share your favorite moments with friends and family
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                }}
              >
                <FavoriteIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Like & Comment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engage with posts through likes and comments
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  padding: '24px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                }}
              >
                <ShareIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Connect
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connect with friends and discover new content
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NonAuthHomeView;