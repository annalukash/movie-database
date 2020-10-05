import React from "react";
import { Route, Switch } from "react-router-dom";
import { TVResults, PersonResults, MovieResults, CompanyResults, KeywordResults, CollectionResults } from "./index";

const SearchRoutes = ({
    tvLoading,
    tvResults,
    tvPage,
    tvTotalPages,
    personResults,
    personPage,
    personTotalPages,
    personLoading,
    movieLoading,
    movieResults,
    moviePage,
    movieTotalPages,
    companyResults,
    companyPage,
    companyTotalPages,
    companyLoading,
    keywordLoading,
    keywordResults,
    keywordPage,
    keywordTotalPages,
    collectionLoading,
    collectionPage,
    collectionResults,
    collectionTotalPages,
    searchValue,
    loadMoreTVResults,
    loadMorePersonResults,
    loadMoreMovieResults,
    loadMoreCompanyResults,
    loadMoreKeywordResults,
    loadMoreCollectionResults
}) => {
    const value = searchValue || localStorage.getItem("searchValue");
    const valueWithoutSpaces = value.replace(/ /g, "%20");

    return (
        <Switch>
            <Route
                exact
                path="/search/tv"
                render={({ history }) => {
                    return (
                        <TVResults
                            history={history}
                            results={tvResults}
                            page={tvPage}
                            totalPages={tvTotalPages}
                            loading={tvLoading}
                            loadMoreResults={loadMoreTVResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
            <Route
                exact
                path="/search/person"
                render={({ history }) => {
                    return (
                        <PersonResults
                            history={history}
                            results={personResults}
                            page={personPage}
                            totalPages={personTotalPages}
                            loading={personLoading}
                            loadMoreResults={loadMorePersonResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
            <Route
                exact
                path="/search/movie"
                render={({ history }) => {
                    return (
                        <MovieResults
                            history={history}
                            results={movieResults}
                            page={moviePage}
                            totalPages={movieTotalPages}
                            loading={movieLoading}
                            loadMoreResults={loadMoreMovieResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
            <Route
                exact
                path="/search/company"
                render={({ history }) => {
                    return (
                        <CompanyResults
                            history={history}
                            results={companyResults}
                            page={companyPage}
                            totalPages={companyTotalPages}
                            loading={companyLoading}
                            loadMoreResults={loadMoreCompanyResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
            <Route
                exact
                path="/search/keywords"
                render={({ history }) => {
                    return (
                        <KeywordResults
                            history={history}
                            results={keywordResults}
                            page={keywordPage}
                            totalPages={keywordTotalPages}
                            loading={keywordLoading}
                            loadMoreResults={loadMoreKeywordResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
            <Route
                exact
                path="/search/collection"
                render={({ history }) => {
                    return (
                        <CollectionResults
                            history={history}
                            results={collectionResults}
                            page={collectionPage}
                            totalPages={collectionTotalPages}
                            loading={collectionLoading}
                            loadMoreResults={loadMoreCollectionResults}
                            searchValue={valueWithoutSpaces}
                        />
                    );
                }}
            />
        </Switch>
    );
};

export default SearchRoutes;
