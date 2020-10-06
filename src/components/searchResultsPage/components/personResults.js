import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import styled from "styled-components";
import EllipsisText from "react-ellipsis-text";
import { PaginationTemplate, NoResults } from "./tvResults";

const ItemWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    max-width: 825px;
    width: 100%;

    align-items: center;

    &:first-child {
        margin-top: 0;
    }

    &:last-of-type {
        margin-bottom: 20px;
    }
`;

const ItemImgWrapper = styled.div`
    width: 90px;
    height: 90px;

    cursor: pointer;
    & img {
        width: inherit;
        border-radius: 8px;
    }
`;

const ItemNameWrapper = styled.div`
    padding: 10px 20px;
`;

const ItemName = styled.div`
    cursor: pointer;
    font-size: 1.2em;
    font-weight: 600;
`;

const ItemDetailsWrapper = styled.div`
    display: flex;
    font-size: 1em;
`;

const ItemDepartment = styled.div``;

const ItemCast = styled.div`
    cursor: pointer;

    &::before {
        content: "●";
        padding: 0 5px;
    }
`;

const PersonResults = ({
    history,
    results,
    page,
    totalPages,
    loading,
    loadMoreResults,
    searchValue,
    size
}) => {

    useEffect(() => {
        const handleRoute = () => {
            history.push({
                pathname: "/search/person",
                search: `?page=${page}&query=${searchValue}`,
            });
        }
        handleRoute()
    }, [page, history, searchValue]);


    if (loading) {
        return <Spinner/>
    } else if (!results.length) {
        return <NoResults>Нет людей, соответствующих вашему запросу.</NoResults>
    } else {
        return (
            <>
                <Items results={results} history={history} size={size}/>
                <PaginationTemplate totalPages={totalPages} getResults={loadMoreResults} page={page} />
            </>
        );
    }
};

const Items = ({ results, history, size }) => {
    const handleRoute = (id) => {
        history.push(`/person/${id}`);
    };

    const resultItems = results.map((item, index) => {
        const { name, id, known_for_department, known_for, profile_path } = item;

        const src = profile_path
            ? `//image.tmdb.org/t/p/w90_and_h90_face${profile_path}`
            : process.env.PUBLIC_URL + "/assets/avatar.png";
        const cast = known_for ? known_for.map((item) => item.title || item.name).join(", ") : null;

        const castTemplate = !cast?.length ? null : (
            <ItemCast>
                <EllipsisText text={cast} length={size < 415 ? 20 : 80} />
            </ItemCast>
        );

        return (
            <ItemWrapper key={index}>
                <ItemImgWrapper onClick={() => handleRoute(id)}>
                    <img src={src} alt={name} />
                </ItemImgWrapper>
                <ItemNameWrapper>
                    <ItemName onClick={() => handleRoute(id)}>
                        {name}
                    </ItemName>
                    <ItemDetailsWrapper>
                        <ItemDepartment>{known_for_department}</ItemDepartment>
                        {castTemplate}
                    </ItemDetailsWrapper>
                </ItemNameWrapper>
            </ItemWrapper>
        );
    });

    return resultItems;
};

export default PersonResults;