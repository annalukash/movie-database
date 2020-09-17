import React, {useEffect} from 'react';
import styled from 'styled-components';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {inTrendRequested, inTrendLoaded, inTrendError} from '../../actions/actionsHomePage/actionHomePage';
import Spinner from '../shared/spinner/spinner';
import {InTrend} from './components';
import { Container, Row, Col } from 'react-bootstrap';
import useWindowSize from '../shared/useWindowSize/useWindowSize';

const HomePageWrapper = styled.div`
    width: 100%;
    margin: ${props => props.size < 415 ? '0 auto 10%': '10% auto'};
    background-color: #f1f2f6;
    border-radius: ${props => props.size < 415 ? '0' : '10px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", Arial, sans-serif;
    font-size: ${props => props.size < 415 ? '2.4em' : '3em'};
    font-weight: 700;
    padding: 10% 15px;
    text-align: center;
`;

const HomePageSubTitle = styled.div`
    font-size: 0.7em;
    font-weight: 600;
    text-align: center;
`;

const HomePage = ({title, MoviesService, inTrendLoaded, inTrendError, inTrend, loading}) => {
    const size = useWindowSize();
    document.title = title;

    const loadTrend = (time) => {
        MoviesService.getInTrend(time)
            .then((res) => inTrendLoaded(res.results))
            .catch(error => inTrendError());
    }

    useEffect(() => {
        loadTrend('day')
    }, []);

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <Container>
                <Row>
                    <Col className='px-0'>
                        <HomePageWrapper size={size}>
                            Добро пожаловать в Movies Database.
                            <HomePageSubTitle>
                                Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
                            </HomePageSubTitle>
                        </HomePageWrapper>
                    </Col>
                </Row>
                <Row>
                    <Col className='px-0'>
                        <InTrend 
                            inTrend={inTrend} 
                            MoviesService={MoviesService} 
                            loadTrend={loadTrend} 
                            size={size}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const {inTrend, loading} = state.homePageReducer;
    return {
        inTrend,
        loading
    }
}

const mapDispatchToProps = {
    inTrendRequested,
    inTrendLoaded,
    inTrendError
}

export default WithMoviesService()(connect(mapStateToProps, mapDispatchToProps)(HomePage));