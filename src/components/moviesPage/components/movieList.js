import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../../spinner/spinner';
import Rate from '../../shared/rate';
import moment from 'moment';
import LoadMoreSpinner from '../../spinner/loadMoreSpinner';

const PosterWrapper = styled.div`
    border: 1px solid rgb(227, 227, 227);
    border-radius: 15px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    max-width: 206px;
    cursor: pointer;
`;

const MovieDetailsWrapper = styled.div`
    background-color:rgb(255, 255, 255);
    border-radius: 15px;
    position: relative;
    padding: 22px 10px 15px;
    text-align: left;
    max-width: 206px;
`;

const TitleWrapper = styled.div`
    font-family: 'Source Sans Pro';
    font-size: 16px;
    font-weight: 700;
`;

const ReleaseWrapper = styled(TitleWrapper)`
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
`;

const Poster = styled.img`
    max-width: 206px;
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    height: 310px;
`;

const LoadMoreButton = styled.button`
    background-color: rgb(1, 180, 228);
    width: 930px;
    border: none;
    font-family: 'Source Sans Pro';
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    padding: 7px 0;
    margin-bottom: 20px;
    
    &:focus {
        outline: none;
    }
`;

export default class MovieList extends Component {
    render() {
        const {movies, loading, loadingMore, small, url, getMovies, history} = this.props;
        
        const movieItems = movies.map((item, index) => {
            const {title, poster_path, release_date, vote_average, id} = item;


            return(
                <Col key={index} className="col-3 d-flex justify-content-center mb-4">
                    <PosterWrapper
                        onClick={() => {
                            history.push(`/${url}/${id}`)
                        }}
                    >
                    <Poster src={'https://image.tmdb.org/t/p/w220_and_h330_face' + poster_path} alt="poster"/> 
                    <MovieDetailsWrapper>
                        <TitleWrapper>
                            {title}
                        </TitleWrapper>
                        <ReleaseWrapper>
                            {moment(release_date).format('DD.MM.YYYY')}
                        </ReleaseWrapper>
                        <Rate 
                            vote={vote_average}
                            small={small}
                        />
                        
                    </MovieDetailsWrapper>                   
                    </PosterWrapper>
                </Col>
            )
        })

        const spinnerDetails = loading ? <Spinner/> : movieItems;
        const loadSpinner = loadingMore ? <LoadMoreSpinner/> : 'Загрузить еще';

        return(
            <Container className="mt-5">
                <Row className="justify-content-center mx-auto text-center w-100">
                    {spinnerDetails}
                </Row>
                <Row className="justify-content-center mx-auto text-center w-100">
                    <Col>
                    <LoadMoreButton
                        onClick={() => getMovies()}
                    >{loadSpinner}</LoadMoreButton>
                    </Col>
                </Row>
            </Container>
        )
    }
}