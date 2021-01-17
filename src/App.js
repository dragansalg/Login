import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerListPage from './pages/CustomerListPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import { Link } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="container shadow mt-5">

        <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item flex-fill">
          <Link className="text-center" to="/login">Login</Link>
        </li>
      </ul>
      
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/home">
          <HomePage />
        </Route>

        <Route path="/customers/create">
          <CustomerCreatePage />
        </Route>

        <Route 
          path="/customers/:id/edit"
          component={CustomerUpdatePage}
        />

        <Route path="/customers/:id"
        component={CustomerDetailPage}
        />

        <Route path="/customers">
          <CustomerListPage />
        </Route>
      </Switch>
    </div>

    
  );
}

export default App;
