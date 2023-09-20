import { useState, useEffect } from 'react';
import Header from "../components/Forms/Header"
import { RiLoginBoxFill } from 'react-icons/ri';
import { loginFields } from "../assets/formFields";
import FormAction from "../components/Forms/FormAction";
import FormExtra from "../components/Forms/FormExtra";
import Input from "../components/Forms/Input";
import Routes from '../api/routes'

import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function LoginPage() {

    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate();

    useEffect(() => {
        const getResult = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/')
            }
        };
        getResult();
    }, []);

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
        Routes.loginUser(loginState['email-address'], loginState.password)
            .then(response => {

                localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
                const token = localStorage.getItem('token');

                Routes.getUserInfo(token)
                    .then(response => {
                        localStorage.setItem('user-info', JSON.stringify(response.data));

                        alert('Login was successful')

                        navigate("/");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))

            })
            .catch(err => {
                if (err.response.status === 403) return alert('Invalid email or password')
                console.log(err)
            })
    }

    return (
        <div className="w-2/3 mx-auto mt-10 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-blur-sm animate-slideup">
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Register"
                linkUrl="/register"
                Picture={RiLoginBoxFill}
            />

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

        </div>
    )
}