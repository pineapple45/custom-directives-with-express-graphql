import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  ListItem,
  ListItemText,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@material-ui/core';
import { SupervisedUserCircle, Delete } from '@material-ui/icons';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Role } from '../../../redux/constants';
import Modal from '../../../components/Modal';
import Message from '../../../components/Message';
import Layout from '../../../components/Layout';

const Users = () => {
  const { deleteUser, assignRoleToUser, listUsers } = useActions();
  const { data: authData } = useTypedSelector((state) => state.loginUser);
  const {
    data: usersList,
    loading: loadingUsersList,
    error: errorOnLoadingUsersList,
  } = useTypedSelector((state) => state.listUsers);

  const {
    data: deletedUserData,
    loading: userDeletionInProgress,
    error: errorOnDeletingUser,
  } = useTypedSelector((state) => state.deleteUser);

  const {
    data: assignedRoleData,
    loading: assigningUserRole,
    error: errorOnAssigningUserRole,
  } = useTypedSelector((state) => state.assignRoleToUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState<{
    toShow: boolean;
    variant: 'success' | 'error' | 'warning';
    messageText: string | null;
  }>({
    toShow: false,
    variant: 'success',
    messageText: '',
  });

  const assignRoleToUserHandler = (userId: string) => {
    assignRoleToUser({
      assignedBy: authData.userId,
      assignedUser: userId,
      role: selectedRole,
    });

    setSelectedRole('');
    setIsModalOpen(false);

    errorOnAssigningUserRole &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnDeletingUser,
      });

    !errorOnAssigningUserRole &&
      setMessage({
        toShow: true,
        variant: 'success',
        messageText: 'role assigned successfully',
      });
  };

  const deleteUserHandler = (userId: string) => {
    // deleteUser(userId);
    errorOnDeletingUser &&
      setMessage({
        toShow: true,
        variant: 'error',
        messageText: errorOnDeletingUser,
      });

    !errorOnDeletingUser &&
      setMessage({
        ...message,
        toShow: true,
        variant: 'success',
        messageText: 'user deleted successfully',
      });

    console.log(message);
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        {loadingUsersList ? (
          <CircularProgress />
        ) : (
          <Grid item xs={11}>
            {usersList.map((user) => (
              <Box
                key={user._id}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <ListItem alignItems="flex-start">
                  <ListItemText primary={user.email} secondary={user.role} />
                </ListItem>
                <Delete onClick={() => deleteUserHandler(user._id)} />
                <SupervisedUserCircle onClick={() => setIsModalOpen(true)} />
                <Modal
                  open={isModalOpen}
                  handleClose={() => setIsModalOpen(false)}
                >
                  <h4>Select Roles</h4>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Roles
                    </InputLabel>
                    <Select
                      native
                      value={selectedRole}
                      onChange={(e: React.ChangeEvent<any>) =>
                        setSelectedRole(e.target.value)
                      }
                      label="Roles"
                    >
                      <option aria-label="None" value="" />
                      <option value={Role.ADMIN}>{Role.ADMIN}</option>
                      <option value={Role.MODERATOR}>{Role.MODERATOR}</option>
                      <option value={Role.AUTH_USER}>{Role.AUTH_USER}</option>
                    </Select>
                  </FormControl>
                  <hr />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => assignRoleToUserHandler(user._id)}
                  >
                    Authorize
                  </Button>
                </Modal>
              </Box>
            ))}
          </Grid>
        )}

        <Message message={message} setMessage={setMessage} />
      </Grid>
    </Layout>
  );
};

export default Users;
