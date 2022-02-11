import React, {useEffect, useState} from 'react';
import CrossCard from "./CrossCard";
import '../Styles/crosspairs.css';

const Crosspairs = () => {

    const endPoint = 'https://api.ibanfirst.com/PublicAPI';

    const [crossList, setCrossList] = useState([[]]);

    /**
     * structure de donnée provisoire pour pouvoir générer les 'Cross Card' sans passer par l'API
     * cette structure représente fictivement/manuellement l'attribut 'crossList' retourné par le GET sur endpoint/Cross
     * @type {[{instrument: string, type: string},{instrument: string, type: string},{instrument: string, type: string}]}
     */
    const manualCrossListPopulation = [
        { instrument: 'EURCHF', type: "Major" },
        { instrument: 'EURGBP', type: "Major" },
        { instrument: 'EURUSD', type: "Major" },
        { instrument: 'USDCHF', type: "Major" },
        { instrument: 'USDEUR', type: "Major" },
        { instrument: 'USDGBP', type: "Major" },
    ];

    const getCrossList = async () => {

        try {
            const url = endPoint +'/Cross';
            const response = await fetch(url);
            const responseData = await response.json();
            console.log('FETCHED CROSS LIST');
            console.log(responseData.crossList);
            setCrossList(responseData.crossList);
        } catch(error) {
            console.log(error);
            console.log('ERROR WHILE FETCHING, USED MANUAL POPULATING')
            setCrossList(manualCrossListPopulation);
        }
    }

    useEffect(() => {
        getCrossList();
    }, [])

    return (
        <div
            className="Crosspairs">
            <div className="titled-container">
                <h1>Available cross pairs</h1>
                {/* ------- AVAILABLE CROSS ------- */}
                <div className="crosslist-container">
                    { crossList.map((cross, index) => (
                        <div className="cross-container" key={cross.instrument} >
                            <CrossCard instrument={cross.instrument} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Crosspairs;