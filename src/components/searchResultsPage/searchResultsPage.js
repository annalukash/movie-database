import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import SearchRoutes from "./components/searchRoutes";
import { SearchResultsLink, SearchResultsLinkMobile } from "./components";
import { Container, Row, Col } from "react-bootstrap";
import WithMoviesService from "../hoc/withMoviesService";
import {
    tvSearchRequested,
    tvSearchLoaded,
    tvSearchError,
    personSearchRequested,
    personSearchLoaded,
    personSearchError,
    movieSearchRequested,
    movieSearchLoaded,
    movieSearchError,
    companySearchRequested,
    companySearchLoaded,
    companySearchError,
    keywordSearchRequested,
    keywordSearchLoaded,
    keywordSearchError,
    collectionSearchRequested,
    collectionSearchLoaded,
    collectionSearchError,
    isSearch,
} from "../../actions/actionsSearchPage/actionSearchPage";

class SearchResultsPage extends Component {
    componentWillMount() {
        const {
            tvPage,
            personPage,
            moviePage,
            companyPage,
            tvSearchRequested,
            tvSearchLoaded,
            tvSearchError,
            personSearchRequested,
            personSearchLoaded,
            personSearchError,
            movieSearchRequested,
            movieSearchLoaded,
            movieSearchError,
            companySearchRequested,
            companySearchLoaded,
            companySearchError,
            keywordPage,
            keywordSearchRequested,
            keywordSearchLoaded,
            keywordSearchError,
            collectionPage,
            collectionSearchRequested,
            collectionSearchLoaded,
            collectionSearchError,
            searchValue,
            isSearch,
        } = this.props;
        const history = createBrowserHistory();

        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        isSearch(value);

        history.push({
            pathname: "/search/tv",
            search: `?page=${tvPage}&query=${valueWithoutSpaces}`,
        });

        tvSearchRequested();
        personSearchRequested();
        movieSearchRequested();
        companySearchRequested();
        keywordSearchRequested();
        collectionSearchRequested();

        this.getSearch("tv", valueWithoutSpaces, tvPage, tvSearchLoaded, tvSearchError);
        this.getSearch("person", valueWithoutSpaces, personPage, personSearchLoaded, personSearchError);
        this.getSearch("movie", valueWithoutSpaces, moviePage, movieSearchLoaded, movieSearchError);
        this.getSearch("company", valueWithoutSpaces, companyPage, companySearchLoaded, companySearchError);
        this.getSearch("keyword", valueWithoutSpaces, keywordPage, keywordSearchLoaded, keywordSearchError);
        this.getSearch("collection", valueWithoutSpaces, collectionPage, collectionSearchLoaded, collectionSearchError);
    }

    componentWillUnmount() {
        const { isSearch } = this.props;
        isSearch("");
    }

    getSearch = (type, searchValue, page, handleSuccess, handleError) => {
        const { MoviesService } = this.props;
        MoviesService.getSearchByName(type, searchValue, page)
            .then((res) => {
                const payload = {
                    results: res.results,
                    totalPages: res.total_pages,
                    page: res.page,
                    totalResults: res.total_results,
                };
                handleSuccess(payload);
            })
            .catch((error) => handleError());
    };

