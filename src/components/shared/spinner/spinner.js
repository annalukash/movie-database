import React from 'react';
import './spinner.css';

const Spinner = ({isButton}) => {
    const classNames = `loadingio-spinner-spin-ddphnesjhka ${isButton ? 'button' : ''}`

    return (
        <div className={classNames}>
            <div className='ldio-sjunlm45nxr'>
                <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
            </div>
        </div>
    )
}

export default Spinner;


