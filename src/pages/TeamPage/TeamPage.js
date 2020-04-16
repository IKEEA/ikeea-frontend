import React, { useState, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useStyles } from './TeamPage.styles';

const TeamPage = () => {
  const [invitationModal, setInvitationModal] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const classes = useStyles();

  const handleInviationModalOpen = () => {
    setInvitationModal(true);
  };

  const handleInviationModalClose = () => {
    setInvitationModal(false);
  };

  return (
    <div>
      <Menu>
        <Button variant="contained" color="primary" raised="true" onClick={handleInviationModalOpen}>Invite New User</Button>
      </Menu>
      <Modal
        open={invitationModal}
        onClose={handleInviationModalClose}>
        <div>Test</div>
      </Modal>
    </div>
  );
}

export default TeamPage;
