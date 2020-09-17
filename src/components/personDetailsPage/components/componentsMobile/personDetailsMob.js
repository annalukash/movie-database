import React, {useState} from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import Carousel from "react-elastic-carousel";
import EllipsisText from "react-ellipsis-text";
import {
    Overlay,
    Link,
} from "../../../moviesPage/components/movieDetailsPage/components/originalDetails";
import { PersonDetailsCasts, CrewByDepartments } from '../index';

const LinkIconWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

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

const PosterWrapper = styled.div`
    min-width: 40vw;
    width: 40vw;
    height: 40vw;
    margin: 0 auto 15px;

    & img {
        border-radius: 7px;
        width: 100%;
    }
`;

const NameWrapper = styled.div`
    font-size: 2em;
    font-weight: 700;
    text-align: center;
`;

const SectionTitle = styled.div`
    font-weight: 600;
    font-size: 1.3em;
    margin-bottom: 10px;
`;

const SectionSubTitle = styled.div`
    font-weight: 600;
    font-size: 1em;
    margin-bottom: 7px;

    & div {
        font-weight: 400;
    }
`;

const BiographyWrapper = styled.div`
            height: ${props =>
            props.mainHeight && props.childRef > 200 ? "200px" : "auto"};
        overflow: hidden;
        transition: height 200ms;

        &.open {
            height: ${(props) => props.childRef + "px"};
        }
        
`;

const ReadMoreButton = styled.div`
    max-width: 111px;
    width: 100%;
    border: none;
    background-color: transparent;
    color: rgb(1, 180, 228);
    font-size: 16px;
    font-weight: 600;
    position: absolute;
    right: 0;
    display: ${(props) =>
        props.mainHeight && props.childRef > 200 ? "flex" : "none"};
    align-items: baseline;
    justify-content: space-between;

    &:focus {
        outline: none;
    }

    &:hover {
        color: rgb(30, 213, 169);
    }

    &:hover i {
        color: rgb(1, 180, 228);
    }

    i {
        font-size: 14px;
    }
`;

const PrevButton = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.7);

    &:focus {
        outline: none;
    }
`;

const NextButton = styled(PrevButton)`
    left: 95%;
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


