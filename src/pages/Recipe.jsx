import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ApiError from "../components/design/ApiError";
import { useFetch } from "../components/hook/useFetch";
import LoadingContent from "../components/design/LoadingContent";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const navItems = [
  { name: "Instructions", tab: "instructions" },
  { name: "Ingredients", tab: "ingredients" },
];

function Recipe() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("instructions");

  const { isLoading, apiError, reqData } = useFetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {isLoading ? (
          <title>Loading...</title>
        ) : (
          <title>{!apiError ? reqData?.title : "Api Error - try again later"}</title>
        )}
        <link rel="canonical" href={`https://react-recipe-finder-2022.netlify.app/recipe/${id}`} />
      </Helmet>

      {isLoading && <LoadingContent message="Loading..." />}
      {!isLoading && apiError && <ApiError />}
      {!isLoading && !apiError && (
        <section className="bg-gradient-to-br from-orange-200 to-yellow-300 py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Recipe Title */}
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6">{reqData?.title}</h1>
            <div className="flex flex-col md:flex-row justify-center items-center mb-12">
              {/* Recipe Image */}
              <motion.img
                src={reqData?.image}
                alt={reqData?.title}
                className="rounded-lg shadow-lg max-w-xs mx-auto transition-transform duration-500 hover:scale-110"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center space-x-8 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`py-2 px-6 text-lg font-semibold rounded-lg transition-colors duration-200 transform ${
                    activeTab === item.tab ? "bg-orange-500 text-white shadow-lg" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Instructions */}
              {activeTab === "instructions" && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Instructions</h2>
                  <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: reqData?.instructions }} />
                </div>
              )}
              {/* Ingredients */}
              {activeTab === "ingredients" && reqData?.extendedIngredients && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Ingredients</h2>
                  <ul className="list-disc pl-6 space-y-1 text-gray-800">
                    {reqData.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="hover:text-orange-500 transition duration-200">{ingredient.original}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}

export default Recipe;
