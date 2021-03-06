import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  CircularProgress,
  Grid,
  TextField,
  ListItemText,
  Button,
  Paper,
} from '@material-ui/core';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Message from '../../components/Message';
import { useMessage } from '../../hooks/useMessage';
import { getPostByIdQuery } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';
import useCreateComment from '../../hooks/mutations/useCreateComment';

const Post = () => {
  const { authState } = useAuth();
  const { id }: { id: string } = useParams();

  const { loading: loadingPostById, data: postById } = useQuery(
    getPostByIdQuery,
    { variables: { _id: id } }
  );

  const { createCommentMutationHandler, isLoading: commentAdditionInProgress } =
    useCreateComment();

  const [comment, setComment] = useState('');
  const [message, setMessage] = useMessage({
    messageText: '',
    toShow: false,
    variant: 'success',
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

  return (
    <Layout>
      {loadingPostById ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={11}>
            <Card
              cardHeading={postById.getPostById.title}
              cardBody={postById.getPostById.description}
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
            Comments
          </Grid>

          {postById.getPostById.commentList &&
            postById.getPostById.commentList.length !== 0 && (
              <Grid item xs={11}>
                {postById.getPostById.commentList.map((comment: any) => (
                  <Paper
                    key={comment._id}
                    style={{ padding: '10px', margin: '5px' }}
                  >
                    <ListItemText
                      primary={comment.creator.username}
                      secondary={comment.text}
                    />
                  </Paper>
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
