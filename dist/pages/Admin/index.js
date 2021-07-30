import React, {useState} from "../../pkg/react.js";
import {useHistory} from "../../pkg/react-router-dom.js";
import {
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
  Box,
  CardActions,
  Button,
  TextField
} from "../../pkg/@material-ui/core.js";
import {
  FavoriteBorderOutlined,
  Favorite,
  InsertComment,
  Delete
} from "../../pkg/@material-ui/icons.js";
import Card from "../../components/Card/index.js";
import Message from "../../components/Message/index.js";
import Layout from "../../components/Layout/index.js";
import Modal from "../../components/Modal/index.js";
import Icon from "../../assets/icon.svg.proxy.js";
import {useMessage} from "../../hooks/useMessage.js";
import {
  createLikeMutation,
  deleteLikeMutation,
  deletePostMutation,
  createPostMutation
} from "../../graphql/mutations.js";
import {getPostByIdQuery, listPostsQuery} from "../../graphql/queries.js";
import {useAuth} from "../../context/AuthProvider.js";
import {useMutation, useQuery} from "../../pkg/@apollo/client.js";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
const Admin = () => {
  const {isLoggedIn, authState} = useAuth();
  const {
    loading: loadingPosts,
    error: errorOnLoadingPosts,
    data: postsData
  } = useQuery(listPostsQuery);
  const [
    createPost,
    {
      data: createPostData,
      loading: postCreationInProgress,
      error: errorOnPostCreation
    }
  ] = useMutation(createPostMutation);
  const [
    deletePost,
    {
      data: deletePostData,
      loading: postDeletionProgress,
      error: errorOnPostDeletion
    }
  ] = useMutation(deletePostMutation);
  const [
    createLike,
    {
      data: createlikeData,
      loading: likeCreationInProgress,
      error: errorOnLikeCreation
    }
  ] = useMutation(createLikeMutation);
  const [
    deleteLike,
    {
      data: deleteLikeData,
      loading: likeDeletionInProgress,
      error: errorOnLikeDeletion
    }
  ] = useMutation(deleteLikeMutation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputState, setInputState] = useState({
    title: "",
    description: "",
    image: ""
  });
  const [message, setMessage] = useMessage({
    messageText: "",
    toShow: false,
    variant: "success"
  });
  const classes = useStyles();
  const history = useHistory();
  const inputChangeHandler = (event) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value
    });
  };
  const checkIfUserIsNotAuthenticated = () => {
    if (!isLoggedIn) {
      setMessage({
        toShow: true,
        variant: "error",
        messageText: "Unauthenticated access"
      });
      return true;
    }
    return false;
  };
  const createPostHandler = () => {
    if (checkIfUserIsNotAuthenticated())
      return;
    console.log(inputState);
    createPost({
      variables: {...inputState, creatorId: authState.userId},
      refetchQueries: [{query: listPostsQuery}]
    });
    setMessage({
      toShow: true,
      variant: "success",
      messageText: "post added successfully"
    });
    setInputState({
      title: "",
      description: "",
      image: ""
    });
    setIsModalOpen(false);
  };
  if (errorOnPostCreation) {
    setMessage({
      toShow: true,
      variant: "error",
      messageText: errorOnPostCreation.message
    });
  }
  const deletePostHandler = (postId) => {
    if (checkIfUserIsNotAuthenticated())
      return;
    deletePost({
      variables: {_id: postId},
      refetchQueries: [{query: listPostsQuery}]
    });
    setMessage({
      toShow: true,
      variant: "success",
      messageText: "post deleted successfully"
    });
  };
  errorOnPostDeletion && setMessage({
    toShow: true,
    variant: "error",
    messageText: errorOnPostDeletion?.message
  });
  const addLikeHandler = (postId) => {
    if (checkIfUserIsNotAuthenticated())
      return;
    createLike({
      variables: {postId, creatorId: authState.userId},
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: postId}}]
    });
  };
  errorOnLikeCreation && setMessage({
    toShow: true,
    variant: "error",
    messageText: errorOnLikeCreation.message
  });
  const removeLikeHandler = (likeId, postId) => {
    if (checkIfUserIsNotAuthenticated())
      return;
    deleteLike({
      variables: {_id: likeId},
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: postId}}]
    });
  };
  errorOnLikeDeletion && setMessage({
    toShow: true,
    variant: "error",
    messageText: errorOnLikeDeletion.message
  });
  const addCommentHandler = (postId) => {
    history.push(`/admin/post/${postId}`);
  };
  const ifLoggedInUsersLikeExists = (post) => {
    const like = post.likeList.find((like2) => {
      if (authState.userId && like2.post._id === post._id && like2.creator._id === authState.userId) {
        return like2;
      }
    });
    return like;
  };
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("div", {
    className: classes.heroContent
  }, /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm"
  }, /* @__PURE__ */ React.createElement(Typography, {
    component: "h1",
    variant: "h2",
    align: "center",
    color: "textPrimary",
    gutterBottom: true
  }, /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement("img", {
    src: Icon,
    width: "100px"
  }), /* @__PURE__ */ React.createElement("span", null, "Photos Admin"))), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5",
    align: "center",
    paragraph: true
  }, "Hello👋! Photos is sample test project that I worked upon to show how custom-directives can be implemented with", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.npmjs.com/package/express-graphql"
  }, "express-graphql"), " ", "and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.npmjs.com/package/graphql-directive"
  }, "graphql-directive")), /* @__PURE__ */ React.createElement("div", {
    className: classes.heroButtons
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 2,
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Button, {
    onClick: () => {
      setIsModalOpen(true);
    },
    variant: "outlined",
    color: "primary"
  }, "Create Post")), /* @__PURE__ */ React.createElement(Grid, {
    item: true
  }, /* @__PURE__ */ React.createElement(Button, {
    onClick: () => {
      history.push("/admin/users");
    },
    variant: "outlined",
    color: "primary"
  }, "Manage Users"))), /* @__PURE__ */ React.createElement(Modal, {
    handleClose: () => {
      setIsModalOpen(false);
    },
    open: isModalOpen
  }, /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: "post-title",
    label: "Post Title",
    name: "title",
    autoFocus: true,
    onChange: inputChangeHandler
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    fullWidth: true,
    id: "image-link",
    label: "Image Link",
    name: "image",
    autoFocus: true,
    onChange: inputChangeHandler
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(TextField, {
    variant: "outlined",
    margin: "normal",
    fullWidth: true,
    id: "post-description",
    label: "Post Description",
    name: "description",
    autoFocus: true,
    multiline: true,
    rows: 4,
    onChange: inputChangeHandler
  }), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Button, {
    onClick: createPostHandler,
    variant: "contained",
    color: "secondary"
  }, "ADD"))))), /* @__PURE__ */ React.createElement(Container, {
    className: classes.cardGrid,
    maxWidth: "md"
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 4
  }, loadingPosts ? /* @__PURE__ */ React.createElement(CircularProgress, null) : postsData.listPosts.map((post) => {
    const media = {
      image: post.image,
      alt: post.image
    };
    return /* @__PURE__ */ React.createElement(Grid, {
      item: true,
      key: post._id,
      xs: 12,
      sm: 6,
      md: 4
    }, /* @__PURE__ */ React.createElement(Card, {
      media,
      cardHeading: post.title,
      cardBody: post.description
    }, /* @__PURE__ */ React.createElement(CardActions, null, /* @__PURE__ */ React.createElement(Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }, ifLoggedInUsersLikeExists(post) ? /* @__PURE__ */ React.createElement(Favorite, {
      key: ifLoggedInUsersLikeExists(post)._id,
      color: "secondary",
      onClick: () => removeLikeHandler(ifLoggedInUsersLikeExists(post)._id, post._id)
    }) : /* @__PURE__ */ React.createElement(FavoriteBorderOutlined, {
      color: "secondary",
      onClick: () => addLikeHandler(post._id)
    }), post.likeList.length !== 0 && /* @__PURE__ */ React.createElement("span", null, post.likeList.length)), /* @__PURE__ */ React.createElement(Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }, /* @__PURE__ */ React.createElement(InsertComment, {
      onClick: () => addCommentHandler(post._id)
    }), post.commentList.length !== 0 && /* @__PURE__ */ React.createElement("span", null, post.commentList.length)), /* @__PURE__ */ React.createElement(Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }, /* @__PURE__ */ React.createElement(Delete, {
      onClick: () => deletePostHandler(post._id)
    })))));
  })))), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Admin;
