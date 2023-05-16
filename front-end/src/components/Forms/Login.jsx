import { useState } from 'react';
import { loginFields } from "../../assets/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        await axios.post(`http://localhost:3010/api/auth/login`, { email: loginState['email-address'], password: loginState.password })
            .then(response => {
                if (response.data === 'Invalid Password' || response.data === 'Email Not Found') {
                    return alert('Invalid email or password')
                }
                localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
                const token = localStorage.getItem('token');

                axios.get(`http://localhost:3010/api/auth/info-user`, { headers: { Authorization: token } })
                    .then(response => {
                        localStorage.setItem('user-info', JSON.stringify(response.data));
                        
                        alert('Login was successful')
                        
                        navigate("/");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => console.log(err))
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    )
}