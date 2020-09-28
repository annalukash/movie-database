import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { TVResults, PersonResults, MovieResults, CompanyResults, KeywordResults } from "./components";
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
    collectionSearchError
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
            MoviesService,
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

        } = this.props;
        const history = createBrowserHistory();

        history.push({
            pathname: "/search",
            search: `?page=${tvPage}&query=tom`,
        });

        tvSearchRequested();
        personSearchRequested();
        movieSearchRequested();
        companySearchRequested();
        keywordSearchRequested();
        this.getSearch('tv', tvPage, MoviesService.getSearchByName, tvSearchLoaded, tvSearchError);
        this.getSearch('person', personPage, MoviesService.getSearchByName, personSearchLoaded, personSearchError);
        this.getSearch('movie', moviePage, MoviesService.getSearchByName, movieSearchLoaded, movieSearchError);
        this.getSearch('company', companyPage, MoviesService.getSearchByName, companySearchLoaded, companySearchError);
        this.getSearch('keyword', keywordPage, MoviesService.getSearchByName, keywordSearchLoaded, keywordSearchError);
    }

    getSearch = (type, page, request, handleSuccess, handleError) => {
        request(type, "tom", page)
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
        const { MoviesService, tvSearchLoaded, tvSearchError } = this.props;
        this.getSearch('tv', page, MoviesService.getSearchByName, tvSearchLoaded, tvSearchError);
    };

    loadMorePersonResults = (page) => {
        const { MoviesService, personSearchLoaded, personSearchError } = this.props;
        this.getSearch('person', page, MoviesService.getSearchByName, personSearchLoaded, personSearchError);
    };

    loadMoreMovieResults = (page) => {
        const { MoviesService, movieSearchLoaded, movieSearchError } = this.props;
        this.getSearch('movie', page, MoviesService.getSearchByName, movieSearchLoaded, movieSearchError);
    };

    loadMoreCompanyResults = (page) => {
        const { MoviesService, companySearchLoaded, companySearchError } = this.props;
        this.getSearch('company', page, MoviesService.getSearchByName, companySearchLoaded, companySearchError);
    };

    loadMoreKeywordResults = (page) => {
        const { MoviesService, keywordSearchLoaded, keywordSearchError } = this.props;
        this.getSearch('keyword', page, MoviesService.getSearchByName, keywordSearchLoaded, keywordSearchError);
    };

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
        } = this.props;

        console.log(tvTotalResults, tvResults)

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
                                    <SearchBarItemSum>0</SearchBarItemSum>
                                </SearchBarItem>
                                <SearchBarItem>
                                    <Link to="/search/network">Телесети</Link>
                                    <SearchBarItemSum>0</SearchBarItemSum>
                                </SearchBarItem>
                            </SearchBarBody>
                        </SearchBarWrapper>
                    </Col>
                    <Col className="d-flex flex-column align-items-center">
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
                                            loadMoreResults={this.loadMoreTVResults}
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
                                            loadMoreResults={this.loadMorePersonResults}
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
                                            loadMoreResults={this.loadMoreMovieResults}
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
                                            loadMoreResults={this.loadMoreCompanyResults}
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
                                            loadMoreResults={this.loadMoreKeywordResults}
                                        />
                                    );
                                }}
                            />
                        </Switch>
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
    collectionSearchError
};

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(SearchResultsPage));
