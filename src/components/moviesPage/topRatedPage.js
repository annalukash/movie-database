import React, { Component } from 'react';
import MovieList from './components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {topRatedMoviesRequested, topRatedMoviesLoaded, topRatedMoviesMoreRequested, topRatedMoviesMoreLoaded, popularMoviesError} from '../../actions/actions';


class TopRatedPage extends Component {
    componentWillMount() {
        document.title = this.props.title;
        
        if (!this.props.movies.length) {
            this.props.topRatedMoviesRequested();
            this.loadMovies(this.props.topRatedMoviesLoaded)
        }
    }

    loadMovies = (success) => {
        const {page, MoviesService, popularMoviesError} = this.props;

        MoviesService.getTopRated(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularMoviesError())
    }

    loadMoreMovies = () => {
        const {page, topRatedMoviesMoreRequested, topRatedMoviesMoreLoaded} = this.props;

        if (page > 500) {
            return
        }

        topRatedMoviesMoreRequested();
        this.loadMovies(topRatedMoviesMoreLoaded)
    }

    render() {
        const {movies, loading, loadingMore, history} = this.props;
        
        return(
            <MovieList
                movies={movies}
                loading={loading}
                loadingMore={loadingMore}
                history={history}
                url={history.location.pathname}
                getMovies = {this.loadMoreMovies}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {topRatedMovies, topRatedPage, loading, loadingMore} = state.moviePageReducer;
    return {
        movies: topRatedMovies,
        page: topRatedPage,
        loading,
        loadingMore
    }
}

const mapDispatchToProps = {
    topRatedMoviesRequested,
    topRatedMoviesLoaded,
    topRatedMoviesMoreRequested,
    topRatedMoviesMoreLoaded,
    popularMoviesError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(TopRatedPage));