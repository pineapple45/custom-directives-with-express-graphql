import React, {useState} from "../../../../_snowpack/pkg/react.js";
import {
  Grid,
  Box,
  ListItem,
  ListItemText,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Button
} from "../../../../_snowpack/pkg/@material-ui/core.js";
import {SupervisedUserCircle, Delete} from "../../../../_snowpack/pkg/@material-ui/icons.js";
import {Role} from "../../../routes/AuthorizedRoute.js";
import Modal from "../../../components/Modal/index.js";
import Message from "../../../components/Message/index.js";
import Layout from "../../../components/Layout/index.js";
import {useAuth} from "../../../context/AuthProvider.js";
import {
  assignRoleMutation,
  deleteUserMutation
} from "../../../graphql/mutations.js";
import {listUsersQuery} from "../../../graphql/queries.js";
import {useMutation, useQuery} from "../../../../_snowpack/pkg/@apollo/client.js";
const Users = () => {
  const {authState, isLoggedIn} = useAuth();
  const {
    data: usersList,
    loading: loadingUsersList,
    error: errorOnLoadingUsersList
  } = useQuery(listUsersQuery);
  const [
    deleteUser,
    {
      data: deletedUserData,
      loading: userDeletionInProgress,
      error: errorOnDeletingUser
    }
  ] = useMutation(deleteUserMutation);
  const [
    assignRole,
    {
      data: assignedRoleData,
      loading: assigningUserRole,
      error: errorOnAssigningUserRole
    }
  ] = useMutation(assignRoleMutation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [message, setMessage] = useState({
    toShow: false,
    variant: "success",
    messageText: ""
  });
  const assignRoleToUserHandler = (userId) => {
    assignRole({
      variables: {
        role: selectedRole,
        assignedBy: authState.userId,
        assignedUser: userId
      },
      refetchQueries: [{query: listUsersQuery}]
    });
    setSelectedRole("");
    setIsModalOpen(false);
    setMessage({
      toShow: true,
      variant: "success",
      messageText: "role assigned successfully"
    });
  };
  errorOnAssigningUserRole && setMessage({
    toShow: true,
    variant: "error",
    messageText: errorOnAssigningUserRole.message
  });
  const deleteUserHandler = (userId) => {
    deleteUser({
      variables: {_id: userId},
      refetchQueries: [{query: listUsersQuery}]
    });
    setMessage({
      ...message,
      toShow: true,
      variant: "success",
      messageText: "user deleted successfully"
    });
  };
  errorOnDeletingUser && setMessage({
    toShow: true,
    variant: "error",
    messageText: errorOnDeletingUser.message
  });
  return /* @__PURE__ */ React.createElement(Layout, null, /* @__PURE__ */ React.createElement(Grid, {
    container: true,
    spacing: 2
  }, loadingUsersList ? /* @__PURE__ */ React.createElement(CircularProgress, null) : /* @__PURE__ */ React.createElement(Grid, {
    item: true,
    xs: 11
  }, usersList.listUsers.map((user) => /* @__PURE__ */ React.createElement(Box, {
    key: user._id,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    alignItems: "flex-start"
  }, /* @__PURE__ */ React.createElement(ListItemText, {
    primary: user.email,
    secondary: user.role
  })), /* @__PURE__ */ React.createElement(Delete, {
    onClick: () => deleteUserHandler(user._id)
  }), /* @__PURE__ */ React.createElement(SupervisedUserCircle, {
    onClick: () => setIsModalOpen(true)
  }), /* @__PURE__ */ React.createElement(Modal, {
    open: isModalOpen,
    handleClose: () => setIsModalOpen(false)
  }, /* @__PURE__ */ React.createElement("h4", null, "Select Roles"), /* @__PURE__ */ React.createElement(FormControl, {
    variant: "outlined"
  }, /* @__PURE__ */ React.createElement(InputLabel, {
    htmlFor: "outlined-age-native-simple"
  }, "Roles"), /* @__PURE__ */ React.createElement(Select, {
    native: true,
    value: selectedRole,
    onChange: (e) => setSelectedRole(e.target.value),
    label: "Roles"
  }, /* @__PURE__ */ React.createElement("option", {
    "aria-label": "None",
    value: ""
  }), /* @__PURE__ */ React.createElement("option", {
    value: Role.ADMIN
  }, Role.ADMIN), /* @__PURE__ */ React.createElement("option", {
    value: Role.MODERATOR
  }, Role.MODERATOR), /* @__PURE__ */ React.createElement("option", {
    value: Role.AUTH_USER
  }, Role.AUTH_USER))), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: () => assignRoleToUserHandler(user._id)
  }, "Authorize"))))), /* @__PURE__ */ React.createElement(Message, {
    message,
    setMessage
  })));
};
export default Users;
