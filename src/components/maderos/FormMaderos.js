import React, { useState } from 'react';
import * as MaderoController from "./maderosController";

const FormMaderos = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
    });

    const handleChangeInput = (e) => {
        const { name, value, files } = e.target;
        const file = name == 'image' ? files[0] : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await MaderoController.formMaderos(formData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='p-5'>
            <form onSubmit={handleSubmit}>
                <div className="row w-100">
                    <div className="col-12 col-md-6 mb-4">
                        <div className="form-group">
                            <label className="text-muted">Nombre</label>
                            <input className="form-control" name="name" type="text" onChange={handleChangeInput}/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted mt-3">Imagen</label>
                            <input className="form-control" name="image" type="file" accept=".png, .jpeg, .jpg" onChange={handleChangeInput}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="form-group">
                            <label className="text-muted">Precio</label>
                            <input className="form-control" name="price" type="text" onChange={handleChangeInput}/>
                        </div>
                        <div className="form-group">
                            <label className="text-muted mt-3">Descripción</label>
                            <textarea className="form-control" name="description" rows="3" onChange={handleChangeInput}></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className='btn btn-primary'>Añadir madero</button>
            </form>
        </div>
    );
}

export default FormMaderos;