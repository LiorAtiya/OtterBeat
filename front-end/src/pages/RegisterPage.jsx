import Header from "../components/Forms/Header";
import Register from "../components/Forms/Register";
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function RegisterPage(){
    return(
        <div className="w-2/3 mx-auto mt-10 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/3 backdrop-blur-sm animate-slideup">
            <Header
              heading="Register to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/login"
              Picture={HiOutlineUserGroup}
            />
            <Register/>
        </div>
    )
}