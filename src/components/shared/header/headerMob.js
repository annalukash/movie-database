import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const NavBarWrapper = styled.div`
    background-color: #bdcad9;
    background-image: linear-gradient(315deg, #bdcad9 0%, #e1dada 74%);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoWrapper = styled.div`
    font-family: 'Londrina Outline', cursive;
    font-weight: 700;
    font-size: 2.5em;
    padding-left: 15px;
`;

const MenuBurger = styled.div`
    width: 35px;
    height: 5px;
    position: relative;
    background-color: black;
    margin-right: 15px;

    &::after, &::before {
        content: '';
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

const HeaderMobile = () => {
    const [classNames, setClassNames] = useState('');

    const toggleMenu = (clas, overflow) => {
        setClassNames(clas);
        document.getElementsByTagName('html')[0].style.overflow = overflow;
        document.body.style.overflow = overflow;
    }

    return (
        <NavBarWrapper>
            <LogoWrapper>
                <Link to='/movie-database'>Movies DB</Link>  
            </LogoWrapper>
            <MenuBurger onClick={() => toggleMenu('active', 'hidden')}/>
            <MenuList className={classNames}>
                <CloseButton 
                    onClick={() => toggleMenu('', 'visible')}
                >
                    <i className="fas fa-times"></i>
                </CloseButton>
                <NavList>
                    <NavListItem>
                        Фильмы
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/movie/popular/'>Популярные</Link>
                            <span/>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/movie/playing-now/'>Смотрят сейчас</Link>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/movie/upcoming/'>Ожидаемые</Link>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/movie/top-rated/'>Лучшие</Link>
                        </NavListSubItem>
                    </NavListItem>
                    <NavListItem>
                    Сериалы
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/tv/popular/'>Популярные</Link>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/tv/airing_today/'>В эфире сегодня</Link>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/tv/on_the_air/'>По телевидению</Link>
                        </NavListSubItem>
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/tv/top-rated/'>Лучшие</Link> 
                        </NavListSubItem>
                    </NavListItem>
                    <NavListItem>
                        Люди
                        <NavListSubItem onClick={() => toggleMenu('', 'visible')}>
                            <Link to='/person/'>Популярные люди</Link> 
                        </NavListSubItem>
                    </NavListItem>
                </NavList>
            </MenuList>
        </NavBarWrapper>
    )
}

export default HeaderMobile;