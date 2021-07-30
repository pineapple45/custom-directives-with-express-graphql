import React, { useState } from 'react';
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

import { Role } from '../../../routes/AuthorizedRoute';
import Modal from '../../../components/Modal';
import Message from '../../../components/Message';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/AuthProvider';
import {
  assignRoleMutation,
  deleteUserMutation,
} from '../../../graphql/mutations';
import { listUsersQuery } from '../../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

const Users: React.FC = () => {
  const { authState } = useAuth();

  const { data: usersList, loading: loadingUsersList } =
    useQuery(listUsersQuery);

  const [deleteUser, { error: errorOnDeletingUser }] =
    useMutation(deleteUserMutation);

  const [assignRole, { error: errorOnAssigningUserRole }] =
    useMutation(assignRoleMutation);

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
    assignRole({
      variables: {
        role: selectedRole,
        assignedBy: authState.userId,
        assignedUser: userId,
      },
      refetchQueries: [{ query: listUsersQuery }],
    });

    setSelectedRole('');
    setIsModalOpen(false);

    setMessage({
      toShow: true,
      variant: 'success',
      messageText: 'role assigned successfully',
    });
  };

  errorOnAssigningUserRole &&
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnAssigningUserRole.message,
    });

  const deleteUserHandler = (userId: string) => {
    deleteUser({
      variables: { _id: userId },
      refetchQueries: [{ query: listUsersQuery }],
    });
    setMessage({
      ...message,
      toShow: true,
      variant: 'success',
      messageText: 'user deleted successfully',
    });
  };

  errorOnDeletingUser &&
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: errorOnDeletingUser.message,
    });

  return (
    <Layout>
      <Grid container spacing={2}>
        {loadingUsersList ? (
          <CircularProgress />
        ) : (
          <Grid item xs={11}>
            {usersList.listUsers.map((user: any) => (
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
