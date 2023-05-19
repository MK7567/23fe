import './Register.css'
import {SyntheticEvent, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [errorText, setErrorText] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if(pass1 != pass2) {
            setErrorText('Gesli se ne ujemata!');
        }

        if(pass1 == pass2) {
            const data = {
                "first_name": firstName,
                "last_name": lastName,
                email,
                "password": pass1,
            };

            const res = await axios.post('http://localhost:3000/users', data)

            if(res.status != 201){
                setErrorText('Napaka v registracijskih podatkih')
                console.log(res.data);
            }

            if(res.status == 201){
                setRedirect(true);
            }
        }
    }

    if(redirect){
        return  <Navigate to={'/login'}/>
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">

                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="FirstName"
                                onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="floatingInput">First name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="LastName"
                               onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="floatingInput">Last name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               onChange={(e) => setPass1(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="RepeatPassword"
                               onChange={(e) => setPass2(e.target.value)} />
                        <label htmlFor="floatingPassword">Repeat password</label>
                    </div>

                    <h2 className="error">{errorText}</h2>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                </form>
            </main>
        </>
    )
}

export default Register;