import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
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
} from '@material-ui/icons';
// import _ from 'lodash';

import Card from '../../components/Card';
import Message from '../../components/Message';
import Layout from '../../components/Layout';
import { useMessage } from '../../hooks/useMessage';

import {
  createLikeMutation,
  deleteLikeMutation,
} from '../../graphql/mutations';
import { listPostsQuery, getPostByIdQuery } from '../../graphql/queries';
import { useAuth } from '../../context/AuthProvider';

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

interface CreateLikeProps {
  postId: string;
  creatorId: string;
}

const Album: React.FC = () => {
  const [createLike, { error: errorOnLikeCreation }] =
    useMutation<CreateLikeProps>(createLikeMutation);
  const [deleteLike, { error: errorOnLikeDeletion }] =
    useMutation<string>(deleteLikeMutation);
  const {
    loading: loadingPosts,
    error: errorOnListingPosts,
    data: postsData,
  } = useQuery(listPostsQuery);

  const { authState, isLoggedIn } = useAuth();

  const [message, setMessage] = useMessage({
    toShow: false,
    messageText: '',
    variant: 'success',
  });

  const classes = useStyles();
  const history = useHistory();

  const addLikeHandler = (postId: string) => {
    if (!isLoggedIn) {
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: 'Please Login to interact with posts',
      });
      return;
    }

    createLike({
      variables: { postId: postId, creatorId: authState.userId },
      refetchQueries: [{ query: getPostByIdQuery, variables: { _id: postId } }],
    });

    errorOnLikeCreation &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnLikeCreation.message,
      });
  };

  const removeLikeHandler = (likeId: string, postId: string) => {
    if (!isLoggedIn) {
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: 'Please Login to interact with posts',
      });
      return;
    }

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
    history.push(`/post/${postId}`);
  };

  if (loadingPosts) return <CircularProgress />;
  if (errorOnListingPosts) {
    console.log(errorOnListingPosts);
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnListingPosts.name,
    });
  }

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
            {postsData.listPosts.map((post: any) => {
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
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      <Message message={message} setMessage={setMessage} />
    </Layout>
  );
};

export default Album;
