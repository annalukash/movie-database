import React, {Component} from 'react';
import MovieList from '../moviesPage/components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {onTheAirTvRequested, onTheAirTvLoaded, popularTvError, onTheAirTvMoreRequested, onTheAirTvMoreLoaded} from '../../actions/actions';


class OnTheAirPage extends Component {
    componentWillMount() {
       if (!this.props.tv.length) {
           this.props.onTheAirTvRequested();
           this.loadTV(this.props.onTheAirTvLoaded);
       }
    }

    loadTV = (success) => {
        const {page, MoviesService, popularTvError} = this.props;

        MoviesService.getTVOnTheAir(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularTvError())
    }

    loadMoreTV = () => {
        const {page, onTheAirTvMoreRequested, onTheAirTvMoreLoaded} = this.props;

        if (page > 500) {
            return
        }

        onTheAirTvMoreRequested();
        this.loadTV(onTheAirTvMoreLoaded)
    }

    render() {
        const {tv, loading, loadingMore, history} = this.props;
        
        return(
            <MovieList
                movies={tv}
                loading={loading}
                loadingMore={loadingMore}
                history={history}
                url={history.location.pathname}
                getMovies = {this.loadMoreTV}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {onTheAirTv, loading, loadingMore, onTheAirPage} = state.tvPageReducer;
    return {
        tv: onTheAirTv,
        page: onTheAirPage,
        loading,
        loadingMore
    }
} 

const mapDispatchToProps = {
    onTheAirTvRequested,
    onTheAirTvLoaded,
    onTheAirTvMoreRequested,
    onTheAirTvMoreLoaded,
    popularTvError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(OnTheAirPage));