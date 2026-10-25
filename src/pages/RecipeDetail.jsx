import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

//step 1 : fetch id from url
//step 2 : fetch data from the api based on that
//step 3 : render

export const RecipeDetail = () => {
  const {id} = useParams()
  const [recipe , setRecipe] = useState(null);
  const [error , setError] = useState(null)
 
  async function getRecipe(){
    try{
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        if(!response.ok){//checks whether the https request is successful
            throw new Error(
                response.status === 404 ? "Recipe Not Found" : `Server Error (${response.status})`
            );
        }
        const data = await response.json();
        setRecipe(data);
    }
    catch(err){
        setError(err.message);
    }
  }

  useEffect(() => {
    getRecipe();
  },[])

  if(error){
    return(
      <main className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
      <p className="text-red-600 mb-4">{error}</p>
      <Link to="/" className="border-2 rounded-md  bg-accent px-2 py-2 text-white hover:underline">Back to Home</Link>
    </main>
    )
  }

  if (!recipe) return <p className="p-8">Loading...</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <a href="/#" className="text-accent hover:underline inline-flex items-center gap-1 mb-6">
        <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </a>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-md border border-border"
        />
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="font-serif text-3xl font-bold text-text mb-2">{recipe.name}</h1>
          <p className="text-muted mb-4">{recipe.cuisine} - {recipe.difficulty}</p>
          <div className="flex items-center gap-1 mb-4 font-medium">
            <svg className="w-4 h-4 fill-accent" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm border-t border-border pt-4 mb-4">
            <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} mins</p>
            <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} mins</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
          </div>
          <p className="text-sm text-muted mb-1">
            <strong>Meal Type:</strong> {recipe?.mealType?.join(', ')}
          </p>
          <p className="text-sm text-muted">
            <strong>Tags:</strong> {recipe?.tags?.join(', ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((item) => (
              <li key={item.id}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  )
}
