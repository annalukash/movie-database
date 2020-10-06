import React, { useEffect } from "react";
import Spinner from "../../shared/spinner/spinner";
import moment from "moment";
import EllipsisText from "react-ellipsis-text";
import {
    ItemWrapper,
    ItemImgWrapper,
    ItemDetailsWrapper,
    ItemTitleWrapper,
    ItemTitle,
    ItemReleaseDate,
    ItemDescription,
    PaginationTemplate,
    NoResults
} from "./tvResults";

const MovieResults = ({
    loading, 
    results, 
    page, 
    totalPages,
    history,
    loadMoreResults,
    searchValue,
    size
}) => {
    
    useEffect(() => {
        const handleRoute = () => {
            history.push({
                pathname: "/search/movie",
                search: `?page=${page}&query=${searchValue}`,
            });
        };
        handleRoute();
    }, [history, page, searchValue]);



    if (loading) {
        return <Spinner/>
    } else if (!results.length) {
        return <NoResults>Нет фильмов, соответствующих вашему запросу.</NoResults>
    } else {
        return (
            <>
                <Items results={results} history={history} size={size}/>
                <PaginationTemplate totalPages={totalPages} getResults={loadMoreResults} page={page} />
            </>
        );
    }
};

const Items = ({results, history, size}) => {
    const handleRoute = (id) => {
        history.push(`/movie/${id}`);
    };

    const resultItems = results.map((item, index) => {
        const { id, title, poster_path, overview, release_date } = item;
        const src = poster_path
            ? `//image.tmdb.org/t/p/w94_and_h141_bestv2${poster_path}`
            : process.env.PUBLIC_URL + "/assets/poster.png";
        const releaseDate = release_date ? moment(release_date).format("DD/MM/YYYY") : null;
        const shortOverview = overview ? <EllipsisText text={overview} length={size < 415 ? 50 : 170} /> : null;
        return (
            <ItemWrapper key={index}>
                <ItemImgWrapper onClick={() => handleRoute(id)}>
                    <img src={src} alt={title} />
                </ItemImgWrapper>
                <ItemDetailsWrapper>
                    <ItemTitleWrapper>
                        <ItemTitle onClick={() => handleRoute(id)}>{title}</ItemTitle>
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
}

export default MovieResults;