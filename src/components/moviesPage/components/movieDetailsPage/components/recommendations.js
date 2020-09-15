import React from 'react';
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components';
import EllipsisText from "react-ellipsis-text";
import moment from 'moment';
import useWindowSize from '../../../../shared/useWindowSize/useWindowSize';

const RecommendationCardWrapper = styled.div`
    max-width: 230px;
`;

const RecommendationCardImgWrapper = styled.div`
    cursor: pointer;
    position: relative;
    max-width: 230px;
    font-size: 16px;

    &:hover .visible {
        opacity: 1;
    }
`;

const RecommendationCardRelease = styled.div`
    background-color: rgba(255,255,255,0.9);
    position: absolute;
    bottom: 0px;
    padding: 10px;
    width: 100%;
    opacity: 0;
    transition: opacity 200ms;
`;

const RecommendationCardImg = styled.img`
    border-radius: 5px;
    max-width: 230px;
    max-height: 130px;
`;

const RecommendationCardTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;  
`;

const RecommendationCardTitle = styled.div``;

const RecommendationCardRate = styled.div``;

const CarouselWrapper = styled.div`
    position: relative;
    background-repeat: repeat-x;
    background-position: bottom;
    border-bottom:  ${props => props.size < 415 ? 'none' : '1px solid rgb(215,215,215)'};
    .rec.rec-slider-container {
        margin: 0;
        height: 210px;
        * {
            outline: none;
            
        }
        .rec-item-wrapper {
            height: 205px;
        }
    }
`;

const PrevButton = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    position: absolute;
    top: 50%;
    left: ${props => props.size < 415 ? '5%' : '0'};
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.7);
    display: ${props => props.size < 415 ? 'none' : 'block'};

    &:focus {
        outline: none;
    }
`;

const NextButton = styled(PrevButton)`
    left: ${props => props.size < 415 ? '95%' : '100%'};
`;

const SectionTitle = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    padding-right: 10px;   
    margin-bottom: 20px;
`;


const Recommendation = ({recommendations, history, MoviesService, castRequested, movieDetailsRequested, getDetails, getCast, getKeywords, getVideos, getSocailLink, getRecommendations}) => {
    const handleRouting = (id) => {
        if (history.location.pathname.includes('tv')) {
            movieDetailsRequested();
            castRequested();
            getDetails(id, MoviesService.getTVDetails); 
            getCast(id, MoviesService.getTVCasts);
            getKeywords(id, MoviesService.getTVKeywords);
            getVideos(id, MoviesService.getTVVideos);
            getSocailLink(id, MoviesService.getTVExternalIds);
            getRecommendations(id, MoviesService.getTVRecommendations);
            history.push(`/tv/${id}`)
        } else {
            movieDetailsRequested();
            castRequested();
            getDetails(id, MoviesService.getMovieDetails);
            getCast(id, MoviesService.getCast);
            getKeywords(id, MoviesService.getKeywords);
            getVideos(id, MoviesService.getVideos);
            getSocailLink(id, MoviesService.getMovieExternalIds);
            getRecommendations(id, MoviesService.getMovieRecommendations);
            history.push(`/movie/${id}`)
        }
    }
    const size = useWindowSize();
    const recommendationItems = recommendations.filter((item, index) => index < 8)
        .map((item, index) => {
            const {id, vote_average, title, release_date, name, first_air_date, backdrop_path} = item;
            const src = backdrop_path ? ('//image.tmdb.org/t/p/w250_and_h141_face' + backdrop_path) : (process.env.PUBLIC_URL + '/assets/poster.png');
            const releaseDate = moment(release_date || first_air_date).format('DD/MM/YYYY');
            return (
                <RecommendationCardWrapper key={index}>
                    <RecommendationCardImgWrapper>
                        <RecommendationCardImg 
                            src={src} 
                            alt={title || name}
                            onClick={() => handleRouting(id)}
                        />
                        <RecommendationCardRelease className={'visible'}>
                            <i className="far fa-calendar-alt"></i> {releaseDate}
                        </RecommendationCardRelease>
                    </RecommendationCardImgWrapper>
                    <RecommendationCardTitleWrapper>
                        <RecommendationCardTitle>
                            <EllipsisText text={title || name} length={24}/>
                        </RecommendationCardTitle>
                        <RecommendationCardRate>{vote_average * 10}%</RecommendationCardRate>
                    </RecommendationCardTitleWrapper>
                </RecommendationCardWrapper>
            )
        })
    
    const myArrow = ({ type, onClick, isEdge }) => {
        return (
            <span style={{display: 'none'}}></span>
        )
    }
    const myPagination = ({ pages, activePage, onClick }) => {
        return (
            <span style={{display: 'none'}}></span>
        )
    }

    let carousel;

    return (
        <CarouselWrapper size={size}>
            <SectionTitle>Рекомендации </SectionTitle>
            <Carousel renderArrow={myArrow}
                    itemsToScroll={size < 415 ? 1 : 2} 
                    itemsToShow={size < 415 ? 1.4 : 3}
                    focusOnSelect={false}
                    ref={ref => (carousel = ref)}
                    renderPagination={myPagination}
            >
                {recommendationItems}
            </Carousel>
            <PrevButton 
                size={size}
                onClick={() => carousel.slidePrev()}
            >
                <i className="fas fa-angle-double-left"></i>
            </PrevButton>
            <NextButton 
                size={size}
                onClick={() => carousel.slideNext()}
            >
                <i className="fas fa-angle-double-right"></i>
            </NextButton>
        </CarouselWrapper>
    )
}

export default Recommendation;