import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/auth/Login'
import { SignUp } from './pages/auth/SignUp'
import PrivateRoute from './pages/routes/PrivateRoute'
import Dashboard from './pages/admin/Dashboard'
import ManageTask from './pages/admin/managetask'
import ManageUser from './pages/admin/ManageUser'
import CreateTask from './pages/admin/createtask'
import UserDashboard from './pages/user/UserDashboard'
import MyTask from './pages/user/MyTask'
import TaskDetails from './pages/user/TaskDetails'
export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>

      {/* Admin Routes */}
      <route element={<PrivateRoute allowedRoles={["admin"]}/>}/>
      <Route path="/admin/dashboard" element={<Dashboard/>}/>
      <Route path="/admin/task" element={<ManageTask/>}/>
      <Route path="/admin/users" element={<ManageUser/>}/>
      <Route path="/admin/create-task" element={<CreateTask/>}/>

      {/* User Routes */}
      <route element={<PrivateRoute allowedRoles={["user"]}/>}/>
      <Route path="/user/dashboard" element={<UserDashboard/>}/>
      <Route path="/user/task" element={<MyTask/>}/>
      <Route path="/user/task-details/:id" element={<TaskDetails/>}/>

    </Routes>
    </BrowserRouter>
  )
}
