import Header from "../components/Forms/Header"
import Login from "../components/Forms/Login"
import { RiLoginBoxFill } from 'react-icons/ri';

export default function LoginPage(){
    return(
        <div className="w-2/3 mx-auto mt-10 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-blur-sm animate-slideup">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Register"
                linkUrl="/register"
                Picture={RiLoginBoxFill}
                />

            <Login />
            
        </div>
    )
}