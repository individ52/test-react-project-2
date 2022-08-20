import React, { FC } from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useAppSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../routes';

interface AppNavbarProps {

}

const AppNavbar: FC<AppNavbarProps> = ({ }) => {
    const { isAuth, user } = useAppSelector(state => state.auth);
    const { logout } = useActions();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Event Calender</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        {isAuth
                            ? privateRoutes.map(route => <Link className='navbar-link' key={route.path} to={route.path}>{route.label}</Link>)
                            : publicRoutes.map(route => <Link className='navbar-link' key={route.path} to={route.path}>{route.label}</Link>)
                        }
                    </Nav>
                    {isAuth && <Nav>
                        <Nav.Link href="/#" className='fs-5' active={true}>{user.username}</Nav.Link>
                        <Nav.Link onClick={logout}>
                            Log out
                        </Nav.Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default AppNavbar;