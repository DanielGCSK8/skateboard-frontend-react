import React, { useEffect, useState } from 'react';
import * as MaderoController from "./maderosController";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import Swal from 'sweetalert2';
import FormMaderos from './FormMaderos';

const Maderos = () => {

    const [maderos, setMaderos] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: 'contains' },
        'name': { value: null, matchMode: 'contains' },
        'price': { value: null, matchMode: 'contains' },
        'description': { value: null, matchMode: 'contains' }
    });
    const [showModalForm, setShowModalForm] = useState(false);
    const [selectedMadero, setSelectedMadero] = useState(null);

    const handleShowModal = (madero = null) => {
        setSelectedMadero(madero);
        setShowModalForm(true);
    };
    const handleCloseModal = () => {
        setShowModalForm(false);
        setSelectedMadero(null);
    };

    const handleDeleteMadero = (madero) => {
        Swal.fire({
            title: "¿Está seguro que desea eliminar el madero?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await MaderoController.deleteMadero(madero.id);
                    await fetchData();
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "Madero eliminado exitosamente.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al eliminar el madero.",
                        icon: "error"
                    });
                }
            }
        });
    }

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
        } catch (error) {
            console.error('Error fetching maderos:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    const clearFilters = () => {
        setFilters({
            'global': { value: null, matchMode: 'contains' },
            'name': { value: null, matchMode: 'contains' },
            'price': { value: null, matchMode: 'contains' },
            'description': { value: null, matchMode: 'contains' }
        });
        setGlobalFilter(null);
    }

    const header = (
        <div className="table-header">
            <div className='d-flex justify-content-between'>
                Lista de Maderos
                <div className='d-flex'>
                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar"
                        className="p-button-outlined" onClick={clearFilters} />
                    <IconField className='ms-3' iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                    </IconField>
                </div>
            </div>
        </div>
    );

    const actions = (rowData) => {
        return (
            <div className="d-flex align-items-center">
                <a type="button"><i className="fa-solid fa-pen-to-square" onClick={() => handleShowModal(rowData)}
                    style={{ color: 'blue' }}></i></a>
                <a type="button"><i className="fa-solid fa-trash ms-3" onClick={() => handleDeleteMadero(rowData)}
                    style={{ color: 'red' }}></i></a>
            </div>
        );
    };

    const images = (rowData) => {
        return (
            <div className='d-flex align-items-center'>
                <img src={rowData.imageUrl} width='80px'></img>
            </div>
        )
    }

    return (
        <div className='p-5 mt-4'>

            <DataTable value={maderos} paginator rows={10} globalFilter={globalFilter} filters={filters} header={header}
                showGridlines tableStyle={{ minWidth: '50rem' }} className="datatable-responsive">
                <Column field="name" header="Nombre" sortable filter filterPlaceholder="Buscar por nombre" style={{ minWidth: '12rem' }}></Column>
                <Column field="price" header="Precio" sortable filter filterPlaceholder="Buscar por precio" style={{ minWidth: '8rem' }} body={(rowData) => `$${rowData.price}`}></Column>
                <Column field="image" header="Imágen" body={images}></Column>
                <Column field="description" header="Descripción" sortable filter filterPlaceholder="Buscar por descripción" style={{ minWidth: '20rem' }}></Column>
                <Column header="Acciones" body={actions} style={{ minWidth: '20rem' }}></Column>
            </DataTable>
            <button className='btn btn-secondary mt-4' onClick={() => handleShowModal(null)} >Crear Madero</button>

            <FormMaderos showModal={showModalForm} handleCloseModal={handleCloseModal} fetchData={fetchData} madero={selectedMadero} />
        </div>
    );
}

export default Maderos;