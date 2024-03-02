import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

// import react-toastify
import { toast} from 'react-toastify';

// import multiselect input
import ReactSelect from "react-select/creatable";

export default function CreatePage() {
  // instructions ve ingredients ler icin state tutmamiz lazim:
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // butun inputlarin degerlerini alir ve bir obje haline getirmek istiyorum:
    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    // instructions ve ingredients leri dataya eklememiz lazim dizi seklinde:
    /**
     * Bize gelen veri su sekilde: [{label:"3 yemek kasigi"}]
     * Biz bunu labelsiz istiyoruz: [3 yemek kasigi]
     * onChange'e git => e.map() yap
     */
    newRecipe = { ...newRecipe, ingredients, instructions };

    // api istegi at veriyi kaydet
    axios.post('http://127.0.0.1:4000/api/recipes',newRecipe)
    .then(()=>{
      toast.success("Recipe created successfully.")
      navigate("/")
    })
    .catch(()=>{
      toast.error("Recipe creation failed.")
    })
  };

  return (
    <div className="flex-1 bg-blue-200 p-4 h-screen overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl m-auto my-20 flex flex-col gap-10"
      >
        <h1 className="text-3xl font-bold text-red-500">Create new recipe</h1>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Recipe Name</label>
          <input
            required
            className="rounded-md p-2 focus:outline-blue-400"
            name="recipeName"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Category</label>
          <input
            className="rounded-md p-2 focus:outline-blue-400"
            name="category"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Ingredients</label>
          <ReactSelect
            onChange={(e) => {
              const refined = e.map((item) => item.label);
              setIngredients(refined);
            }}
            isMulti
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Instructions</label>
          <ReactSelect
            onChange={(e) => {
              const refined = e.map((item) => item.label);
              setInstructions(refined);
            }}
            isMulti
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Recipe Time</label>
          <input
            required
            className="rounded-md p-2 focus:outline-blue-400"
            name="recipeTime"
            type="number"
            min={1}
            max={500}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Service Suggestions</label>
          <textarea
            className="rounded-md p-2 focus:outline-blue-400 max-h-[150px]"
            name="serviceSuggestions"
            type="text"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Image</label>
          <input
            required
            className="rounded-md p-2 focus:outline-blue-400"
            name="image"
            type="text"
          />
        </div>

        <div className="flex justify-end gap-6">
          <Link
            to={"/"}
            type="button"
            className="bg-gray-500 hover:bg-gray-600 transition py-2 px-4 rounded-md text-white font-semibold text-lg"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 transition py-2 px-4 rounded-md text-white font-semibold text-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
