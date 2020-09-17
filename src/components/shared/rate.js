import React from 'react';
import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const RateWrapper = styled.div`
    width: ${props => props.small ? '44px' : '65px'};
    height: ${props => props.small ? '44px' : '65px'};
    position: ${props => (props.small && props.static) ? 'static' : props.small ? 'absolute' : 'static'};
    top: -22px;
    left: 10px;

    .CircularProgressbar-text {
        dominant-baseline: middle;
        text-anchor: middle;
        font-size: 28px;
        font-weight: 700;
    }
`;

const Rate = ({vote, small, isStatic}) => {
    const voteRound = Math.round(vote) * 10 + '%';
    return (
        <RateWrapper small={small} static={isStatic}>
            <CircularProgressbar
                value={vote * 10}
                background = {true}
                backgroundPadding = {5}
                text={`${!vote ? 'NR' : voteRound}`}
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