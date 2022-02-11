import React, {useEffect, useState} from 'react';
import '../Styles/crosscard.css';

/**
 * Un composant correspondant à une paire de devises qui permet de détailler chacune des paires (current Rate, RateHistory...).
 * Pour cela props.instrument qui est passé dans chaque item de crosscard lors de leur déclaration, permet de récupérer
 * le nom de la paire de devise afin de générer les détails de cette paire en faisant une requete Rate/{instrument}
 * @param props props.instrument permet de récupérer le nom de la paire de devise afin de générer les détails de cette paire
 * en faisant une requete Rate/{instrument}
 * @returns {JSX.Element}
 */
const CrossCard = (props) => {

    const endPoint = 'https://api.ibanfirst.com/PublicAPI';       //Utility string for fetching url
    const [crossName, setCrossName] = useState(props.instrument); //represents the name of the cross pair (instrument:)
    const [rate, setRate]           = useState(0);                 //represents the rate of the cross pair (rate:)
    const [overOneMonth, setOverOneMonth]     = useState(0);           //represents the rate evolution over one month
    const [overThreeMonth, setOverThreeMonth] = useState(0);       //represents the rate evolution over three month

    /**
     * This method is called to update the cross details
     * @returns {Promise<void>}
     */
    const loadCrossInfos = async () => {
        ////getting rates from API
        const currentRate = await getRate().catch((err) => {return "Unknown";});
        const oneMonthHistory = await getRateHistory(1).catch((err) => {return "Unknown";});
        const threeMonthHistory = await getRateHistory(3).catch((err) => {return "Unknown";});

        ////updating states
        setRate(currentRate);
        setOverOneMonth(oneMonthHistory);
        setOverThreeMonth(threeMonthHistory);
    }

    /**
     * This async method takes care of finding and retrieving the current rate of the cross
     * @returns {Promise<void>}
     */
    const getRate = async () => {
        ////generate the needed url request
        const query = props.instrument;
        const url = endPoint +'/Rate/'+ query;
        ////fetching it
        const response = await fetch(url);
        const responseData = await response.json();

        return responseData.rate.rate;
    }

    /**
     * This method takes care of the rate history ratio
     * @param month the amount of month we need to go back to
     * @returns {Promise<void>}
     */
    const getRateHistory = async (month) => {

        ////Getting API content
        const urlRequest = rateHistoryURLRequest(month)
        const response   = await fetch(urlRequest);
        const data       = await response.json();

        ////Compute and update the overtime rate ratio
        let indexWanted = data.rateHistory.length - 1;
        let newestRate = data.rateHistory[indexWanted].rate; // the rate of the cross pair at 'now' date
        let oldestRate = data.rateHistory[0].rate;           // the rate of the cross pair at 'from' date
        let overTimeRate = (newestRate * 100 / oldestRate);  // the ratio between now rate and starting date rate

        ////Console display if needed
        const consoleDisplay = true;
        if(consoleDisplay){
            console.log(data);
            console.log('current rate: ' + newestRate);
            console.log('latest rate : ' + oldestRate);
            console.log('ratio       : ' + overTimeRate);
        }

        ////apply precision and return
        overTimeRate.toFixed(3);
        return overTimeRate;
    }

    /**
     * this method generates the correct request to give to API when you want a rate history
     * @param month starting month we want the history of
     * @returns {string} generated url in order to request the API
     */
    function rateHistoryURLRequest(month){
        let d = new Date();
        d.setMonth(d.getMonth() - month );         // move back the date to the starting month wanted
        let from = '&from=';                              // parameter 'from' declaration
        from = from + d.getFullYear().toString();        // concat year to 'from' parameter
        from = from + '-' + (d.getMonth()+1).toString(); // concat month to 'from' parameter
        from = from + '-' + d.getDate().toString();      // concat day to 'from' parameter
        let dateFormat = '/?dateFormat=Y-m-d';
        let url = endPoint +'/RateHistory/'+ crossName + dateFormat + from; //final concatenation of the url
        return url;
    }


    useEffect(() => {
        loadCrossInfos();
    }, [])

    return (
        <div className="CrossCard">
            <div className="card-title">
                {crossName}
            </div>
            <div className="rates-container">
                <div className="rate-details">Actual Rate: <span>{rate}</span></div>
                <div className="rate-details">Over one month: <span>{overOneMonth} %</span> </div>
                <div className="rate-details">Over three months: <span>{overThreeMonth} %</span> </div>
            </div>
        </div>
    )
}

export default CrossCard;