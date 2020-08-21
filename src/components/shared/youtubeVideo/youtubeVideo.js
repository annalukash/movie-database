import React from 'react';

const Trailer = ({video}) => {

    const {results} = video;
    const resultItem = results[0];

    return (
        <iframe
            title='g'
            width="1075"
            height="667"
            src={"https://www.youtube.com/embed/" + resultItem.key}
            frameBorder='0' 
            allowFullScreen
            controls='2'
        ></iframe>
    )

}

export default Trailer;
