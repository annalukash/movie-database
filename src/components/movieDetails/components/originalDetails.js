import React from 'react';
import { Row, Col } from 'react-bootstrap';


const OriginalDetails = ({details, history}) => {
    const {original_title, status, budget, revenue, original_language, original_name, networks} = details;

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

    return(
        <Col>
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

export default OriginalDetails;