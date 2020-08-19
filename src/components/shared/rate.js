import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const RateWrapper = styled.div`
    width: ${props => props.small ? '44px' : '65px'};
    height: ${props => props.small ? '44px' : '65px'};
    position: ${props => props.small ? 'absolute' : 'static'};
    top: -22px;
    left: 10px;

    .CircularProgressbar-text {
        dominant-baseline: middle;
        text-anchor: middle;
        font-size: 28px;
        font-weight: 700;
    }
`;

const Rate = ({vote, small}) => {

    return (
        <RateWrapper small={small}>
            <CircularProgressbar
                value={vote * 10}
                background = {true}
                backgroundPadding = {5}
                text={`${vote === 0 ? 'NR' : (vote * 10 + '%')}`}
                styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'butt',
                    pathTransitionDuration: 0.5,
                    pathColor: vote > 7 ? '#21d07a' : vote < 3 ? '#db2360' : `#d2d531`,
                    textColor: '#fff',
                    trailColor: '#423d0f',
                    backgroundColor: '#000', 
                })}
            />
        </RateWrapper>
    )
}

export default Rate;