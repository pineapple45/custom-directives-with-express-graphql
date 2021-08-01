import React, { useState } from 'react';
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
import { getPostByIdQuery } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';

import useCreateComment from '../../../hooks/mutations/useCreateComment';
import useDeleteComment from '../../../hooks/mutations/useDeleteComment';

const Post = () => {
  const { authState } = useAuth();
  const { id }: { id: any } = useParams();

  const {
    loading: loadingPostById,
    error: errorOnLoadingPostById,
    data: postByIdData,
  } = useQuery(getPostByIdQuery, { variables: { _id: id } });

  const { createCommentMutationHandler, isLoading: commentAdditionInProgress } =
    useCreateComment();
  const { deleteCommentMutationHandler } = useDeleteComment();

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

  const postCommentHandler = async () => {
    const response = await createCommentMutationHandler(
      {
        text: comment,
        creatorId: authState.userId,
        postId: id,
      },
      { postId: id }
    );

    setMessage({
      messageText: response.error ? response.data.message : 'comment added',
      toShow: true,
      variant: response.error ? 'error' : 'success',
    });
  };

  const deleteCommentHandler = async (commentId: string) => {
    const response = await deleteCommentMutationHandler(
      { _id: commentId },
      { postId: id }
    );

    setMessage({
      messageText: response.error ? response.data.message : 'comment deleted',
      toShow: true,
      variant: response.error ? 'error' : 'success',
    });
  };

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
            {commentAdditionInProgress && <CircularProgress />}
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
