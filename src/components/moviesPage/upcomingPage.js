import React, {Component} from 'react';
import MovieList from './components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {upcomingMoviesRequested, upcomingMoviesLoaded, upcomingMoviesMoreRequested, upcomingMoviesMoreLoaded, popularMoviesError} from '../../actions/actions';

class UpcomingPage extends Component {   
    componentWillMount() {
        document.title = this.props.title;

        if (!this.props.movies.length) {
            this.props.upcomingMoviesRequested();
            this.loadMovies(this.props.upcomingMoviesLoaded);
        }
    }

    loadMovies = (success) => {
        const {MoviesService, popularMoviesError, page} = this.props;

        MoviesService.getUpcoming(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularMoviesError());
    }

    loadMoreMovies = () => {
        const {page, upcomingMoviesMoreLoaded, upcomingMoviesMoreRequested} = this.props;

        if (page > 500) {
            return
        }
        upcomingMoviesMoreRequested();
        this.loadMovies(upcomingMoviesMoreLoaded)
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
    const {upcomingMovies, loading, loadingMore, upcomingPage} = state.moviePageReducer;
    return {
        movies: upcomingMovies,
        loading,
        loadingMore,
        page: upcomingPage
    }
}

const mapDispatchToProps = {
    upcomingMoviesRequested,
    upcomingMoviesLoaded,
    upcomingMoviesMoreRequested,
    upcomingMoviesMoreLoaded,
    popularMoviesError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(UpcomingPage));