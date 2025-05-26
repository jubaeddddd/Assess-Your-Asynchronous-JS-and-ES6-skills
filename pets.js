//load categories
const loadCategories=async()=>{
    const fetched=await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const res =await fetched.json();
    const display=displayCategories(res.categories)
}
//load pets
const loadPets=async()=>{
    const fetched=await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const res=await fetched.json();
    const display=displayPets(res.pets)
}
//display pets
const displayPets=(pets)=>{
    const petSection=document.getElementById("pet-div")
    for(const pet of pets){
         const div=document.createElement('div')
         div.classList="card bg-base-100 shadow-sm"
         div.innerHTML=`
             <figure class="px-10 pt-10">
                    <img src="${pet.image}" />
             </figure>
             <div class="px-10 card-body">
                    <h1 class="font-bold text-2xl">${pet.pet_name}</h1>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=115221&format=png'}"/> 
                        ${!pet.breed||pet.breed.length==0?'<h1 class="text-gray-600">Breed: Not Found</h1>':`<h1 class="text-gray-600">Breed: ${pet.breed}</h1>`}
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=96&id=5VOqBjvi7siv&format=png'}"/> 
                        ${!pet.date_of_birth||pet.date_of_birth.length==0?'<h1 class="text-gray-600">Birth: Not Found</h1>':`<h1 class="text-gray-600">Birth: ${pet.date_of_birth}</h1>`}
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=100&id=1665&format=png'}"/>
                         ${!pet.gender||pet.gender.length==0?'<h1 class="text-gray-600">Gender: Not Found</h1>':`<h1 class="text-gray-600">Gender: ${pet.gender}</h1>`} 
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=85843&format=png'}"/>
                        ${!pet.price||pet.price.length==0?'<h1 class="text-gray-600">Price: Not Found</h1>':`<h1 class="text-gray-600">Price: ${pet.price}</h1>`}  
                    </div>


                    <p class="divider"><p>

                    <div class="flex justify-between">
                        <button class="btn btn-square"><img class='h-5' src="${'https://img.icons8.com/?size=48&id=82788&format=png'}" /></button>
                        <button class="btn text-[#0E7A81]">Adopt</button>
                        <button class="btn text-[#0E7A81]">Details</button>
                    </div>
             </div>
         `
         petSection.appendChild(div)
    }
}
// display categories
const displayCategories=async(items)=>{
    const categoriesButtons=document.getElementById('category-buttons')
    for(const item of items){
        const div=document.createElement('div')
        div.innerHTML=`
          <button class="btn w-32 py-7 px-9 font-bold text-xl"><img class="h-10" src="${item.category_icon}"/> ${item.category}</button>
        `
        categoriesButtons.appendChild(div)
    }
}
loadCategories();
loadPets();