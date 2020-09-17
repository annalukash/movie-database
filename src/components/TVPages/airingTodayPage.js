import React, { Component } from 'react';
import MovieList from '../moviesPage/components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {airingTodayTvRequested, airingTodayTvLoaded, popularTvError, airingTodayTvMoreRequested, airingTodayTvMoreLoaded} from '../../actions/actionsMoviesTVPage/actionMoviesTVPage';


class AiringTodayPage extends Component {
    componentWillMount() {
        if (!this.props.tv.length) {
            this.props.airingTodayTvRequested();
            this.loadTV(this.props.airingTodayTvLoaded);
        }
     }
 
     loadTV = (success) => {
         const {page, MoviesService, popularTvError} = this.props;
 
         MoviesService.getTVAiringToday(page + 1)
             .then((res) => success(res.results))
             .catch(error => popularTvError())
     }
 
     loadMoreTV = () => {
         const {page, airingTodayTvMoreRequested, airingTodayTvMoreLoaded} = this.props;
 
         if (page > 500) {
             return
         }
 
         airingTodayTvMoreRequested();
         this.loadTV(airingTodayTvMoreLoaded)
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
    const {airingTodayTv, loading, loadingMore, airingTodayPage} = state.tvPageReducer;
    return {
        tv: airingTodayTv,
        page: airingTodayPage,
        loading,
        loadingMore
    }
} 

const mapDispatchToProps = {
    airingTodayTvRequested,
    airingTodayTvLoaded,
    airingTodayTvMoreRequested,
    airingTodayTvMoreLoaded,
    popularTvError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(AiringTodayPage));