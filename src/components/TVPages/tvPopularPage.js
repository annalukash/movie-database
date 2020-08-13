import React, {Component} from 'react';
import MoviesServices from '../../services/services';
import MovieList from '../moviesPage/components/movieList';


export default class TVPopularPage extends Component {
    constructor(props) {
        super(props);
        this.moviesServices = new MoviesServices();
        this.state = {
            tv: [],
            loading: true,
            page: 0,
            loadingMore: false,
            small: true
        }     
    }
    
    componentWillMount() { 
        this.loadTV();        
    }

    onLoading = (response) => {
        this.setState({
            tv: [...this.state.tv, ...response],
            loading: false,
            page: this.state.page + 1,
            loadingMore: false
        })
    }

    loadTV = () => {
        const {page} = this.state;

        this.onToogleLoading();

        if (page > 500) {
            return
        }

        this.moviesServices.getTVPopular(page + 1)
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
        const {tv, loading, loadingMore, small} = this.state;
        const {history} = this.props;

        return(
            <MovieList
                movies={tv}
                loading={loading}
                loadingMore={loadingMore}
                small={small}
                history={history}
                url={history.location.pathname}
                getMovies = {this.loadTV}
            />
        )
    }
}
