import React, {useContext} from 'react';
import {UserContext} from './../../context/UserContext';

function MainPage() {

  const user = useContext(UserContext);

  console.log(user);

  return (
    <div>
    main
    </div>
  );
}

export default MainPage;
