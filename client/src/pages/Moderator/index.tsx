import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
  Box,
  CardActions,
} from '@material-ui/core';

import {
  FavoriteBorderOutlined,
  Favorite,
  InsertComment,
  Delete,
} from '@material-ui/icons';

import Card from '../../components/Card';
import Message from '../../components/Message';
import Layout from '../../components/Layout';
import { useMessage } from '../../hooks/useMessage';
import {
  createLikeMutation,
  deleteLikeMutation,
  deletePostMutation,
  createPostMutation,
} from '../../graphql/mutations';
import { getPostByIdQuery, listPostsQuery } from '../../graphql/queries';
import { useAuth } from '../../context/AuthProvider';
import { useMutation, useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Moderator: React.FC = () => {
  const { isLoggedIn, authState } = useAuth();

  const {
    loading: loadingPosts,
    error: errorOnLoadingPosts,
    data: postsData,
  } = useQuery(listPostsQuery);

  const [
    deletePost,
    {
      data: deletePostData,
      loading: postDeletionProgress,
      error: errorOnPostDeletion,
    },
  ] = useMutation(deletePostMutation);

  const [
    createLike,
    {
      data: createlikeData,
      loading: likeCreationInProgress,
      error: errorOnLikeCreation,
    },
  ] = useMutation(createLikeMutation);

  const [
    deleteLike,
    {
      data: deleteLikeData,
      loading: likeDeletionInProgress,
      error: errorOnLikeDeletion,
    },
  ] = useMutation(deleteLikeMutation);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputState, setInputState] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [message, setMessage] = useMessage({
    messageText: '',
    toShow: false,
    variant: 'success',
  });

  const classes = useStyles();
  const history = useHistory();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

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

  const deletePostHandler = (postId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deletePost({ variables: { _id: postId } });

    setMessage({
      toShow: true,
      variant: 'success',
      messageText: 'post deleted successfully',
    });
  };

  errorOnPostDeletion &&
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnPostDeletion?.message,
    });

  const addLikeHandler = (postId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    createLike({
      variables: { postId: postId, creatorId: authState.userId },
      refetchQueries: [{ query: getPostByIdQuery, variables: { _id: postId } }],
    });
  };

  errorOnLikeCreation &&
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnLikeCreation.message,
    });

  const removeLikeHandler = (likeId: string, postId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deleteLike({
      variables: { _id: likeId },
      refetchQueries: [{ query: getPostByIdQuery, variables: { _id: postId } }],
    });
  };

  errorOnLikeDeletion &&
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnLikeDeletion.message,
    });

  const addCommentHandler = (postId: string) => {
    history.push(`/moderator/post/${postId}`);
  };

  const ifLoggedInUsersLikeExists = (post: any) => {
    const like = post.likeList.find((like: any) => {
      if (
        authState.userId &&
        like.post._id === post._id &&
        like.creator._id === authState.userId
      ) {
        return like;
      }
    });

    return like;
  };

  return (
    <Layout>
      <CssBaseline />
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
              Album
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {loadingPosts ? (
              <CircularProgress />
            ) : (
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
                                  post._id,
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
                          {post.likeList.length !== 0 && (
                            <span>{post.likeList.length}</span>
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
                          {post.commentList.length !== 0 && (
                            <span>{post.commentList.length}</span>
                          )}
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flexDirection="column"
                        >
                          <Delete onClick={() => deletePostHandler(post._id)} />
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Container>
      </main>
      <Message message={message} setMessage={setMessage} />
    </Layout>
  );
};

export default Moderator;