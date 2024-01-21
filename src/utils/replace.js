const replace = (el) => {
    if (typeof el !== String){
        return String(el).replace(':', '')
    } else {
        return el.replace(':', '')
    }   
}

export default replace;