import React from 'react';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
    width: 1100px;
    margin: 10% auto;
    background-color: #f1f2f6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", Arial, sans-serif;
    font-size: 48px;
    font-weight: 700;
    padding: 100px 0;
`;

const HomePageSubTitle = styled.div`
    font-size: 32px;
    font-weight: 600;
`;

const HomePage = ({title}) => {
    document.title = title;
    return (
        <HomePageWrapper>
            Добро пожаловать в Movies Database.
            <HomePageSubTitle>
                Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
            </HomePageSubTitle>
        </HomePageWrapper>
    )
}

export default HomePage;