import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//import icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// import components
import Loader from "../components/loader";
import Error from "../components/error";

// import react-toastify
import { toast } from "react-toastify";

export default function DetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // url den id parametresini al:
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:4000/api/recipes/${id}`)
      .then((res) => setData(res.data.recipe))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      axios
        .delete(`http://127.0.0.1:4000/api/recipes/${id}`)
        .then(() => {
          toast.warn("Deletion was successful.");
          navigate("/");
        })
        .catch(() => {
          toast.error("An error occurred while deleting.");
        });
    }
  };

  return (
    <div className="flex-1 bg-green-200 p-5 h-screen overflow-auto">
      <div className="flex justify-between">
        {/** {-1} bir onceki sayfaya git demek oluyor */}
        <Link
          to={-1}
          className="flex items-center justify-center p-1 w-[150px] rounded-md gap-4 text-xl hover:bg-orange-500 hover:text-white"
        >
          <IoMdArrowRoundBack /> Back
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center p-1 w-[150px] rounded-md gap-4 text-xl hover:bg-red-500 hover:text-white"
        >
          Delete
          <MdDeleteOutline />{" "}
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-10">
              <h1 className="text-3xl font-bold">{data.recipeName}</h1>
              <span className="inline flex gap-4">
                <span className="bg-orange-500 py-2 px-4 rounded-md text-white">
                  {data.category}
                </span>
                <span className="bg-orange-500 py-2 px-4 rounded-md text-white flex items-center gap-2">
                  <FaRegClock /> {data.recipeTime} minutes
                </span>
              </span>
            </div>
            <img
              className="rounded-lg max-w-[500px] max-h-[500px]"
              src={data.image}
              alt={data.recipeName}
            />

            {/**Ingredients list: */}
            <div>
              <h1 className="text-orange-500 text-2xl font-bold mb-4">
                Ingredients
              </h1>
              <ul className="text-lg">
                {data.ingredients.map((item) => (
                  <li key={item.id}>{item}</li>
                ))}
              </ul>
            </div>

            {/**Preparation: */}
            <div>
              <h1 className="text-orange-500 text-2xl font-bold mb-4">
                Instructions
              </h1>
              <ol className="text-lg list-decimal ps-5">
                {data.instructions.map((item) => (
                  <li>{item}</li>
                ))}
              </ol>
            </div>

            {/**Service: */}
            <div>
              <h1 className="text-orange-500 text-2xl font-bold mb-4">
                Service Suggestion
              </h1>
              <p>{data.serviceSuggestions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
