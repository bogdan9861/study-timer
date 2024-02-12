const replace = (el) => {
    if (typeof el !== String){
        return Number(String(el).replace(':', ''))
    } else {
        return Number(el.replace(':', '')) 
    }   
}

export default replace;