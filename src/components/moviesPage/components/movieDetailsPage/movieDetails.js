import React, {Component} from 'react';
import Spinner from '../../../shared/spinner/spinner';
import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import {Cast, Details, OriginalDetails, Keywords, Collection} from './components';
import WithMoviesService from '../../../hoc/withMoviesService';
import {connect} from 'react-redux';
import {movieDetailsRequested, movieDetailsLoaded, movieDetailsError, castRequested, castLoaded, keywordsRequested, keywordsLoaded, modalWindowToggle, videoLoaded, socialLinkLoaded, collectionLoaded} from '../../../../actions/actions';

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
                this.getDetails(movieId, MoviesService.getTVDetails); 
                this.getCast(movieId, MoviesService.getTVCasts);
                this.getKeywords(movieId, MoviesService.getKeywords);
                this.getVideos(movieId, MoviesService.getTVVideos);
                this.getSocailLink(movieId, MoviesService.getTVExternalIds);
            } else {
                movieDetailsRequested();
                castRequested();
                this.getDetails(movieId, MoviesService.getMovieDetails);
                this.getCast(movieId, MoviesService.getCast);
                this.getKeywords(movieId, MoviesService.getKeywords);
                this.getVideos(movieId, MoviesService.getVideos);
                this.getSocailLink(movieId, MoviesService.getMovieExternalIds)
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

    getCollectionDetails = (id) => {
        const {MoviesService, collectionLoaded, movieDetailsError} = this.props;

        MoviesService.getCollection(id)
            .then((response) => collectionLoaded(response))
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

    render() {
        const {movieId, keywordId, history, details, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video, modalWindowToggle, socialLink} = this.props;

        const detail = loading ? <Spinner/> : <Details details={details} movieId={movieId} video={video} history={history} onOpenModal={modalWindowToggle} modalWindow={modalWindow} onCloseModal={modalWindowToggle}/>;
        const original = loading ? <Spinner/> : <OriginalDetails details={details} history={history} socialLink={socialLink}/>;
        const cast = loadingCast ? <Spinner/> : <Cast casts={casts} id={movieId} history={history}/>;
        const keyword = loadingKeywords ? <Spinner/> : <Keywords keyword={keywords} history={this.props.history} keywordId={keywordId} url={'keywords'}/>;

        return(
            <>
                <BackgroundWrapper backdrop={details?.backdrop_path}>
                        <Container className="w-100">
                            <Row className="justify-content-center mx-auto text-center w-100 align-items-center py-4">
                                {detail}
                            </Row>
                        </Container> 
                </BackgroundWrapper> 
                <Container className="mt-4 mb-5">
                    <Row>
                        <Col className="col-8">
                            {cast}
                            {this.showCollection(details?.belongs_to_collection)}
                        </Col>
                        <Col className="col-4">
                            <Row>{original}</Row>
                            <Row className="flex-column">{keyword}</Row>
                        </Col>                       
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const {movieDetails, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video, socialLink, collection} = state.movieDetailsReducer;
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
        collection
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
    collectionLoaded
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));
export {BackgroundWrapper};