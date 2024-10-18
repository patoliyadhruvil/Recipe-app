import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import RecipeCard from "../components/design/RecipeCard";
import Loading from "../components/design/Loading";
import ApiError from "../components/design/ApiError";
import { useFetch } from "../components/hook/useFetch";

function Category() {
  const { id } = useParams();

  const { isLoading, apiError, reqData } = useFetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
      import.meta.env.VITE_API_KEY
    }&cuisine=${id}`,
    id
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{id.toUpperCase()} - React Recipe Finder</title>
        <link
          rel="canonical"
          href={`https://react-recipe-finder-2022.netlify.app/category/${id}`}
        />
      </Helmet>

      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#ff5a60]"></div>
        </div>
      )}

      {!isLoading && apiError && <ApiError />}

      {!isLoading && !apiError && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-12">
            {reqData?.results.length > 0 ? (
              <>
                <h1 className="text-4xl font-bold text-center text-gray-800 capitalize mb-12 tracking-wide">
                  Best {id} Recipes
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {reqData.results.map((data) => (
                    <div
                      key={data.id}
                      className="transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                      <RecipeCard data={data} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-600 mb-6">
                  No {id} recipes found!
                </h1>
                <p className="text-gray-500 text-lg">
                  Try searching for something else or check other categories.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Category;
