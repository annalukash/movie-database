import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import useWindowSize from '../../../../shared/useWindowSize/useWindowSize';

const KeywordsWrapper = styled.div`
    margin: 10px 0;
    max-width: ${props => props.size < 415 ? props.size + 'px' : '260px'};
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
    font-size: 0.9em;
    cursor: pointer;
`;

const Keywords = ({keyword, url, history}) => {
    const size = useWindowSize();
    const keywordsItem = keyword.map((keyword, index) => {
        return(
            <KeywordItemWrapper 
                key={index} 
                onClick={() => history.push(`/${url}/${keyword.id}`)}
            >
                {keyword.name}
            </KeywordItemWrapper>
        )
    })

    const keywordItem = keywordsItem.length === 0 ? 'Ключевые слова не добавлены.' : keywordsItem;

    return (
        <KeywordsWrapper size={size}>
            <Col className="font-weight-bold">Ключевые слова</Col>
            <Col>
                {keywordItem}
            </Col>
        </KeywordsWrapper>
    )
}

export default Keywords;