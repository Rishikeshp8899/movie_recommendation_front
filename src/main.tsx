import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
createBrowserRouter,
RouterProvider,
} from 'react-router-dom'

import CheckAuth from './auth/CheckAuth.tsx'
import TodoList from './TodoList/TodoList.tsx'
import Login from './login/Login.tsx'
import Register from './register/Register.tsx'
import UpdateTask from './updateTask/updateTask.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'

import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter([
  {
    path: '',
    element:(
    <App />
    ),
    children: [
      {
        path: '/login',
        element: <CheckAuth><Login /></CheckAuth>
      },
      {
        path: '/register',
        element: <CheckAuth><Register /></CheckAuth>,
      },
      {
        path: '/update-todo/:id',
        element:(
          <ProtectedRoute>
            <UpdateTask   />
          </ProtectedRoute>
        )
      },
      {
        path: '/todo-list',
        element: (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>

        ),
      },
       {
        path: '/',
        element: (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>

        ),
      },
    ],
  },
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
