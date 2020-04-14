import React, { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';

const TeamPage = () => {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  return (
    <Menu>
      Team page
    </Menu>
  );
}

export default TeamPage;
