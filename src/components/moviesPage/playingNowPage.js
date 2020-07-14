import React, { Component } from 'react';
import MoviesServices from '../../services/services';
import MovieList from './components/movieList';


export default class PlayingNowPage extends Component {
    constructor(props) {
        super(props);
        this.moviesServices = new MoviesServices();
        this.state = {
            movies: [],
            loading: true,
            page: 0,
            loadingMore: false,
            small: true
        }     
    }
    
    componentWillMount() {
       this.loadMovies();
    }

    onLoading = (response) => {
        this.setState({
            movies: [...this.state.movies, ...response],
            loading: false,
            page: this.state.page + 1,
            loadingMore: false
        })
    }

    loadMovies = () => {
        const {page} = this.state;

        this.onToogleLoading();

        if (page > 500) {
            return
        }

        this.moviesServices.getNowPlaying(page + 1)
            .then((res) => {
                this.onLoading(res.results)
            })
    }

    onToogleLoading = () => {
        this.setState({
            loadingMore: true
        })
    }

    render() {
        const {movies, loading, loadingMore, small} = this.state;
        
        return(
            <MovieList
                movies={movies}
                loading={loading}
                loadingMore={loadingMore}
                small={small}
                history={this.props.history}
                url={'playing-now'}
                getMovies = {this.loadMovies}
            />
        )
    }
}