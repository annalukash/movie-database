import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';


const SearchInput = styled.input`
    width: 100%;
`;

const SearchButton = styled.button`
    width: 55px;
`;

const SearchBar = () => {
    return (
        <Row className="justify-content-center mx-auto text-center w-100">
            <Col className="col-6 px-1">
                <SearchInput type="text"/>   
            </Col>
            <Col className="col-auto px-1">
                <SearchButton>
                    <i className="fas fa-search"></i>
                </SearchButton>
            </Col>
        </Row>
    )
}

export default SearchBar;