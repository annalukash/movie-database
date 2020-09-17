import React from "react";
import styled from "styled-components";
import moment from "moment";
import duration from "moment-duration-format";
import Rate from "../../../../../shared/rate";
import { ModalWindowMobile } from "./index";
import { Container, Row, Col } from "react-bootstrap";
import {Cast, OriginalDetails, Keywords} from '../index';

const GlobalWrapper = styled.div`
    background-color: #5b6467;
    background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);
    color: #fff;
`;

const BackgroundWrapper = styled.div`
    width: 100%;
    background-image: linear-gradient(
            315deg,
            rgba(233, 188, 183, 0.7) 0%,
            rgba(41, 82, 74, 0.8) 74%
        ),
        ${(props) =>
            `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.url})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    min-width: 100%;
    font-family: "Source Sans Pro";
    background-color: #e9bcb7;
`;

const PosterWrapper = styled.div`
    padding: 20px;

    & img {
        max-width: 116px;
        max-height: 174px;
        border-radius: 7px;
    }
`;

const TitleWrapper = styled.div``;

const Title = styled.div`
    font-size: calc(0.7em + 3vw);
    font-weight: 600;
    text-align: center;
    padding: 16px 20px;

    & span {
        font-weight: 400;
        opacity: 0.8;
        font-size: 0.8em;
    }
`;

const RateWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px 16px;
`;

const Vote = styled.div`
    position: relative;
    border-right: ${(props) =>
        props.border ? "1px solid rgba(255, 255, 255, 0.8)" : "none"};
    font-weight: 600;
    padding: 0 5px 0 15px;
    display: flex;
    flex-direction: column;
    line-height: 1;
`;

const TrailerWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity 200ms;
    padding-left: 5px;

    &:hover {
        opacity: 0.6;
    }

    & i {
        font-size: 0.6em;
    }
`;

const TrailerTitle = styled.div`
    padding-left: 10px;
`;

const GenreWrapper = styled.div`
    background-color: #2f4353;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const ReleaseWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & i {
        font-size: 0.5em;
        padding: 0 10px;
    }
`;

const GenreList = styled.div`
    text-align: center;
`;

const OverviewWrapper = styled.div`
    padding: 20px;
`;

const Overview = styled.div`
    font-size: 1em;
    text-align: justify;
    line-height: 1.3;

    & div {
        font-weight: 600;
        font-size: 1.3em;
        padding-bottom: 5px;
    }
`;

const Rating = styled.div`
    border: 1px solid #fff;
    opacity: 0.8;
    padding: 0 7px;
    margin-right: 10px;
    font-size: 1em;
`;

const CreatorWrapper = styled.div`
    margin-top: 20px;
    font-size: 0.9em;
`;

const Creator = styled.div`
    font-size: 1.1em;
    font-weight: 600;
`;

const DetailsMobile = ({
    details,
    history,
    video,
    onOpenModal,
    modalWindow,
    onCloseModal,
    rating,
    movieId,
    casts,
    keywords,
    socialLink,
    recommendations,
    showCollection,
    showRecommendations
}) => {
    const {
        title,
        name,
        backdrop_path,
        poster_path,
        id,
        vote_average,
        release_date,
        genres,
        runtime,
        overview,
        first_air_date,
        episode_run_time,
        created_by,
    } = details;
    const src = poster_path
        ? "//image.tmdb.org/t/p/w116_and_h174_face" + poster_path
        : process.env.PUBLIC_URL + "/assets/poster.png";
    const durations =
        runtime || episode_run_time
            ? moment
                  .duration(runtime || episode_run_time[0], "minutes")
                  .format("h : m o")
                  .replace(":", "h")
                  .replace("o", "m")
            : null;
    const genreItem = genres.map((genre) => genre.name);
    const genreToString = genreItem.join(", ");
    const releaseYear =
        release_date || first_air_date
            ? `(${moment(release_date || first_air_date).format("YYYY")})`
            : null;
    const releaseDate =
        release_date || first_air_date
            ? moment(release_date || first_air_date).format("DD/MM/YYYY")
            : null;
    const rate = rating.find((item) => item.iso_3166_1 === "US");
    const creator = created_by.length ? created_by?.find((item, index) => index === 0).name : '-';
    const creatorId = created_by.length ? created_by?.find((item, index) => index === 0).id : null;

    const showRating = () => {
        if (history.location.pathname.includes("tv")) {
            const rateTV = rate.rating ? <Rating>{rate.rating}</Rating> : null;
            return rateTV;
        } else {
            const rateMovie = rate?.release_dates[0].certification ? (
                <Rating>{rate?.release_dates[0].certification}</Rating>
            ) : null;
            return rateMovie;
        }
    };

    const showCreator = () => {
        if (history.location.pathname.includes("tv")) {
            return (
                <CreatorWrapper>
                    <Creator
                        onClick={() => history.push(`/person/${creatorId}`)}
                    >
                        {creator}
                    </Creator>
                    Создатель
                </CreatorWrapper>
            );
        } else {
            return null;
        }
    };

    const trailerButton = () => {
        return (
            <TrailerWrapper>
                <i className="fas fa-play"></i>
                <TrailerTitle onClick={() => onOpenModal(id)}>
                    Трейлер
                </TrailerTitle>
            </TrailerWrapper>
        );
    };

    const modal = modalWindow ? (
        <ModalWindowMobile video={video} onCloseModal={onCloseModal} />
    ) : null;
    const showTrailer = !video?.results.length ? null : trailerButton();
    const separator = releaseDate ? <>{releaseDate} <i className="fas fa-circle"></i></> : null;
    const showOverview = overview ? overview : '-';

    return (
        <>
            <GlobalWrapper>
                <Container>
                    <Row>
                        <Col className="px-0">
                            {modal}
                            <BackgroundWrapper url={backdrop_path}>
                                <PosterWrapper>
                                    <img src={src} alt={title || name} />
                                </PosterWrapper>
                            </BackgroundWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <TitleWrapper>
                                <Title>
                                    {title || name} <span>{releaseYear}</span>
                                </Title>
                                <RateWrapper>
                                    <Rate vote={vote_average} small isStatic />
                                    <Vote border={video?.results.length}>
                                        Пользовательский <span>счёт</span>
                                    </Vote>
                                    {showTrailer}
                                </RateWrapper>
                            </TitleWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <GenreWrapper>
                                <ReleaseWrapper>
                                    {showRating()}
                                    {separator}
                                    {durations}
                                </ReleaseWrapper>
                                <GenreList>{genreToString}</GenreList>
                            </GenreWrapper>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="px-0">
                            <OverviewWrapper>
                                <Overview>
                                    <div>Обзор</div>
                                    {showOverview}
                                </Overview>
                                {showCreator()}
                            </OverviewWrapper>
                        </Col>
                    </Row>
                </Container>
            </GlobalWrapper>
            <Container>
                <Row className='mt-3'>
                    <Col>
                        <Cast casts={casts} id={movieId} history={history} />
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        {showCollection(details?.belongs_to_collection)}
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col>
                        {showRecommendations(recommendations)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <OriginalDetails
                            details={details}
                            history={history}
                            socialLink={socialLink}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Keywords
                            keyword={keywords}
                            history={history}
                            url={"keywords"}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetailsMobile;
export {
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
};
