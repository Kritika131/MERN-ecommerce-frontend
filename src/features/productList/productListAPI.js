
export function fetchAllProd() {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/products')
   const data = await response.json()
   resolve({data})
  }
  );
}
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/products/'+id)
   const data = await response.json()
   resolve({data})
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/products/',{
    method :'POST',
    body:JSON.stringify(product),
    headers:{'content-type':'application/json'}
  })
   const data = await response.json()
   resolve({data})
  }
  );
}
export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/products/'+update.id,{
    method :'PATCH',
    body:JSON.stringify(update),
    headers:{'content-type':'application/json'}
  })
   const data = await response.json()
   resolve({data})
  }
  );
}
export function fetchAllProductsByFilters(filter,sort,pagination) {
  //filter = {'category':['smartphone','laptop']}
  //sort = {_sort:'price',_order:'desc'}
  //pagination = {_page:1,_limit=10}
  //TODO : on server we will support multi values query
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key] //['smartphone','laptop']
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      // queryString +=`${key}=${filter[key]}&` //-->localhost://8080/category=smartphone
      queryString +=`${key}=${lastCategoryValue}&` //-->localhost://8080/category=smartphone

    }
  }

  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) =>{

   const response = await fetch('http://localhost:8080/products?'+queryString)
   const data = await response.json()
   const totalItems = await response.headers.get('X-Total-Count')
   resolve({data:{products:data,totalItems:+totalItems}})
  }
  );
}

export function fetchAllCategories() {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/categories')
   const data = await response.json()
   resolve({data})
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) =>{
    
   const response = await fetch('http://localhost:8080/brands')
   const data = await response.json()
   resolve({data})
  }
  );
}