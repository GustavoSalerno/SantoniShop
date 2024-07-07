import data from '../navbar/MATA.json'

export const pedirDatos = () => {
    return new Promise((res,req) => {
        setTimeout(() => {
            res(data);
        }, 500)
    })
}

export const pedirItemPorId = (id) => {
    return new Promise((resolve, reject) => {
        const item = data.find((el) => el.id === id)
        if(item){
            resolve(item)
        }else {
            reject({
                error: "No se encontro el item"
            })
        }
    })
}