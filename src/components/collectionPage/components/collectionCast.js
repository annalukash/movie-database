import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import EllipsisText from "react-ellipsis-text";
import moment from 'moment';

const CastItemWrapper = styled.div`
    max-width: ${props => props.large ? '1218px' : '290px'};
    width: 100%;
    display: flex;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    margin: 10px 0 4px;
`;

const CastImgWrapper = styled.img`
    width: ${props => props.large ? '94px' : '60px'};
    height: ${props => props.large ? '141px' : '60px'};
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    cursor: pointer;
`;

const CastNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 14px;
    justify-content: center;
`;

const CastName = styled.div`
    font-size: ${props => props.large ? '19px' : '16px'};
    font-weight: 700;
    cursor: pointer;

    &:hover {
        color: #08e8de;
    }
`;

const CastCharacter = styled.div`
    font-size:14.4px;
`;

const HeaderWrapper = styled.div`
    font-size: 1.4em;
    margin: 20px 0;
`;

const ReleaseDate = styled.div`
    color: rgb(153, 153, 153);
    font-size: 16px;
    margin-bottom: 20px;
`;

const Section = styled.div`
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(215, 215, 215);
`;

const CollectionCast = ({cast, crew, parts, history}) => {  

    const onGoToPersonDetails = (id) => {
        history.push(`/person/${id}`)
    }

    const onGoToMovieDetails = (id) => {
        history.push(`/movie/${id}`)
    }

    const castItem = cast.filter((item, index) => index < 12)
        .map((item, index) => {
            const src = item.profile_path ? 'https://image.tmdb.org/t/p/w64_and_h64_face' + item.profile_path : '../../assets/avatar.png';

            return (
                <Col sm={3} key={index}>
                    <CastItemWrapper>
                        <CastImgWrapper 
                            src={src} 
                            alt={item.name}
                            onClick={() => onGoToPersonDetails(item.id)}
                        />
                        <CastNameWrapper>
                            <CastName
                                onClick={() => onGoToPersonDetails(item.id)}
                            >{item.name}</CastName>
                            <CastCharacter>
                                <EllipsisText text={item.character} length={20}/> 
                            </CastCharacter>
                        </CastNameWrapper>
                    </CastItemWrapper>
                </Col>
            )
        })

    const crewItem = crew.filter((item, index) => index < 8)
        .map((item, index) => {
            const src = item.profile_path ? 'https://image.tmdb.org/t/p/w64_and_h64_face' + item.profile_path : '../../assets/avatar.png';

            return (
                <Col sm={3} key={index}>
                    <CastItemWrapper>
                        <CastImgWrapper 
                            src={src} 
                            alt={item.name}
                            onClick={() => onGoToPersonDetails(item.id)}
                        />
                        <CastNameWrapper>
                            <CastName
                                onClick={() => onGoToPersonDetails(item.id)}
                            >{item.name}</CastName>
                            <CastCharacter>{item.department}</CastCharacter>
                        </CastNameWrapper>
                    </CastItemWrapper>
                </Col>
            )
        })

    const partItem = parts.map((part, index) => {
        const src = part.poster_path ? 'https://image.tmdb.org/t/p/w94_and_h141_bestv2' + part.poster_path : '../../assets/poster.png';

        return (
            <Col sm={12} key={index}>
                <CastItemWrapper large>
                    <CastImgWrapper 
                        src={src} 
                        alt={part.title} 
                        large
                        onClick={() => onGoToMovieDetails(part.id)}
                    />
                    <CastNameWrapper>
                        <CastName 
                            large
                            onClick={() => onGoToMovieDetails(part.id)}
                        >
                            {part.title}
                            <ReleaseDate>{moment(part.release_date).format('DD/MM/YYYY')}</ReleaseDate>
                        </CastName>
                        <CastCharacter>
                            <EllipsisText text={part.overview} length={270}/>
                        </CastCharacter>
                    </CastNameWrapper>
                </CastItemWrapper>
            </Col>
        )
    })

    return(
        <Container>
            <Section>
                <Row>
                    <Col className='font-weight-bold'>
                        <HeaderWrapper>
                            В главных ролях
                        </HeaderWrapper>
                    </Col>
                </Row>
                <Row>
                    {castItem}
                </Row>
            </Section>
            <Section>
                <Row>
                    <Col className='font-weight-bold'>
                        <HeaderWrapper>
                            Постановщики
                        </HeaderWrapper>
                    </Col>
                </Row>
                <Row>
                    {crewItem}
                </Row>
            </Section>
            <Section>
                <Row>
                    <Col className='font-weight-bold'>
                        <HeaderWrapper>
                            {parts.length} фильмов
                        </HeaderWrapper>
                    </Col>
                </Row>
                <Row>
                    {partItem}
                </Row>
            </Section>
        </Container>
    )
}

export default CollectionCast;