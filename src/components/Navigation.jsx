import React from 'react'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import { useAuth } from '../hooks/useAuth';

const Navigation = ({pages}) => {
  const {token, logout} = useAuth();
  return (
    <nav>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/dashboard'>Home</NavLink>
      <NavLink to='/admin'>Admin</NavLink>
      {token &&(
        <Button type='button' onClick={logout}>
            Log out
        </Button>
      )}
    </nav>
  )
}

export default Navigation;