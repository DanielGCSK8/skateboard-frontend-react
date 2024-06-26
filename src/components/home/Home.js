import React, { useEffect, useState } from 'react';
import * as MaderoController from '../maderos/maderosController';

const Home = () => {
    const [maderos, setMaderos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filteredMaderos = maderos.filter(madero =>
            madero.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredMaderos);
    };

    const fetchData = async () => {
        try {
            const getMadero = await MaderoController.getMaderos();
            // Fetch images for each madero
            const maderosWithImages = await Promise.all(
                getMadero.map(async (madero) => {
                    try {
                        const imageName = madero.image // Obtiene solo el nombre de la imagen
                        const response = await MaderoController.getImageMaderos(imageName)

                        // Convierte la respuesta a base64
                        const reader = new FileReader();
                        reader.readAsDataURL(response.data);
                        return new Promise((resolve, reject) => {
                            reader.onloadend = () => {
                                const base64Image = reader.result;
                                const imageUrl = base64Image;
                                resolve({ ...madero, imageUrl });
                            };
                            reader.onerror = reject;
                        });
                    } catch (error) {
                        console.error('Error fetching image:', error);
                        return { ...madero, imageUrl: null };
                    }
                })
            );
            setMaderos(maderosWithImages);
            setSearchResults(maderosWithImages);
        } catch (error) {
            console.error('Error fetching maderos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='p-5'>
            <div className='d-flex justify-content-end'>
                <input
                    type="text"
                    placeholder="Buscar madero..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className='row row-cols-1 row-cols-md-3 g-4 mt-3'>
                {searchResults.map((madero, index) => (
                    <div key={index} className='col'>
                        <div className='card mb-3'>
                            <img src={madero.imageUrl} alt={madero.name}></img>
                            <div className='card-body'>
                                <h5 className='card-title'>{madero.name}</h5>
                                <p className='card-text'>${madero.price}</p>
                                <p className='card-text'>{madero.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;