import React,{useState, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import { LoginContext } from './context/LoginContext';
import { useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

import Navigation from './Navigation';
import Homepage from './home/Homepage';
import Dashboard from './dashboard/Dashboard';
import Footer from './Footer'
import Transactions from './transactions/Transactions'
import Account from './account/Account';
import Budget from "./budget/Budget"
import SignIn from './signup/SignIn';
// Custom Hooks
import useAuthenticate from './hooks/useAuthenticate';

import './styles/app.scss'
import './styles/index.css'

function App() {
 
  const client = new QueryClient()
  const [user, setUser] = useState(null)
  const [isAuthenticated, setAuthenticated] = useState(null)
  

  useEffect(()=>{
   useAuthenticate()
   .then(data => {
    if (data.errors) {
      setAuthenticated(false)
    } else {
      setUser(data)
      setAuthenticated(true)
    }
  })
  },[])

  return (
      <>
        <LoginContext.Provider value={{user, setUser, isAuthenticated, setAuthenticated}}>
          <QueryClientProvider client={client}>
            <Navigation isAuthenticated={isAuthenticated} user={user} setAuthenticated={setAuthenticated} setUser={setUser}/>
              <Routes>
                <Route path='/login' element={<SignIn />} exact/>
                <Route path='/' element={<Homepage isAuthenticated={isAuthenticated}/>} exact/>
                <Route path='/dashboard' element={<Dashboard />} exact/>
                <Route path='/transactions' element={<Transactions />} exact/>
                <Route path='/account/:username' element={<Account user={user}/>} exact>   
                </Route>
                <Route path='/budget' element={<Budget />} exact/>
              </Routes>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </LoginContext.Provider>
        <Footer />
      </>
  )
}

export default App
