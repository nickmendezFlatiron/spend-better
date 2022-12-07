import React from 'react'
import { useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import textLogo from "./assets/text-logo.png";

const Navigation = () => {
  const navigate = useNavigate()
  function handleDisplayMode(e){
    e.stopPropagation();
  }

  const userDropdown =    <NavDropdown title="Username" id="collasible-nav-dropdown" menuVariant='dark' rootCloseEvent='click' align="end">
                            <NavDropdown.Item href="/account">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                              Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3" >
                            <Form>
                              <Form.Check 
                                type="switch"
                                id="display-mode"
                                label="Dark Mode"
                                onClick={handleDisplayMode}
                              />
                            </Form>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                              Logout
                            </NavDropdown.Item>
                          </NavDropdown>
  const loginButton = <Button onClick={() => navigate('/login')}  variant='secondary'>Login</Button>
  return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='px-4 py-1 header-bg fs-5' sticky="top">
          <Navbar.Brand href="/">
            <img src={textLogo} alt="Spend Better Text Logo" className='nav-text-logo'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
              <Nav.Link href="/budget">Budget</Nav.Link>
            </Nav>
            <Nav>
            {loginButton}
            </Nav>
          </Navbar.Collapse>
        
      </Navbar>
  )
}

export default Navigation