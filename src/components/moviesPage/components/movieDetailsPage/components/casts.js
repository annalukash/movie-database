import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-elastic-carousel';

const CarouselWrapper = styled.div`
    position: relative;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(215, 215, 215);

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
    cursor: pointer;
`;

const CastName = styled.div`
    font-weight: 700;
    font-size: 14px;
    padding: 10px 10px 0;
    cursor: pointer;
`;

const CastCharacter = styled.div`
    font-size: 13px;
    padding: 5px 10px 0;   
`;


const PrevButton = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.7);

    &:focus {
        outline: none;
    }
`;

const NextButton = styled(PrevButton)`
    left: 100%;
`;

const FullCastWrapper = styled.div`
    color: #1e2f3c;
    font-size: 17.6px;
    font-weight: 600;
    margin-top: 10px;
    cursor: pointer;
    text-decoration: underline;
`;



const Cast = ({casts, id, history}) => {

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

    const onGoFullCast = () => {

        if (history.location.pathname.includes('tv')) {
            history.push(`/tv/${id}/casts`)
        } else {
            history.push(`/movie/${id}/casts`)
        } 
        
    }

    const onGoPersonBio = (id) => {
        history.push(`/person/${id}`)
    }

    const {cast} = casts;

    const sortedByOrderCasts = cast.sort((a, b) => {
        const previous = a.order;
        const current = b.order;
        return previous - current;
    })

    const castItem = sortedByOrderCasts.filter((item, index) => index <= 7)
        .map((item, index) => {
            let src = item.profile_path ? ('https://image.tmdb.org/t/p/w138_and_h175_face' + item.profile_path) : (process.env.PUBLIC_URL + '/assets/avatar.png');
            return (
                <CastItemWrapper key={index}>
                    <CastImg 
                        src={src} 
                        alt={item.name} 
                        onClick={() => onGoPersonBio(item.id)}
                    />
                    <CastName
                        onClick={() => onGoPersonBio(item.id)}
                    >{item.name}</CastName>
                    <CastCharacter>{item.character}</CastCharacter>
                </CastItemWrapper>
                
            )
        });

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
                <PrevButton onClick={() => carousel.slidePrev()}><i className="fas fa-angle-double-left"></i></PrevButton>
                <NextButton onClick={() => carousel.slideNext()}><i className="fas fa-angle-double-right"></i></NextButton>
                <FullCastWrapper
                     onClick={() => onGoFullCast()}
                >Полный актёрский и съёмочный состав</FullCastWrapper>
           </CarouselWrapper>
           
        </>
    )

}

export default Cast;