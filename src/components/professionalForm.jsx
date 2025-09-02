export default function ProfessionalForm() {
    return (
        <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-8 mt-10 flex flex-col items-center w-full max-w-xl">
            <h1 className="text-4xl font-bold font-serif text-black text-center mt-10">Diaspora Credentials</h1>
            {/* form */}
            <div className="flex justify-center mt-10">
                <form className="flex flex-col space-y-4 w-96">
                    <input type="text" placeholder="Full Name" className="border border-gray-300 rounded-md p-2" />
                    <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2" />
                    <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                    <input type="text" placeholder="career of expertise" className="border border-gray-300 rounded-md p-2" />
                    <input type="text" placeholder="country" className="border border-gray-300 rounded-md p-2" />
                    <input type="text" placeholder="language" className="border border-gray-300 rounded-md p-2" />
                    <input type="text" placeholder="country" className="border border-gray-300 rounded-md p-2" />
                    <button type="submit" className="bg-gray-300 text-black font-bold py-2 rounded-md hover:bg-gray-400 transition duration-300">Submit</button>
                </form>
            </div>
            </div>
        </div>
    );
}
