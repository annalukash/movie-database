import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

const LinkIconWrapper = styled.div`
    display: inline-block;
    font-size: 25px;  
    cursor: pointer;
    margin-right: 15px;
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

const LinkWrapper = styled.div`
    margin: ${props => props.movie ? '0 15px 20px 0' : '30px 15px 0 0'};
    display: flex;
`;

const SocialLinkWrrapper = styled.div`
    display: ${props => !props.facebook && !props.twitter && !props.instagram ? 'none' : 'block'};
    border-right: 1px solid #d7d7d7;
    margin-right: 15px;
`;


const OriginalDetails = ({details, history, socialLink}) => {
    const {original_title, status, budget, revenue, original_language, original_name, networks, homepage} = details;
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
    );

    const twitter = (
        <Link href={`https://twitter.com/${twitter_id}`} target='_blank' rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
        </Link>
    );

    const instagram = (
        <Link href={`https://www.instagram.com/${instagram_id}`} target='_blank' rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
        </Link>
    );

    const homePage = (
        <Link href={homepage} target='_blank' rel="noopener noreferrer">
            <i className="fas fa-link"></i>
        </Link>
    );

    const overlayFacebook = facebook_id ? <Overlay logo={facebook} page={'Facebook'}/> : null;
    const overlayTwitter = twitter_id ?  <Overlay logo={twitter} page={'Twitter'}/> : null;
    const overlayInstagram = instagram_id ? <Overlay logo={instagram} page={'Instagram'}/> : null;
    const overlayHomePage = homepage ? <Overlay logo={homePage} page={'Домашнюю страницу'}/> : null;

    return(
        <Col>
            <Row>
                <Col className='d-flex align-items-center'>
                    <LinkWrapper movie>
                        <SocialLinkWrrapper facebook={facebook_id} twitter={twitter_id} instagram={instagram_id}>
                            {overlayFacebook}
                            {overlayTwitter}
                            {overlayInstagram}
                        </SocialLinkWrrapper>
                        {overlayHomePage}
                    </LinkWrapper>
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
    const networkItem = networks?.find((network, index) => index === 0);
    const logo = !networkItem?.logo_path ? networkItem?.name : <img src={`https://image.tmdb.org/t/p/h30${networkItem?.logo_path}`} alt={networkItem?.name}/>;

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
            <LinkIconWrapper>{logo}</LinkIconWrapper>
        </OverlayTrigger>
    )
}

export default OriginalDetails;
export {Overlay, LinkIconWrapper, Link};