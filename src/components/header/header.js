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



const Header = () => {
    return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <LogoWrapper>
                    <Link to='/'> Movies DB</Link>   
                </LogoWrapper>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Фильмы" id="basic-nav-dropdown">
                        <LinkWrapper>
                            <Link to='/popular/'>Популярные</Link>
                        </LinkWrapper>
                        <LinkWrapper>
                            <Link to='/playing-now/'>Смотрят сейчас</Link>
                        </LinkWrapper>
                        <LinkWrapper>
                            <Link to='/upcoming/'>Ожидаемые</Link>
                        </LinkWrapper>
                        <LinkWrapper>
                            <Link to='/top-rated/'>Лучшие</Link>
                        </LinkWrapper>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar> 
    )
}

export default Header;