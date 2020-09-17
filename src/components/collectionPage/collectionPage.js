import React, { Component } from "react";
import CollectionDetails from "./components/collectionDetails";
import Spinner from "../shared/spinner/spinner";
import CollectionDetailsMobile from './components/collectionDetailsMob';
import WithMoviesService from "../hoc/withMoviesService";
import { connect } from "react-redux";
import {
    collectionRequested,
    collectionLoaded,
    collectionError,
    genresRequested,
    genresLoaded,
    collectionMovieDetailsRequested,
    collectionMovieDetailsLoaded,
    collectionCastRequested,
    collectionCastLoaded
} from "../../actions/actionsCollectionPage/actionCollectionPage";

class CollectionPage extends Component {
    componentWillMount() {
        const {
            collectionId,
            collectionRequested,
            collection,
            genres,
            genresRequested
        } = this.props;

        if (!collection || !genres) {
            collectionRequested();
            genresRequested();   
            this.getGenresName();
            this.loadCollection(collectionId);
        }
    }

    loadCollection = (collectionId) => {
        const { MoviesService, collectionLoaded, collectionError } = this.props;
        MoviesService.getCollection(collectionId)
            .then((res) => {
                if (res) {
                    const movieIds = res.parts.map((part) => part.id);
                    collectionLoaded(res);
                    this.getCast(res);
                    this.getMovieDetails(movieIds);
                }
            })
            .catch((error) => collectionError());
    };

    getGenresName = () => {
        const { MoviesService, genresLoaded, collectionError } = this.props;
        MoviesService.getGenreList()
            .then((res) => genresLoaded(res))
            .catch((error) => collectionError());
    };

    getMovieDetails = (ids) => {
        const {
            MoviesService,
            collectionMovieDetailsLoaded,
            collectionError,
        } = this.props;
        const total = [];
        ids.forEach((id) => {
            MoviesService.getMovieDetails(id)
                .then((response) => {
                    if (response) {
                        total.push(response.revenue);
                        collectionMovieDetailsLoaded(total);
                    }
                })
                .catch((error) => collectionError());
        });
    };

    getCast = (collection) => {
        const { MoviesService, collectionCastLoaded, collectionError } = this.props;
        const ids = collection.parts.map((part) => part.id);

        MoviesService.getCast(ids)
            .then((res) => {
                if (res) {
                    const payload = { cast: res.cast, crew: res.crew };
                    collectionCastLoaded(payload);
                }
            })
            .catch((error) => collectionError());
    };

    render() {
        const {
            collection,
            history,
            loading,
            genres,
            genresLoading,
            revenue,
            cast,
            crew,
            width
        } = this.props;


        const globalLoading =
            loading || genresLoading;

        if (globalLoading) {
            return <Spinner />;
        } else if (width < 415) {
            return (
                <CollectionDetailsMobile
                    collection={collection}
                    history={history}
                    genre={genres}
                    cast={cast}
                    crew={crew}
                    revenue={revenue}
                />
            )
        } else {
            return (
                <CollectionDetails
                    collection={collection}
                    history={history}
                    genre={genres}
                    cast={cast}
                    crew={crew}
                    revenue={revenue}
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {
        collection,
        loading,
        genres,
        genresLoading,
        revenue,
        cast,
        crew,
    } = state.collectionPageReducer;
    return {
        collection,
        loading,
        genres,
        genresLoading,
        revenue,
        cast,
        crew
    };
};

const mapDispatchToProps = {
    collectionRequested,
    collectionLoaded,
    collectionError,
    genresRequested,
    genresLoaded,
    collectionMovieDetailsLoaded,
    collectionCastLoaded
};

export default WithMoviesService()(
    connect(mapStateToProps, mapDispatchToProps)(CollectionPage)
);
