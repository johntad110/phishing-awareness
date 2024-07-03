import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "./LanguageContext";

function Navbar() {

    const { language, toggleLanguage, translation } = useLanguage();

    return (
        <div className="bg-white py-4 px-4 md:px-10 lg:px-24 border-b border-black flex items-center justify-between">
            <p className="text-black font-bold text-xl">{translation.title}</p>
            <div className="flex items-center">
                <div className="px-4">
                    <button onClick={toggleLanguage}>
                        {language === 'EN' ? 'AM' : 'EN'}
                    </button>
                </div>
                <div
                    className="hidden sm:flex gap-2 border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition-all"
                    onClick={() => document.location.href = "https://github.com/johntad110/phishing-awareness"}
                >

                    <p className="">Github</p>
                    <FaGithub className="text-2xl" />
                </div>
            </div>

        </div>
    )
}

export default Navbar