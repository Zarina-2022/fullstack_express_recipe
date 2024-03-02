
export default function Error({message}){
    return(
        <div className="mt-[300px] text-center text-2xl">
            <p className="pb-5">Sorry, an error occurred while processing the transaction.</p>
            <span className="bg-red-500 rounded text-white px-5">{message}</span>
        </div>
    )
}