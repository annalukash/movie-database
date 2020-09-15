import React, {Component} from 'react';
import Spinner from '../../../shared/spinner/spinner';
import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import {Cast, Details, OriginalDetails, Keywords, Collection, Recommendation} from './components';
import WithMoviesService from '../../../hoc/withMoviesService';
import {connect} from 'react-redux';
import {movieDetailsRequested, movieDetailsLoaded, movieDetailsError, castRequested, castLoaded, keywordsRequested, keywordsLoaded, modalWindowToggle, videoLoaded, socialLinkLoaded, collectionLoaded, recommendationsLoaded, ratingLoaded} from '../../../../actions/actions';

const BackgroundWrapper = styled.div`
    background-image: linear-gradient(315deg, rgba(233, 188, 183, 0.7) 0%, rgba(41, 82, 74, 0.8) 74%), ${props => `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.backdrop})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    min-width: 100%;
    color: #fff;
    font-family: 'Source Sans Pro';
    background-color: #e9bcb7;
`

class MovieDetails extends Component {
    componentDidMount() {
        const {movieId, history, details, movieDetailsRequested, castRequested, MoviesService} = this.props;
        const {pathname} = history.location;

        if (!details.length) {
            if (pathname.includes('tv')) {
                movieDetailsRequested();
                castRequested();
                keywordsRequested();
                this.getDetails(movieId, MoviesService.getTVDetails); 
                this.getRating(movieId, MoviesService.getTVRating);
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
                this.getRating(movieId, MoviesService.getMovieRating)
                this.getCast(movieId, MoviesService.getCast);
                this.getKeywords(movieId, MoviesService.getKeywords);
                this.getVideos(movieId, MoviesService.getVideos);
                this.getSocailLink(movieId, MoviesService.getMovieExternalIds);
                this.getRecommendations(movieId, MoviesService.getMovieRecommendations);  
            } 
        }
    }

    getDetails = (id, request) => {
        const {movieDetailsLoaded, movieDetailsError} = this.props;

        request(id)
            .then((response) => {
                movieDetailsLoaded(response);
                if (response && response.belongs_to_collection) {
                    this.getCollectionDetails(response.belongs_to_collection.id)
                }  
            })
            .catch(error => movieDetailsError());
    }

    getCast = (id, request) => {
        const {movieDetailsError, castLoaded} = this.props;

        request(id)
            .then((response) => castLoaded(response))
            .catch(error => movieDetailsError());
    }

    getKeywords = (id, request) => {
        const {keywordsLoaded, movieDetailsError} = this.props;

        request(id)
            .then((response) => keywordsLoaded(response.keywords || response.results))
            .catch(error => movieDetailsError());
    }

    getVideos = (id, request) => {
        const {videoLoaded, movieDetailsError} = this.props;

        request(id)
            .then((response) => videoLoaded(response))
            .catch(error => movieDetailsError());
    }

    getSocailLink = (id, request) => {
        const {socialLinkLoaded, movieDetailsError} = this.props;

        request(id)
            .then((response) => socialLinkLoaded(response))
            .catch(error => movieDetailsError());
    }

    getRecommendations = (id, request) => {
        const {recommendationsLoaded, movieDetailsError} = this.props;

        request(id)
            .then(response => recommendationsLoaded(response.results))
            .catch(error => movieDetailsError())
    }

    getCollectionDetails = (id) => {
        const {MoviesService, collectionLoaded, movieDetailsError} = this.props;

        MoviesService.getCollection(id)
            .then((response) => collectionLoaded(response))
            .catch(error => movieDetailsError());
    }

    getRating = (id, request) => {
        const {ratingLoaded, movieDetailsError} = this.props;

        request(id)
            .then((response) => ratingLoaded(response.results))
            .catch(error => movieDetailsError());
    }

    showCollection = (isBelongToCollection) => {
        const {history, details, loading, collection} = this.props;

        if (loading) {
            return <Spinner/>
        } else if (isBelongToCollection) {
            return <Collection details={details} history={history} collection={collection}/>
        } else {
            return null
        }
    }

    showRecommendations = (isRecommendation) => {
        const {history, loading, recommendations, MoviesService, movieDetailsRequested, castRequested} = this.props;

        if (loading) {
            return <Spinner/>
        } else if (isRecommendation.length) {
            return(
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
            )
        } else if (!isRecommendation.length) {
            return null
        }
    }

    render() {
        const {movieId, history, details, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video, modalWindowToggle, socialLink, recommendations, rating} = this.props;
        const globalLoading = loading || loadingCast || loadingKeywords;
        if (globalLoading) {
           return <Spinner/>
        } else {
           return(
            <>
                <BackgroundWrapper backdrop={details?.backdrop_path}>
                        <Container className="w-100">
                            <Row className="justify-content-center mx-auto text-center w-100 align-items-center py-4">
                            <Details details={details} movieId={movieId} rating={rating} video={video} history={history} onOpenModal={modalWindowToggle} modalWindow={modalWindow} onCloseModal={modalWindowToggle}/>
                            </Row>
                        </Container> 
                </BackgroundWrapper> 
                <Container className="mt-4 mb-5">
                    <Row>
                        <Col className="col-8">
                            <Cast casts={casts} id={movieId} history={history}/>
                            {this.showCollection(details?.belongs_to_collection)}
                            {this.showRecommendations(recommendations)}
                        </Col>
                        <Col className="col-4">
                            <Row>
                                <OriginalDetails details={details} history={history} socialLink={socialLink}/>
                            </Row>
                            <Row className="flex-column">
                                <Keywords keyword={keywords} history={history} url={'keywords'}/>
                            </Row>
                        </Col>                       
                    </Row>
                </Container>
            </>
           )
        }
    }
}

const mapStateToProps = (state) => {
    const {movieDetails, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video, socialLink, collection, recommendations, rating} = state.movieDetailsReducer;
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
        rating
    }
}

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
    ratingLoaded
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));
export {BackgroundWrapper};