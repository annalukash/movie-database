import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import {Link} from 'react-router-dom';

const LogoWrapper = styled.div`
    font-family: 'Londrina Outline', cursive;
    font-weight: 700;
    font-size: 40px;
`;

const LinkWrapper = styled.div`
    padding: 5px 15px; 

    &:hover{
        background-color: rgb(209, 220, 240);
    }
`;

const NavCollapseWrapper = styled.div`
    &.dropdown-menu {
        min-width: 11rem;
    }
`;



const Header = () => {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <LogoWrapper>
                    <Link to='/'> Movies DB</Link>   
                </LogoWrapper>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <NavCollapseWrapper>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Фильмы" id="basic-nav-dropdown">
                            <LinkWrapper>
                                <Link to='/movie/popular/'>Популярные</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/movie/playing-now/'>Смотрят сейчас</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/movie/upcoming/'>Ожидаемые</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/movie/top-rated/'>Лучшие</Link>
                            </LinkWrapper>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </NavCollapseWrapper>
            <NavCollapseWrapper>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Сериалы" id="basic-nav-dropdown">
                            <LinkWrapper>
                                <Link to='/tv/popular/'>Популярные</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/tv/airing_today/'>В эфире сегодня</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/tv/on_the_air/'>По телевидению</Link>
                            </LinkWrapper>
                            <LinkWrapper>
                                <Link to='/tv/top-rated/'>Лучшие</Link>
                            </LinkWrapper>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </NavCollapseWrapper>
            <NavCollapseWrapper>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Люди" id="basic-nav-dropdown">
                            <LinkWrapper>
                                <Link to='/person/popular/'>Популярные люди</Link>
                            </LinkWrapper>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </NavCollapseWrapper>
        </Navbar> 
    )
}

export default Header;