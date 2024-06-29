import { QnA } from "../App";

type QProps = {
    QnAs: QnA[];
}

const Questionnaire: React.FC<QProps> = ({ QnAs }) => {
    
    console.log(QnAs[0].question);
    return (
        <div className="bg-gray-200 w-[80%] md:min-w-[600px] min-h-96 rounded-es-2xl rounded-ee-2xl mt-6 p-9 flex flex-col justify-center align-middle">
            <div className="bg-transparent w-[70%] md:min-w-[400px] min-h-80 m-auto">
                
            </div>
            <div className="m-auto flex justify-around align-middle space-x-24 w-[60%]">
                <button className="bg-black text-white py-4 px-16 border border-black hover:bg-white hover:text-black transition-all">CLEAR</button>
                <button className="bg-black text-white py-4 px-16 border border-black hover:bg-white hover:text-black transition-all">SUBMIT</button>
            </div>
        </div>
    )

}

export default Questionnaire;