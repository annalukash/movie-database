import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

const CarouselWrapper = styled.div`
    .rec.rec-slider-container {
        margin: 0;

        * {
            outline: none;
        }

        .rec-item-wrapper {
            height: 285px;
        }
    }
`;

const CastTitle = styled.div`
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 20px;
`;

const CastItemWrapper = styled.div`
    border-radius: 5px;
    width: 140px;
    height: 275px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
`;

const CastImg = styled.img`
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 64.4%;
`;

const CastName = styled.div`
    font-weight: 700;
    font-size: 14px;
    padding: 10px 10px 0;
`;

const CastCharacter = styled.div`
    font-size: 13px;
    padding: 5px 10px 0;   
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    * {
        outline: none;
    }
`;

const ArrowButton = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;

    &:focus {
        outline: none;
    }
`;


const Cast = ({casts}) => {
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

    const {cast} = casts;

    const castItem = cast.map((item, index) => {
        let src = item.profile_path ? ('https://image.tmdb.org/t/p/w138_and_h175_face' + item.profile_path) : '../assets/avatar.png';
        return (
            <CastItemWrapper key={index}>
                <CastImg src={src} alt={item.name}/>
                <CastName>{item.name}</CastName>
                <CastCharacter>{item.character}</CastCharacter>
            </CastItemWrapper>
            
        )
    }).filter((item, index) => index <= 7)

    let carousel;
    return (
        <>
            <CarouselWrapper>
                <CastTitle>В главных ролях</CastTitle>
                <Carousel renderArrow={myArrow}
                        itemsToScroll={1} 
                        itemsToShow={5}
                        focusOnSelect={false}
                        ref={ref => (carousel = ref)}
                        renderPagination={myPagination}
                >
                    {castItem}
                </Carousel>
                <ButtonWrapper>
                    <ArrowButton onClick={() => carousel.slidePrev()}><i className="fas fa-angle-double-left"></i></ArrowButton>
                    <ArrowButton onClick={() => carousel.slideNext()}><i className="fas fa-angle-double-right"></i></ArrowButton>
                </ButtonWrapper>
           </CarouselWrapper>
        </>
    )

}

export default Cast;