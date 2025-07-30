import { Navbar, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authcontext/AuthContext';
import './Header.css';

export default function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;
    logout();
    navigate('/');
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={Link} to="/">ToDo App</Navbar.Brand>
      <Nav className="ms-auto">
        {token ? (
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/user">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
