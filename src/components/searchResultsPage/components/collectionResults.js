import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import EllipsisText from "react-ellipsis-text";
import {
    ItemWrapper,
    ItemImgWrapper,
    ItemDetailsWrapper,
    ItemTitleWrapper,
    ItemTitle,
    ItemDescription,
    PaginationTemplate,
} from "./tvResults";

const CollectionResults = ({
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
                pathname: "/search/collection",
                search: `?page=${page}&query=${searchValue}`,
            });
        };
        handleRoute();
    }, [history, page, searchValue]);



    if (loading) {
        return <Spinner/>
    } else if (!results.length) {
        return <div>Нет коллекций, соответствующих вашему запросу.</div>
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
        history.push(`/collection/${id}`);
    };

    const resultItems = results.map((item, index) => {
        const { id, name, poster_path, overview } = item;
        const src = poster_path
            ? `//image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path}`
            : process.env.PUBLIC_URL + "/assets/poster.png";
        const shortOverview = overview ? <EllipsisText text={overview} length={170} /> : null;
        return (
            <ItemWrapper key={index}>
                <ItemImgWrapper onClick={() => handleRoute(id)}>
                    <img src={src} alt={name} />
                </ItemImgWrapper>
                <ItemDetailsWrapper>
                    <ItemTitleWrapper>
                        <ItemTitle onClick={() => handleRoute(id)}>{name}</ItemTitle>
                        <ItemDescription>
                            {shortOverview}
                        </ItemDescription>
                    </ItemTitleWrapper>
                </ItemDetailsWrapper>
            </ItemWrapper>
        );
    });

    return resultItems;
}

export default CollectionResults;