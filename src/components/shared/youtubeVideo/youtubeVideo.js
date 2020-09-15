import React from 'react';
import useWindowSize from '../useWindowSize/useWindowSize';

const Trailer = ({video}) => {

    const {results} = video;
    const resultItem = results[0];
    const size= useWindowSize();
    return (
        <iframe
            title='g'
            width={ size < 415 ? size : "1075"}
            height={ size < 415 ? (size/1.6) : "667"}
            src={"https://www.youtube.com/embed/" + resultItem.key}
            frameBorder='0' 
            allowFullScreen
            controls='2'
        ></iframe>
    )
}

export default Trailer;
