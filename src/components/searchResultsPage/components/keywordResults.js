import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import { PaginationTemplate } from "./tvResults";
import styled from "styled-components";

const CompanyItemName = styled.div`
    cursor: pointer;
    min-width: 825px;
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
        return <div>Нет ключевых слов, соответствующих вашему запросу.</div>
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