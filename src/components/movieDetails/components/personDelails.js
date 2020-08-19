import React, {useState} from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import moment from 'moment';
import PersonDetailsCasts from './personDetailsCasts';
import CrewByDepartments from './crewByDepartments';
import Carousel from 'react-elastic-carousel';
import { useHistory } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";
import MoviesServices from '../../../services/services';

const CarouselWrapper = styled.div`
    position: relative;

    .rec.rec-slider-container {
        margin: 0;
        height: 285px;

        * {
            outline: none;
            
        }

        .rec-item-wrapper {
            height: 250px;
        }
    }

`;

const CastTitle = styled.div`
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 20px;
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

const CastItemWrapper = styled.div`
    border-radius: 5px;
    width: 140px;
    height: 240px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
`;

const CastImg = styled.img`
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 195px;
    cursor: pointer;
`;

const CastName = styled.div`
    font-weight: 700;
    font-size: 14px;
    padding: 10px 10px 0;
    cursor: pointer;
`;


const ImgWrapper = styled.img`
    width: 300px;
    height: 450px;
    border-radius: 10px;
`;

const DescriptionWrapper = styled.div`
    max-width: 890px;
    width: 100%;
`;

const TitleWrapper = styled.div`
    font-size: 35.2px;
    font-weight: 700;
    color: #000;
`;

const BioWrapper = styled.div`
    font-size: 20.8px;
    font-weight: 600;
    margin: 30px 0;
`;

const BioContent = styled.div`
    font-size: 16px;
    font-weight: 400;  
    height: ${props => (props.mainHeight && props.childRef > 200) ? '200px' : 'auto' };
    overflow: hidden;  
    transition: height 200ms;

    &.open {
        height: ${props => props.childRef + 'px'};
    }
`;

const PersonalInfo = styled.div`
    font-size:20.8px;
    font-weight:600;
`;

const PersonalInfoItemTitle = styled.div`
    font-size:16px;
    font-weight:600;
    margin-top: 20px;
`;

const PersonalInfoItemSubtitle = styled.div`
    font-size:16px;
    font-weight:400;
`;

const AlsoKnowWrapper = styled.div`
    margin-top: 8px;
`;

const MovieListWrapper = styled.div``;

const DepartmentListTitle = styled.div`
    font-size:20.8px;
    font-weight:600;
    margin: 10px 0;
`;

const MovieListContent = styled.div`
    box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 8px 0px;
    border: 1px solid rgb(227, 227, 227);
`;

const ReadMoreButton = styled.button`
    display: ${props => (props.mainHeight && props.childRef > 200) ? 'block' : 'none'};
