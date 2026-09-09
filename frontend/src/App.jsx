import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import  Login  from './pages/auth/Login.jsx'
import  SignUp  from './pages/auth/SignUp.jsx'
import PrivateRoute from './routes/PrivateRoute'
import ManageTask from './pages/admin/ManageTasks.jsx'
import ManageUser from './pages/admin/ManageUsers.jsx'
import CreateTask from './pages/admin/CreateTask.jsx'
import Dashboard from './pages/user/UserDashboard.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import MyTask from './pages/user/MyTasks.jsx'
import TaskDetails from './pages/user/TaskDetails.jsx'
import { useSelector } from "react-redux"

export const App = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tasks" element={<ManageTask />} />
          <Route path="/admin/users" element={<ManageUser />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/tasks" element={<MyTask />} />
          <Route path="/user/task-details/:id" element={<TaskDetails />} />
        </Route>
        {/* Default Route */}
          <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

const Root = () => {
  const { currentUser } = useSelector((state) => state.user)

  if (!currentUser) {
    return <Navigate to={"/login"} />
  }

  return currentUser.role === "admin" ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    <Navigate to={"/user/dashboard"} />
  )
}