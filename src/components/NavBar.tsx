"use client"; // This needs to be a client component

import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  Tooltip,
  IconButton,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  AddCircle as AddCircleIcon,
  Login as LoginIcon,
  AppRegistration as AppRegistrationIcon,
  Logout as LogoutIcon,
  Info as InfoIcon,
  Gavel as GavelIcon,
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme as useColorMode } from "./ThemeProviders";  // Import the custom hook to use color mode context

export default function Navbar() {
  const [value, setValue] = useState("/");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toggleTheme, isDarkMode } = useColorMode(); // Get toggle function and theme status
  const theme = useTheme();

  // Paths for authenticated users (private paths)
  const privatePaths = [
    { label: "Home", value: "/", icon: <HomeIcon /> },
    { label: "Search", value: "/hladanie", icon: <SearchIcon /> },
    { label: "Add", value: "/pridat", icon: <AddCircleIcon /> },
    { label: "Bookmarks", value: "/zalozky", icon: <BookmarkIcon /> },
    {
      label: "Profile",
      value: "/profil",
      icon: session?.user?.image ? (
        <Avatar 
          alt={session?.user?.name || "User"} 
          src={session?.user?.image || undefined}
          sx={{ 
            width: 28, 
            height: 28,
            border: `2px solid ${theme.palette.primary.main}`,
          }} 
        />
      ) : (
        <Avatar 
          sx={{ 
            width: 28, 
            height: 28,
            border: `2px solid ${theme.palette.primary.main}`,
            bgcolor: theme.palette.primary.main,
          }}
        >
          {session?.user?.name?.charAt(0) || "U"}
        </Avatar>
      ),
    },
    { label: "Sign Out", value: "/auth/odhlasenie", icon: <LogoutIcon /> },
  ];

  // Paths for non-authenticated users (public paths)
  const publicPaths = [
    { label: "Home", value: "/", icon: <HomeIcon /> },
    { label: "About", value: "/o-nas", icon: <InfoIcon /> },
    { label: "Sign Up", value: "/auth/registracia", icon: <AppRegistrationIcon /> },
    { label: "Sign In", value: "/auth/prihlasenie", icon: <LoginIcon /> },
  ];

  // Select paths based on user authentication status
  const navigationPaths = status === "authenticated" ? privatePaths : publicPaths;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: isDarkMode ? theme.palette.background.paper : theme.palette.background.paper,
        borderRadius: "16px 16px 0 0",
        zIndex: 1000,
        borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue(newValue);
            router.push(newValue);
          }
        }}
        sx={{
          backgroundColor: 'transparent',
          "& .Mui-selected": {
            color: theme.palette.primary.main,
            "& .MuiSvgIcon-root": {
              transform: "scale(1.2)",
              transition: "transform 0.2s ease-in-out",
            },
          },
          "& .MuiBottomNavigationAction-root": {
            minWidth: "50px",
            padding: "6px 0",
            "& .MuiSvgIcon-root": {
              fontSize: "24px",
              transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
            },
            "&:hover .MuiSvgIcon-root": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        {navigationPaths.map((path) => (
          <Tooltip key={path.value} title={path.label} arrow placement="top">
            <BottomNavigationAction
              label={path.label}
              value={path.value}
              icon={path.icon}
              sx={{
                color: isDarkMode ? theme.palette.text.secondary : theme.palette.text.secondary,
                "&:hover": {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                },
              }}
            />
          </Tooltip>
        ))}
      </BottomNavigation>

      {/* Theme Toggle Button */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          color: theme.palette.primary.main,
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          "&:hover": {
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Paper>
  );
}











