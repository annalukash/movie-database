import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

const LinkIconWrapper = styled.div`
    display: inline-block;
    font-size: 25px;
    margin: ${props => props.movie ? '0 15px 20px 0' : '30px 15px 0 0'};
    cursor: pointer;

    & .popover-body {
        background-color: red
    }
`;

const Link = styled.a`
    color: #000;
    & :hover :active :link :visited {
        color: #000;
    }
`;


const OriginalDetails = ({details, history, socialLink}) => {
    const {original_title, status, budget, revenue, original_language, original_name, networks} = details;
    const {facebook_id, instagram_id, twitter_id} = socialLink;

    let nf = new Intl.NumberFormat();
    const movieBudget= budget ? nf.format(budget).replace(/\s/g, ',') : '0';
    const movieRevenue = revenue ? nf.format(revenue).replace(/\s/g, ',') : '0';

    const tvNet = history.location.pathname.includes('tv') ? <TvNetwork networks={networks}/> : null;

    const statusMovie = () => {
        switch (status) {
            case 'Released': 
                return 'Выпущено';
            case 'Returning Series':
                return 'Продолжается';
            default:
                return (status);
        }
    }

    const facebook = (
        <Link href={`https://www.facebook.com/${facebook_id}`} target='_blank' rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
        </Link>
    )

    const twitter = (
        <Link href={`https://twitter.com/${twitter_id}`} target='_blank' rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
        </Link>
    )

    const instagram = (
        <Link href={`https://www.instagram.com/${instagram_id}`} target='_blank' rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
        </Link>
    )

    const overlayFacebook = facebook_id ? <Overlay logo={facebook} page={'Facebook'}/> : null;
    const overlayTwitter = twitter_id ?  <Overlay logo={twitter} page={'Twitter'}/> : null;
    const overlayInstagram = instagram_id ? <Overlay logo={instagram} page={'Instagram'}/> : null;

    return(
        <Col>
            <Row>
                <Col>
                    {overlayFacebook}
                    {overlayTwitter}
                    {overlayInstagram}
                </Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Исходное название</Col>
                <Col>{original_title || original_name}</Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Статус</Col>
                <Col>{statusMovie()}</Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Исходный язык</Col>
                <Col>{original_language === 'en' ?  'английский' : original_language}</Col>
            </Row>
            {tvNet}
            <Row className="flex-column">
                <Col className="font-weight-bold">Бюджет</Col>
                <Col>${movieBudget}.00</Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Сборы</Col>
                <Col>${movieRevenue}.00</Col>
            </Row>
        </Col>
    )
}

const TvNetwork = ({networks}) => {
    const logo = !networks[0].logo_path ? networks[0].name : <img src={`https://image.tmdb.org/t/p/h30${networks[0].logo_path}`} alt={networks.name}/>;

    return (
        <Row className="flex-column">
            <Col className="font-weight-bold">Телесеть</Col>
            <Col>  
                {logo}
            </Col>
        </Row>
    )
}

const Overlay = ({logo, page}) => {
    const popover = (
            <Popover id="popover-basic">              
                <Popover.Content>
                    Посетить {page}
                </Popover.Content>
            </Popover>
    );
    
    return (
        <OverlayTrigger placement="top" overlay={popover}>
            <LinkIconWrapper movie>{logo}</LinkIconWrapper>
        </OverlayTrigger>
    )
}

export default OriginalDetails;
export {Overlay, LinkIconWrapper, Link};