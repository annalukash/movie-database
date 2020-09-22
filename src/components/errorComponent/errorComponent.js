import React, { Component } from "react";
import styled from "styled-components";
import { createBrowserHistory } from "history";

const ErrorWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    width: 100%;
    text-align: center;
`;

const ErrorMessage = styled.div`
    font-size: 2em;
    margin-bottom: 15px;
`;

const ErrorButton = styled.button`
    font-size: 1.5em;
    border: none;
    background: none;  

    &:focus {
        outline: none;
    }

    & img {
        width: 50px;
        height: 50px;
    }
`;

export default class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        const history = createBrowserHistory();
        const { hasError } = this.state;

        if (hasError) {
            return (
                <ErrorWrapper>
                    <ErrorMessage>Что-то пошло не так...</ErrorMessage>
                    <ErrorButton onClick={() => history.go(0)}>
                        <img src={process.env.PUBLIC_URL + "/assets/loading.png"} alt='re-fresh'/>
                    </ErrorButton>
                </ErrorWrapper>
            );
        } else {
            return this.props.children;
        }
    }
}