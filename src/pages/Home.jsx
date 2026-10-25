import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';


export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [total, setTotal] = useState(0)

    async function fetchRecipes(skipCount) {
        try{
            //didnt use axios here because did not download it :(
            const response = await fetch(`https://dummyjson.com/recipes?limit=6&skip=${skipCount}`)
            const data = await response.json();
            setRecipes((prev) => [...prev, ...data.recipes]);
            setTotal(data.total);
        }catch(error){

        }
    }

    // fetchRecipes() ko every re-render pe call hone se bachane ke liye useEffect mei dala hai.
    //since dependency array is empty, it will be called only once during the initial render
    useEffect(() => {
        fetchRecipes(0);
    }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="button" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      { recipes.length <total &&
        <div className="text-center mt-8">
        {/* pagination */}
        <button
          onClick={() => fetchRecipes(recipes.length)}
          type="button"
          className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
        >
          Load More
        </button>
      </div>}
    </main>
  )
}
