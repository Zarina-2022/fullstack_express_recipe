// import icons
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function RecipeCard ({item}){
    return( 
        <Link to={`/recipe/${item.id}`} className="bg-white rounded p-4 w-[400px]">
            <div className="relative"> 
                <img className=" rounded-lg h-[200px] w-[400px] object-cover" src={item.image} />
                <p className="absolute bottom-1 left-1 flex bg-white rounded-lg p-1 font-semibold items-center gap-2">
                    <i><IoTimeOutline /></i>
                    <span>{item.recipeTime} minutes</span>
                </p>
            </div>
            <h2 className="font-semibold text-lg my-3">{item.recipeName}</h2>
            <p className="text-gray-500">{item.category}</p>
            <p className="flex gap-3 mt-3">
                <span className="bg-gray-300 rounded-md p-1 line-clamp-1">{item.ingredients[0]}</span>
                {item.ingredients[1] && (
                    <span className="bg-gray-300 rounded-md p-1 line-clamp-1">{item.ingredients[1]}</span> 
                )}
            </p>
        </Link>
    )
}