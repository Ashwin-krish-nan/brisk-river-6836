


 let apply = document.querySelector("#SignUp_page form")
 apply.addEventListener("submit",async (event)=>{
    event.preventDefault()
    let first_Name = document.querySelector("#firsName").value ;
    let last_Name = document.querySelector("#lastName").value;
    let Email = document.querySelector("#emailId").value;
    let Password = document.querySelector("#password").value;

    let user_data = {
       first_name: first_Name,
       last_name: last_Name,
        email: Email,
        password: Password
    }

    try {
        let res = await fetch("http://localhost:3080/register", {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(user_data)
        })

        if(res.ok==true){
            alert(`Hello ${user_data.first_name}, You are Registration Successfully Completed`)
            window.location.href = "./frontend/html/index.html"
        }
    } catch (error) {
        console.log(error);
    }

 })