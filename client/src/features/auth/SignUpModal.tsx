import axios from "axios";
import { useState } from "react"

type User = {
    firstName : string,
    lastName : string,
    userName : string,
    email : string,
    password : string
}

export function SignUpModal(){

    const [inputs, setInputs] = useState<User>({});

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((c) =>({...c, [name]: value}) )
    }

    const handleSubmit = async () => {
        try{
            const response = await axios({
            method : 'POST',
            url : 'http://localhost:3000/api/SignUp',
            data : inputs
            })

            console.log(response.data)
        }catch(e) {
            console.error(e)
        }
         
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>First Name :</label>
                <input 
                    type="text" 
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                    required
                />
                <label>Last Name :</label>
                <input 
                    type="text" 
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                    required
                />
                <label>Username :</label>
                <input 
                    type="text" 
                    name="userName"
                    value={inputs.userName}
                    onChange={handleChange}
                    required
                />
                <label>Email :</label>
                <input 
                    type="text" 
                    name="email"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                />
                <label>passowrd :</label>
                <input 
                    type="password" 
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">SignUp</button>
                <button type="button">Cancel</button>
            </form>
        </div>
    )
}