import React, { Component } from "react";
import Spinner from "../../../shared/spinner/spinner";
import { Details, Collection, Recommendation } from "./components";
import DetailsMobile from "./components/mobileComponents/detailsMob";
import WithMoviesService from "../../../hoc/withMoviesService";
import { connect } from "react-redux";
import {
    movieDetailsRequested,
    movieDetailsLoaded,
    movieDetailsError,
    castRequested,
    castLoaded,
    keywordsRequested,
    keywordsLoaded,
    modalWindowToggle,
    videoLoaded,
    socialLinkLoaded,
    movieDetailsCollectionLoaded,
    recommendationsLoaded,
} from "../../../../actions/actionsMovieDetailsPage/actionMovieDetailsPage";

class MovieDetails extends Component {
    componentWillMount() {
        const {
            movieId,
            history,
            movieDetailsRequested,
            castRequested,
            MoviesService,
            keywordsRequested,
        } = this.props;
        const { pathname } = history.location;

        if (pathname.includes("tv")) {
            movieDetailsRequested();
            castRequested();
            keywordsRequested();
            this.getDetails(movieId, MoviesService.getTVDetails);
            this.getCast(movieId, MoviesService.getTVCasts);
            this.getKeywords(movieId, MoviesService.getTVKeywords);
            this.getVideos(movieId, MoviesService.getTVVideos);
            this.getSocailLink(movieId, MoviesService.getTVExternalIds);
            this.getRecommendations(movieId, MoviesService.getTVRecommendations);
        } else {
            movieDetailsRequested();
            castRequested();
            keywordsRequested();
            this.getDetails(movieId, MoviesService.getMovieDetails);
            this.getCast(movieId, MoviesService.getCast);
            this.getKeywords(movieId, MoviesService.getKeywords);
            this.getVideos(movieId, MoviesService.getVideos);
            this.getSocailLink(movieId, MoviesService.getMovieExternalIds);
            this.getRecommendations(movieId, MoviesService.getMovieRecommendations);
        }
    }

    getDetails = (id, request) => {
        const { movieDetailsLoaded, movieDetailsError } = this.props;

        request(id)
            .then((response) => {
                movieDetailsLoaded(response);
                if (response && response.belongs_to_collection) {
                    this.getCollectionDetails(response.belongs_to_collection.id);
                }
            })
            .catch((error) => movieDetailsError());
    };

    getCast = (id, request) => {
        const { movieDetailsError, castLoaded } = this.props;

        request(id)
            .then((response) => castLoaded(response))
            .catch((error) => movieDetailsError());
    };

    getKeywords = (id, request) => {
        const { keywordsLoaded, movieDetailsError } = this.props;

        request(id)
            .then((response) => keywordsLoaded(response.keywords || response.results))
            .catch((error) => movieDetailsError());
    };

    getVideos = (id, request) => {
        const { videoLoaded, movieDetailsError } = this.props;

        request(id)
            .then((response) => videoLoaded(response))
            .catch((error) => movieDetailsError());
    };

    getSocailLink = (id, request) => {
        const { socialLinkLoaded, movieDetailsError } = this.props;

        request(id)
            .then((response) => socialLinkLoaded(response))
            .catch((error) => movieDetailsError());
    };

    getRecommendations = (id, request) => {
        const { recommendationsLoaded, movieDetailsError } = this.props;

        request(id)
            .then((response) => recommendationsLoaded(response.results))
            .catch((error) => movieDetailsError());
    };

    getCollectionDetails = (id) => {
        const { MoviesService, movieDetailsCollectionLoaded, movieDetailsError } = this.props;

        MoviesService.getCollection(id)
            .then((response) => movieDetailsCollectionLoaded(response))
            .catch((error) => movieDetailsError());
    };

    showCollection = (isBelongToCollection) => {
        const { history, details, loading, collection } = this.props;

        if (loading) {
            return <Spinner />;
        } else if (isBelongToCollection) {
            return <Collection details={details} history={history} collection={collection} />;
        } else {
            return null;
        }
    };

    showRecommendations = (isRecommendation) => {
        const { history, loading, recommendations, MoviesService, movieDetailsRequested, castRequested } = this.props;

        if (loading) {
            return <Spinner />;
        } else if (isRecommendation.length) {
            return (
                <Recommendation
                    history={history}
                    recommendations={recommendations}
                    MoviesService={MoviesService}
                    getDetails={this.getDetails}
                    getCast={this.getCast}
                    getKeywords={this.getKeywords}
                    getVideos={this.getVideos}
                    getSocailLink={this.getSocailLink}
                    getRecommendations={this.getRecommendations}
                    movieDetailsRequested={movieDetailsRequested}
                    castRequested={castRequested}
                />
            );
        } else if (!isRecommendation.length) {
            return null;
        }
    };

    render() {
        const {
            movieId,
            history,
            details,
            loading,
            casts,
            loadingCast,
            keywords,
            loadingKeywords,
            modalWindow,
            video,
            modalWindowToggle,
            socialLink,
            recommendations,
            width,
        } = this.props;

        const globalLoading = loading || loadingCast || loadingKeywords;

        if (globalLoading) {
            return <Spinner />;
        } else if (width < 415) {
            return (
                <DetailsMobile
                    details={details}
                    movieId={movieId}
                    video={video}
                    history={history}
                    onOpenModal={modalWindowToggle}
                    modalWindow={modalWindow}
                    onCloseModal={modalWindowToggle}
                    casts={casts}
                    keywords={keywords}
                    socialLink={socialLink}
                    recommendations={recommendations}
                    showCollection={this.showCollection}
                    showRecommendations={this.showRecommendations}
                />
            );
        } else {
            return (
                <Details
                    details={details}
                    movieId={movieId}
                    video={video}
                    history={history}
                    onOpenModal={modalWindowToggle}
                    modalWindow={modalWindow}
                    onCloseModal={modalWindowToggle}
                    casts={casts}
                    keywords={keywords}
                    socialLink={socialLink}
                    recommendations={recommendations}
                    showCollection={this.showCollection}
                    showRecommendations={this.showRecommendations}
                />
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {
        movieDetails,
        loading,
        casts,
        loadingCast,
        keywords,
        loadingKeywords,
        modalWindow,
        video,
        socialLink,
        collection,
        recommendations,
    } = state.movieDetailsReducer;
    return {
        details: movieDetails,
        loading,
        casts,
        loadingCast,
        keywords,
        loadingKeywords,
        modalWindow,
        video,
        socialLink,
        collection,
        recommendations,
    };
};

const mapDispatchToProps = {
    movieDetailsRequested,
    movieDetailsLoaded,
    movieDetailsError,
    castRequested,
    castLoaded,
    keywordsRequested,
    keywordsLoaded,
    modalWindowToggle,
    videoLoaded,
    socialLinkLoaded,
    movieDetailsCollectionLoaded,
    recommendationsLoaded,
};

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));
