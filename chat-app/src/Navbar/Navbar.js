import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
class navbar extends React.Component {
    logout = (e) => {
        localStorage.removeItem('chatApp');
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar__title">ChatApp</div>
                {
                    localStorage.getItem('chatApp') &&
                    <>
                        <Link to="/profile" className="navbar__link">Profile</Link>
                        <Link to="/users" className="navbar__link" >Users</Link>
                        <Link to="/messages" className="navbar__link">Messages</Link>
                        <div className="navbar__link logout" onClick={this.logout}>Logout</div>
                    </>
                }
            </div>
        )
    }
}
export const Navbar = withRouter(navbar);