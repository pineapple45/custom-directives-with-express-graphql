import React, {useState} from "../../pkg/react.js";
import {useParams} from "../../pkg/react-router-dom.js";
import {
  CircularProgress,
  Grid,
  TextField,
  ListItemText,
  Button,
  Paper
} from "../../pkg/@material-ui/core.js";
import Card from "../../components/Card/index.js";
import Layout from "../../components/Layout/index.js";
import Message from "../../components/Message/index.js";
import {useMessage} from "../../hooks/useMessage.js";
import {getPostByIdQuery} from "../../graphql/queries.js";
import {createCommentMutation} from "../../graphql/mutations.js";
import {useQuery, useMutation} from "../../pkg/@apollo/client.js";
import {useAuth} from "../../context/AuthProvider.js";
const Post = () => {
  const {isLoggedIn, authState} = useAuth();
  const {id} = useParams();
  const {
    loading: loadingPostById,
    error: errorOnLoadingPostById,
    data: postById
  } = useQuery(getPostByIdQuery, {variables: {_id: id}});
  const [createComment, {loading: commentAdditionInProgress}] = useMutation(createCommentMutation);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useMessage({
    messageText: "",
    toShow: false,
    variant: "success"
  });
  const postCommentHandler = () => {
    if (!isLoggedIn()) {
      setMessage({
        messageText: "Please login to interact with posts",
        toShow: true,
        variant: "error"
      });
      return;
    }
    createComment({
      variables: {
        text: comment,
        creatorId: authState.userId,
        postId: id
      },
      refetchQueries: [{query: getPostByIdQuery, variables: {_id: id}}]
    });
  };
  return /* @__PURE__ */ React.createElement(Layout, null, loadingPostById ? /* @__PURE__ */ React.createElement(CircularProgress, null) : /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 2,
    justifyContent: "center"
  }, /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, /* @__PURE__ */ React.createElement(Card, {
    cardHeading: postById.getPostById.title,
    cardBody: postById.getPostById.description
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
  }, "ADD"), commentAdditionInProgress && /* @__PURE__ */ React.createElement(CircularProgress, null)), /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, "Comments"), postById.getPostById.commentList && postById.getPostById.commentList.length !== 0 && /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, postById.getPostById.commentList.map((comment2) => /* @__PURE__ */ React.createElement(Paper, {
    key: comment2._id,
    style: {padding: "10px", margin: "5px"}
  }, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: comment2.creator.username,
    secondary: comment2.text
  }))))), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  }));
};
export default Post;
