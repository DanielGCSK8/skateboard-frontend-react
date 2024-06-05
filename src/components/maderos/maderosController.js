import axios from 'axios';

const urlApi = 'http://localhost:3001/maderos';

export const getMaderos = async () => {
    try {
        const response = await axios.get(urlApi);
        return response.data; // Retorna los datos directamente
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
}

export const formMaderos = async (formData) => {
    return await axios.post(urlApi, formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
}