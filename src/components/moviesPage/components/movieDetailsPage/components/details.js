import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import duration from "moment-duration-format";
import Rate from '../../../../shared/rate';
import ModalWindow from './modalWindow';

const ImgWrapper = styled.img`
    max-width: 300px;
    max-height: 450px;
    width: 100%;
    height: 100%;
    border-radius: 7px;
`;

const Title = styled.div`
    font-size: 35px;
    font-weight: 700;
    font-family: 'Source Sans Pro';
`;

const Year = styled.span`
    opacity: 0.8;
    font-weight: 400;
`;

const DetailsList = styled.div`
    font-size: 16px; 
`;

const IconWrapper = styled.div`
    font-size: 5px;
`;

const Vote = styled.span`
    max-width: 150px;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ActivityList = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;

    li{
        width: 46px;
        height: 46px;
        background-color: rgb(3, 37, 65);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 15px;
        cursor: pointer;
    }

    li:first-child{
        margin-left: 0;
    }
    
`;

const TrailerWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity 200ms;

    &:hover{
        opacity: 0.6
    }
`;

const TrailerTitle = styled.div`
    padding-left: 10px;
`;

const Overview = styled.div`
    font-size: 20.8px;
    font-weight: 700;
`;

const TagLine = styled.div`
    font-size: 17.6px;
    opacity: 0.7;
    font-family: Arial;
`;

const CreatorNameWrapper = styled.div`
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
`;

const Details = ({details, movieId, onOpenModal, modalWindow, onCloseModal, video, history}) => {
    const {poster_path, title, release_date, genres, runtime, vote_average, tagline, overview, name, first_air_date, episode_run_time, created_by} = details;

    const genreItem = genres.map(genre => genre.name);
    const genreToString = genreItem.join(', ');

    let duration = (runtime || episode_run_time) ? moment.duration(runtime || episode_run_time[0], "minutes").format("h : m o").replace(':', 'h').replace('o', 'm') : null;

    const trailerButton = () => {
        return(
            <TrailerWrapper>
                <i className="fas fa-play"></i>
                <TrailerTitle
                    onClick = {() => onOpenModal(movieId)}
                >Воспроизвести трейлер</TrailerTitle>
            </TrailerWrapper>
        )   
    }

    const modal = modalWindow ? <ModalWindow video={video} onCloseModal={onCloseModal}/> : null;
    const showTrailer = video?.results.length === 0 ? null : trailerButton();
    const src = !poster_path ? (process.env.PUBLIC_URL + '/assets/poster.png') : ('https://image.tmdb.org/t/p/w220_and_h330_face' + poster_path);
    const creator = history.location.pathname.includes('tv') ? <TvCreator creator={created_by} history={history}/> : null;
    const releaseYear = release_date || first_air_date ? `(${moment(release_date || first_air_date).format('YYYY')})` : null;
    const releaseDate = release_date || first_air_date ? moment(release_date || first_air_date).format('DD/MM/YYYY') : null;
    return(
        <>
            {modal}
            <Col className='col-4'>
                <ImgWrapper src={src} alt={title || name}/>
            </Col>
            <Col className='col-8 text-left px-0'>
            <Title>{title || name} <Year>{releaseYear}</Year>
                </Title>
                <DetailsList>
                    <Row>
                        <Col className="col-auto px-0 pl-3">{releaseDate}</Col>
                        <Col className="col-auto d-flex align-items-center"><IconWrapper><i className="fas fa-circle"></i></IconWrapper></Col>
                        <Col className="col-auto px-0">{genreToString}</Col>
                        <Col className="col-auto d-flex align-items-center"><IconWrapper><i className="fas fa-circle"></i></IconWrapper></Col>
                        <Col className="col-auto px-0">{duration}</Col>
                    </Row>  
                    <Row className="font-weight-bold py-3">
                        <Col className="col-auto d-flex">
                            <Rate vote={vote_average}/>   
                            <Vote>Пользовательский счёт</Vote>
                        </Col>
                        <Col className="px-0 my-0 d-flex align-items-center">
                            <ActivityList>
                                <li><i className="fas fa-list-ul"></i></li>
                                <li><i className="fas fa-heart"></i></li>
                                <li><i className="fas fa-bookmark"></i></li>
                                <li><i className="fas fa-star"></i></li>
                            </ActivityList>
                        </Col>
                        <Col className="d-flex align-items-center">
                            {showTrailer}                   
                        </Col>
                    </Row>  
                    <Row>
                        <Col className='font-italic'>
                            <TagLine>{tagline}</TagLine>
                        </Col>
                    </Row>
                    <Row className='flex-column py-2'>
                        <Col>
                            <Overview>
                                Обзор
                            </Overview>
                        </Col>
                        <Col>{overview}</Col>
                    </Row>
                    {creator}
                </DetailsList>  
            </Col>
        </>
    )
}

const TvCreator = ({creator, history}) => {
    if (creator?.length) {
        return (
            <Row className='flex-column py-2'>
                <Col>
                    <CreatorNameWrapper
                        onClick={() => history.push(`/person/${creator[0].id}`)}
                    >
                        {creator[0].name}
                    </CreatorNameWrapper>
                    <div>Создатель</div>
                </Col>
            </Row>
        )
    } else {
        return null
    }
}

export default Details;
export {ImgWrapper, Title, DetailsList, Vote, Overview};