import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import duration from "moment-duration-format";
import Rate from '../../shared/rate';
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

const Details = ({details, movieId, onOpenModal, modalWindow, onCloseModal, video}) => {
    const {poster_path, title, release_date, genres, runtime, vote_average, tagline, overview} = details;

    const genreItem = genres.map((genre, index) => {
        return(
            <span key={index}>{genre.name + `${index !== (genres.length - 1) ? ',' : ' '}`} </span>
        )
    })

    let duration = moment.duration(runtime, "minutes").format("h : m o");

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

    return(
        <>
            {modal}
            <Col className='col-4'>
                <ImgWrapper src={'https://image.tmdb.org/t/p/w220_and_h330_face' + poster_path} alt="poster"/>
            </Col>
            <Col className='col-8 text-left px-0'>
                <Title>{title} <Year>({moment(release_date).format('YYYY')})</Year>
                </Title>
                <DetailsList>
                    <Row>
                        <Col className="col-auto px-0 pl-3">{moment(release_date).format('DD/MM/YYYY')} (US)</Col>
                        <Col className="col-auto d-flex align-items-center"><IconWrapper><i className="fas fa-circle"></i></IconWrapper></Col>
                        <Col className="col-auto px-0">{genreItem}</Col>
                        <Col className="col-auto d-flex align-items-center"><IconWrapper><i className="fas fa-circle"></i></IconWrapper></Col>
                        <Col className="col-auto px-0">{duration.replace(':', 'h').replace('o', 'm')}</Col>
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
                </DetailsList>  
            </Col>
        </>
    )
}

export default Details;