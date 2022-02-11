import React, {useEffect, useState} from 'react';
import CrossCard from "./CrossCard";
import '../Styles/crosspairs.css';

const Crosspairs = () => {

    return (
        <div
            className="Crosspairs">
            <div className="titled-container">
                <h1>Available cross pairs</h1>
                {/* ------- AVAILABLE CROSS ------- */}
                <div className="crosslist-container">
                    <CrossCard />
                    <CrossCard />
                    <CrossCard />
                    <CrossCard />
                </div>
            </div>
        </div>
    );
}

export default Crosspairs;