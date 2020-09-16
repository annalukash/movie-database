import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { ImgWrapper, Title, DetailsList, Vote, Overview } from '../../moviesPage/components/movieDetailsPage/components/details';
import Rate from '../../shared/rate';
import { BackgroundWrapper } from '../../moviesPage/components/movieDetailsPage/movieDetails';
import CollectionCast from './collectionCast';

const DetailsTitleWrapper = styled.div`
    font-weight: 700;
    font-size: 16px;
`;

const DetailsContentWrapper = styled.span`
    font-weight: 400;
`;


const CollectionDetails = ({ collection, history, genre, cast, crew, revenue }) => {

    const { name, poster_path, overview, parts, backdrop_path } = collection;
    const averageVote = (parts.reduce((sum, item) => {
        return sum + item.vote_average;
    }, 0) / parts.length).toFixed(2);
    const { genres } = genre;
    const src = !poster_path ? (process.env.PUBLIC_URL + '/assets/poster.png') : ('https://image.tmdb.org/t/p/w300_and_h450_bestv2' + poster_path);

    const movieOverview = !overview ? '-' : overview;
    const genresList = [];
    const getGenres = () => {
        if (collection.hasOwnProperty('parts') && Object.keys(genre).length) {
            parts.forEach(part => {
                part.genre_ids.forEach(id => {
                    genres.forEach(genre => {
                        if (genre.id === id) {
                            genresList.push(genre.name)
                        }
                    })
                })
            })
        }
        return null;
    }
    getGenres();
    const uniques = genresList.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
    const uniquesToString = uniques.join(', ');

    let nf = new Intl.NumberFormat();
    const movieRevenue = revenue ? `$${nf.format(revenue).replace(/\s/g, ',')}` : '-';

    return (
        <>
            <BackgroundWrapper backdrop={backdrop_path}>
                <Container>
                    <Row className="justify-content-center mx-auto text-center w-100 align-items-center py-4">
                        <Col className='col-4'>
                            <ImgWrapper src={src} alt={name} />
                        </Col>
                        <Col className='col-8 text-left px-0'>
                            <Title>{name}</Title>
                            <DetailsList>
                                <Row>
                                    <Col className="col-auto">{uniquesToString}</Col>
                                </Row>
                                <Row className="font-weight-bold py-3">
                                    <Col className="col-auto d-flex">
                                        <Rate vote={averageVote} />
                                        <Vote>Пользовательский счёт</Vote>
                                    </Col>
                                </Row>
                                <Row className='flex-column py-2'>
                                    <Col>
                                        <Overview>
                                            Обзор
                                            </Overview>
                                    </Col>
                                    <Col>{movieOverview}</Col>
                                </Row>
                                <Row className='flex-column py-2'>
                                    <Col>
                                        <DetailsTitleWrapper>
                                            Число фильмов: <DetailsContentWrapper>{parts.length}</DetailsContentWrapper>
                                        </DetailsTitleWrapper>
                                    </Col>
                                    <Col>
                                        <DetailsTitleWrapper>
                                            Сборы: <DetailsContentWrapper>{movieRevenue}</DetailsContentWrapper>
                                        </DetailsTitleWrapper>
                                    </Col>
                                </Row>
                            </DetailsList>
                        </Col>
                    </Row>
                </Container>
            </BackgroundWrapper>
            <CollectionCast cast={cast} crew={crew} parts={parts} history={history} />
        </>
    )
}

export default CollectionDetails;