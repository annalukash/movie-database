import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const KeywordsWrapper = styled.div`
    margin: 30px 0;
    max-width: 260px;
    width: 100%;
`;

const KeywordItemWrapper = styled.div`
    background-color: rgba(0,0,0,0.1);
    border: 1px solid #d7d7d7;
    color: #000;
    padding: 4px 10px;
    border-radius: 4px;
    width: fit-content;
    margin: 5px;
    display: inline-block;
    font-size: 14.4px;
    cursor: pointer;
`;

const Keywords = ({keyword}) => {

    const {keywords} = keyword;

    const keywordsItem = keywords.map((keyword, index) => {
        return(
            <KeywordItemWrapper key={index}>
                {keyword.name}
            </KeywordItemWrapper>
        )
    })

    return (
        <KeywordsWrapper>
            <Col className="font-weight-bold">Ключевые слова</Col>
            <Col>
                {keywordsItem}
            </Col>
        </KeywordsWrapper>
    )
}

export default Keywords;