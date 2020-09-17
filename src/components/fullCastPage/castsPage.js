import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../shared/spinner/spinner';
import moment from 'moment';
import {Actors, Crew} from './components/fullCastList';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {movieDetailsRequested, movieDetailsLoaded, movieDetailsError, castRequested, castLoaded} from '../../actions/actionsMovieDetailsPage/actionMovieDetailsPage';


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

class FullCast extends Component {
    componentWillMount() {
        const {movieId, history, details, MoviesService, movieDetailsRequested, castRequested} = this.props;
        const {pathname} = history.location;

        if (!details.length) {
            if (pathname.includes('tv')) {
                movieDetailsRequested()
                castRequested()
                this.getCast(movieId, MoviesService.getTVCasts);
                this.getDetails(movieId, MoviesService.getTVDetails);
            } else {
                movieDetailsRequested()
                castRequested()
                this.getCast(movieId, MoviesService.getCast);
                this.getDetails(movieId, MoviesService.getMovieDetails);
            }
        }
    }
 
    getCast = (movieId, request) => {
        const {castLoaded, movieDetailsError} = this.props;

        request(movieId)
            .then((response) => castLoaded(response))
            .catch(error => movieDetailsError());
    }

    getDetails = (movieId, request) => {
        const {movieDetailsLoaded, movieDetailsError} = this.props;

        request(movieId)
            .then((response) => movieDetailsLoaded(response))
            .catch(error => movieDetailsError());
    }

    onGoBack = () => { 
        this.props.history.goBack()
    }

    render() {
        const {casts, loadingCast, history, details} = this.props;
        const spinnerActors = loadingCast ? <Spinner/> : <Actors casts={casts} history={history}/>;
        const spinnerCrew = loadingCast ? <Spinner/> : <Crew casts={casts} history={history}/>;

        const releaseYear = moment(details.first_air_date || details.release_date).format('YYYY');
        const src = !details.poster_path ? (process.env.PUBLIC_URL + '/assets/poster.png') : ('https://image.tmdb.org/t/p/w58_and_h87_face' + details.poster_path);
        
        return (
            <>
                <HeaderWrapper>
                    <Header>
                        <MoviePosterImg src={src} alt={details.name || details.title} onClick={this.onGoBack}/>
                        <MovieContent>
                            <MovieName onClick={this.onGoBack}>{details.name || details.title}
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

const mapStateToProps = (state) => {
    const {movieDetails, casts, loadingCast} = state.movieDetailsReducer;

    return {
        details: movieDetails,
        casts,
        loadingCast
    }
}

const mapDispatchToProps = {
    movieDetailsRequested,
    movieDetailsLoaded,
    movieDetailsError,
    castRequested,
    castLoaded
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(FullCast));