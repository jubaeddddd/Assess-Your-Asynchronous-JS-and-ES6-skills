//remove all active button
const removeActive = () => {
    const allButtons = document.getElementsByClassName("buttons")
    for (const button of allButtons) {
        button.classList.remove("active")
    }
}
//load videos based on category
const displayPetsBasedOnCategory = (pet_name) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${pet_name}`)
        .then(res => res.json())
        .then(display => {
            const activeBtn = document.getElementById(`btn-${pet_name}`)
            removeActive();
            activeBtn.classList.add("active")
            displayPets(display.data)
        })
}
//like button
const likePet = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(display => {
            const pet = document.getElementById('liked-pet')
            const img = document.createElement('img')
            img.src = display.petData.image
            pet.appendChild(img)
        }
        )
}
//adopted button
const adopted = (id) => {
    //modal
    const modalContent = document.getElementById("ModalContent");
    modalContent.innerHTML = `
    <img src="https://img.icons8.com/?size=96&id=kRZicCB1E8B8&format=gif" />
    <h1 class="text-4xl font-bold">Congrats</h1>
    <p>Adoption process in start for your pet</p>
    <h1 id="countdown" class="text-6xl font-bold">3</h1>
  `;
    document.getElementById("customModal").showModal();

    let num = 3;
    const countdown = document.getElementById("countdown");
    const interval = setInterval(() => {
        num--;
        countdown.innerText = num;
        if (num <= 0) {
            clearInterval(interval);
            countdown.innerText = "🎉";
        }
    }, 1000);


    // close button in modal 
    const close = document.getElementById("close")
    close.onclick = function () {
        const adoptedButton = document.getElementById(id)
        adoptedButton.innerText = "adopted"
        adoptedButton.classList.add("text-gray-500")
        adoptedButton.disabled = true
    }
};







//load categories
const loadCategories = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const res = await fetched.json();
    const display = displayCategories(res.categories)
}
//load pets
const loadPets = async () => {
    const fetched = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const res = await fetched.json();
    const display = displayPets(res.pets)
}
//load individul pet
const loadIndividualPetDetails = async (id) => {
    const fetched = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const res = await fetched.json();
    const display = displayIndividualPetDetails(res.petData)
}
//display individual pet
const displayIndividualPetDetails = (pet) => {
    const detailsModal = document.getElementById("detailsModal")
    detailsModal.innerHTML = `
       <figure class="px-10 pt-10">
                    <img class="rounded lg:h-[500px] w-full object-cover" src="${pet.image}" />
        </figure>
        <div class="px-10 card-body">
                    <h1 class="font-bold text-2xl">${pet.pet_name}</h1>
                    <div class="flex justify-between">
                        <div>
                                <div class="flex gap-1">
                                   <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=115221&format=png'}"/> 
                                   ${!pet.breed || pet.breed.length == 0 ? '<h1 class="text-gray-600">Breed: Not Found</h1>' : `<h1 class="text-gray-600">Breed: ${pet.breed}</h1>`}
                                </div>
                                <div class="flex gap-1">
                                   <img class="h-5 w-5" src="${'https://img.icons8.com/?size=100&id=1665&format=png'}"/>
                                   ${!pet.gender || pet.gender.length == 0 ? '<h1 class="text-gray-600">Gender: Not Found</h1>' : `<h1 class="text-gray-600">Gender: ${pet.gender}</h1>`} 
                                </div>
                                <div class="flex gap-1">
                                   <img class="h-5 w-5" src="${'https://img.icons8.com/?size=100&id=5351&format=png'}"/>
                                   ${`<h1 class="text-gray-600">Vaccinated_status: ${pet.vaccinated_status}</h1>`} 
                                </div>
                        </div>
                        <div>
                                <div class="flex gap-1">
                                   <img class="h-5 w-5" src="${'https://img.icons8.com/?size=96&id=5VOqBjvi7siv&format=png'}"/> 
                                   ${!pet.date_of_birth || pet.date_of_birth.length == 0 ? '<h1 class="text-gray-600">Birth: Not Found</h1>' : `<h1 class="text-gray-600">Birth: ${pet.date_of_birth}</h1>`}
                                </div>
                                <div class="flex gap-1">
                                   <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=85843&format=png'}"/>
                                   ${!pet.price || pet.price.length == 0 ? '<h1 class="text-gray-600">Price: Not Found</h1>' : `<h1 class="text-gray-600">Price: ${pet.price}</h1>`}  
                                </div>
                        </div>
                    </div>

                    <p class="divider"></p>

                    <h1 class="font-bold text-2xl">Detail Information</h1>
                    <p class="text-gray-600">${pet.pet_details}</p>

        </div>
    `
    document.getElementById("petDetailsModal").showModal()
}
//display pets
const displayPets = (pets) => {
    if (pets.length == 0) {
        const petSection = document.getElementById("pet-div")
        petSection.innerHTML = ""
        const div = document.createElement('div')
        div.classList = "col-span-3 card lg:card-side bg-base-100 shadow-sm"
        div.innerHTML = `
            <div class="card-body lg:my-36 flex flex-col justify-center items-center gap-8">
                  <img class="h-50 w-50" src="images/error.webp" />
                  <h1 class="text-4xl font-bold">No Information Available</h1>
                  <p>We couldn’t find any relevant data to display at this time. Please check back later or try refining your input or criteria.</p>
            </div>
        `
        petSection.appendChild(div)
    }
    else {
        const petSection = document.getElementById("pet-div")
        petSection.innerHTML = ""
        for (const pet of pets) {
            const div = document.createElement('div')
            div.classList = "card bg-base-100 shadow-sm"
            div.innerHTML = `
             <figure class="px-10 pt-10">
                    <img class="rounded" src="${pet.image}" />
             </figure>
             <div class="px-10 card-body">
                    <h1 class="font-bold text-2xl">${pet.pet_name}</h1>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=115221&format=png'}"/> 
                        ${!pet.breed || pet.breed.length == 0 ? '<h1 class="text-gray-600">Breed: Not Found</h1>' : `<h1 class="text-gray-600">Breed: ${pet.breed}</h1>`}
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=96&id=5VOqBjvi7siv&format=png'}"/> 
                        ${!pet.date_of_birth || pet.date_of_birth.length == 0 ? '<h1 class="text-gray-600">Birth: Not Found</h1>' : `<h1 class="text-gray-600">Birth: ${pet.date_of_birth}</h1>`}
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=100&id=1665&format=png'}"/>
                         ${!pet.gender || pet.gender.length == 0 ? '<h1 class="text-gray-600">Gender: Not Found</h1>' : `<h1 class="text-gray-600">Gender: ${pet.gender}</h1>`} 
                    </div>
                    <div class="flex gap-1">
                        <img class="h-5 w-5" src="${'https://img.icons8.com/?size=48&id=85843&format=png'}"/>
                        ${!pet.price || pet.price.length == 0 ? '<h1 class="text-gray-600">Price: Not Found</h1>' : `<h1 class="text-gray-600">Price: ${pet.price}</h1>`}  
                    </div>


                    <p class="divider"><p>
                    <div class="flex justify-between">
                        <button onclick="likePet('${pet.petId}')" class="btn btn-square"><img class='h-5' src="${'https://img.icons8.com/?size=48&id=82788&format=png'}" /></button>
                        <button id="${pet.petId}" onclick="adopted('${pet.petId}')" class="btn text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white">Adopt</button>
                        <button onclick="loadIndividualPetDetails('${pet.petId}')" class="btn text-[#0E7A81]">Details</button>
                    </div>
             </div>
         `
            petSection.appendChild(div)
        }
    }
}
// display categories
const displayCategories = async (items) => {
    const categoriesButtons = document.getElementById('category-buttons')
    for (const item of items) {
        const div = document.createElement('div')
        div.innerHTML = `
          <button id="btn-${item.category}" onclick="displayPetsBasedOnCategory('${item.category}')" class="buttons btn w-32 py-7 px-9 font-bold text-xl hover:bg-[#cde6e7] hover:border-[#0E7A81] hover:rounded-full"><img class="h-10" src="${item.category_icon}"/> ${item.category}</button>
        `
        categoriesButtons.appendChild(div)
    }
}
loadCategories();
loadPets();