import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import SearchRoutes from "./components/searchRoutes";
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

const SearchBarWrapper = styled.div`
    border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 8px;
`;

const SearchBarHeader = styled.div`
    background-color: rgb(1, 180, 228);
    color: #fff;
    padding: 20px;
    font-weight: 600;
    font-size: 1.2em;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

const SearchBarBody = styled.div`
    margin: 5px 0;
`;

const SearchBarItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    cursor: pointer;
    transition: background 200ms;

    &.active {
        background: rgba(0, 0, 0, 0.08);
    }

    &:hover {
        background: rgba(0, 0, 0, 0.08);
    }

    &:hover div {
        background: #fff;
    }

    & a {
        color: #000;
    }
`;

const SearchBarItemSum = styled.div`
    background: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 0 10px;
    transition: background 200ms;
`;

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
        } = this.props;

        return (
            <Container className="my-4">
                <Row>
                    <Col className="col-3">
                        <SearchBarWrapper>
                            <SearchBarHeader>Результаты поиска</SearchBarHeader>
                            <SearchBarBody>
                                <SearchBarItem>
                                    <Link to="/search/tv">Сериалы</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(tvTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/person">Люди</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(personTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/movie">Фильмы</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(movieTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/company">Компании</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(companyTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/keywords">Ключевые слова</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(keywordTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/collection">Коллекции</Link>
                                    <SearchBarItemSum>{this.numberWithCommas(collectionTotalResults)}</SearchBarItemSum>
                                </SearchBarItem>
                            </SearchBarBody>
                        </SearchBarWrapper>
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
