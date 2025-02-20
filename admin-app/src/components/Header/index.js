import React from 'react'
import { Nav,NavDropdown,Navbar ,Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink ,Link} from 'react-router-dom';
import { signout } from '../../actions';
const Header = (props) => {
  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const logout=()=>{
    dispatch(signout())

  }
   const renderNonLoggedInLinks=()=>{
    return(<Nav>
      <li className="nav-item">
      <NavLink to="/Signin" className="nav-link">Signin</NavLink>
      </li>
      <li className="nav-item" >
      <NavLink to="/Signup" className="nav-link">Signup</NavLink>
      </li>
     
    </Nav>)
   }
   const renderLoggedInLinks=()=>{
    return(<Nav>
      
      <li className="nav-item" >
      <span  className="nav-link" onClick={logout}>Signout</span>
      </li>
     
    </Nav>)
   }

  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' className=" bg-dark" style={{zIndex:1}} variant='dark'>
      <Container fluid> 
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Link to={'/'} className="navbar-brand">ADMIN DASHBOARD</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
           
           {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>*/}
          </Nav>
          {auth.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()}
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Header
