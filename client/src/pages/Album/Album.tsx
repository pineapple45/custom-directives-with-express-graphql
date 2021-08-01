import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  CssBaseline,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Box,
  CardActions,
} from '@material-ui/core';

import {
  FavoriteBorderOutlined,
  Favorite,
  InsertComment,
} from '@material-ui/icons';

import Card from '../../components/Card';
import Message from '../../components/Message';
import Layout from '../../components/Layout';
import Icon from '../../assets/icon.svg';
import { useMessage } from '../../hooks/useMessage';

import { listPostsQuery } from '../../graphql/queries';
import { useAuth } from '../../context/AuthProvider';
import { commonStyles } from '../utils';

import useCreateLike from '../../hooks/mutations/useCreateLike';
import useDeleteLike from '../../hooks/mutations/useDeleteLike';

const useStyles = commonStyles;

const Album: React.FC = () => {
  const { createLikeMutationHandler } = useCreateLike();
  const { deleteLikeMutationHandler } = useDeleteLike();
  const {
    loading: loadingPosts,
    error: errorOnListingPosts,
    data: postsData,
  } = useQuery(listPostsQuery, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const { authState } = useAuth();

  const [message, setMessage] = useMessage({
    toShow: false,
    messageText: '',
    variant: 'success',
  });

  const classes = useStyles();
  const history = useHistory();

  const addLikeHandler = async (postId: string) => {
    const response = await createLikeMutationHandler(
      { postId: postId, creatorId: authState.userId },
      { postId }
    );

    setMessage({
      messageText: response.error && response.data.message,
      toShow: response.error && true,
      variant: 'error',
    });
  };

  const removeLikeHandler = async (likeId: string, postId: string) => {
    const response = await deleteLikeMutationHandler(
      { _id: likeId },
      { postId }
    );

    setMessage({
      messageText: response.error && response.data.message,
      toShow: response.error && true,
      variant: 'error',
    });
  };

  const addCommentHandler = (postId: string) => {
    history.push(`/post/${postId}`);
  };

  if (loadingPosts) return <CircularProgress />;

  let errorMessage = undefined;

  if (!errorOnListingPosts?.networkError) {
    errorMessage = errorOnListingPosts?.message;
  }

  const ifLoggedInUsersLikeExists = (post: any) => {
    const like =
      post.likeList &&
      post.likeList.find((like: any) => {
        if (
          authState.userId &&
          like.post._id === post._id &&
          like.creator._id === authState.userId
        ) {
          return like;
        } else {
          return null;
        }
      });

    return like;
  };

  return (
    <Layout>
      <CssBaseline />
      {errorMessage && (
        <Box display="flex" justifyContent="center" alignItems="center">
          {errorMessage}
        </Box>
      )}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={Icon} alt="site-icon" width="100px" />
                <span>Photos</span>
              </Box>
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Hello👋! Photos is sample test project that I worked upon to show
              how custom-directives can be implemented with{' '}
              <a href="https://www.npmjs.com/package/express-graphql">
                express-graphql
              </a>{' '}
              and{' '}
              <a href="https://www.npmjs.com/package/graphql-directive">
                graphql-directive
              </a>
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {postsData !== undefined ? (
              postsData.listPosts.map((post: any) => {
                const media = {
                  image: post.image,
                  alt: post.image,
                };

                return (
                  <Grid item key={post._id} xs={12} sm={6} md={4}>
                    <Card
                      media={media}
                      cardHeading={post.title}
                      cardBody={post.description}
                    >
                      <CardActions>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          {ifLoggedInUsersLikeExists(post) ? (
                            <Favorite
                              key={ifLoggedInUsersLikeExists(post)._id}
                              color="secondary"
                              onClick={() =>
                                removeLikeHandler(
                                  ifLoggedInUsersLikeExists(post)._id,
                                  post._id
                                )
                              }
                            />
                          ) : (
                            <FavoriteBorderOutlined
                              // key={ifLoggedInUsersLikeExists(post)._id}
                              color="secondary"
                              onClick={() => addLikeHandler(post._id)}
                            />
                          )}
                          {post.likeList ? (
                            post.likeList.length !== 0 && (
                              <span>{post.likeList.length}</span>
                            )
                          ) : (
                            <span>could not fetch likes count</span>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          <InsertComment
                            onClick={() => addCommentHandler(post._id)}
                          />
                          {post.commentList ? (
                            post.commentList.length !== 0 && (
                              <span>{post.commentList.length}</span>
                            )
                          ) : (
                            <span>could not fetch comments count</span>
                          )}
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <div>Could not fetch posts</div>
            )}
          </Grid>
        </Container>
      </main>
      <Message message={message} setMessage={setMessage} />
    </Layout>
  );
};

export default Album;
