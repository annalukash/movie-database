import React, { Component } from 'react';
import MovieList from '../moviesPage/components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {topRatedTvRequested, topRatedTvTvLoaded, popularTvError, topRatedTvTvMoreRequested, topRatedTvTvMoreLoaded} from '../../actions/actions';


class TVTopRatedPage extends Component {
    componentWillMount() {
       if (!this.props.tv.length) {
           this.props.topRatedTvRequested();
           this.loadTV(this.props.topRatedTvTvLoaded)
       }
    }

    loadTV = (success) => {
        const {page, MoviesService, popularTvError} = this.props;

        MoviesService.getTVTopRated(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularTvError())
    }
    
    loadMoreTV = () => {
        const {page, topRatedTvTvMoreRequested, topRatedTvTvMoreLoaded} = this.props;

        if (page > 500) {
            return
        }

        topRatedTvTvMoreRequested();
        this.loadTV(topRatedTvTvMoreLoaded)
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
    const {topRatedTv, topRatedPage, loading, loadingMore} = state.tvPageReducer;
    return {
        tv: topRatedTv,
        page: topRatedPage,
        loading, 
        loadingMore
    }
}

const mapDispatchToProps = {
    topRatedTvRequested,
    topRatedTvTvLoaded,
    topRatedTvTvMoreRequested,
    topRatedTvTvMoreLoaded,
    popularTvError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(TVTopRatedPage));