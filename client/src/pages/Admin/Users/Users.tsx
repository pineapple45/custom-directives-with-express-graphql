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
import { listUsersQuery } from '../../../graphql/queries';
import { useQuery } from '@apollo/client';
import useDeleteUser from '../../../hooks/mutations/useDeleteUser';
import useAssignRole from '../../../hooks/mutations/useAssignRole';

const Users: React.FC = () => {
  const { authState } = useAuth();

  const { data: usersList, loading: loadingUsersList } = useQuery(
    listUsersQuery,
    { fetchPolicy: 'network-only' }
  );

  const { deleteUserMutationHandler } = useDeleteUser();
  const { assignRoleMutationHandler } = useAssignRole();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    role: '',
    id: '',
  });
  const [message, setMessage] = useState<{
    toShow: boolean;
    variant: 'success' | 'error' | 'warning';
    messageText: string | null;
  }>({
    toShow: false,
    variant: 'success',
    messageText: '',
  });

  const selectUserHandler = (userId: string) => {
    setSelectedUser({
      ...selectedUser,
      id: userId,
    });
  };

  const assignRoleToUserHandler = async () => {
    const response = await assignRoleMutationHandler({
      role: selectedUser.role,
      assignedBy: authState.userId,
      assignedUser: selectedUser.id,
    });

    setMessage({
      messageText: response.error ? response.data.message : 'role assigned',
      toShow: true,
      variant: response.error ? 'error' : 'success',
    });

    setSelectedUser({
      id: '',
      role: '',
    });
    setIsModalOpen(false);
  };

  const deleteUserHandler = async (userId: string) => {
    const response = await deleteUserMutationHandler({ _id: userId });
    setMessage({
      messageText: response.error ? response.data.message : 'user deleted',
      toShow: true,
      variant: response.error ? 'error' : 'success',
    });
  };

  return (
    <Layout>
      <Grid container spacing={2} justifyContent="center">
        {loadingUsersList ? (
          <CircularProgress />
        ) : (
          <Grid item xs={11} md={8}>
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
                <SupervisedUserCircle
                  onClick={() => {
                    selectUserHandler(user._id);
                    setIsModalOpen(true);
                  }}
                />
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
                      value={selectedUser.role}
                      onChange={(e: React.ChangeEvent<any>) => {
                        setSelectedUser({
                          ...selectedUser,
                          role: e.target.value,
                        });
                      }}
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
                    onClick={() => assignRoleToUserHandler()}
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
