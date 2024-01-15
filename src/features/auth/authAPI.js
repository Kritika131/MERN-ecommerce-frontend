export function createUser(userData){
  return new Promise(async(resolve)=>{
    const response = await fetch('http://localhost:8080/auth/signup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    })
    const data = await response.json();
    //TODO: on server it will return some info of user (not password)
    // console.log("api dta--",data);
    resolve(data);
  })
}
export function checkUser(loginInfo){
  return new Promise(async(resolve,reject)=>{
    try{

      // const email = loginInfo.email;
      const response = await fetch('http://localhost:8080/auth/login',{
        method:'POST',
        body:JSON.stringify(loginInfo),
        headers:{'content-type':'application/json'}
      })
      if(response.ok){
        const data = await response.json();
        console.log("data login ",data);
        resolve({data})
        
      } else {
        const error = await response.json();
        console.log("eror login ",error);
        reject(error)
       
      }
    } catch(error){
      reject(error)

    }
   
  })
}
export function signOut(userId){
  return new Promise(async(resolve)=>{
    //TODO: on server we will remove user session info
    resolve({data:'success'});
  })
}
//checkoutPage
