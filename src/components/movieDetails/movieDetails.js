import React, {Component} from 'react';
import Spinner from '../shared/spinner/spinner';
import MoviesServices from '../../services/services';
import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import {Cast, Details, OriginalDetails, Keywords} from './components';

const BackgroundWrapper = styled.div`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
`

const ContainerWrapper = styled.div`
    background-image: linear-gradient(to right, rgba(12.94%, 14.90%, 22.75%, 1.00) 150px, rgba(20.39%, 22.35%, 29.02%, 0.84) 100%);
    background-repeat: no-repeat;
    background-size: cover;
    min-width: 100%;
    color: #fff;
    font-family: 'Source Sans Pro';
`;


export default class MovieDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: null,
            loading: true,
            small: false,
            casts: null,
            loadingCast: true,
            keywords: null,
            loadingKeywords: true,
            modalWindow: false,
            video: null,
            socialLink: {}
        }
        this.moviesServices = new MoviesServices();
    }
    
    componentDidMount() {
        const {movieId, history} = this.props;
        const {pathname} = history.location;

        if (pathname.includes('tv')) {
            this.getTvDetails(movieId); 
            this.getTVCast(movieId);
            this.getTVKeywords(movieId);
            this.getTVVideos(movieId);
            this.getTVSocailLink(movieId);
        } else {
            this.getMovieDetails(movieId);
            this.getCast(movieId);
            this.getKeywords(movieId);
            this.getVideos(movieId);
            this.getMovieSocailLink(movieId)
        }  
    }

    getMovieDetails = (movieId) => {
        this.moviesServices.getMovieDetails(movieId)
            .then((response) => {
                this.onLoadingDetails(response)
            })
    }

    getTvDetails = (tvId) => {
        this.moviesServices.getTVDetails(tvId)
            .then((response) => {
                this.onLoadingDetails(response)
            })
    }

    getCast = (movieId) => {
        this.moviesServices.getCast(movieId)
            .then((response) => {
                this.onLoadingCast(response)
            })
    }

    getTVCast = (tvId) => {
        this.moviesServices.getTVCasts(tvId)
            .then((response) => {
                this.onLoadingCast(response)
            })
    }

    getKeywords = (movieId) => {
        this.moviesServices.getKeywords(movieId)
            .then((response) => {
                this.onLoadingKeywords(response.keywords)
            })
    }

    getTVKeywords = (tvId) => {
        this.moviesServices.getTVKeywords(tvId)
            .then((response) => {
                this.onLoadingKeywords(response.results)
            })
    }

    getVideos = (movieId) => {
        this.moviesServices.getVideos(movieId)
            .then((response) => {
                this.onVideoLoading(response)
            })
    }

    getTVVideos = (tvId) => {
        this.moviesServices.getTVVideos(tvId)
            .then((response) => {
                this.onVideoLoading(response)
            })
    }

    getMovieSocailLink = (id) => {
        this.moviesServices.getMovieExternalIds(id)
            .then((response) => {
                this.onLinkLoading(response)
            })
    }

    getTVSocailLink = (id) => {
        this.moviesServices.getTVExternalIds(id)
            .then((response) => {
                this.onLinkLoading(response)
            })
    }

    onLinkLoading = (response) => {
        this.setState({
            socialLink: response
        })
    }

    onLoadingDetails = (response) => {
        this.setState({
            details: response,
            loading: false,
        })
    }

    onLoadingCast = (resp) => {
        this.setState({
            casts: resp,
            loadingCast: false,
        })
    }

    onLoadingKeywords = (resp) => {
        this.setState({
            keywords: resp,
            loadingKeywords: false,
        })
    }

    onVideoLoading = (response) => {
        this.setState({
            video: response
        })
    }

    onOpenModal = (movieId) => {
        this.setState({
            modalWindow: true
        })
    }

    onCloseModal = () => {
        this.setState({
            modalWindow: false
        })
    }

    render() {
        const {details, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video, socialLink} = this.state;
        const {movieId, keywordId, history} = this.props;

        const spinnerDetails = loading ? <Spinner/> : <Details details={details} movieId={movieId} video={video} history={history} onOpenModal={this.onOpenModal} modalWindow={modalWindow} onCloseModal={this.onCloseModal}/>;
        const spinnerOriginal = loading ? <Spinner/> : <OriginalDetails details={details} history={history} socialLink={socialLink}/>;
        const spinnerCast = loadingCast ? <Spinner/> : <Cast casts={casts} id={movieId} history={history}/>;
        const spinnerKeywords = loadingKeywords ? <Spinner/> : <Keywords keyword={keywords} history={this.props.history} keywordId={keywordId} url={'keywords'}/>

        return(
            <>
                <BackgroundWrapper style={{backgroundImage: loading ? <Spinner/> : `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${details.backdrop_path})`}}>
                    <ContainerWrapper>
                        <Container className="w-100">
                            <Row className="justify-content-center mx-auto text-center w-100 align-items-center py-4">
                                {spinnerDetails}
                            </Row>
                        </Container> 
                    </ContainerWrapper> 
                </BackgroundWrapper> 
                <Container className="mt-4 mb-5">
                    <Row>
                        <Col className="col-8">
                            {spinnerCast}
                        </Col>
                        <Col className="col-4">
                            <Row>{spinnerOriginal}</Row>
                            <Row className="flex-column">{spinnerKeywords}</Row>
                        </Col>                       
                    </Row>
                </Container>
            </>
        )
    }
}

export {BackgroundWrapper, ContainerWrapper}