import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import { PaginationTemplate, NoResults } from "./tvResults";
import styled from "styled-components";

const CompanyItemName = styled.div`
    cursor: pointer;
    max-width: 825px;
    width: 100%;
`;


const KeywordResults = ({
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
                pathname: "/search/keywords",
                search: `?page=${page}&query=${searchValue}`,
            });
        };
        handleRoute();
    }, [history, page, searchValue]);



    if (loading) {
        return <Spinner/>
    } else if (!results.length) {
        return <NoResults>Нет ключевых слов, соответствующих вашему запросу.</NoResults>
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
    const handleRoute = (id) => {
        history.push(`/keywords/${id}`)
    }

    const resultItems = results.map((item, index) => {
        const { name, id } = item;
        return (
             <CompanyItemName
                key={index}
                onClick={() => handleRoute(id)}
             >{name}</CompanyItemName>
        );
    });

    return resultItems;
}

export default KeywordResults;