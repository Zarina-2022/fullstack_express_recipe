import { useEffect, useState } from "react";
import axios from "axios";

// import @uidotdev/usehooks
import { useDebounce } from "@uidotdev/usehooks";

// import icons
import { CiSearch } from "react-icons/ci";

// import components
import RecipeCard from "../components/recipeCard";
import Loader from "../components/loader";
import Error from "../components/error";

export default function MainPage() {
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order,setOrder]=useState(null)
  // debounce userin yazisini bitmesini bekler sonra arar kelimeyi
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  
  useEffect(() => {
    setIsLoading(true);

    // gonderilecek parametreleri ayri belirleyelim:
    const params = {
      recipeName: debouncedSearchTerm,
      // saat suresine gore siralamak (asc=artan,desc=azalan):
      order: order,
    };

    axios
      .get(`http://127.0.0.1:4000/api/recipes`, { params })
      .then((res) => {
        setData(res.data);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setIsLoading(false));
  }, [debouncedSearchTerm,order]);

  return (
    <main className="flex-1 bg-red-200 p-4 h-screen overflow-auto">
      <section>
        <div className="bg-white flex gap-3 p-2 rounded-lg overflow-hidden items-center shadow-lg">
          <CiSearch className="text-xl" />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none"
            type="text"
          />
        </div>
      </section>

      <section className="mt-5">
        {isLoading ? (
          <Loader />
        ) : errorMsg ? (
          <Error message={errorMsg} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">{data.quantity} recipes found</h1>
              
              <select value={order} onChange={(e)=>setOrder(e.target.value)} defaultValue="Sort by preparation time:" className="rounded-md p-2">
                <option  disabled>Sort by preparation time:</option>
                <option value={"asc"}>ascending</option>
                <option value={"desc"}>descending</option>
              </select>

            </div>

            <div className="flex flex-wrap gap-10 justify-center">
              {data.recipes.map((item) => (
                <RecipeCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
