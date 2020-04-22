import React, { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';

const MainPage = () => {
  const [user] = useContext(UserContext);
  console.log(user);
  return (
    <Menu>
      Main page
    </Menu>
  );
}

export default MainPage;
