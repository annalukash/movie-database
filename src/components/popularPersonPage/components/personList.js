import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../../shared/spinner/spinner';
import EllipsisText from "react-ellipsis-text";
import { Pagination } from '@material-ui/lab';

const PersonItemWrapper = styled.div`
    max-width: 235px;
    width: 100%;
    min-height: 287px;
    height: 100%;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
`;

const PersonImg = styled.img`
    width: 235px;
    height: 235px;
    cursor: pointer;
`;

const PersonNameWrapper = styled.div`
    padding: 8px 10px;
`;

const PersonName = styled.div`
    font-size: 16px;
    line-height: 19.2px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
`;

const PersonCast = styled.div`
    font-size: 14.4px;
    line-height: 17.28px;
    opacity: 0.6;
    text-align: left;
`;


const PersonList = ({person, loading, history, url, totalPages, getPerson, page}) => {
    const personItem = person.map(item => {
        const {name, known_for, profile_path, id} = item;
        const src = profile_path ? ('https://image.tmdb.org/t/p/w235_and_h235_face' + profile_path) : '../../assets/avatar.png';
        
        const castArray = known_for.map(movie => movie.name || movie.title);
        const castToString = castArray.join(', ');

        return (
            <Col key={id} xs={3} className='mb-4'>
                <PersonItemWrapper>
                    <PersonImg 
                        src={src} 
                        alt={name}
                        onClick={() => history.push(`${url}/${id}`)}
                    />
                    <PersonNameWrapper>
                        <PersonName
                            onClick={() => history.push(`${url}/${id}`)}
                        >{name}</PersonName>
                        <PersonCast>
                            <EllipsisText text={castToString} length={27}/>
                        </PersonCast>
                    </PersonNameWrapper>  
                </PersonItemWrapper>
            </Col>
        )
    })

    const spinner = loading ? <Spinner/> : personItem;

    return (
        <Container className="mt-5 container-xl">
            <Row className="justify-content-center mx-auto text-center w-100">
                {spinner}
            </Row>
            <Row className="justify-content-center mx-auto text-center w-100">
                <Pagination 
                    count={totalPages} 
                    boundaryCount={2}
                    page={page}
                    onChange={(event, page) => {
                        getPerson(page)
                    }}
                />
            </Row>
        </Container>
        
    )
}

export default PersonList;