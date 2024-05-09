// import { recipeDetailCards } from "@/data";

export default function RecipeTags({ recipeData }: any) {
  return (
    <div className="px-1 flex flex-wrap justify-center mt-6 lg:px-6 items-center gap-3">
      <h1>Tags:</h1>
      {recipeData.tags.map((tag: any, index: any) => (
        <div key={index}>
          <h1 className="bg-slate-200 text-slate-800 py-2 px-4 text-base gap-2 rounded-xl w-full shadow-sm shadow-slate-500">
            #{tag}
          </h1>
        </div>
      ))}
      {/* <KitchenTools /> */}
    </div>
  );
}
