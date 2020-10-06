import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import styled from "styled-components";
import moment from "moment";
import EllipsisText from "react-ellipsis-text";
import { Pagination } from "@material-ui/lab";

const ItemWrapper = styled.div`
    display: flex;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 8px;
    margin-top: 20px;
    max-width: 825px;
    width: 100%;
    height: 141px;

    &:first-child {
        margin-top: 0;
    }

    &:last-of-type {
        margin-bottom: 20px;
    }
`;

const ItemImgWrapper = styled.div`
    width: 94px;
    height: 141px;
    cursor: pointer;

    & img {
        width: inherit;
        height: 100%;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }
`;

const ItemDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    justify-content: space-between;
`;

const ItemTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 141px;
    height: 100%;
`;

const ItemTitle = styled.div`
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
`;

const ItemReleaseDate = styled.div`
    font-size: 1em;
    color: #999;
`;

const ItemDescription = styled.div``;

const NoResults = styled.div`
    margin-top: 15px;
    text-align: center;
`;

const TVResults = ({
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
                pathname: "/search/tv",
                search: `?page=${page}&query=${searchValue}`,
            });
        }
        handleRoute()
    }, [page, history, searchValue]);

    if (loading) {
        return <Spinner />;
    } else if (!results.length) {
        return <NoResults>Нет сериалов, соответствующих вашему запросу.</NoResults>
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
        history.push(`/tv/${id}`);
    };

    const resultItems = results.map((item, index) => {
        const { id, name, poster_path, overview, first_air_date } = item;
        const src = poster_path
            ? `//image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path}`
            : process.env.PUBLIC_URL + "/assets/poster.png";
        const releaseDate = first_air_date ? moment(first_air_date).format("DD/MM/YYYY") : null;
        const shortOverview = overview ? <EllipsisText text={overview} length={size < 415 ? 50 : 170} /> : null;
        return (
            <ItemWrapper key={index}>
                <ItemImgWrapper onClick={() => handleRoute(id)}>
                    <img src={src} alt={name} />
                </ItemImgWrapper>
                <ItemDetailsWrapper>
                    <ItemTitleWrapper>
                        <ItemTitle onClick={() => handleRoute(id)}>{name}</ItemTitle>
                        <ItemReleaseDate>{releaseDate}</ItemReleaseDate>
                    </ItemTitleWrapper>
                    <ItemDescription>
                        {shortOverview}
                    </ItemDescription>
                </ItemDetailsWrapper>
            </ItemWrapper>
        );
    });

    return resultItems;
};

const PaginationTemplate = ({ totalPages, getResults, page }) => {
    if (totalPages > 1) {
        return (
            <Pagination
                size={"large"}
                count={totalPages}
                boundaryCount={2}
                page={page}
                onChange={(event, page) => {
                    getResults(page);
                }}
            />
        );
    } else {
        return null;
    }
};


export default TVResults;
export {
    ItemWrapper,
    ItemImgWrapper,
    ItemDetailsWrapper,
    ItemTitleWrapper,
    ItemTitle,
    ItemReleaseDate,
    ItemDescription,
    NoResults,
    PaginationTemplate,
};
