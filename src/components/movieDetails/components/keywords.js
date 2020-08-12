import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

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

const Keywords = ({keyword, url}) => {

    const history = useHistory();
  
        const keywordsItem = keyword.map((keyword, index) => {
            return(
                <KeywordItemWrapper key={index} onClick={() => {
                    history.push(`/${url}/${keyword.id}`)
                }}>
                    {keyword.name}
                </KeywordItemWrapper>
            )
        })

    const keywordItem = keywordsItem.length === 0 ? 'Ключевые слова не добавлены.' : keywordsItem;

    return (
        <KeywordsWrapper>
            <Col className="font-weight-bold">Ключевые слова</Col>
            <Col>
                {keywordItem}
            </Col>
        </KeywordsWrapper>
    )
}

export default Keywords;