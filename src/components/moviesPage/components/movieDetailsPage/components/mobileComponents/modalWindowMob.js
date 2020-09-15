import React from 'react';
import styled from 'styled-components';
import Trailer from '../../../../../shared/youtubeVideo/youtubeVideo';
import useWindowSize from '../../../../../shared/useWindowSize/useWindowSize';

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
    max-width: ${props => props.size + 'px'};
    max-height: 40%;
    width: 100%;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TrailerTitleWraper = styled.div`
    max-width: ${props => props.size + 'px'};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    cursor: default;
    font-size: 20px;
    color: #fff;
`;

const TrailerCloseButton = styled.div`
    cursor: pointer;
`;

const ModalWindowMobile = ({video, onCloseModal}) => {
    const size = useWindowSize();
    return(
        <Backdrop>
            <TrailerBodyWrapper size={size}>
                <TrailerTitleWraper size={size}>
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

export default ModalWindowMobile;