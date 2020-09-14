import React from 'react';
import {useHistory} from 'react-router-dom';
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components';
import moment from 'moment';
import Rate from '../../shared/rate';
import Toggler from '../../shared/toggler/toggler';

const CarouselWrapper = styled.div`
    max-width: 100%;
    margin: 0 15px;
    position: relative;
    background-image: url('https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg');
    background-repeat: repeat-x;
    background-position: bottom;
    .rec.rec-slider-container {
        margin: 0;
        height: 345px;
        * {
            outline: none;
            
        }
        .rec-item-wrapper {
            height: 335px;
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
    background-color: rgb(239, 239, 239);

    &:focus {
        outline: none;
    }

    & i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const NextButton = styled(PrevButton)`
    left: ${props => props.size < 415 ? '95%' : '100%'};
`;

const SectionTitleWrapper = styled.div`
    display: flex;
    align-items: ${props => props.size < 415 ? 'center' : 'baseline'};
    flex-direction: ${props => props.size < 415 ? 'column' : 'row'};
    margin: 0 15px 30px 5px;
`;

const SectionTitle = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    padding-right: 10px; 
    margin-bottom: 15px; 
`;

const TrendCardWrapper = styled.div`
    width: 150px;
    min-width: 150px;
`;

const TrendCardImg = styled.img`
    border-radius: 8px;
    width: 150px;
    height: 225px;
    cursor: pointer;
`;

const TrendCardTitleWrapper = styled.div`
    position: relative;
    padding-top: 20px;
`;
const TrendCardTitle = styled.div`
    font-family: "Source Sans Pro", Arial, sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
`;

const TrendCardRelease = styled.div`
    opacity: 0.6;
`;

const InTrend = ({inTrend, MoviesService, loadTrend, size}) => {
    const history = useHistory();

    const handleRouting = (id, type) => {
        MoviesService.getMovieDetails(id)
            .then((res) => {
                if (res && res.status_code === 34) {
                    history.push(`/collection/${id}`)
                } else {
                    history.push(`/${type}/${id}`)
                }
            })
    }

    const trendItems = inTrend.map((item, index) => {
        const {id, release_date, first_air_date, media_type, name, title, poster_path, vote_average} = item;
        let src = poster_path ? ('//image.tmdb.org/t/p/w220_and_h330_face' + poster_path) : (process.env.PUBLIC_URL + '/assets/poster.png');
        const date = moment(release_date || first_air_date).format('DD.MM.YYYY');
        return (
            <TrendCardWrapper key={index}>
                <TrendCardImg 
                    src={src} 
                    alt={name || title} 
                    onClick={() => handleRouting(id, media_type)}
                />
                <TrendCardTitleWrapper>
                    <TrendCardTitle
                        onClick={() => handleRouting(id, media_type)}
                    >
                        {name || title} 
                    </TrendCardTitle>
                    <TrendCardRelease>
                        {date}
                    </TrendCardRelease>
                    <Rate 
                        vote={vote_average}
                        small
                    />
                </TrendCardTitleWrapper>
            </TrendCardWrapper>
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
        <CarouselWrapper>
            <SectionTitleWrapper size={size}>
                <SectionTitle>В тренде </SectionTitle>
                <Toggler names={['Сегодня', 'На этой неделе']} loadTrend={loadTrend} types={['day', 'week']}/>
            </SectionTitleWrapper>
            <Carousel 
                renderArrow={myArrow}
                itemsToScroll={size < 415 ? 2 : 5} 
                itemsToShow={size < 415 ? 2 : 7}
                focusOnSelect={false}
                ref={ref => (carousel = ref)}
                renderPagination={myPagination}
            >
                {trendItems}
            </Carousel>
            <PrevButton 
                onClick={() => carousel.slidePrev()}
                size={size}
            >
                <i className="fas fa-angle-double-left"></i>
            </PrevButton>
            <NextButton 
                onClick={() => carousel.slideNext()}
                size={size}
            >
                <i className="fas fa-angle-double-right"></i>
            </NextButton>
        </CarouselWrapper> 
    )
        
}

export default InTrend;