import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Forms/Header";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { signupFields } from "../assets/formFields"
import FormAction from "../components/Forms/FormAction";
import Input from "../components/Forms/Input";
import Routes from '../api/routes'

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function RegisterPage() {

    const [signupState, setSignupState] = useState(fieldsState);
    const [isChecked, setIsChecked] = useState(false);
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

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        createAccount()
    }

    const createAccount = async () => {
        if (signupState['confirm-password'] !== signupState['password']) {
            return alert('Password verification failed')
        }

        const userInfo = {
            name: signupState.username,
            email: signupState['email-address'],
            password: signupState.password,
            is_premium: isChecked,
        }

        Routes.register(userInfo)
            .then(response => {
                alert('Register was successful')
                navigate("/");
                window.location.reload();
            })
            .catch(err => {
                if (err.response.status === 403) return alert('Email exist, choose another email')
                console.log(err)
            })
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };


    return (
        <div className="w-2/3 mx-auto mt-10 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-blur-sm animate-slideup">
            <Header
                heading="Register to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                Picture={HiOutlineUserGroup}
            />


            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="">
                    {
                        fields.map(field =>
                            <Input
                                key={field.id}
                                handleChange={handleChange}
                                value={signupState[field.id]}
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
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <label htmlFor="remember-me" className="block ml-2 text-sm text-white">
                            Want premium?
                        </label>
                    </div>
                    <FormAction handleSubmit={handleSubmit} text="Signup" />
                </div>
            </form>
        </div>
    )
}