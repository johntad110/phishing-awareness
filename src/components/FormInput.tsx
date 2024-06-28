import { useState } from "react"

type FormInputProps = {
    onStart: () => void
}

const FormInput: React.FC<FormInputProps> = ({ onStart }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate inputs if needed
        onStart();
    }

    return (
        <div className="mt-8 border border-black p-8">
            <h1 className="mb-4 text-xl">Test you knowledge about Phishing Attacks.</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-black p-2 mb-4"
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-black p-2 mb-4"
                    required
                />
                <button type="submit" className="bg-black text-white py-2 px-4 border border-black hover:bg-white hover:text-black transition-all">
                    Start Quiz
                </button>
            </form>

        </div>
    )
}

export default FormInput