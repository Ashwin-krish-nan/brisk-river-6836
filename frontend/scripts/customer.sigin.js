let signin_navbar = document.querySelector("#signin_navbr");
let signinContainer = document.querySelector("#signin_page");
signinContainer.innerHTML = `
                     <form>
                        <img src="../images/NimbuRoad(2).png"/>
                        <h1>The only fashion site you need</h1><br>
                     <p>
                            <label>Email</label>
                            <input id="email" type="email", placeholder="mysuperusername690" required="required"/>
                    </p><br>
                    <p>
                        <label>Password</label>
                      <input id="password" type="password"  autocomplete="current-password" placeholder="Enter you password" required="required"/>
                   </p><br>
                   <p class="login button">
                    <input id="button" type="submit", value="Sign In"/>
                   </p><br>
                
                  <p>Doesn't have a account ? <a id="sign_up_link" href="./cou_signUp.html">Sign Up</a></p>
               </form>
             `

/*  derghwerghwerh */
let  sign_IN= document.querySelector("#signin_page form")
 sign_IN.addEventListener("click", async(event)=>{
    event.preventDefault();
    let Email = document.querySelector("#email").value;
    let Password = document.querySelector("#password").value;

    let user_data = {
        email: Email,
        password: Password
    }

    //console.log(user_data);
    try {
        let res = await fetch("https://orange-red-clownfish-tam.cyclic.app/login", {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(user_data)
        })

        let data =await res.json()
        localStorage.setItem("token",data.token)
         console.log(data)
        
         if(res.ok==409){
             alert(`Wrong credentials`)
        }
        else if(res.ok==true){
            alert(`Welcome, You are Successfully signedin`)
            window.location.href = "./index2.html"
        }
    } catch (error) {
       
        console.log(error);
    }

})   





