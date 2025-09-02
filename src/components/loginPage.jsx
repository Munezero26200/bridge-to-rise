export default function LoginPage() {
    return (
        <div className="bg-blue-100  flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg p-8 mt-10 flex flex-col items-center w-full max-w-xl">
            {/* words */}
            <div>
                <h1 className="text-4xl font-bold font-serif text-black text-center mt-10">Welcome to Bridge2Rise</h1>
                <p className="text-center mt-4 text-lg font-serif font-normal">Sign in to continue your mentorship journey</p>
            </div>
            {/* form */}
            <div className="flex justify-center mt-10">
                <form className="flex flex-col space-y-4 w-96">
                    <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2" />
                    <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
                    <button type="submit" className="bg-gray-300 text-black  font-bold py-2 rounded-md hover:bg-gray-400 transition duration-300">Sign In</button>
                </form>
            </div>
            </div>

        </div>
    );
}
