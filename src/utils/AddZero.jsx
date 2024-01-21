const AddZero = (num) => {
    if (num <= 9) {
        return '0' + num
    }

    return num
}

export default AddZero