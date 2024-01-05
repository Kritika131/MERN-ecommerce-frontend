
export function fetchAllProd() {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/products')
   const data = await response.json()
   resolve({data})
  }
  );
}
export function fetchAllProductsByFilters(filter) {
  //filter = {'category':'smartphone}
  //TODO : on server we will support multi values query
  let queryString = '';
  for(let key in filter){
    queryString +=`${key}=${filter[key]}&` //-->localhost://8080/category=smartphone
  }
  return new Promise(async (resolve) =>{

   const response = await fetch('http://localhost:8080/products?'+queryString)
   const data = await response.json()
   resolve({data})
  }
  );
}
