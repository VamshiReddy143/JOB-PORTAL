import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Signup from './pages/SignUp'
import Login from './pages/Login'
import Home from './Home'
import Jobs from './Jobs'
import Browse from './Browse'
import Profile from './Profile/profile'
import JobDescription from './JobDescription'
import Companies from './components/Companies'
import CompanyCreate from './components/CompanyCreate'
import CompanySetup from './components/CompanySetup'
import AdminJobs from "./AdminJobs";
import PostJob from './components/PostJob'
import Applicants from './components/Applicants'
import ProtectedRoute from './components/ProtectRoute'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // admin 
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App