const PersonDetailsMobile = ({ person, cast, crew, socialLink, MoviesService, history, width }) => {
    const [isOpen, setOpen] = useState(false);
    const [elementHeight, setElementHeight] = useState(0);

    const onOpen = () => {
        setOpen(!isOpen);
    };

    const getElementHeight = (element) => {
        setElementHeight(element?.clientHeight);
    };
    const classNames = isOpen ? "open" : "";

    const {
        known_for_department,
        birthday,
        deathday,
        name,
        gender,
        biography,
        place_of_birth, 
        profile_path
    } = person;

    const src = profile_path ? `//image.tmdb.org/t/p/w235_and_h235_face${profile_path}` : process.env.PUBLIC_URL + "/assets/avatar.png";
    const personGender = gender === 1 ? "Женский" : "Мужской";
    const personBirthday = birthday ? birthday : "-";
    const ageAlive = !birthday ? " " : deathday ? null
        : `(${moment().diff(`${birthday}`, "years")} лет)`;

    const ageDead = moment([deathday]).diff(moment([birthday]),"years");
    const dateOfDeath = !deathday ? null : (
        <SectionSubTitle>
            Дата смерти
            <div>
                {deathday} ({ageDead} лет)
            </div>
        </SectionSubTitle>
    );
    const personBiography = !biography ? (
        `У нас нет биографии для ${name}`
    ) : (
        <div ref={(element) => getElementHeight(element)}>
            {biography}
        </div>
    );

    const { facebook_id, instagram_id, twitter_id } = socialLink;

    const facebook = (
        <Link
            href={`https://www.facebook.com/${facebook_id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fab fa-facebook-f"></i>
        </Link>
    );

    const twitter = (
        <Link
            href={`https://twitter.com/${twitter_id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fab fa-twitter"></i>
        </Link>
    );

    const instagram = (
        <Link
            href={`https://www.instagram.com/${instagram_id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <i className="fab fa-instagram"></i>
        </Link>
    );

    const overlayFacebook = facebook_id ? (
        <Overlay logo={facebook} page={"Facebook"} />
    ) : null;
    const overlayTwitter = twitter_id ? (
        <Overlay logo={twitter} page={"Twitter"} />
    ) : null;
    const overlayInstagram = instagram_id ? (
        <Overlay logo={instagram} page={"Instagram"} />
    ) : null;

    const famousCast = cast.length ? <FamousCast cast={cast} history={history} MoviesService={MoviesService} /> : null;
    const acting = cast.length ? <PersonDetailsCasts cast={cast} width={width} /> : null;
    const filmCrew = crew.length ? <CrewByDepartments crew={crew} width={width}/> : null;

    return (
        <Container className='mt-4'>
            <Row>
                <Col className="px-0">
                    <PosterWrapper>
                        <img src={src} alt={name}/>
                    </PosterWrapper>
                    <NameWrapper>
                        {name}
                    </NameWrapper>
                    <LinkIconWrapper>
                        {overlayFacebook}
                        {overlayTwitter}
                        {overlayInstagram}
                    </LinkIconWrapper>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <SectionTitle>
                        Персональная информация
                    </SectionTitle>
                    <SectionSubTitle>
                        Известность за
                        <div>{known_for_department}</div>
                    </SectionSubTitle>
                    <SectionSubTitle>
                        Пол
                        <div>{personGender}</div>
                    </SectionSubTitle>
                    <SectionSubTitle>
                        Дата рождения
                        <div>{personBirthday} {ageAlive}</div>
                    </SectionSubTitle>
                    {dateOfDeath}
                    <SectionSubTitle>
                        Место рождения
                        <div>{place_of_birth}</div>
                    </SectionSubTitle>
                </Col>
            </Row>
            <Row>
                <Col>
                    <SectionTitle>
                        Биография
                    </SectionTitle>
                    <SectionSubTitle>
                        <BiographyWrapper
                            className={classNames}
                            childRef={elementHeight}
                            mainHeight={biography}
                        >
                            {personBiography}
                        </BiographyWrapper>
                        <ReadMoreButton
                            childRef={elementHeight}
                            mainHeight={biography}
                            onClick={onOpen}
                        >
                            Читать ещё{" "}
                            <i className="fas fa-chevron-right"></i>
                        </ReadMoreButton>
                    </SectionSubTitle>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    {famousCast}
                </Col>
            </Row>
            <Row>
                <Col className='px-0'>
                    {acting}
                </Col>
            </Row>
            <Row>
                <Col className='px-0'>
                    {filmCrew}
                </Col>
            </Row>
        </Container>
    );
};

const FamousCast = ({ cast, history, MoviesService }) => {
    const myArrow = ({ type, onClick, isEdge }) => {
        return <span style={{ display: "none" }}></span>;
    };
    const myPagination = ({ pages, activePage, onClick }) => {
        return <span style={{ display: "none" }}></span>;
    };

    const handleRouting = (id, type) => {
        MoviesService.getMovieDetails(id).then((res) => {
            if (res && res.status_code === 34) {
                history.push(`/collection/${id}`);
            } else {
                history.push(`/${type}/${id}`);
            }
        });
    };

    let carousel;

    const castSortedByPopularity = cast
    .filter((item) => item.media_type === "movie")
    .sort((a, b) => b.popularity - a.popularity)
    .filter((item, index) => index <= 7);

    const castItem = castSortedByPopularity
        .filter((item, index) => index <= 7)
        .map((item, index) => {
            let src = item.poster_path
                ? "//image.tmdb.org/t/p/w150_and_h225_bestv2" +
                  item.poster_path
                : process.env.PUBLIC_URL + "/assets/poster.png";
            return (
                <CastItemWrapper key={index}>
                    <CastImg
                        src={src}
                        alt={item.name || item.title}
                        onClick={() => handleRouting(item.id, item.media_type)}
                    />
                    <CastName
                        onClick={() => handleRouting(item.id, item.media_type)}
                    >
                        <EllipsisText
                            text={item.name || item.title}
                            length={13}
                        />
                    </CastName>
                </CastItemWrapper>
            );
        });

    return (
        <CarouselWrapper>
            <SectionTitle>Известность за</SectionTitle>
            <Carousel
                renderArrow={myArrow}
                itemsToScroll={2}
                itemsToShow={2}
                focusOnSelect={false}
                ref={(ref) => (carousel = ref)}
                renderPagination={myPagination}
            >
                {castItem}
            </Carousel>
            <PrevButton onClick={() => carousel.slidePrev()}>
                <i className="fas fa-angle-double-left"></i>
            </PrevButton>
            <NextButton onClick={() => carousel.slideNext()}>
                <i className="fas fa-angle-double-right"></i>
            </NextButton>
        </CarouselWrapper>
    );
};

export default PersonDetailsMobile;
