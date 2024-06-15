import React, { useState, useRef, useEffect } from 'react';
import * as MaderoController from "./maderosController";
import Swal from 'sweetalert2';
import { validateForm } from './validateForm';
import { Modal } from "react-bootstrap";

const FormMaderos = ({ showModal, handleCloseModal, fetchData, madero }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        imageFile: null,
    });

    const imageInputRef = useRef(null);

    const [codeErrorMessage, setCodeErrorMessage] = useState({});

    const handleChangeInput = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                imageFile: file,
                image: URL.createObjectURL(file), // Para mostrar la imagen seleccionada en el formulario
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
        setCodeErrorMessage({});
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
                const payload = new FormData();
                payload.append('name', formData.name);
                payload.append('description', formData.description);
                payload.append('price', formData.price);

                if (formData.imageFile) {
                    payload.append('image', formData.imageFile);
                }

                if (madero) {
                    await MaderoController.updateMaderos(payload, madero.id);
                    Swal.fire({
                        title: "Madero actualizado exitosamente",
                        icon: "success"
                    });
                } else {
                    await MaderoController.formMaderos(payload);
                    Swal.fire({
                        title: "Madero guardado exitosamente",
                        icon: "success"
                    });
                }

                handleCloseModal();
                setFormData({
                    name: "",
                    description: "",
                    price: "",
                    image: null,
                    imageFile: null,
                });
                if (imageInputRef.current) {
                    imageInputRef.current.value = null;
                }
                fetchData();
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
    };

    useEffect(() => {
        if (madero) {
            setFormData({
                name: madero.name,
                description: madero.description,
                price: madero.price,
                image: madero.imageUrl || null,
                imageFile: null,
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                image: null,
                imageFile: null,
            });
        }
    }, [madero]);

    return (
        <Modal show={showModal} onHide={handleCloseModal} className='modal-lg'>
            <Modal.Body>
                <div className='d-flex justify-content-end'>
                    <a type="button" onClick={handleCloseModal}><i className="fa-solid fa-xmark"></i></a>
                </div>
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
                                    {formData.image ? (
                                        <img src={formData.image} className="img-fluid mb-3 d-flex justify-content-end mt-4" width='80px' alt="Madero"/>
                                    ) : (
                                        <p>No hay imagen seleccionada</p>
                                    )}
                                    <input className="form-control" name="image" type="file" accept=".png, .jpeg, .jpg" onChange={handleChangeInput} ref={imageInputRef} />
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
                        <button type="submit" className='btn btn-primary'>{madero ? "Actualizar Madero" : "Añadir Madero"}</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default FormMaderos;