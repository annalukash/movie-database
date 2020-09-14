import React from 'react';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from '../../shared/spinner/spinner';
import EllipsisText from "react-ellipsis-text";
import { Pagination } from '@material-ui/lab';
import useWindowSize from '../../shared/useWindowSize/useWindowSize';

const PersonItemWrapper = styled.div`
    max-width: 235px;
    width: 100%;
    min-height: ${props => props.size < 415 ? '220px' : '287px'};
    height: 100%;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
`;

const PersonImg = styled.img`
    width: 100%;
    height: ${props => props.size < 415 ? '63%' : '80%'};
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

const SectionTitle = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding: 0 0 15px 30px;
`;

const PersonList = ({person, loading, history, url, totalPages, getPerson, page}) => {
    const size = useWindowSize();
    const personItem = person.map(item => {
        const {name, known_for, profile_path, id} = item;
        const src = profile_path ? ('https://image.tmdb.org/t/p/w235_and_h235_face' + profile_path) : (process.env.PUBLIC_URL + '/assets/avatar.png');
        
        const castArray = known_for.map(movie => movie.name || movie.title);
        const castToString = castArray.join(', ');

        return (
            <Col key={id} className='mb-4 col-xl-3 col-6 col-sm-6'>
                <PersonItemWrapper size={size}>
                    <PersonImg 
                        size={size}
                        src={src} 
                        alt={name}
                        onClick={() => history.push(`${url}/${id}`)}
                    />
                    <PersonNameWrapper>
                        <PersonName
                            onClick={() => history.push(`${url}/${id}`)}
                        >{name}</PersonName>
                        <PersonCast>
                            <EllipsisText text={castToString} length={size < 415 ? 15 : 27}/>
                        </PersonCast>
                    </PersonNameWrapper>  
                </PersonItemWrapper>
            </Col>
        )
    })

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <Container className="mt-4 mt-lg-5 container-xl">
                <Row>
                    <SectionTitle>
                        Популярные люди
                    </SectionTitle>
                </Row>
                <Row className="justify-content-center mx-auto text-center w-100">
                    {personItem}
                </Row>
                <Row className="justify-content-center mx-auto text-center w-100 mb-5">
                    <Pagination 
                        size={size < 415 ? "small" : 'large'}
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
}

export default PersonList;