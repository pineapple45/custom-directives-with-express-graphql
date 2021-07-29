import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CircularProgress,
  Grid,
  Box,
  TextField,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import Message from '../../../components/Message';
import { useMessage } from '../../../hooks/useMessage';
import { useAuth } from '../../../context/AuthProvider';
import {
  createCommentMutation,
  deleteCommentMutation,
} from '../../../graphql/mutations';
import { getPostByIdQuery } from '../../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

const Post: React.FC = () => {
  const { authState, isLoggedIn } = useAuth();
  const { id }: { id: any } = useParams();

  const {
    loading: loadingPostById,
    error: errorOnLoadingPostById,
    data: postByIdData,
  } = useQuery(getPostByIdQuery, { variables: { _id: id } });

  const [
    deleteComment,
    {
      data: deleteCommentData,
      loading: deletingComment,
      error: errorOnDeleteComment,
    },
  ] = useMutation(deleteCommentMutation);

  const [
    createComment,
    {
      data: commentData,
      loading: commentInProgress,
      error: errorOnCommentAddition,
    },
  ] = useMutation(createCommentMutation);

  const [comment, setComment] = useState('');
  const [message, setMessage] = useMessage({
    messageText: '',
    toShow: false,
    variant: 'success',
  });

  errorOnLoadingPostById &&
    setMessage({
      messageText: errorOnLoadingPostById.message,
      toShow: true,
      variant: 'error',
    });

  const checkIfUserIsNotAuthenticated = () => {
    if (!isLoggedIn) {
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: 'Unauthenticated access',
      });
      return true;
    }
    return false;
  };

  const postCommentHandler = () => {
    if (checkIfUserIsNotAuthenticated()) return;

    createComment({
      variables: {
        text: comment,
        creatorId: authState.userId,
        postId: id,
      },
      refetchQueries: [{ query: getPostByIdQuery, variables: { _id: id } }],
    });
  };

  const deleteCommentHandler = (commentId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deleteComment({
      variables: { _id: commentId },
      refetchQueries: [{ query: getPostByIdQuery, variables: { _id: id } }],
    });

    setMessage({
      messageText: 'comment deleted successfully',
      toShow: true,
      variant: 'success',
    });
  };

  errorOnDeleteComment &&
    setMessage({
      messageText: errorOnDeleteComment.message,
      toShow: true,
      variant: 'error',
    });

  return (
    <Layout>
      {loadingPostById ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={11}>
            <Card
              cardHeading={postByIdData.getPostById.title}
              cardBody={postByIdData.getPostById.description}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              id="outlined-full-width"
              label="Add Comment"
              placeholder="Add comment"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setComment(e.target.value)
              }
            />
            <Button
              onClick={postCommentHandler}
              variant="contained"
              color="secondary"
            >
              ADD
            </Button>
            {commentInProgress && <CircularProgress />}
          </Grid>
          <Grid item xs={11}>
            COMMENTS
            <hr />
          </Grid>

          {postByIdData.getPostById.commentList &&
            postByIdData.getPostById.commentList.length !== 0 && (
              <Grid item xs={11}>
                {postByIdData.getPostById.commentList.map((comment: any) => (
                  <Box
                    key={comment._id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ListItem
                      key={comment._id}
                      alignItems="flex-start"
                      style={{
                        backgroundColor: '#b9f6ca',
                        borderRadius: '5px',
                        marginBottom: '5px',
                      }}
                    >
                      <ListItemText
                        primary={comment.creator.username}
                        secondary={comment.text}
                      />
                    </ListItem>
                    <Delete onClick={() => deleteCommentHandler(comment._id)} />
                  </Box>
                ))}
              </Grid>
            )}
        </Grid>
      )}
      <Message message={message} setMessage={setMessage} />
    </Layout>
  );
};

export default Post;
