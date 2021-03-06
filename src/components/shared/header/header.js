import React from "react";
import styled from "styled-components";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isSearch } from "../../../actions/actionsSearchPage/actionSearchPage";
import { Container, Row, Col } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

const NavBarWrapper = styled.div`
    background-color: #bdcad9;
    background-image: linear-gradient(315deg, #bdcad9 0%, #e1dada 74%);
`;

const LogoWrapper = styled.div`
    font-family: "Londrina Outline", cursive;
    font-weight: 700;
    font-size: 40px;
`;

const LinkWrapper = styled.div`
    padding: 5px 15px;

    &:hover {
        background-color: rgb(209, 220, 240);
    }
`;

const NavCollapseWrapper = styled.div`
    &.dropdown-menu {
        min-width: 11rem;
    }
`;

const SearchFormWrapper = styled.div`
    position: relative;
    font-size: 1.1em;

    & input {
        border-radius: 30px;
        max-width: 350px;
        width: 100%;
        border: none;
        padding: 2px 12px;

        &:focus {
            outline: none;
        }
    }

    & button {
        position: absolute;
        right: 0;
        color: #fff;
        background: linear-gradient(to top right, #0066eb 26%, #8affcc 100%);
        border: none;
        border-radius: 30px;
        padding: 2px 12px;
        font-weight: 600;

        &:focus {
            outline: none;
        }
    }
`;

const Header = ({ searchValue, isSearch }) => {
    const history = useHistory();

    const onHandleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            history.push('/search/tv');
        }
    }

    const onHandleButton = () => {
        console.log(1)
        history.push('/search/tv');
    }

    return (
        <NavBarWrapper>
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <Navbar expand="lg">
                            <Navbar.Brand>
                                <LogoWrapper>
                                    <Link to="/movie-database"> Movies DB</Link>
                                </LogoWrapper>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <NavCollapseWrapper>
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <NavDropdown title="Фильмы" id="basic-nav-dropdown">
                                            <LinkWrapper>
                                                <Link to="/movie/popular/">Популярные</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/movie/playing-now/">Смотрят сейчас</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/movie/upcoming/">Ожидаемые</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/movie/top-rated/">Лучшие</Link>
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
                                                <Link to="/tv/popular/">Популярные</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/tv/airing_today/">В эфире сегодня</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/tv/on_the_air/">По телевидению</Link>
                                            </LinkWrapper>
                                            <LinkWrapper>
                                                <Link to="/tv/top-rated/">Лучшие</Link>
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
                                                <Link to="/person/">Популярные люди</Link>
                                            </LinkWrapper>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </NavCollapseWrapper>
                        </Navbar>
                    </Col>
                    <Col className='text-right'>
                        <SearchFormWrapper>
                            <form>
                                <input
                                    type="search"
                                    placeholder='Найти фильм, сериал, персону...'
                                    value={searchValue}
                                    onChange={event => isSearch(event.target.value)}
                                    onKeyPress={onHandleKeyPress}
                                />
                                <button
                                    disabled={!searchValue}
                                    onClick={onHandleButton}
                                >
                                    Search
                                </button>
                            </form>
                        </SearchFormWrapper>
                    </Col>
                </Row>
            </Container>
        </NavBarWrapper>
    );
};

const mapStateToProps = (state) => {
    const { searchValue } = state.searchPageReducer;
    return {
        searchValue,
    };
};

const mapDispatchToProps = {
    isSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
