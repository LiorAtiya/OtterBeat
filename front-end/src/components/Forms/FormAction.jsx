export default function FormAction({
    handleSubmit,
    type = 'Button',
    action = 'submit',
    text
}) {
    return (
        <>
            {
                type === 'Button' ?
                    <button
                        type={action}
                        className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-red-600 border border-transparent border-gray-400 rounded-md group hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        onSubmit={handleSubmit}
                    >

                        {text}
                    </button>
                    :
                    <></>
            }
        </>
    )
}