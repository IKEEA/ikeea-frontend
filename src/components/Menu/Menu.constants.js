import React from 'react';

//icons
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventNote from '@material-ui/icons/EventNote';
import AccountTree from '@material-ui/icons/AccountTree';
import Group from '@material-ui/icons/Group';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NaturePeople from '@material-ui/icons/NaturePeople';

export const userMenuItems = [
    {
      title: 'My Calendar',
      icon: <PermContactCalendar />,
      path: '/'
    }, {
      title: 'Topics',
      icon: <ListAltIcon />,
      path: '/manageTopics'
    }, {
      title: 'Learning Tree',
      icon: <NaturePeople />,
      path: '/learningTree'
    }, {
      title: 'Profile',
      icon: <AccountCircle />,
      path: '/profile'
    }
  ];
  
  export const adminMenuItems = [
    {
      title: 'My Team',
      icon: <Group />,
      path: '/myTeam'
    }, {
      title: 'Team Calendar',
      icon: <EventNote />,
      path: '/teamCalendar'
    }, {
      title: 'Team Learning Tree',
      icon: <AccountTree />,
      path: '/learningTree'
    }
  ];
  