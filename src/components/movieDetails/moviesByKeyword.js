import React, { Component } from 'react';
import styled from 'styled-components';
import MoviesServices from '../../services/services';
import Spinner from '../shared/spinner/spinner';
import LoadMoreSpinner from '../shared/spinner/loadMoreSpinner';
import {MovieListByKeywords} from './components';

const MovieListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`;


const ButtonWrapper = styled.div`
    margin: 0 auto 20px;
    text-align: center;
`;

const LoadMoreButton = styled.button`
    background-color: rgb(1, 180, 228);
    width: 930px;
    border: none;
    font-family: 'Source Sans Pro';
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    padding: 7px 0;
    
    &:focus {
        outline: none;
    }
`;

export default class MoviesByKeyword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            loading: true,
            page: 0,
            loadingMore: false,
            totalResults: 0,
            totalPages: 0,
            keywordName: ''
        }
        this.moviesServices = new MoviesServices();
    }

    componentDidMount() {
        this.getMovies(this.props.keywordId);

        this.getKeywordName(this.props.keywordId);
    }

    onLoadingMovies = (response, results, pages) => {
        this.setState({
            movies: [...this.state.movies, ...response],
            loading: false,
            page: this.state.page + 1,
            loadingMore: false,
            totalResults: results,
            totalPages: pages,
            
        })
    }

    getMovies = (keywordId) => {
        const {page} = this.state;

        this.onToogleLoading();

        this.moviesServices.getMovieByKeyword(this.props.keywordId, page + 1)
            .then((response) => {
                this.onLoadingMovies(response.results, response.total_results, response.total_pages)
            })
    }

    getKeywordName = (keywordId) => {
        this.moviesServices.getKeywordName(this.props.keywordId)
            .then((response) => {
                this.onLoadingKeywordName(response.name)
            })
    }

    onLoadingKeywordName = (response) => {
        this.setState({
            keywordName: response
        })
    }

    onToogleLoading = () => {
        this.setState({
            loadingMore: true
        })
    }

    render() {
        const {movies, loading, loadingMore, totalResults, totalPages, keywordName} = this.state;

        const spinnerMovies = loading ? <Spinner/> : <MovieListByKeywords movies={movies} totalResults={totalResults} keywordName={keywordName}/>;
        const loadSpinner = loadingMore ? <LoadMoreSpinner/> : 'Загрузить еще';
        const button = totalPages === 1 ? null : <ButtonWrapper><LoadMoreButton onClick={ () => this.getMovies()}>{loadSpinner}</LoadMoreButton></ButtonWrapper> 

        return (
            <>               
                <MovieListWrapper>
                    {spinnerMovies}
                </MovieListWrapper>
                    {button}           
            </>
        )
    }
}