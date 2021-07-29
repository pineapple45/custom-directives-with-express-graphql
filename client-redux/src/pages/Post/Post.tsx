import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import _ from 'lodash';
import {
  CircularProgress,
  Grid,
  Box,
  List,
  TextField,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Message from '../../components/Message';
import { useMessage } from '../../hooks/useMessage';

const Post = () => {
  const { getPostById, createComment } = useActions();
  const { id }: { id: any } = useParams();
  const { data, loading, error } = useTypedSelector(
    (state) => state.getPostById
  );

  const { data: loginData } = useTypedSelector((state) => state.loginUser);
  const {
    data: commentData,
    loading: commentAdditionInProgress,
    error: errorOnCommentAddition,
  } = useTypedSelector((state) => state.createComment);

  const [comment, setComment] = useState('');
  const [message, setMessage] = useMessage({
    messageText: '',
    toShow: false,
    variant: 'success',
  });

  const postCommentHandler = () => {
    if (_.isEmpty(loginData)) {
      setMessage({
        messageText: 'Please login to interact with posts',
        toShow: true,
        variant: 'error',
      });
      return;
    }

    createComment({ text: comment, creatorId: loginData.userId, postId: id });
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

  useEffect(() => {
    getPostById(id);
  }, [id]);

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
            {commentAdditionInProgress && <CircularProgress />}
          </Grid>
          <Grid item xs={11}>
            Comments
          </Grid>

          {data.commentList && data.commentList.length !== 0 && (
            <Grid item xs={11}>
              {data.commentList.map((comment) => (
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
