import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
    border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 8px;
`;

const SearchBarHeader = styled.div`
    background-color: rgb(1, 180, 228);
    color: #fff;
    padding: 20px;
    font-weight: 600;
    font-size: 1.2em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const SearchBarBody = styled.div`
    margin: 5px 0;
`;

const SearchBarItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 200ms;

    &.active {
        background: rgba(0, 0, 0, 0.08);
    }

    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }

    &:hover div {
        background: #fff;
    }

    & a {
        color: #000;
    }
`;

const SearchBarItemSum = styled.div`
    background: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 0 10px;
    transition: background 200ms;
`;

const SearchResultsLink = ({
    numberWithCommas,
    collectionTotalResults,
    keywordTotalResults,
    tvTotalResults,
    personTotalResults,
    movieTotalResults,
    companyTotalResults,
}) => {
    return (
        <SearchBarWrapper>
            <SearchBarHeader>Результаты поиска</SearchBarHeader>
            <SearchBarBody>
                <SearchBarItem>
                    <Link to="/search/tv">Сериалы</Link>
                    <SearchBarItemSum>{numberWithCommas(tvTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
                <SearchBarItem>
                    <Link to="/search/person">Люди</Link>
                    <SearchBarItemSum>{numberWithCommas(personTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
                <SearchBarItem>
                    <Link to="/search/movie">Фильмы</Link>
                    <SearchBarItemSum>{numberWithCommas(movieTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
                <SearchBarItem>
                    <Link to="/search/company">Компании</Link>
                    <SearchBarItemSum>{numberWithCommas(companyTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
                <SearchBarItem>
                    <Link to="/search/keywords">Ключевые слова</Link>
                    <SearchBarItemSum>{numberWithCommas(keywordTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
                <SearchBarItem>
                    <Link to="/search/collection">Коллекции</Link>
                    <SearchBarItemSum>{numberWithCommas(collectionTotalResults)}</SearchBarItemSum>
                </SearchBarItem>
            </SearchBarBody>
        </SearchBarWrapper>
    );
};

export default SearchResultsLink;
