import { useState } from 'react';
import { signupFields } from "../../assets/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Register() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate();
  
  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    if (signupState['confirm-password'] !== signupState['password']) {
      return alert('Password verification failed')
    }

    const userInfo = {
      name: signupState.username,
      email: signupState['email-address'],
      password: signupState.password,
      is_premium: false,
    }

    await axios.post(`http://localhost:3010/api/auth/register`, userInfo)
      .then(response => {
        alert('Register was successful')
        navigate("/");
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  return (
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>



    </form>
  )
}