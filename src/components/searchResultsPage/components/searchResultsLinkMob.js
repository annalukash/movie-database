import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchBarHeader = styled.div`
    background-color: rgb(1, 180, 228);
    color: #fff;
    font-weight: 600;
    font-size: 1.2em;
    padding: 10px 20px;
    max-width: 100vw;
    text-align: center;
`;

const SearchBarBody = styled.div`
    margin: 5px 0;
    /* overflow: scroll; */
    padding-bottom: 10px;

    & div {
        display: flex;
    }
`;

const SearchBarItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 200ms;
    white-space: nowrap;

    &.active {
        color: rgb(1, 180, 228);
        font-weight: 600;
    }

    &.active span {
        border: 1px solid rgb(1, 180, 228);
    }

    & a {
        color: #000;
    }

    & span {
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        padding: 0 10px;
        transition: background 200ms;
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.5);
    }
`;

const SearchResultsLinkMobile = ({
    numberWithCommas,
    collectionTotalResults,
    keywordTotalResults,
    tvTotalResults,
    personTotalResults,
    movieTotalResults,
    companyTotalResults,
}) => {
    const ref = useRef(null);

    const onToggleActive = (event) => {
        Array.from(ref.current.children).forEach((item, index) => {
            if (event.target && item.className.includes("active")) {
                console.log(event.target)
            } else if (event.currentTarget && !(item.className.includes("active"))) {
                // item.className = item.className.replace(" active", "");
                // console.log(item)
                console.log(event.currentTarget)
            }
        });
    };

    return (
        <>
            <SearchBarHeader>
                <div>Результаты поискаf</div>
            </SearchBarHeader>
            <SearchBarBody>
                <div ref={ref}>
                    <SearchBarItem 
                        className="active" 
                        onClick={onToggleActive}
                    >
                        <Link to="/search/tv">Сериалы</Link>
                        <span>{numberWithCommas(tvTotalResults)}</span>
                    </SearchBarItem>
                    <SearchBarItem
                        onClick={onToggleActive}
                    >
                        <Link to="/search/person">Люди</Link>
                        <span>{numberWithCommas(personTotalResults)}</span>
                    </SearchBarItem>
                    <SearchBarItem>
                        <Link to="/search/movie">Фильмы</Link>
                        <span>{numberWithCommas(movieTotalResults)}</span>
                    </SearchBarItem>
                    <SearchBarItem>
                        <Link to="/search/company">Компании</Link>
                        <span>{numberWithCommas(companyTotalResults)}</span>
                    </SearchBarItem>
                    <SearchBarItem>
                        <Link to="/search/keywords">Ключевые слова</Link>
                        <span>{numberWithCommas(keywordTotalResults)}</span>
                    </SearchBarItem>
                    <SearchBarItem>
                        <Link to="/search/collection">Коллекции</Link>
                        <span>{numberWithCommas(collectionTotalResults)}</span>
                    </SearchBarItem>
                </div>
            </SearchBarBody>
        </>
    );
};

export default SearchResultsLinkMobile;
