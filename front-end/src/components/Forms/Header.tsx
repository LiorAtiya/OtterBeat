import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#",
    Picture
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <Picture className="text-white h-14 w-14" />
                
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-white">
                {heading}
            </h2>
            <p className="mt-2 mt-5 text-sm text-center text-white">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-red-400 hover:text-red-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}