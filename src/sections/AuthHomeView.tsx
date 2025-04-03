// src/sections/AuthHomeView.tsx

import React from "react";
import { Box, Typography, Grid, Paper, Avatar, useTheme } from "@mui/material";
import PostView from "./PostView";

interface AuthHomeViewProps {
  session: any;
  posts: any[];
}

const AuthHomeView: React.FC<AuthHomeViewProps> = ({ session, posts }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '16px 0 80px 0',
      }}
    >
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={session.user.image || ''}
          alt={session.user.name || 'user'}
          sx={{ 
            width: 60, 
            height: 60,
            border: '3px solid white',
          }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Welcome, {session.user.name}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </Typography>
        </Box>
      </Paper>

      {/* Posts Section */}
      <Box sx={{ width: '100%' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            mb: 2,
            color: theme.palette.text.primary,
          }}
        >
          Your Feed
        </Typography>

        {posts.length > 0 ? (
          <PostView posts={posts} />
        ) : (
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              borderRadius: '16px',
              padding: '40px 20px',
              textAlign: 'center',
              border: `1px dashed ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              You have no posts yet.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Start sharing your moments with the world!
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AuthHomeView;