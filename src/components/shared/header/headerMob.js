import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isSearch } from "../../../actions/actionsSearchPage/actionSearchPage";
import { useHistory } from "react-router-dom";

const NavBarWrapper = styled.div`
    background-color: #bdcad9;
    background-image: linear-gradient(315deg, #bdcad9 0%, #e1dada 74%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 21;
`;

const LogoWrapper = styled.div`
    font-style: italic;
    font-weight: 700;
    font-size: 2.5em;
    margin-left: 15px;
`;

const MenuBurger = styled.div`
    width: 35px;
    height: 5px;
    position: relative;
    background-color: black;

    &::after,
    &::before {
        content: "";
        width: 35px;
        height: 5px;
        position: absolute;
        background-color: black;
    }

    &::before {
        top: -10px;
    }

    &::after {
        top: 10px;
    }
`;

const MenuList = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f1dfd1;
    background-image: linear-gradient(315deg, #f1dfd1 0%, #f6f0ea 74%);
    z-index: 50;
    transform: translate(150%, 0);
    transition: transform 300ms;
    overflow-y: hidden;

    &.active {
        transform: translate(0, 0);
    }
`;

const CloseButton = styled.div`
    position: absolute;
    right: 25px;
    top: 30px;

    & i {
        font-size: 2.5em;
    }
`;

const NavList = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const NavListItem = styled.div`
    padding-top: 10px;
    font-size: 1.5em;
    font-weight: 800;
`;

const NavListSubItem = styled.div`
    padding: 15px 0 0 15px;
    font-size: 0.77em;
    font-weight: 600;
    text-decoration: none;
    transition: text-decoration 200ms;

    &:hover {
        text-decoration: underline;
    }

    & a {
        color: rgba(33, 37, 41, 0.8);
    }
`;

const SearchButton = styled.div`
    margin-right: 35px;

    & i {
        font-size: 1.5em;
    }
`;

const SectionWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
`;

const SearchInput = styled.div`
    position: absolute;
    z-index: 20;
    transform: translate(0, -100%);
    transition: transform 300ms;
    text-align: center;
    font-size: 1.1em;
    border-bottom: 1px solid rgb(0, 0, 0, 0.3);

    &.open {
        transform: translate(0, 0);
    }

    & input {
        width: 100vw;
        border: none;
        padding: 3px 7px;

        &:focus {
            outline: none;
        }
    }

    & button {
        position: absolute;
        right: 0;
        border: none;
        padding: 3px 7px;
        color: #fff;
        background: linear-gradient(to top right, #0066eb 26%, #8affcc 100%);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        &:focus {
            outline: none;
        }
    }
`;

const HeaderWrapper = styled.div`
    position: relative;
`;

const HeaderMobile = ({ searchValue, isSearch }) => {
    const [classNames, setClassNames] = useState("");
    const ref = useRef(null);
    const history = useHistory();

    const onHandleKeyPress = (event) => {
        if (event.key === "Enter" && event.target.value) {
            history.push("/search/tv");
        }
    };

    const onHandleButton = () => {
        history.push("/search/tv");
    };

    const toggleMenu = (clas, overflow) => {
        setClassNames(clas);
        document.getElementsByTagName("html")[0].style.overflow = overflow;
        document.body.style.overflow = overflow;
    };

    const toggleSearch = () => {
        if (ref.current.className.includes("open")) {
            ref.current.className = ref.current.className.replace(" open", "");
        } else {
            ref.current.className += " open";
        }
    };

    return (
        <HeaderWrapper>
            <NavBarWrapper>
                <LogoWrapper>
                    <Link to="/movie-database">Movies DB</Link>
                </LogoWrapper>
                <SectionWrapper>
                    <SearchButton onClick={toggleSearch}>
                        <i className="fas fa-search"></i>
                    </SearchButton>
                    <MenuBurger onClick={() => toggleMenu("active", "hidden")} />
                    <MenuList className={classNames}>
                        <CloseButton onClick={() => toggleMenu("", "visible")}>
                            <i className="fas fa-times"></i>
                        </CloseButton>
                        <NavList>
                            <NavListItem>
                                Фильмы
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/movie/popular/">Популярные</Link>
                                    <span />
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/movie/playing-now/">Смотрят сейчас</Link>
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/movie/upcoming/">Ожидаемые</Link>
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/movie/top-rated/">Лучшие</Link>
                                </NavListSubItem>
                            </NavListItem>
                            <NavListItem>
                                Сериалы
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/tv/popular/">Популярные</Link>
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/tv/airing_today/">В эфире сегодня</Link>
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/tv/on_the_air/">По телевидению</Link>
                                </NavListSubItem>
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/tv/top-rated/">Лучшие</Link>
                                </NavListSubItem>
                            </NavListItem>
                            <NavListItem>
                                Люди
                                <NavListSubItem onClick={() => toggleMenu("", "visible")}>
                                    <Link to="/person/">Популярные люди</Link>
                                </NavListSubItem>
                            </NavListItem>
                        </NavList>
                    </MenuList>
                </SectionWrapper>
            </NavBarWrapper>
            <SearchInput ref={ref}>
                <input
                    type="search"
                    placeholder="Найти фильм, сериал, персону..."
                    value={searchValue}
                    onChange={(event) => isSearch(event.target.value)}
                    onKeyPress={onHandleKeyPress}
                />
                <button
                    disabled={!searchValue}
                    onClick={onHandleButton}
                >Search</button>
            </SearchInput>
        </HeaderWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMobile);
