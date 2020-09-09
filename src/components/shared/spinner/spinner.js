import React from 'react';
import './spinner.css';

const Spinner = ({isButton}) => {
    const classNames = `loadingio-spinner-spin-ddphnesjhka ${isButton ? 'button' : ''}`

    return (
        <div className={classNames}>
            <div className="loadingio-spinner-pulse-4q9a11w5c1h">
                <div className="ldio-8zfoqlwj9ri">
                    <div></div><div></div><div></div>
                </div>
            </div>
        </div>
    )
}




export default Spinner;


