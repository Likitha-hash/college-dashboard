import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    🎓 CollegeConnect
                </NavLink>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" end>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/colleges" className="nav-link">
                            Colleges
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/reviews" className="nav-link">
                            Reviews
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/favorites" className="nav-link">
                            Favorites
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/logout" className="nav-link">
                            Logout
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="theme-toggle-btn" onClick={toggleTheme}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;