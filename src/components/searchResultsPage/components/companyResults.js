import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import { PaginationTemplate, NoResults } from "./tvResults";
import styled from "styled-components";

const CompanyItemWrapper = styled.div`
    border-bottom: 1px solid #ccc;
    display: flex;
    max-width: 825px;
    width: 100%;
    font-size: 1.2em;
    padding: 5px 0;

    &:first-child {
        border-top: 1px solid #ccc;
    }

    &:last-of-type {
        margin-bottom: 25px;
    }

    &:hover {
        text-decoration: none;
        color: #666;
    }
`;

const CompanyItemName = styled.div`
    cursor: pointer;
`;

const CompanyItemCountry = styled.div`
    padding: 2px 4px;
    background-color: rgba(0,0,0,0.2);
    color: #fff;
    border-radius: 4px;
    font-size: 0.8em;
    margin-left: 7px;
`;

const CompanyResults = ({
    loading, 
    results, 
    page, 
    totalPages,
    history,
    loadMoreResults,
    searchValue
}) => {

    useEffect(() => {
        const handleRoute = () => {
            history.push({
                pathname: "/search/company",
                search: `?page=${page}&query=${searchValue}`,
            });
        };
        handleRoute();
    }, [history, page, searchValue]);



    if (loading) {
        return <Spinner/>
    } else if (!results.length) {
        return <NoResults>Нет компаний, соответствующих вашему запросу.</NoResults>
    } else {
        return (
            <>
                <Items results={results} history={history} />
                <PaginationTemplate totalPages={totalPages} getResults={loadMoreResults} page={page} />
            </>
        );
    }
};

const Items = ({results, history}) => {

    const resultItems = results.map((item, index) => {
        const { name, origin_country } = item;
        const country = origin_country ? <CompanyItemCountry>{origin_country}</CompanyItemCountry> : null;

        return (
            <CompanyItemWrapper key={index}>
                <CompanyItemName>{name}</CompanyItemName>
                {country}
            </CompanyItemWrapper>
        );
    });

    return resultItems;
}

export default CompanyResults;