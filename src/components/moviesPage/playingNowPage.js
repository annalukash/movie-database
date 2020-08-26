import React, { Component } from 'react';
import MovieList from './components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {playingNowMoviesRequested, playingNowMoviesLoaded, popularMoviesError, playingNowMoviesMoreLoaded, playingNowMoviesMoreRequested} from '../../actions/actions';

class PlayingNowPage extends Component {   
    componentWillMount() {
        document.title = this.props.title;

        if(!this.props.movies.length) {
            this.props.playingNowMoviesRequested();
            this.loadMovies(this.props.playingNowMoviesLoaded)
        }
    }

    loadMovies = (success) => {
        const {MoviesService, popularMoviesError, page} = this.props;

        MoviesService.getNowPlaying(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularMoviesError());
    }

    loadMoreMovies = () => {
        const {playingNowMoviesMoreLoaded, playingNowMoviesMoreRequested, page} = this.props;

        if (page > 500) {
            return
        }
        playingNowMoviesMoreRequested();
        this.loadMovies(playingNowMoviesMoreLoaded);
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
    const {playingNowMovies, loading, loadingMore, playingNowPage}  = state.moviePageReducer;
    return {
       movies: playingNowMovies,
       loading,
       loadingMore,
       page: playingNowPage 
    }
}

const mapDispatchToProps = {
    popularMoviesError,
    playingNowMoviesRequested,
    playingNowMoviesLoaded,
    playingNowMoviesMoreRequested,
    playingNowMoviesMoreLoaded
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(PlayingNowPage));