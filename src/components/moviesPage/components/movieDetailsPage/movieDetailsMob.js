import React, { useEffect } from "react";
import Spinner from "../../../shared/spinner/spinner";
import { Row, Col, Container } from "react-bootstrap";
import { DetailsMobile } from "./components/mobileComponents";
import WithMoviesService from "../../../hoc/withMoviesService";
import { connect } from "react-redux";
import {
    Cast,
    Recommendation,
    Collection,
    OriginalDetails,
    Keywords,
} from "../movieDetailsPage/components/index";
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
    collectionLoaded,
    recommendationsLoaded,
    ratingRequested,
    ratingLoaded,
} from "../../../../actions/actions";

const MovieDetailsMobile = ({
    movieId,
    history,
    rating,
    loadingRating,
    details,
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
    collectionLoaded,
    recommendationsLoaded,
    MoviesService,
    ratingRequested,
    ratingLoaded,
}) => {
    useEffect(() => {
        const { pathname } = history.location;
        if (!details.length) {
            if (pathname.includes("tv")) {
                movieDetailsRequested();
                castRequested();
                keywordsRequested();
                getDetails(movieId, MoviesService.getTVDetails);
                getRating(movieId, MoviesService.getTVRating);
                getCast(movieId, MoviesService.getTVCasts);
                getKeywords(movieId, MoviesService.getTVKeywords);
                getVideos(movieId, MoviesService.getTVVideos);
                getSocailLink(movieId, MoviesService.getTVExternalIds);
                getRecommendations(movieId, MoviesService.getTVRecommendations);
            } else {
                movieDetailsRequested();
                castRequested();
                keywordsRequested();
                getDetails(movieId, MoviesService.getMovieDetails);
                getRating(movieId, MoviesService.getMovieRating);
                getCast(movieId, MoviesService.getCast);
                getKeywords(movieId, MoviesService.getKeywords);
                getVideos(movieId, MoviesService.getVideos);
                getSocailLink(movieId, MoviesService.getMovieExternalIds);
                getRecommendations(
                    movieId,
                    MoviesService.getMovieRecommendations
                );
            }
        }
    }, []);

    const getDetails = (id, request) => {
        request(id)
            .then((response) => {
                movieDetailsLoaded(response);
                if (response && response.belongs_to_collection) {
                    getCollectionDetails(response.belongs_to_collection.id);
                }
            })
            .catch((error) => movieDetailsError());
    };

    const getCast = (id, request) => {
        request(id)
            .then((response) => castLoaded(response))
            .catch((error) => movieDetailsError());
    };

    const getKeywords = (id, request) => {
        request(id)
            .then((response) =>
                keywordsLoaded(response.keywords || response.results)
            )
            .catch((error) => movieDetailsError());
    };

    const getVideos = (id, request) => {
        request(id)
            .then((response) => videoLoaded(response))
            .catch((error) => movieDetailsError());
    };

    const getSocailLink = (id, request) => {
        request(id)
            .then((response) => socialLinkLoaded(response))
            .catch((error) => movieDetailsError());
    };

    const getRecommendations = (id, request) => {
        request(id)
            .then((response) => recommendationsLoaded(response.results))
            .catch((error) => movieDetailsError());
    };

    const getCollectionDetails = (id) => {
        MoviesService.getCollection(id)
            .then((response) => collectionLoaded(response))
            .catch((error) => movieDetailsError());
    };

    const getRating = (id, request) => {
        request(id)
            .then((response) => ratingLoaded(response.results))
            .catch((error) => movieDetailsError());
    };

    const showCollection = (isBelongToCollection) => {
        if (loading) {
            return <Spinner />;
        } else if (isBelongToCollection) {
            return (
                <Collection
                    details={details}
                    history={history}
                    collection={collection}
                />
            );
        } else {
            return null;
        }
    };

    const showRecommendations = (isRecommendation) => {
        if (loading) {
            return <Spinner />;
        } else if (isRecommendation.length) {
            return (
                <Recommendation
                    history={history}
                    recommendations={recommendations}
                    MoviesService={MoviesService}
                    getDetails={getDetails}
                    getCast={getCast}
                    getKeywords={getKeywords}
                    getVideos={getVideos}
                    getSocailLink={getSocailLink}
                    getRecommendations={getRecommendations}
                    movieDetailsRequested={movieDetailsRequested}
                    castRequested={castRequested}
                />
            );
        } else if (!isRecommendation.length) {
            return null;
        }
    };

    const globalLoading =
        loading || loadingCast || loadingKeywords || loadingRating;
    if (globalLoading) {
        return <Spinner />;
    } else {
        return (
            <Container>
                <Row>
                    <Col className="px-0">
                        <DetailsMobile
                            details={details}
                            rating={rating}
                            video={video}
                            history={history}
                            onOpenModal={modalWindowToggle}
                            modalWindow={modalWindow}
                            onCloseModal={modalWindowToggle}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Cast casts={casts} id={movieId} history={history} />
                    </Col>
                </Row>
                <Row>
                    <Col>{showCollection(details?.belongs_to_collection)}</Col>
                </Row>
                <Row>
                    <Col>{showRecommendations(recommendations)}</Col>
                </Row>
                <Row>
                    <Col>
                        <OriginalDetails
                            details={details}
                            history={history}
                            socialLink={socialLink}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Keywords
                            keyword={keywords}
                            history={history}
                            url={"keywords"}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
};

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
        rating,
        loadingRating,
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
        rating,
        loadingRating,
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
    collectionLoaded,
    recommendationsLoaded,
    ratingRequested,
    ratingLoaded,
};

export default WithMoviesService()(
    connect(mapStateToProps, mapDispatchToProps)(MovieDetailsMobile)
);
