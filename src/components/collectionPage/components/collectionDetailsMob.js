import React from "react";
import styled from "styled-components";
import Rate from "../../shared/rate";
import CollectionCast from './collectionCast';
import { Container, Row, Col } from "react-bootstrap";
import {
    GlobalWrapper,
    BackgroundWrapper,
    PosterWrapper,
    TitleWrapper,
    Title,
    RateWrapper,
    Vote,
    GenreWrapper,
    GenreList,
    OverviewWrapper,
    Overview,
} from "../../moviesPage/components/movieDetailsPage/components/mobileComponents/detailsMob";

const SectionTitle = styled.div`
    font-weight: 600;
    font-size: 1em;

    &:nth-last-of-type(2) {
        margin-top: 20px;
    }

    & span {
        font-weight: 400;
    }
`;

const CollectionDetailsMobile = ({
    collection,
    history,
    cast,
    crew,
    revenue,
    genre,
}) => {
    const { name, poster_path, overview, parts, backdrop_path } = collection;
    const averageVote = (
        parts.reduce((sum, item) => {
            return sum + item.vote_average;
        }, 0) / parts.length
    ).toFixed(2);
    const { genres } = genre;
    const src = !poster_path
        ? process.env.PUBLIC_URL + "/assets/poster.png"
        : "//image.tmdb.org/t/p/w116_and_h174_face" + poster_path;

    const movieOverview = !overview ? "-" : overview;
    const genresList = [];
    const getGenres = () => {
        if (collection.hasOwnProperty("parts") && Object.keys(genre).length) {
            parts.forEach((part) => {
                part.genre_ids.forEach((id) => {
                    genres.forEach((genre) => {
                        if (genre.id === id) {
                            genresList.push(genre.name);
                        }
                    });
                });
            });
        }
        return null;
    };
    getGenres();
    const uniques = genresList.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    const uniquesToString = uniques.join(", ");

    let nf = new Intl.NumberFormat();
    const movieRevenue = revenue
        ? `$${nf.format(revenue).replace(/\s/g, ",")}`
        : "-";

    return (
        <>
            <GlobalWrapper>
                <Container>
                    <Row>
                        <Col className="px-0">
                            <BackgroundWrapper url={backdrop_path}>
                                <PosterWrapper>
                                    <img src={src} alt={name} />
                                </PosterWrapper>
                            </BackgroundWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <TitleWrapper>
                                <Title>{name}</Title>
                                <RateWrapper>
                                    <Rate vote={averageVote} small isStatic />
                                    <Vote>
                                        Пользовательский <span>счёт</span>
                                    </Vote>
                                </RateWrapper>
                            </TitleWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <GenreWrapper>
                                <GenreList>{uniquesToString}</GenreList>
                            </GenreWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <OverviewWrapper>
                                <Overview>
                                    <div>Обзор</div>
                                    {movieOverview}
                                </Overview>
                                <SectionTitle>
                                    Число фильмов: <span>{parts.length}</span>
                                </SectionTitle>
                                <SectionTitle>
                                    Сборы: <span>{movieRevenue}</span>
                                </SectionTitle>
                            </OverviewWrapper>
                        </Col>
                    </Row>
                </Container>
            </GlobalWrapper>
            <CollectionCast cast={cast} crew={crew} parts={parts} history={history}/>
        </>
    );
};

export default CollectionDetailsMobile;
