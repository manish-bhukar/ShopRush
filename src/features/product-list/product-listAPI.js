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
export function fetchProductsByFilters(filter,sort){
    let query = '';
    for(let key in filter){
        const categoryValues=filter[key];
        if(categoryValues.length>0){
        const lastCategoryValue=categoryValues[categoryValues.length-1]
        query += `${key}=${lastCategoryValue}&`;
        }
        
    }
    for(let key in sort){
        query += `${key}=${sort[key]}&`;
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