    loadMoreTVResults = (page) => {
        const { searchValue, tvSearchLoaded, tvSearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("tv", valueWithoutSpaces, page, tvSearchLoaded, tvSearchError);
    };

    loadMorePersonResults = (page) => {
        const { searchValue, personSearchLoaded, personSearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("person", valueWithoutSpaces, page, personSearchLoaded, personSearchError);
    };

    loadMoreMovieResults = (page) => {
        const { searchValue, movieSearchLoaded, movieSearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("movie", valueWithoutSpaces, page, movieSearchLoaded, movieSearchError);
    };

    loadMoreCompanyResults = (page) => {
        const { searchValue, companySearchLoaded, companySearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("company", valueWithoutSpaces, page, companySearchLoaded, companySearchError);
    };

    loadMoreKeywordResults = (page) => {
        const { searchValue, keywordSearchLoaded, keywordSearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("keyword", valueWithoutSpaces, page, keywordSearchLoaded, keywordSearchError);
    };

    loadMoreCollectionResults = (page) => {
        const { searchValue, collectionSearchLoaded, collectionSearchError } = this.props;
        const value = searchValue || localStorage.getItem("searchValue");
        const valueWithoutSpaces = value.replace(/ /g, "%20");

        this.getSearch("collection", valueWithoutSpaces, page, collectionSearchLoaded, collectionSearchError);
    };

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    render() {
        const {
            tvTotalResults,
            personTotalResults,
            movieTotalResults,
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
            companyTotalResults,
            companyLoading,
            keywordTotalResults,
            keywordLoading,
            keywordResults,
            keywordPage,
            keywordTotalPages,
            collectionLoading,
            collectionPage,
            collectionResults,
            collectionTotalPages,
            collectionTotalResults,
            searchValue,
            width,
        } = this.props;

        const linkTemplate =
            width < 415 ? (
                <SearchResultsLinkMobile
                    numberWithCommas={this.numberWithCommas}
                    collectionTotalResults={collectionTotalResults}
                    keywordTotalResults={keywordTotalResults}
                    tvTotalResults={tvTotalResults}
                    personTotalResults={personTotalResults}
                    movieTotalResults={movieTotalResults}
                    companyTotalResults={companyTotalResults}
                />
            ) : (
                <SearchResultsLink
                    numberWithCommas={this.numberWithCommas}
                    collectionTotalResults={collectionTotalResults}
                    keywordTotalResults={keywordTotalResults}
                    tvTotalResults={tvTotalResults}
                    personTotalResults={personTotalResults}
                    movieTotalResults={movieTotalResults}
                    companyTotalResults={companyTotalResults}
                />
            );

        return (
            <Container className="my-4">
                <Row className="flex-column flex-xl-row">
                    <Col className="col-xl-3 col-12 px-0 px-lg-1">
                        {linkTemplate}
                    </Col>
                    <Col className="d-flex flex-column align-items-center">
                        <SearchRoutes
                            tvLoading={tvLoading}
                            tvResults={tvResults}
                            tvPage={tvPage}
                            tvTotalPages={tvTotalPages}
                            personResults={personResults}
                            personPage={personPage}
                            personTotalPages={personTotalPages}
                            personLoading={personLoading}
                            movieLoading={movieLoading}
                            movieResults={movieResults}
                            moviePage={moviePage}
                            movieTotalPages={movieTotalPages}
                            companyResults={companyResults}
                            companyPage={companyPage}
                            companyTotalPages={companyTotalPages}
                            companyLoading={companyLoading}
                            keywordLoading={keywordLoading}
                            keywordResults={keywordResults}
                            keywordPage={keywordPage}
                            keywordTotalPages={keywordTotalPages}
                            collectionLoading={collectionLoading}
                            collectionPage={collectionPage}
                            collectionResults={collectionResults}
                            collectionTotalPages={collectionTotalPages}
                            searchValue={searchValue}
                            loadMoreTVResults={this.loadMoreTVResults}
                            loadMorePersonResults={this.loadMorePersonResults}
                            loadMoreMovieResults={this.loadMoreMovieResults}
                            loadMoreCompanyResults={this.loadMoreCompanyResults}
                            loadMoreKeywordResults={this.loadMoreKeywordResults}
                            loadMoreCollectionResults={this.loadMoreCollectionResults}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        tvResults,
        tvPage,
        tvTotalPages,
        tvLoading,
        tvTotalResults,
        personResults,
        personPage,
        personTotalPages,
        personLoading,
        personTotalResults,
        movieLoading,
        movieResults,
        moviePage,
        movieTotalPages,
        movieTotalResults,
        companyResults,
        companyPage,
        companyTotalPages,
        companyTotalResults,
        companyLoading,
        keywordLoading,
        keywordResults,
        keywordPage,
        keywordTotalPages,
        keywordTotalResults,
        collectionLoading,
        collectionResults,
        collectionPage,
        collectionTotalPages,
        collectionTotalResults,
        searchValue,
    } = state.searchPageReducer;
    return {
        tvResults,
        tvPage,
        tvTotalPages,
        tvLoading,
        tvTotalResults,
        personResults,
        personPage,
        personTotalPages,
        personLoading,
        personTotalResults,
        movieLoading,
        movieResults,
        moviePage,
        movieTotalPages,
        movieTotalResults,
        companyResults,
        companyPage,
        companyTotalPages,
        companyTotalResults,
        companyLoading,
        keywordLoading,
        keywordResults,
        keywordPage,
        keywordTotalPages,
        keywordTotalResults,
        collectionLoading,
        collectionResults,
        collectionPage,
        collectionTotalPages,
        collectionTotalResults,
        searchValue,
    };
};

const mapDispatchToProps = {
    tvSearchRequested,
    tvSearchLoaded,
    tvSearchError,
    personSearchRequested,
    personSearchLoaded,
    personSearchError,
    movieSearchRequested,
    movieSearchLoaded,
    movieSearchError,
    companySearchRequested,
    companySearchLoaded,
    companySearchError,
    keywordSearchRequested,
    keywordSearchLoaded,
    keywordSearchError,
    collectionSearchRequested,
    collectionSearchLoaded,
    collectionSearchError,
    isSearch,
};

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage));
