import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import moment from 'moment';
import PersonDetailsCasts from './personDetailsCasts';
import CrewByDepartments from './crewByDepartments';

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


const PersonDetails = ({person, cast, crew, moviePreview, onOpenPreview, onClosePreview}) => {
    const src = !person.profile_path ? '../../assets/avatar.png' : ('https://image.tmdb.org/t/p/w300_and_h450_bestv2' + person.profile_path);
    const getBio = () => {
        if (!person.biography) {
            return {__html: `У нас нет биографии для ${person.name}`};
        }
        return {__html: `${person.biography}`};
    }
    const gender = person.gender === 1 ? 'Женский' : 'Мужской';
    const alsoKnow = person.also_known_as.map((item, index) => {
        return (
            <AlsoKnowWrapper key={index}>
                {item}
            </AlsoKnowWrapper>
        )
    })
    const ageAlive = person.deathday ? null : (`(${moment().diff(`${person.birthday}`, 'years')} лет)`);
    const ageDead = moment([person.deathday]).diff( moment([person.birthday]) , 'years');
    const dateOfDeath = !person.deathday ? null : <PersonalInfoItemTitle>Дата смерти<PersonalInfoItemSubtitle>{person.deathday} ({ageDead} лет)</PersonalInfoItemSubtitle></PersonalInfoItemTitle>;
    const acting = cast.length !== 0 ? <Acting cast={cast}/> : null;
    const filmCrew = crew.length !== 0 ? <CrewByDepartments crew={crew}/> : null;

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
                    <PersonalInfoItemSubtitle>{person.birthday} {ageAlive}</PersonalInfoItemSubtitle>
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
                        <BioContent dangerouslySetInnerHTML={getBio()}></BioContent>
                    </BioWrapper>   
                </DescriptionWrapper>
                {acting}
                {filmCrew}                 
           </Col>   
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