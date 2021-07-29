import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  CircularProgress,
  Grid,
  Box,
  TextField,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import _ from 'lodash';
import { Delete } from '@material-ui/icons';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import Message from '../../../components/Message';
import { useMessage } from '../../../hooks/useMessage';

const Post = () => {
  const { getPostById, createComment, deleteComment } = useActions();
  const { id }: { id: any } = useParams();
  const { data, loading, error } = useTypedSelector(
    (state) => state.getPostById
  );

  const { data: authData } = useTypedSelector((state) => state.loginUser);
  const {
    data: deleteCommentData,
    loading: deletingComment,
    error: errorOnDeleteComment,
  } = useTypedSelector((state) => state.deleteComment);
  const {
    data: commentData,
    loading: commentInProgress,
    error: errorOnCommentAddition,
  } = useTypedSelector((state) => state.createComment);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useMessage({
    messageText: '',
    toShow: false,
    variant: 'success',
  });

  const checkIfUserIsNotAuthenticated = () => {
    if (_.isEmpty(authData)) {
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
    createComment({ text: comment, creatorId: authData.userId, postId: id });
    errorOnCommentAddition
      ? setMessage({
          messageText: errorOnCommentAddition,
          toShow: true,
          variant: 'error',
        })
      : setMessage({
          messageText: 'comment added successfully',
          toShow: true,
          variant: 'success',
        });
  };

  const deleteCommentHandler = (commentId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deleteComment(commentId);

    errorOnDeleteComment
      ? setMessage({
          messageText: errorOnDeleteComment,
          toShow: true,
          variant: 'error',
        })
      : setMessage({
          messageText: 'comment deleted successfully',
          toShow: true,
          variant: 'success',
        });
  };

  useEffect(() => {
    getPostById(id);
    error &&
      setMessage({
        messageText: error,
        toShow: true,
        variant: 'error',
      });
  }, []);

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} justify="center">
          <Grid item xs={11}>
            <Card cardHeading={data.title} cardBody={data.description} />
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

          {data.commentList && data.commentList.length !== 0 && (
            <Grid item xs={11}>
              {data.commentList.map((comment) => (
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
