
const fetchProductData = () =>{
    fetch("./product.json")
    .then(res=>res.json())
    .then(data=>displayproductData(data))
}

const displayproductData = (products) =>{
   products?.forEach(product => { 
                                       
   const cardContainer = document.getElementById("card_container");
  const {name,description,image,id,price} = product     
 const chekdProducts = cheakBookmark(id)                                                                  
   cardContainer.innerHTML+= `
            <div class="col Small ">
              <div class="card p-4 h-100 shadow">
              <div class=" h-75 w-100">
              <div class="d-flex justify-content-between  ">
              <div>
                  <img src="${image}" class="card-img-top  h-75 w-50 img-fluid" alt="...">
              </div>
              <div class="fs-3">

                  <i
                   onclick="${chekdProducts?`removeBookmark('${id}')`
                    :`handleBookmark('${id}','${name}','${price}')`}"
                    
                  class="${chekdProducts? 'fa-regular fa-bookmark' : 'fa-solid fa-bookmark'}"></i>
              </div>
             </div>
             </div>
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>                
                </div>
                <div class="d-flex justify-content-between p-3">
               <h4>price :${price}</h4>
               <button class="btn btn-primary">Bye Now</button>
             </div>
              </div>
            </div>
   
            `
        });          
}

// set local storage

const handleBookmark =(id,name,price) =>{
 const product = {
    id,
    name,
    price
 }
 const productArry = [];
  const prevItem = JSON.parse(localStorage.getItem("bookmark"))
  if(prevItem){
   const carrentItem = prevItem.find(product=>product.id==id);
   if(carrentItem){
    alert("alredy add")
   }else{
     productArry.push(...prevItem ,product)
     localStorage.setItem("bookmark",JSON.stringify(productArry))
   }
  }else{
    productArry.push(product)
    localStorage.setItem("bookmark",JSON.stringify(productArry))
  }
}


// remove removeBookmark

const removeBookmark = (id) =>{
    const prevItem = JSON.parse(localStorage.getItem("bookmark"))
    const removeItem = prevItem.filter(product=>product.id != id)
    localStorage.setItem("bookmark",JSON.stringify(removeItem))
}

// cheakBookmark

const cheakBookmark = (id) =>{
    const prevItem = JSON.parse(localStorage.getItem("bookmark"))
    const cheakProduct = prevItem.find(product=>product.id == id)

   if(cheakProduct){
     return true
   }else{
     return false
   }
}













fetchProductData()