`;


const PersonDetails = ({person, cast, crew}) => {
    const history = useHistory();
    const [isOpen, setOpen] = useState(false);
    const [elementHeight, setElementHeight] = useState(0);
    
    const onOpen = () => {
        setOpen(!isOpen)
    }

    const getElementHeight = (element) => {
        setElementHeight(element?.clientHeight)
    }
    const classNames = isOpen ? 'open' : '';
    const src = !person.profile_path ? '../../assets/avatar.png' : ('https://image.tmdb.org/t/p/w300_and_h450_bestv2' + person.profile_path);
    const biography = !person.biography ? `У нас нет биографии для ${person.name}` : <div ref={element => getElementHeight(element)}>{person.biography}</div>;
    const gender = person.gender === 1 ? 'Женский' : 'Мужской';
    const alsoKnow = person.also_known_as.map((item, index) => {
        return (
            <AlsoKnowWrapper key={index}>
                {item}
            </AlsoKnowWrapper>
        )
    })
    const birthday = person.birthday ? person.birthday : '-';
    const ageAlive = !person.birthday ? ' ' : person.deathday ? null : (`(${moment().diff(`${person.birthday}`, 'years')} лет)`);
    const ageDead = moment([person.deathday]).diff( moment([person.birthday]) , 'years');
    const dateOfDeath = !person.deathday ? null : <PersonalInfoItemTitle>Дата смерти<PersonalInfoItemSubtitle>{person.deathday} ({ageDead} лет)</PersonalInfoItemSubtitle></PersonalInfoItemTitle>;
    const acting = cast.length !== 0 ? <Acting cast={cast}/> : null;
    const filmCrew = crew.length !== 0 ? <CrewByDepartments crew={crew}/> : null;
    const famousCast = cast.length !== 0 ? <FamousCast cast={cast} history={history}/> : null;

    return (
        <>
            <Col className="col-4">
                <ImgWrapper src={src} alt={person.name}/>
                <PersonalInfo>Персональная информация</PersonalInfo>
                <PersonalInfoItemTitle>Известность за
                    <PersonalInfoItemSubtitle>{person.known_for_department}</PersonalInfoItemSubtitle>
                </PersonalInfoItemTitle>
                <PersonalInfoItemTitle>Пол
                    <PersonalInfoItemSubtitle>{gender}</PersonalInfoItemSubtitle>
                </PersonalInfoItemTitle>
                <PersonalInfoItemTitle>Дата рождения
                    <PersonalInfoItemSubtitle>{birthday} {ageAlive}</PersonalInfoItemSubtitle>
                </PersonalInfoItemTitle>
                {dateOfDeath}
                <PersonalInfoItemTitle>Место рождения
                    <PersonalInfoItemSubtitle>{person.place_of_birth}</PersonalInfoItemSubtitle>
                </PersonalInfoItemTitle>
                <PersonalInfoItemTitle>Также известность как
                    <PersonalInfoItemSubtitle>{alsoKnow}</PersonalInfoItemSubtitle>
                </PersonalInfoItemTitle>
            </Col>
            <Col className="col-8">
                <DescriptionWrapper>
                    <TitleWrapper>{person.name}</TitleWrapper>
                    <BioWrapper>Биография
                        <BioContent 
                            className={classNames}
                            childRef={elementHeight}
                            mainHeight={person.biography}
                        >{biography}</BioContent>
                        <ReadMoreButton
                            childRef={elementHeight}
                            mainHeight={person.biography}
                            onClick={onOpen}
                        >Read more</ReadMoreButton>
                    </BioWrapper>   
                </DescriptionWrapper>
                {famousCast} 
                {acting}
                {filmCrew}                 
           </Col>            
        </>            
    )
}

const FamousCast = ({cast, history}) => {
    
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

    const handleRouting = (id) => {
        const moviesServices = new MoviesServices();
        moviesServices.getMovieDetails(id)
            .then((res) => {
                debugger
                if (res && !res.success) {
                    history.push(`/collection/${id}`)
                } else {
                    history.push(`/movie/${id}`)
                }
            })
    }

    let carousel;

    const castItem = cast.map((item, index) => {
        let src = item.poster_path ? ('https://image.tmdb.org/t/p/w150_and_h225_bestv2' + item.poster_path) : '../../assets/poster.png';
        return (
            <CastItemWrapper key={index}>
                <CastImg 
                    src={src} 
                    alt={item.name || item.title} 
                    onClick={() => handleRouting(item.id)}
                />
                <CastName
                    onClick={() => handleRouting(item.id)}
                >
                    <EllipsisText text={item.name || item.title} length={13}/>
                </CastName>
            </CastItemWrapper>
        )
    }).filter((item, index) => index <= 7)

    return (
        <>
            <CarouselWrapper>
                <CastTitle>Известность за</CastTitle>
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
           </CarouselWrapper>
           
        </>
    )

}

const Acting = ({cast}) =>{
    return (
        <MovieListWrapper>
            <DepartmentListTitle>Актёрское искусство</DepartmentListTitle>
            <MovieListContent>
                <PersonDetailsCasts cast={cast}/>
            </MovieListContent>
        </MovieListWrapper>
    )
}

export default PersonDetails;