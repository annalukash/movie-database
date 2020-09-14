import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../../shared/spinner/spinner';
import Rate from '../../shared/rate';
import moment from 'moment';
import LoadMoreSpinner from '../../shared/spinner/loadMoreSpinner';
import useWindowSize from '../../shared/useWindowSize/useWindowSize';
import EllipsisText from "react-ellipsis-text";

const ContainerWrapper = styled.div`
    .col {
        max-height: ${props => props.size < 415 ? '275px' : '393px'};
    }
`;

const PosterWrapper = styled.div`
    border: 1px solid rgb(227, 227, 227);
    border-radius: 15px;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.1);
    max-width: ${props => props.size < 415 ? '150px' : '206px'};
    cursor: pointer;
`;

const MovieDetailsWrapper = styled.div`
    background-color:rgb(255, 255, 255);
    border-radius: 15px;
    position: relative;
    padding: ${props => props.size < 415 ? '22px 10px 5px' : '22px 10px 15px'};
    text-align: ${props => props.size < 415 ? 'center' : 'left'};
    width: 100%;

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
    width: 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    height: ${props => props.size < 415 ? '70%' : '80%' };
`;

const LoadMoreButton = styled.button`
    background-color: rgb(1, 180, 228);
    width: 100%;
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

const MovieList = ({movies, loading, loadingMore, url, getMovies, history}) => {
    const size = useWindowSize();
    const movieItems = movies.map((item, index) => {
        const {title, poster_path, release_date, vote_average, id, name, first_air_date} = item;
        const src = poster_path ? ('https://image.tmdb.org/t/p/w220_and_h330_face' + poster_path) : (process.env.PUBLIC_URL + '/assets/poster.png');

        return(
            <Col key={index} className="col-xl-3 col-6 col-sm-6 d-flex justify-content-center mb-4 px-lg-2 px-0">
                <PosterWrapper
                    size={size}
                    onClick={() => {
                        history.push(`${url}${id}`)
                    }}
                >
                    <Poster src={src} alt={title || name} size={size}/> 
                    <MovieDetailsWrapper size={size}>
                        <TitleWrapper>
                            <EllipsisText text={title || name} length={size < 415 ? 15 : 20}/>    
                        </TitleWrapper>
                        <ReleaseWrapper>
                            {moment(release_date || first_air_date).format('DD.MM.YYYY')}
                        </ReleaseWrapper>
                        <Rate 
                            vote={vote_average}
                            small
                        />  
                    </MovieDetailsWrapper>                   
                </PosterWrapper>
            </Col>
        )
    })

    const showButton = () => {
        const loadSpinner = loadingMore ? <LoadMoreSpinner/> : 'Загрузить еще';
    
        return (
            <LoadMoreButton
                onClick={() => getMovies()}
            >
                {loadSpinner}
            </LoadMoreButton>
        )
    }

    if (loading) {
        return <Spinner/>
    } else {
        return(
            <ContainerWrapper size={size}>
                <Container className="mt-lg-5 mt-3 px-0">
                    <Row className="justify-content-center mx-auto text-center w-100">
                        {movieItems}
                    </Row>
                    <Row className="justify-content-center mx-auto text-center w-100">
                        <Col>
                            {showButton()}
                        </Col>
                    </Row>
                </Container>
            </ContainerWrapper>
        )    
    }  
}

export default MovieList;