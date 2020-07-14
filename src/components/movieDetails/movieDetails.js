import React, {Component} from 'react';
import Spinner from '../spinner/spinner';
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
            video: null
        }
        this.moviesServices = new MoviesServices();

        setTimeout(() => console.log(this.state.cast), 2000)
    }

    componentDidMount() {
        const {movieId} = this.props;

        this.getMovieDetails(movieId)

        this.getCast(movieId)

        this.getKeywords(movieId)

        this.getVideos(movieId)
    }

    getMovieDetails = (movieId) => {
        this.moviesServices.getMovieDetails(movieId)
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

    getKeywords = (movieId) => {
        this.moviesServices.getKeywords(movieId)
            .then((response) => {
                this.onLoadingKeywords(response)
            })
    }

    getVideos = (movieId) => {
        this.moviesServices.getVideos(movieId)
            .then((response) => {
                this.onVideoLoading(response)
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
        const {details, loading, casts, loadingCast, keywords, loadingKeywords, modalWindow, video} = this.state;
        const {movieId} = this.props;

        const spinnerDetails = loading ? <Spinner/> : <Details details={details} movieId={movieId} video={video} onOpenModal={this.onOpenModal} modalWindow={modalWindow} onCloseModal={this.onCloseModal}/>;
        const spinnerOriginal = loading ? <Spinner/> : <OriginalDetails details={details}/>;
        const spinnerCast = loadingCast ? <Spinner/> : <Cast casts={casts}/>;
        const spinnerKeywords = loadingKeywords ? <Spinner/> : <Keywords keyword={keywords}/>

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
                <Container className="mt-4">
                    <Row>
                        <Col className="col-8">{spinnerCast}</Col>
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