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

export const updateMaderos = async (formData, id) => {
    return await axios.put(urlApi + '/' + id, formData)
}

export const getMaderoById = async (id) => {
    try {
        const response = await axios.get(urlApi + '/' + id);
        return response.data; // Retorna los datos directamente
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
}

export const deleteMadero = async (id) => {
    return await axios.delete(urlApi + '/' + id);
}

export const getImageMaderos = async (image) => {
    return await axios.get(`http://localhost:3001/images/${image}`, {
        responseType: 'blob' // Establece el tipo de respuesta como blob
    });

} 