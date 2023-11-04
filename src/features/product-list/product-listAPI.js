export function fetchAllProducts(){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8080/products');
            const data = await response.json();
            resolve({data});
        } catch (error) {
            reject(error);
        }
    }
    );
}
export function fetchProductsByFilters(filter){
    let query = '';
    for(let key in filter){
        query += `${key}=${filter[key]}&`;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('http://localhost:8080/products?'+query);
            const data = await response.json();
            resolve({data});
        } catch (error) {
            reject(error);
        }
    }
    );
}
