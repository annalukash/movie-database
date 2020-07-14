import React from 'react';
import styled from 'styled-components';
import Trailer from '../../youtubeVideo/youtubeVideo';

const Backdrop = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
`;

const TrailerBodyWrapper = styled.div`
    background-color: rgba(0, 0, 0);
    max-width: 1075px;
    max-height: 667px;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translate(-50%);
`;

const TrailerTitleWraper = styled.div`
    max-width: 1075px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: default;
    font-size: 20px;
`;

const TrailerCloseButton = styled.div`
    cursor: pointer;
`;

const ModalWindow = ({video, onCloseModal}) => {
    return(
        <Backdrop>
            <TrailerBodyWrapper>
                <TrailerTitleWraper>
                    Воспроизвести трейлер
                    <TrailerCloseButton
                        onClick={onCloseModal}
                    >
                        <i className="fas fa-times"></i>
                    </TrailerCloseButton>                   
                </TrailerTitleWraper>
                <Trailer video={video}/>
            </TrailerBodyWrapper>
        </Backdrop>
    )    
}

export default ModalWindow;