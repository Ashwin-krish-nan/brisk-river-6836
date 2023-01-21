 window.addEventListener("load",()=>{
    display()
 })

 let global_data = [];

 async function display(){
    try {
        let res = await fetch("http://localhost:3080/cart/",{
            headers: {
                'content-type': 'application/json',
                Authorization:localStorage.getItem("token")
            }
        })

        let cart_data = await res.json()
        console.log(cart_data);
        global_data = [...cart_data]
        Render(cart_data)
    } catch (error) {
        console.log(error);
    }
 }

 function Render(cart_data){
    //console.log(cart_data);
    let length = document.querySelector("#item")
    length.innerHTML = `<h4>(${cart_data.length} Items)</h4>`

    let continer = document.querySelector("#tab")
    continer.innerHTML = ""

    let New_data = cart_data.map((elm)=>{
       return`
        <tbody>
            <tr class="cart-row">
                <td class="item-image">
                    <img src=${elm.avatar} alt="producr">
                </td>
                <td class="item-det">
                    <div class="name">${elm.name}</div>
                    <div class="det">
                        <p>Color: <span>SandWood</span></p>
                        <p>Size: <span>30 X 34</span></p>
                    </div>
                </td>
                <td class="quant">
                    <div class="selt">
                        <select name="quantiti" id="selete">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <button id="remove" data-id=${elm._id}>Remove</button>
                    <h4>In Stock</h4>
                </td>
                <td class="price">
                    <div class="p-chi">
                        <h3>$${elm.price}.00</h3>
                        <p>Comp.Value:<br>$${elm.price*2}</p>
                    </div>
                </td>
            </tr>
         </tbody>   
       `
    })

    continer.innerHTML = New_data.join(" ")

    //---------------Total Amount--------------//

    let total_p = cart_data.reduceRight((acc,item)=>{
        return acc + item.price
    },0)

    let add_total = document.querySelector("#subtotal")
    add_total.innerHTML = `
        <p>Subtotal</p>
        <p>$${total_p}.00</p>
    `;

    let totel_amount = document.querySelector("#e-total")
    totel_amount.innerHTML = `
        <h4>Estimate Total</h4>
        <h4>$${total_p+5+3}.00</h4>
    `

    //-------------------------------------------//

    let btns = document.querySelectorAll("#remove")

    for(let btn of btns){
        btn.addEventListener("click",(e)=>{
            let id = e.target.dataset.id
            //console.log(id);
            Remove_data(id)
        })
    }
}

async function Remove_data(id){
    try {
        let res = await fetch(`http://localhost:3080/cart/delete/${id}`,{
            method:"DELETE",
            headers:{
                'content-type': 'application/json',
                Authorization:localStorage.getItem("token")
            }
        })

        if(res.ok==true){
            alert("Product has been deleted");
            display()
        }
        // window.addEventListener("load",()=>{
        //     display()
        //  })
    } catch (error) {
        console.log(error);
    }
}
