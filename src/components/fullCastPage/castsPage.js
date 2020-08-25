import React, { Component } from 'react';
import styled from 'styled-components';
import MoviesServices from '../../services/services';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../shared/spinner/spinner';
import moment from 'moment';
import {Actors, Crew} from './components/fullCastList';


const HeaderWrapper = styled.div`
    background-color: rgb(21, 50, 97);
    max-width: 1920px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px 0;
    margin: 0 0 30px;
`;

const Header = styled.div`
    max-width: 1110px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

const MovieName = styled.div`
    font-size: 35.2px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
`;

const MovieReleaseYear = styled.span`
    font-size: 35.2px;
    font-weight: 400;
    opacity: 0.8;
    color: #fff;
`;

const MoviePosterImg = styled.img`
    width: 58px;
    height: 87px;
    border-radius: 5px;
    cursor: pointer;
`;

const MovieContent = styled.div`
    padding-left: 20px;
`;

const ButtonBack = styled.div`
    cursor: pointer;
    font-size: 17.6px;
    font-weight: 600;
    opacity: 0.6;
    color: #fff;
`;

export default class FullCast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            casts: null,
            loadingCast: true,
            movieName: '',
            movieYear: '',
            poster: ''
        }
        this.moviesServices = new MoviesServices();
    }

    componentDidMount() {
        const {movieId, history} = this.props;
        const {pathname} = history.location;

        if (pathname.includes('tv')) {
            this.getTVCast(movieId);
            this.getTVName(movieId);
        } else {
            this.getCast(movieId);
            this.getMovieName(movieId);
        }  
        
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

    onLoadingCast = (resp) => {
        this.setState({
            casts: resp,
            loadingCast: false,
        })
    }

    getMovieName = (movieId) => {
        this.moviesServices.getMovieDetails(movieId)
            .then((response) => {
                this.onLoadingName(response.title, response.release_date, response.poster_path)
            })
    }

    getTVName = (tvId) => {
        this.moviesServices.getTVDetails(tvId)
            .then((response) => {
                this.onLoadingName(response.name, response.first_air_date, response.poster_path)
            })
    }

    onLoadingName = (title, date, poster) => {
        this.setState({
            movieName: title,
            movieYear: date,
            poster: poster
        })
    }
    
    onGoBack = () => { 
        this.props.history.goBack()
    }

    render() {
        const {casts, loadingCast, movieName, movieYear, poster} = this.state;
        const {history} = this.props;

        const spinnerActors = loadingCast ? <Spinner/> : <Actors casts={casts} history={history}/>;
        const spinnerCrew = loadingCast ? <Spinner/> : <Crew casts={casts} history={history}/>;

        const releaseYear = moment(movieYear).format('YYYY');
        const src = !poster ? '../../assets/poster.png' : ('https://image.tmdb.org/t/p/w58_and_h87_face' + poster);
        
        return (
            <>
                <HeaderWrapper>
                    <Header>
                        <MoviePosterImg src={src} alt={movieName} onClick={this.onGoBack}/>
                        <MovieContent>
                            <MovieName onClick={this.onGoBack}>{movieName}
                                <MovieReleaseYear> ({releaseYear})</MovieReleaseYear>
                            </MovieName>  
                            <ButtonBack
                                onClick={this.onGoBack}
                            > <i className="fas fa-arrow-left"></i> Назад на главную</ButtonBack>
                        </MovieContent>
                    </Header>
                </HeaderWrapper>
                <Container>
                    <Row>
                        <Col>
                            {spinnerActors}
                        </Col>
                        <Col>
                            {spinnerCrew}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}