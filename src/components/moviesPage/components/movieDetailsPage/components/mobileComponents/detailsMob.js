import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Rate from '../../../../../shared/rate';
import {ModalWindowMobile} from './index';

const GlobalWrapper = styled.div`
    background-color: rgba(33, 38, 58, 0.96);
    color: #fff;
`;

const BackgroundWrapper = styled.div`
    width: 100%;
    background-image: linear-gradient(315deg,rgba(233,188,183,0.7) 0%,rgba(41,82,74,0.8) 74%), ${props => `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${props.url})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right;
    min-width: 100%;
    font-family: 'Source Sans Pro';
    background-color: #e9bcb7;
`;

const PosterWrapper = styled.div`
    padding: 20px;

    & img {
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
    border-right: 1px solid rgba(255, 255, 255, 0.8);
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

    &:hover{
        opacity: 0.6
    }

    & i {
        font-size: 0.6em;
    }
`;

const TrailerTitle = styled.div`
    padding-left: 10px;
`;

const GenreWrapper = styled.div`
    background-color: rgba(33, 38, 58, 1);
    border-top: 1px solid rgba(0,0,0,0.2);
    border-bottom: 1px solid rgba(0,0,0,0.2);
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

const Tagline = styled.div`  
    font-size: 1.1em;
    font-weight: 400;
    font-style: italic;
    opacity: 0.7;
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

const DetailsMobile = ({details, history, video, onOpenModal, modalWindow, onCloseModal, rating}) => {

    const {title, name, backdrop_path, poster_path, id, homepage, vote_average, release_date, genres, runtime, tagline, overview, first_air_date, episode_run_time, created_by} = details;
    const src = poster_path ? ('//image.tmdb.org/t/p/w116_and_h174_face' + poster_path) : (process.env.PUBLIC_URL + '/assets/poster.png');
    let duration = (runtime || episode_run_time) ? moment.duration(runtime || episode_run_time[0], "minutes").format("h : m o").replace(':', 'h').replace('o', 'm') : null;
    const genreItem = genres.map(genre => genre.name);
    const genreToString = genreItem.join(', ');
    const releaseYear = release_date || first_air_date ? `(${moment(release_date || first_air_date).format('YYYY')})` : null;
    const releaseDate = release_date || first_air_date ? moment(release_date || first_air_date).format('DD/MM/YYYY') : null;
    const ratingObject = rating.find(item => item.iso_3166_1 === 'US');
    const ratingCertificate = ratingObject?.release_dates[0].certification ? <Rating>{ratingObject?.release_dates[0].certification}</Rating> : null;

    const trailerButton = () => {
        return(
            <TrailerWrapper>
                <i className="fas fa-play"></i>
                <TrailerTitle
                    onClick = {() => onOpenModal(id)}
                >Трейлер</TrailerTitle>
            </TrailerWrapper>
        )   
    }

    const modal = modalWindow ? <ModalWindowMobile video={video} onCloseModal={onCloseModal}/> : null;
    const showTrailer = video?.results.length === 0 ? null : trailerButton();

    return (   
        <GlobalWrapper> 
            {modal}
            <BackgroundWrapper url={backdrop_path}>
                <PosterWrapper>
                    <img src={src} alt={title || name}/>
                </PosterWrapper>
            </BackgroundWrapper>
            <TitleWrapper>
                <Title>{title || name} <span>{(releaseYear)}</span></Title>
                <RateWrapper>
                    <Rate vote={vote_average} small isStatic/>
                    <Vote>Пользовательский <span>счёт</span></Vote>
                    {showTrailer}  
                </RateWrapper>
            </TitleWrapper>
            <GenreWrapper>
                <ReleaseWrapper>
                    {ratingCertificate}
                    {releaseDate}
                    <i className="fas fa-circle"></i>
                    {duration}
                </ReleaseWrapper>
                <GenreList>{genreToString}</GenreList>
            </GenreWrapper>
            <OverviewWrapper>
                <Tagline>{tagline}</Tagline>
                <Overview>
                    <div>Обзор</div>
                    {overview}
                </Overview>
            </OverviewWrapper>
        </GlobalWrapper>
    )
}

export default DetailsMobile;