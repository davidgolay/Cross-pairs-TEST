import React, {useEffect, useState} from 'react';
import '../Styles/crosscard.css';

const CrossCard = (props) => {

    return (
        <div className="CrossCard">
            <div className="card-title">
                EURCHF
            </div>
            <div className="rates-container">
                <div className="rate-details">Actual Rate: <span> 1.50236</span></div>
                <div className="rate-details">Over one month: <span>101.05%</span> </div>
                <div className="rate-details">Over three months: <span>103.05%</span> </div>
            </div>
        </div>
    )
}

export default CrossCard;