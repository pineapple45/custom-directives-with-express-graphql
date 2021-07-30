import React from "../../pkg/react.js";
import {useHistory} from "../../pkg/react-router-dom.js";
import {useMutation, useQuery} from "../../pkg/@apollo/client.js";
import {
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
  Box,
  CardActions
} from "../../pkg/@material-ui/core.js";
import {
  FavoriteBorderOutlined,
  Favorite,
  InsertComment
} from "../../pkg/@material-ui/icons.js";
import Card from "../../components/Card/index.js";
import Message from "../../components/Message/index.js";
import Layout from "../../components/Layout/index.js";
import Icon from "../../assets/icon.svg.proxy.js";
import {useMessage} from "../../hooks/useMessage.js";
import {
  createLikeMutation,
  deleteLikeMutation
} from "../../graphql/mutations.js";
import {listPostsQuery, getPostByIdQuery} from "../../graphql/queries.js";
import {useAuth} from "../../context/AuthProvider.js";
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
const Album = () => {
  const [createLike, {error: errorOnLikeCreation}] = useMutation(createLikeMutation);
  const [deleteLike, {error: errorOnLikeDeletion}] = useMutation(deleteLikeMutation);
  const {
    loading: loadingPosts,
    error: errorOnListingPosts,
    data: postsData
  } = useQuery(listPostsQuery, {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  });
  const {authState, isLoggedIn} = useAuth();
  const [message, setMessage] = useMessage({
    toShow: false,
    messageText: "",
    variant: "success"
  });
  const classes = useStyles();
  const history = useHistory();
  const addLikeHandler = (postId) => {
    if (!isLoggedIn()) {
      setMessage({
        toShow: true,
        variant: "error",
        messageText: "Please Login to interact with posts"
      });
      return;
    }
    createLike({
      variables: {postId, creatorId: authState.userId},
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: postId}}]
    });
    errorOnLikeCreation && setMessage({
      toShow: true,
      variant: "error",
      messageText: errorOnLikeCreation.message
    });
  };
  const removeLikeHandler = (likeId, postId) => {
    if (!isLoggedIn()) {
      setMessage({
        toShow: true,
        variant: "error",
        messageText: "Please Login to interact with posts"
      });
      return;
    }
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
    history.push(`/post/${postId}`);
  };
  if (loadingPosts)
    return /* @__PURE__ */ React.createElement(CircularProgress, null);
  let errorMessage = void 0;
  if (!errorOnListingPosts?.networkError) {
    errorMessage = errorOnListingPosts?.message;
  }
  const ifLoggedInUsersLikeExists = (post) => {
    const like = post.likeList && post.likeList.find((like2) => {
      if (authState.userId && like2.post._id === post._id && like2.creator._id === authState.userId) {
        return like2;
      }
    });
    return like;
  };
  errorMessage && /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, errorMessage);
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(CssBaseline, null), "(", errorMessage && /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, errorMessage), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("div", {
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
  }), /* @__PURE__ */ React.createElement("span", null, "Photos"))), /* @__PURE__ */ React.createElement(Typography, {
    variant: "h5",
    align: "center",
    paragraph: true
  }, "Hello👋! Photos is sample test project that I worked upon to show how custom-directives can be implemented with", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.npmjs.com/package/express-graphql"
  }, "express-graphql"), " ", "and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.npmjs.com/package/graphql-directive"
  }, "graphql-directive")))), /* @__PURE__ */ React.createElement(Container, {
    className: classes.cardGrid,
    maxWidth: "md"
  }, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 4
  }, postsData !== void 0 ? postsData.listPosts.map((post) => {
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
    }), post.likeList ? post.likeList.length !== 0 && /* @__PURE__ */ React.createElement("span", null, post.likeList.length) : /* @__PURE__ */ React.createElement("span", null, "could not fetch likes count")), /* @__PURE__ */ React.createElement(Box, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }, /* @__PURE__ */ React.createElement(InsertComment, {
      onClick: () => addCommentHandler(post._id)
    }), post.commentList ? post.commentList.length !== 0 && /* @__PURE__ */ React.createElement("span", null, post.commentList.length) : /* @__PURE__ */ React.createElement("span", null, "could not fetch comments count")))));
  }) : /* @__PURE__ */ React.createElement("div", null, "Could not fetch posts")))), ")", /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Album;
