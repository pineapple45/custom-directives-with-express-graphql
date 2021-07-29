import { useEffect, useState } from 'react';
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
import _ from 'lodash';

import Card from '../../components/Card';
import Message from '../../components/Message';
import Layout from '../../components/Layout';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useMessage } from '../../hooks/useMessage';

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

const Moderator = () => {
  const { listPosts, createLike, deleteLike, deletePost } = useActions();
  const { data: authData } = useTypedSelector((state) => state.loginUser);
  const {
    data: postsData,
    loading: loadingPosts,
    error: errorOnListingPosts,
  } = useTypedSelector((state) => state.listPosts);

  const {
    data: createPostData,
    loading: postCreationInProgress,
    error: errorOnPostCreation,
  } = useTypedSelector((state) => state.createPost);

  const {
    data: createlikeData,
    loading: likeCreationInProgress,
    error: errorOnLikeCreation,
  } = useTypedSelector((state) => state.createLike);

  const {
    data: deleteLikeData,
    loading: likeDeletionInProgress,
    error: errorOnLikeDeletion,
  } = useTypedSelector((state) => state.deleteLike);

  const {
    data: deletePostData,
    loading: postDeletionProgress,
    error: errorOnPostDeletion,
  } = useTypedSelector((state) => state.deletePost);
  // const { data , loading , error} = useSelector((state: any) => state.createPost);
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

  const deletePostHandler = (postId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deletePost(postId);

    errorOnPostDeletion &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnPostCreation,
      });

    !errorOnPostDeletion &&
      setMessage({
        toShow: true,
        variant: 'success',
        messageText: 'post deleted successfully',
      });
  };

  const addLikeHandler = (postId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    createLike({ creatorId: authData.userId, postId: postId });
    errorOnLikeCreation &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnLikeCreation,
      });
  };
  const removeLikeHandler = (likeId: string) => {
    if (checkIfUserIsNotAuthenticated()) return;
    deleteLike(likeId);

    errorOnLikeDeletion &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnLikeDeletion,
      });
  };

  const addCommentHandler = (postId: string) => {
    history.push(`/admin/post/${postId}`);
  };

  const ifLoggedInUsersLikeExists = (post: any) => {
    const like = post.likeList.find((like: any) => {
      if (
        authData &&
        like.post._id === post._id &&
        like.creator._id === authData.userId
      ) {
        return like;
      }
    });

    return like;
  };

  useEffect(() => {
    listPosts();
    errorOnListingPosts &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnListingPosts,
      });
  }, []);

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
              postsData.map((post) => {
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
                                  ifLoggedInUsersLikeExists(post)._id
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
