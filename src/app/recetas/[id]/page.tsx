// src/app/recetas/[id]/page.tsx
import { useEffect, useState } from "react";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recetas/${params.id}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [params.id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Rating: {recipe.rating}</p>
      <p>Author: {recipe.author?.name}</p>
    </div>
  );
};

export default RecipePage;
