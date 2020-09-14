import React, {useEffect} from 'react';
import styled from 'styled-components';
import WithMoviesService from '../hoc/withMoviesService';
import {connect} from 'react-redux';
import {inTrendRequested, inTrendLoaded, inTrendError} from '../../actions/actions';
import Spinner from '../shared/spinner/spinner';
import {InTrend} from './components';
import { Container, Row, Col } from 'react-bootstrap';

const HomePageWrapper = styled.div`
    width: 100%;
    margin: 10% auto;
    background-color: #f1f2f6;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Source Sans Pro", Arial, sans-serif;
    font-size: 3em;
    font-weight: 700;
    padding: 100px 0;
`;

const HomePageSubTitle = styled.div`
    font-size: 0.7em;
    font-weight: 600;
`;

const HomePage = ({title, MoviesService, inTrendLoaded, inTrendError, inTrend, loading}) => {
    document.title = title;

    const loadTrend = (time) => {
        MoviesService.getInTrend(time)
            .then((res) => inTrendLoaded(res.results))
            .catch(error => inTrendError());
    }

    useEffect(() => {
        loadTrend('day')
    }, []);

    const trending = loading ? <Spinner/> : <InTrend inTrend={inTrend} MoviesService={MoviesService} loadTrend={loadTrend}/>
    return (
        <Container>
            <Row>
                <Col>
                    <HomePageWrapper>
                        Добро пожаловать в Movies Database.
                        <HomePageSubTitle>
                            Миллионы фильмов, сериалов и людей. Исследуйте сейчас.
                        </HomePageSubTitle>
                    </HomePageWrapper>
                </Col>
            </Row>
            <Row>
                <Col>
                    {trending}
                </Col>
            </Row>
        </Container>
    )
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