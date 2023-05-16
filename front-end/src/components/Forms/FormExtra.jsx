export default function FormExtra() {
    return (
        <div className="flex items-center justify-between ">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-white">
                    Remember me
                </label>
            </div>

            <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-red-500">
                    Forgot your password?
                </a>
            </div>
        </div>

    )
}