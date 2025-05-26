//load categories
const loadCategories=async()=>{
    const fetched=await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const res =await fetched.json();
    const display=displayCategories(res.categories)
}
// display categories
const displayCategories=async(items)=>{
    const categoriesButtons=document.getElementById('category-buttons')
    console.log(items)
    for(const item of items){
        const div=document.createElement('div')
        div.innerHTML=`
          <button class="btn py-7 px-9 font-bold text-xl"><img class="h-10" src="${item.category_icon}"/> ${item.category}</button>
        `
        categoriesButtons.appendChild(div)
    }
}
loadCategories();