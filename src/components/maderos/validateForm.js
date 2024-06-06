
export const validateForm = (maderoSelected) => {

    if (maderoSelected.name === "") {
        return { status: "error", message: "validateName" };
    }

    if (maderoSelected.name.length > 100) {
        return { status: "error", message: "lengthName" };
    }

    if (maderoSelected.price === "") {
        return { status: "error", message: "validatePrice" };
    }

    if (!/^\d+$/.test(maderoSelected.price)) {
        return { status: "error", message: "numericPrice" };
    }


    return { status: 'success' }
}