import { Link } from "react-router-dom"
import "./myNavbar.scss"
import { useAuth } from "../../context/AuthContext"
import { Navbar, Container, Nav } from "react-bootstrap"

function MyNavbar() {
  const { state, dispatch } = useAuth()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            {state.isAuthenticated ? (
              <>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
