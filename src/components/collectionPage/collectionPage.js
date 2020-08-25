import React, { Component }  from 'react';
import MoviesServices from '../../services/services';
import CollectionDetails from './components/collectionDetails';
import Spinner from '../shared/spinner/spinner';


export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
        this.moviesServices = new MoviesServices();
        this.state = {
            collection: null,
            loading: true,
            genresObj: {},
            cast: [],
            crew: [],
            revenue: 0
        }     
    }
    
    componentWillMount() {
        const {collectionId} = this.props;
        this.getGenresName(); 
        this.loadCollection(collectionId); 
    }

    loadCollection = (collectionId) => {
        this.moviesServices.getCollection(collectionId)
            .then((res) => { 
                if (res) {
                    const movieIds = res.parts.map(part => part.id);
                    this.onLoading(res);
                    this.getCast(res);
                    this.getMovieDetails(movieIds);
                }
            })
    }

    onLoading = (response) => {
        this.setState({
            collection: response,
            loading: false
        })
    }

    getGenresName = () => {
        this.moviesServices.getGenreList()
            .then((res) => { 
                this.onLoadingGenres(res)
            })
    }

    onLoadingGenres = (response) => {
        this.setState({
            genresObj: response
        })
    }

    getMovieDetails = (ids) => {
        const total = [];
        ids.forEach(id => {
            this.moviesServices.getMovieDetails(id)
            .then((response) => {
                if (response) {
                    total.push(response.revenue);
                    this.onLoadingDetails(total);
                }
            })
        })
    }

    onLoadingDetails = (total) => {
        const totalRevenue = total.reduce((sum, current) => sum + current, 0)
        this.setState({
            revenue: totalRevenue
        })
    }

    getCast = (collection) => {
        const ids = collection.parts.map(part => part.id)
        this.moviesServices.getCast(ids)
        .then((res) => { 
            this.onLoadingCast(res.cast, res.crew);

        })
    }

    onLoadingCast = (cast, crew) => {
        this.setState({
            cast,
            crew
        })
    }

    render() {
        const {collection, loading, genresObj, cast, crew, revenue} = this.state;
        const {history} = this.props;
        const template = loading ? <Spinner/> : <CollectionDetails 
                                                    collection={collection} 
                                                    loading={loading} 
                                                    history={history} 
                                                    genre={genresObj}
                                                    cast={cast}
                                                    crew={crew}
                                                    revenue={revenue}
                                                />
        
        return(
            <>{template}</>
        )
    }
}