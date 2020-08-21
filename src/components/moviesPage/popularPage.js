import React, {Component} from 'react';
import MoviesServices from '../../services/services';
import MovieList from './components/movieList';


export default class PopularPage extends Component {
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
        document.title = this.props.title;
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

        this.moviesServices.getPopular(page + 1)
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
        const {history} = this.props;

        return(
            <MovieList
                movies={movies}
                loading={loading}
                loadingMore={loadingMore}
                small={small}
                history={history}
                url={history.location.pathname}
                getMovies = {this.loadMovies}
            />
        )
    }
}
