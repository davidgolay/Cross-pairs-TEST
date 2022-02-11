import React, {useEffect, useState} from 'react';
import '../Styles/crosscard.css';

const CrossCard = (props) => {

    const endPoint = 'https://api.ibanfirst.com/PublicAPI'; //Utility for fetching url
    const [crossName, setCrossName] = useState(props.instrument); //represents the name of the cross pair (instrument:)
    const [rate, setRate] = useState(0);                 //represents the rate of the cross pair (rate:)
    const [rateHistory, setRateHistory] = useState(1);   //represents the overtime ratio of the cross pair
    const [overOneMonth, setOverOneMonth] = useState();
    const [overThreeMonth, setOverThreeMonth] = useState();

    return (
        <div className="CrossCard">
            <div className="card-title">
                {crossName}
            </div>
            <div className="rates-container">
                <div className="rate-details">Actual Rate: <span>{rate}%</span></div>
                <div className="rate-details">Over one month: <span>{overOneMonth}%</span> </div>
                <div className="rate-details">Over three months: <span>{overThreeMonth}%</span> </div>
            </div>
        </div>
    )
}

export default CrossCard;