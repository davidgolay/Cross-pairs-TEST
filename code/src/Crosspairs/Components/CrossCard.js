import React, {useEffect, useState} from 'react';
import '../Styles/crosscard.css';

const CrossCard = (props) => {


    const endPoint = 'https://api.ibanfirst.com/PublicAPI';       //Utility string for fetching url
    const [crossName, setCrossName] = useState(props.instrument); //represents the name of the cross pair (instrument:)
    const [rate, setRate] = useState(0);                 //represents the rate of the cross pair (rate:)
    const [overOneMonth, setOverOneMonth] = useState();           //represents the rate evolution over one month
    const [overThreeMonth, setOverThreeMonth] = useState();       //represents the rate evolution over three month

    /**
     * This method is called to update the cross details
     * @returns {Promise<void>}
     */
    const getCross = async () => {
        await getRate()
    }

    /**
     * This async method takes care of finding and retrieving the current rate of the cross
     * @returns {Promise<void>}
     */
    const getRate = async () => {
        const query = props.instrument;
        const url = endPoint +'/Rate/'+ query;
        const response = await fetch(url);
        const responseData = await response.json();
        setRate(responseData.rate.rate);
        console.log(responseData);
    }

    useEffect(() => {
        getCross();
    }, [])

    return (
        <div className="CrossCard">
            <div className="card-title">
                {crossName}
            </div>
            <div className="rates-container">
                <div className="rate-details">Actual Rate: <span>{rate}</span></div>
                <div className="rate-details">Over one month: <span>{overOneMonth}%</span> </div>
                <div className="rate-details">Over three months: <span>{overThreeMonth}%</span> </div>
            </div>
        </div>
    )
}

export default CrossCard;