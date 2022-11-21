import React from 'react'
import useAuth from '../hooks/useAuth';
import Login from './Login';
const Dashboard = () => {
    
  const {token}  = Login;


  return (
      <>
      <h1>Dashboard</h1>
      <div>token is {token}</div>
    </>
  )
}

export default Dashboard;