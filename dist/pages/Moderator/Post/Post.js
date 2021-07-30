import React, {useState} from "../../../pkg/react.js";
import {useParams} from "../../../pkg/react-router-dom.js";
import {
  CircularProgress,
  Grid,
  Box,
  TextField,
  ListItem,
  ListItemText,
  Button
} from "../../../pkg/@material-ui/core.js";
import {Delete} from "../../../pkg/@material-ui/icons.js";
import Layout from "../../../components/Layout/index.js";
import Card from "../../../components/Card/index.js";
import Message from "../../../components/Message/index.js";
import {useMessage} from "../../../hooks/useMessage.js";
import {useAuth} from "../../../context/AuthProvider.js";
import {
  createCommentMutation,
  deleteCommentMutation
} from "../../../graphql/mutations.js";
import {getPostByIdQuery} from "../../../graphql/queries.js";
import {useMutation, useQuery} from "../../../pkg/@apollo/client.js";
const Post = () => {
  const {authState, isLoggedIn} = useAuth();
  const {id} = useParams();
  const {
    loading: loadingPostById,
    error: errorOnLoadingPostById,
    data: postByIdData
  } = useQuery(getPostByIdQuery, {variables: {_id: id}});
  const [
    deleteComment,
    {
      data: deleteCommentData,
      loading: deletingComment,
      error: errorOnDeleteComment
    }
  ] = useMutation(deleteCommentMutation);
  const [
    createComment,
    {
      data: commentData,
      loading: commentInProgress,
      error: errorOnCommentAddition
    }
  ] = useMutation(createCommentMutation);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useMessage({
    messageText: "",
    toShow: false,
    variant: "success"
  });
  errorOnLoadingPostById && setMessage({
    messageText: errorOnLoadingPostById.message,
    toShow: true,
    variant: "error"
  });
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
  const postCommentHandler = () => {
    if (checkIfUserIsNotAuthenticated())
      return;
    createComment({
      variables: {
        text: comment,
        creatorId: authState.userId,
        postId: id
      },
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: id}}]
    });
  };
  const deleteCommentHandler = (commentId) => {
    if (checkIfUserIsNotAuthenticated())
      return;
    deleteComment({
      variables: {_id: commentId},
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: id}}]
    });
    setMessage({
      messageText: "comment deleted successfully",
      toShow: true,
      variant: "success"
    });
  };
  errorOnDeleteComment && setMessage({
    messageText: errorOnDeleteComment.message,
    toShow: true,
    variant: "error"
  });
  return /* @__PURE__ */ React.createElement(Layout, null, loadingPostById ? /* @__PURE__ */ React.createElement(CircularProgress, null) : /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 2,
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, /* @__PURE__ */ React.createElement(Card, {
    cardHeading: postByIdData.getPostById.title,
    cardBody: postByIdData.getPostById.description
  })), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, /* @__PURE__ */ React.createElement(TextField, {
    id: "outlined-full-width",
    label: "Add Comment",
    placeholder: "Add comment",
    fullWidth: true,
    margin: "normal",
    InputLabelProps: {
      shrink: true
    },
    variant: "outlined",
    onChange: (e) => setComment(e.target.value)
  }), /* @__PURE__ */ React.createElement(Button, {
    onClick: postCommentHandler,
    variant: "contained",
    color: "secondary"
  }, "ADD"), commentInProgress && /* @__PURE__ */ React.createElement(CircularProgress, null)), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, "COMMENTS", /* @__PURE__ */ React.createElement("hr", null)), postByIdData.getPostById.commentList && postByIdData.getPostById.commentList.length !== 0 && /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, postByIdData.getPostById.commentList.map((comment2) => /* @__PURE__ */ React.createElement(Box, {
    key: comment2._id,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    key: comment2._id,
    alignItems: "flex-start",
    style: {
      backgroundColor: "#b9f6ca",
      borderRadius: "5px",
      marginBottom: "5px"
    }
  }, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: comment2.creator.username,
    secondary: comment2.text
  })), /* @__PURE__ */ React.createElement(Delete, {
    onClick: () => deleteCommentHandler(comment2._id)
  }))))), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Post;
