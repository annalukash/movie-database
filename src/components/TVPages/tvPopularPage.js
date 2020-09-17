import React, {Component} from 'react';
import MovieList from '../moviesPage/components/movieList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {popularTvRequested, popularTvLoaded, popularTvError, popularTvMoreRequested, popularTvMoreLoaded} from '../../actions/actionsMoviesTVPage/actionMoviesTVPage';


class TVPopularPage extends Component {   
    componentWillMount() { 
        if(!this.props.tv.length) {
            this.props.popularTvRequested();
            this.loadTV(this.props.popularTvLoaded)
        }      
    }

    loadTV = (success) => {
        const {page, MoviesService, popularTvError} = this.props;

        MoviesService.getTVPopular(page + 1)
            .then((res) => success(res.results))
            .catch(error => popularTvError())
    }

    loadMoreTv = () => {
        const {page, popularTvMoreRequested, popularTvMoreLoaded} = this.props;

        if (page > 500) {
            return
        }

        popularTvMoreRequested();
        this.loadTV(popularTvMoreLoaded)
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
                getMovies = {this.loadMoreTv}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {popularTv, popularPage, loading, loadingMore} = state.tvPageReducer;
    return {
        tv: popularTv,
        page: popularPage,
        loading,
        loadingMore
    }
}

const mapDispatchToProps = {
    popularTvRequested,
    popularTvLoaded,
    popularTvMoreRequested,
    popularTvMoreLoaded,
    popularTvError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(TVPopularPage));
