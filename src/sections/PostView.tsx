// src/sections/PostView.tsx
"use client";
import React, { useEffect, useState } from "react";
import type { Post, User } from "@prisma/client";
import { 
  Card, 
  CardHeader, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Avatar, 
  IconButton, 
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  keyframes,
  useTheme,
  Divider,
  Paper,
} from "@mui/material";
import { 
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Send as SendIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import { fetchPosts } from "@/app/actions/posts";
import { toggleLike, addComment, deleteComment, toggleBookmark } from "@/app/actions/interactions";
import { useSession } from "next-auth/react";
import { DefaultSession, Session } from "next-auth";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface ExtendedSession extends Omit<Session, "user"> {
  user?: SessionUser;
}

interface ExtendedPost extends Post {
  user: User;
  comments: any[];
  likes: any[];
  bookmarks: any[];
  images: {
    id: string;
    imageUrl: string;
    order: number;
  }[];
}

interface PostViewProps {
  posts?: ExtendedPost[];
}

const likeAnimation = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const bookmarkAnimation = keyframes`
  0% { transform: scale(1) translateY(0); }
  25% { transform: scale(1.2) translateY(-2px); }
  50% { transform: scale(0.95) translateY(1px); }
  100% { transform: scale(1) translateY(0); }
`;

const PostView = ({ posts: propPosts }: PostViewProps) => {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const theme = useTheme();
  const [posts, setPosts] = useState<ExtendedPost[]>(propPosts || []);
  const [commentText, setCommentText] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [animatingLike, setAnimatingLike] = useState<string | null>(null);
  const [animatingBookmark, setAnimatingBookmark] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!propPosts) {
      const loadPosts = async () => {
        try {
          const fetchedPosts = await fetchPosts() as ExtendedPost[];
          setPosts(fetchedPosts);
          // Initialize liked state from fetched posts
          const initialLikedState: Record<string, boolean> = {};
          fetchedPosts.forEach(post => {
            initialLikedState[post.id] = post.likes.some(like => like.userId === session?.user?.id);
          });
          setLikedPosts(initialLikedState);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      loadPosts();
    }
  }, [propPosts, session?.user?.id]);

  const handleLike = async (postId: string) => {
    if (!session) return;
    setAnimatingLike(postId);
    
    // Toggle like state immediately for better UX
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    
    // Update likes count in posts state
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const isCurrentlyLiked = likedPosts[postId];
        return {
          ...post,
          likes: isCurrentlyLiked 
            ? post.likes.filter(like => like.userId !== session.user?.id)
            : [...post.likes, { userId: session.user?.id }]
        };
      }
      return post;
    }));

    // Call API to update backend
    await toggleLike(postId);
    setTimeout(() => setAnimatingLike(null), 500);
  };

  const handleBookmark = async (postId: string) => {
    if (!session) return;
    setAnimatingBookmark(postId);
    const result = await toggleBookmark(postId);
    if (result !== null) {
      // Update the local state immediately for better UX
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          const userId = session.user?.id;
          if (!userId) return post;
          
          if (result) {
            // Add bookmark
            return {
              ...post,
              bookmarks: [...post.bookmarks, { userId, createdAt: new Date() }]
            };
          } else {
            // Remove bookmark
            return {
              ...post,
              bookmarks: post.bookmarks.filter(bookmark => bookmark.userId !== userId)
            };
          }
        }
        return post;
      }));
    }
    setTimeout(() => setAnimatingBookmark(null), 500);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !session || !selectedPost) return;
    await addComment(selectedPost, commentText.trim());
    setCommentText("");
    setCommentDialogOpen(false);
    const fetchedPosts = await fetchPosts() as ExtendedPost[];
    setPosts(fetchedPosts);
  };

  const handleDeleteComment = async () => {
    if (!selectedComment || !session) return;
    
    try {
      await deleteComment(selectedComment);
      
      // Update local state immediately
      setPosts(prevPosts => prevPosts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment.id !== selectedComment)
      })));
      
      setDeleteDialogOpen(false);
      setSelectedComment(null);
      setCommentDialogOpen(false); // Close the comments dialog after deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const openCommentDialog = (postId: string) => {
    setSelectedPost(postId);
    setCommentDialogOpen(true);
  };

  const handleInlineCommentSubmit = async (postId: string) => {
    if (!commentInputs[postId]?.trim() || !session) return;
    await addComment(postId, commentInputs[postId].trim());
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    const fetchedPosts = await fetchPosts() as ExtendedPost[];
    setPosts(fetchedPosts);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 3,
      maxWidth: '500px',
      margin: '0 auto',
      padding: '16px 0 80px 0',
    }}>
      {posts.map((post) => {
        const isLiked = likedPosts[post.id] || false;
        const isBookmarked = post.bookmarks.some(bookmark => bookmark.userId === session?.user?.id);

        return (
          <Paper 
            key={post.id} 
            elevation={0}
            sx={{ 
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            }}
          >
            <CardHeader
              avatar={
                <Avatar 
                  src={post.user.image || ''} 
                  alt={post.user.name || 'user'}
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
              }
              title={
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {post.user.name}
                </Typography>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreHorizIcon />
                </IconButton>
              }
              sx={{ 
                padding: '12px 16px',
              }}
            />

            <CardMedia
              component="img"
              image={post.images?.[0]?.imageUrl || '/placeholder-image.jpg'}
              alt={post.caption || "Post image"}
              sx={{ 
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              }}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.jpg';
              }}
            />

            <CardActions disableSpacing sx={{ padding: '8px 16px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                    onClick={() => handleLike(post.id)}
                    sx={{ 
                      padding: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.04)',
                      },
                    }}
                  >
                    {isLiked ? (
                      <FavoriteIcon 
                        sx={{ 
                          color: '#ff3040',
                          animation: animatingLike === post.id ? `${likeAnimation} 0.5s ease-in-out` : 'none',
                        }} 
                      />
                    ) : (
                      <FavoriteBorderIcon 
                        sx={{
                          color: theme.palette.text.primary,
                          '&:hover': {
                            color: '#ff3040',
                          },
                        }}
                      />
                    )}
                  </IconButton>
                  <IconButton 
                    onClick={() => openCommentDialog(post.id)}
                    sx={{ padding: '8px' }}
                  >
                    <CommentIcon />
                  </IconButton>
                </Box>
                <IconButton 
                  onClick={() => handleBookmark(post.id)}
                  sx={{ 
                    padding: '8px',
                    color: isBookmarked ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                >
                  {isBookmarked ? (
                    <BookmarkIcon 
                      sx={{ 
                        color: theme.palette.primary.main,
                        animation: animatingBookmark === post.id ? `${bookmarkAnimation} 0.5s ease-in-out` : 'none',
                      }} 
                    />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </Box>
            </CardActions>

            <CardContent sx={{ pt: 0, pb: 1, px: 2 }}>
              {post.likes.length > 0 && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1
                  }}
                >
                  {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                </Typography>
              )}
              
              {post.caption && (
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  <Box component="span" sx={{ fontWeight: 600, marginRight: 1 }}>
                    {post.user.name}
                  </Box>
                  {post.caption}
                </Typography>
              )}
            </CardContent>

            {post.comments.length > 0 && (
              <Box sx={{ px: 2, pb: 1 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                  onClick={() => openCommentDialog(post.id)}
                >
                  View all {post.comments.length} comments
                </Typography>
                
                {post.comments.slice(0, 2).map((comment) => (
                  <Box key={comment.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, mt: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                      {comment.user.name}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {comment.content}
                    </Typography>
                    {session?.user?.id === comment.userId && (
                      <IconButton 
                        size="small" 
                        onClick={() => {
                          setSelectedComment(comment.id);
                          setDeleteDialogOpen(true);
                        }}
                        sx={{ ml: 1, p: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', p: 1, alignItems: 'center' }}>
              <Avatar 
                src={session?.user?.image || ''} 
                alt={session?.user?.name || 'user'}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <TextField
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                fullWidth
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleInlineCommentSubmit(post.id);
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <IconButton 
                color="primary" 
                onClick={() => handleInlineCommentSubmit(post.id)}
                disabled={!commentInputs[post.id]?.trim()}
                sx={{ ml: 1 }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        );
      })}

      {/* Comment Dialog */}
      <Dialog 
        open={commentDialogOpen} 
        onClose={() => setCommentDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          pb: 2
        }}>
          Comments
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {/* All Comments List */}
          <Box sx={{ mb: 2, maxHeight: '300px', overflowY: 'auto' }}>
            {selectedPost && posts.find(p => p.id === selectedPost)?.comments.map((comment) => (
              <Box 
                key={comment.id} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  '&:last-child': { mb: 0 }
                }}
              >
                <Avatar 
                  src={comment.user.image || ''} 
                  alt={comment.user.name || 'A'}
                  sx={{ 
                    width: 32, 
                    height: 32,
                  }}
                />
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <Box>
                    <Typography component="span" sx={{ fontWeight: 600, mr: 1 }}>
                      {comment.user.name}
                    </Typography>
                    <Typography component="span" color="text.secondary">
                      {comment.content}
                    </Typography>
                  </Box>
                  {session?.user?.email === comment.user.email && (
                    <IconButton 
                      size="small"
                      onClick={() => {
                        setSelectedComment(comment.id);
                        setDeleteDialogOpen(true);
                      }}
                      sx={{
                        color: theme.palette.error.main,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* New Comment Input */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            pt: 2
          }}>
            <Avatar 
              src={session?.user?.image || ''} 
              alt={session?.user?.name || 'A'}
              sx={{ width: 32, height: 32 }}
            />
            <TextField
              autoFocus
              placeholder="Add a comment..."
              fullWidth
              variant="outlined"
              size="small"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCommentSubmit();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <IconButton 
              color="primary"
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Comment Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this comment?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteComment} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostView;
