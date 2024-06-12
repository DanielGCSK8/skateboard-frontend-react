import React, { useEffect, useState } from 'react';
import * as MaderoController from '../maderos/maderosController';
const Home = () => {

    const [maderos, setMaderos] = useState([]);

    const fetchData = async () => {
        const getMadero = await MaderoController.getMaderos();
        setMaderos(getMadero)
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className='p-5'>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {maderos.map((madero, index) => (
                    <div key={index} className='col'>
                        <div className='card mb-3'>
                            <img src=""></img>
                            <div class="card-body">
                                <h5 class="card-title">{madero.name}</h5>
                                <p class="card-text">${madero.price}</p>
                                <p class="card-text">{madero.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;