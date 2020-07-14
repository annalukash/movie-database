import React from 'react';
import { Row, Col } from 'react-bootstrap';


const OriginalDetails = ({details}) => {
    const {original_title, status, budget, revenue, original_language} = details;

    let nf = new Intl.NumberFormat();
    const movieBudget= nf.format(budget).replace(/\s/g, ',');
    const movieRevenue = nf.format(revenue).replace(/\s/g, ',');


    return(
        <Col>
            <Row className="flex-column">
                <Col className="font-weight-bold">Исходное название</Col>
                <Col>{original_title}</Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Статус</Col>
                <Col>{status === 'Released' ? 'Выпущено' : status}</Col>
            </Row>
            <Row className="flex-column">
                <Col className="font-weight-bold">Исходный язык</Col>
                <Col>{original_language === 'en' ?  'английский' : original_language}</Col>
            </Row>
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

export default OriginalDetails;