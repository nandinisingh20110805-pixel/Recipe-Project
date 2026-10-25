import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';


export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [total, setTotal] = useState(0)
    const [errorMsg, setErrormsg] = useState("");
    const [searchQuery , setQuery] = useState("");
    const [loading, setLoading] = useState(true)

    async function fetchRecipes(skipCount , query) {
        try{
            setLoading(true);
            //didnt use axios here because did not download it :(
            let url = `https://dummyjson.com/recipes?limit=6 &skip=${skipCount}`;
            if(query){
              url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`
            }
            const response = await fetch(url)
            const data = await response.json();
              setRecipes((prev) =>
                skipCount === 0 ? data.recipes : [...prev, ...data.recipes]);
            setTotal(data.total);
            setLoading(false);
        }catch(error){
          console.log(error);
          setErrormsg("Please Try Again Later")
        }
    }

    // fetchRecipes() ko every re-render pe call hone se bachane ke liye useEffect mei dala hai.
    //since dependency array is empty, it will be called only once during the initial render
    useEffect(() => {
        fetchRecipes(0);
    }, []);

    async function handleSearch(e){
      e.preventDefault();
      const form = new FormData(e.target) //formData is a built-in borwser object
      let query = form.get("query").trim();
      setQuery(query);
      if(query){
        fetchRecipes(0,searchQuery);
      }
    }

    if(errorMsg){
      return <p className="text-red-600 text-center mb-4">{errorMsg}</p>
    }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch}  className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          name="query"
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

      {
        !loading && recipes.length === 0 && <p className="text-amber-600 text-center mb-4">`No recipes found in {searchQuery} `</p>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      { recipes.length <total &&
        <div className="text-center mt-8">
        {/* pagination */}
        <button
          onClick={() => fetchRecipes(recipes.length, searchQuery)}
          type="button"
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>}
    </main>
  )
}
