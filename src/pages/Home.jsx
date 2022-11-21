import React from 'react'
import useAuth from '../hooks/useAuth';
const Home = () => {
    const {login} = useAuth();
  return (
    <>
    <div>Home</div>

    <button type='button' onClick={login}>Sign in</button>
    </>


  )
}

export default Home;