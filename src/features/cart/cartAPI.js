export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function fetchCartItemById(userId) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    console.log("userId--",userId);
    const response = await fetch('http://localhost:8080/cart?user='+userId) 
    const data = await response.json()
    // console.log("data-",data);
    resolve({data})
  }
  );
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // console.log("updated cart ",data);
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId){
  return new Promise(async (resolve)=>{
    const response = await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'},
    });
    const data = await response.json();
    console.log("delete-->",{data:{id:itemId}});
    resolve({data:{id:itemId}})
  })
}
export async function resetCart(userId){
  //get all items of user's cart - and then delete each
 return new Promise(async (resolve)=>{
   const response = await fetchCartItemById(userId);
   const items =response.data;
 
   for(let item of items){
     await deleteItemFromCart(item.id);
   }
    
   resolve({status:"success"})
 })
}
