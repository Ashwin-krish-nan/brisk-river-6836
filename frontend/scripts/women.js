


 window.addEventListener("load",()=>{
    display()
 })

 let global_data = [];

 async function display(){
    try {
        let res = await fetch("https://orange-red-clownfish-tam.cyclic.app/women/",{
            headers: {
                'content-type': 'application/json',
                Authorization:localStorage.getItem("token")
            }
        })

        let pro_data = await res.json()
        console.log(pro_data);
        global_data = [...pro_data]
        render(pro_data)
    } catch (error) {
        alert(`Please Signin First`)
        console.log(error);
    }
 }

//----------data Rendering---------//

 function render(pro_data){
      let length = document.querySelector("#item")
      length.innerHTML = `<h4>(${pro_data.length} Items)</h4>`

      let continer = document.querySelector(".pro-card")
      continer.innerHTML = ""

      let New_data = pro_data.map((elm)=>{
         return`
         <div class="card">
            <img src=${elm.avatar} alt="pro">
            <h6>By Therebelinme<span class="material-symbols-outlined" id="add_cart" data-id=${elm._id}>Add To Cart</span></h6>
            <u>${elm.name}</u>
            <div class="rate">
               <p>₹${elm.price}.00<span>off $${elm.price*2}.00</span></p>
               <div>${elm.rating}</div>
            </div>
         </div>   
         `
      })

      continer.innerHTML = New_data.join(" ")

      let carts = document.querySelectorAll("#add_cart")
      for(let cart of carts){
         cart.addEventListener("click",(e)=>{
            //console.log(e.target.dataset.id);
            let id = e.target.dataset.id;
            add_Cart(id)
         })
      }  
 }

 //------------ADD CART------------------//

async function add_Cart(id){
      let get_Data = global_data.filter((item)=>{
         return item._id == id
      })

      let post_info = get_Data[0].product_id=id

   //--both are work to delete tha keyword from the object----//
      //delete get_Data[0]._id
      //console.log(get_Data[0])
      const {_id, ...newobj} = get_Data[0]
      console.log(newobj);
      
      try {
         let res = await fetch("https://orange-red-clownfish-tam.cyclic.app/cart/create", {
             method: 'POST',
             headers: {
                 'content-type': 'application/json',
                 Authorization:localStorage.getItem("token")
             },
             body: JSON.stringify(newobj)
         })

         if(res.ok==true){
            alert("Product has been added inside the cart")
         }
      } catch (error) {
         console.log(error);
      }
 }

// --------------Sort function----------- //

document.querySelector("#sort-fun").addEventListener("change",()=>{
    sort(global_data)
})

function sort(Given_data){
   let change_value = document.querySelector("#sort-fun").value;

   if(change_value=="LTH"){
      Given_data.sort((a,b)=>a.price-b.price);
    }else if(change_value=="HTL"){
      Given_data.sort((a,b)=>b.price-a.price);
    }else if(change_value=="R-LTH"){
      Given_data.sort((a,b)=>a.rating-b.rating);
    }else if(change_value=="R-HTL"){
      Given_data.sort((a,b)=>b.rating-a.rating);
    }
    render(Given_data)
}

//----------Filter function------------//

let boxs = document.querySelectorAll(".box")

for(let box of boxs){
   box.addEventListener("click",(e)=>{
      let selected_box = e.target.value;
      let box_status = e.target.checked
      //console.log(selected_box, box_status);

      if(selected_box==7 && box_status==true){
         above_7 = global_data.filter((item)=>{
            return item.rating>7
         })
         render(above_7)
         //------Sorting With Filter Data--------------//
         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(above_7)
        })
      }else if(selected_box==8 && box_status==true){
         above_8 = global_data.filter((item)=>{
            return item.rating>8
         })
         render(above_8)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(above_8)
        })
      }else if(selected_box==9 && box_status==true){
         above_9 = global_data.filter((item)=>{
            return item.rating>9
         })
         render(above_9)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(above_9)
        })
      }else if(selected_box==30 && box_status==true){
         below_30 = global_data.filter((item)=>{
            return item.price<30
         })
         render(below_30)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(below_30)
        })
      }else if(selected_box==50 && box_status==true){
         below_50 = global_data.filter((item)=>{
            return item.price>30 && item.price<50
         })
         render(below_50)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(below_50)
        })
      }else if(selected_box==70 && box_status==true){
         below_70 = global_data.filter((item)=>{
            return item.price>50 && item.price<70
         })
         render(below_70)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(below_70)
        })
      }else if(selected_box==71 && box_status==true){
         above_70 = global_data.filter((item)=>{
            return item.price>70
         })
         render(above_70)

         document.querySelector("#sort-fun").addEventListener("change",()=>{
            sort(above_70)
        })
      }
   })
}
