import React, { useState, useRef } from 'react';
import * as MaderoController from "./maderosController";
import Swal from 'sweetalert2';
import { validateForm } from './validateForm';

const FormMaderos = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: null,
        price: '',
        image: null,
    });

    const imageInputRef = useRef(null);

    const [codeErrorMessage, setCodeErrorMessage] = useState({});

    const handleChangeInput = (e) => {
        const { name, value, files } = e.target;
        const file = name == 'image' ? files[0] : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
        }));
        setCodeErrorMessage({})
    };

    const dataTitles = {
        validateName: 'El nombre es obligatorio.',
        lengthName: 'El nombre no debe ser superior a 100 caracteres.',
        validateDescription: 'La descripción es obligatoria.',
        validatePrice: 'El precio es obligatorio.',
        numericPrice: 'El precio debe ser un número válido.'
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let messageError = validateForm(formData);
        if (messageError.status === 'success') {
            try {
                await MaderoController.formMaderos(formData);
                Swal.fire({
                    title: "Madero guardado exitosamente",
                    icon: "success"
                });
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    image: null,
                });
                if (imageInputRef.current) {
                    imageInputRef.current.value = null;
                }
            
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al guardar el madero.",
                    icon: "error"
                });
                console.log(error);
            }
        } else {
            setCodeErrorMessage(messageError);
        }
    }

    return (
        <div className='p-5'>
            <form onSubmit={handleSubmit}>
                <div className="row w-100">
                    <div className="col-12 col-md-6 mb-4">
                        <div className="form-group">
                            <label className="text-muted">Nombre</label>
                            <input className="form-control" name="name" type="text" value={formData.name} onChange={handleChangeInput} />
                            {['validateName', 'lengthName'].includes(codeErrorMessage.message) ? (
                                <span className='text-danger'>{dataTitles[codeErrorMessage.message]}</span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label className="text-muted mt-3">Imagen</label>
                            <input className="form-control" name="image" type="file" accept=".png, .jpeg, .jpg" onChange={handleChangeInput} ref={imageInputRef}/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="form-group">
                            <label className="text-muted">Precio</label>
                            <input className="form-control" name="price" type="text" value={formData.price} onChange={handleChangeInput} />
                            {['validatePrice', 'numericPrice'].includes(codeErrorMessage.message) ? (
                                <span className='text-danger'>{dataTitles[codeErrorMessage.message]}</span>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label className="text-muted mt-3">Descripción</label>
                            <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChangeInput}></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className='btn btn-primary'>Añadir madero</button>
            </form>
        </div>
    );
}

export default FormMaderos;