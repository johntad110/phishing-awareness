import { FaGithub } from "react-icons/fa6";

function Navbar() {
    return (
        <div className="bg-white py-4 px-4 md:px-10 lg:px-24 border-b border-black flex items-center justify-between">
            <p className="text-black font-bold text-xl">Phishing Awareness</p>
            <div
                className="hidden sm:flex gap-2 border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition-all"
                onClick={() => document.location.href = "https://github.com/johntad110/phishing-awareness"}
            >
                <p className="">Github</p>
                <FaGithub className="text-2xl" />
            </div>
        </div>
    )
}

export default Navbar