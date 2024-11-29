const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailContent = document.querySelector(".recipe-detail-content");
const recipeloseBtn= document.querySelector(".recipe-close-btn");



const fetchRecipes = async (query)  => {
    recipeContainer.innerHTML="<h2>fetching recipies....<h2>"
try {
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  const response= await data.json();

  recipeContainer.innerHTML="";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement("div");
    recipeDiv.innerHTML=""
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}"
     >
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>belongs to <span> ${meal.strCategory}<span> Category</p>
     `
    const button=document.createElement("button")
    button.textContent="view recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click",()=>{
        openRecipePopUp(meal);
      });
     recipeContainer.appendChild(recipeDiv);

  });
} 

catch (error) {
    recipeContainer.innerHTML="<h2>error in fetching recipies....<h2>"
}


}

const fetchIngredients=(meal)=>{
let ingredientList="";
for (let i=1; i<=20;  i++){
  const ingredient=meal[`strIngredient${i}`];
  if (ingredient) {
    const measure=meal[`strMeasure${i}`]
    ingredientList+= `<li>${measure}  ${ingredient}</li>`
  }else{
    break;
  }
}
  return ingredientList;
}

const openRecipePopUp=(meal)=>{
  recipeDetailContent.innerHTML=`
  
  <h2 class="recipeName">${meal.strMeal}</h2>
  <h3>Ingridients:</h3>
  <ul class="ingredientList">${fetchIngredients(meal)}</ul>
  
  <div class="recipeInstructions">
  <h3>Instructions:</h3>
<p>${meal.strInstructions}</p>
  </div>

  `
  
  recipeDetailContent.parentElement.style.display="block";
}

recipeloseBtn.addEventListener("click",()=>{
  recipeDetailContent.parentElement.style.display="none";
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    // console.log("button id click");
    const searchInput= searchBox.value.trim();
    if (!searchInput) {
      recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`
      return;
    }
    fetchRecipes(searchInput);
})
