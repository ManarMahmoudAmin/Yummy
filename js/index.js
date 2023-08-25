let row =document.getElementById('rowData');
let search = document.getElementById("search");
let arr =[];
let nameInput, ageInput, emailInput, phoneInput, passwordInput, repasswordInput, submitBtn;
let nameAlert, ageAlert, emailAlert, phoneAlert, passwordAlert, repasswordAlert;
let nameInputTouched = false,
    emailInputTouched = false,
    ageInputTouched = false,
    phoneInputTouched = false,
    passwordInputTouched = false,
    repasswordInputTouched = false;

function openNav() {
    $("nav").animate({left: `0px`},500);
    $("#toggle-nav i").removeClass('fa-bars');
    $("#toggle-nav i").addClass('fa-xmark');
    
    for(let i=0 ; i<5 ; i++) {
        $(".list li").eq(i).animate({top:'0px'},i+5*150);
    } 
}
function closeNav() {
    let navWidth = $(".nav-tab").outerWidth();    
    $("nav").animate({left: `-${navWidth}`},500);
    $("#toggle-nav i").removeClass('fa-xmark');
    $("#toggle-nav i").addClass('fa-bars');
    for(let i=0 ; i<5 ; i++) {
        $(".list li").eq(i).animate({top:'300px'},i+5*150);
    }
}

$(document).ready(function() {
    closeNav();
    getMeals("").then(()=> {
        $("#loading .spinner").fadeOut(100, function() {
            $("#loading").fadeOut(100, function() {
                $("#loading").remove();
                $('body').css('overflow','auto');
                $("#inner-loading").fadeOut(300);
            })
        })
    });
    
    $("#toggle-nav").click(function() {
       if($("nav").css('left') == '0px') {
        closeNav()
       }
       else {
            openNav();          
       }
    })
})

function displayMeals(arr) {
    let temp = '';
    for(let i=0 ; i < arr.length ; i++) {
        temp +=`
        <div class="col-md-3">
            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal-item rounded-2 position-relative cursor-pointer overflow-hidden">
                <img src="${arr[i].strMealThumb}" alt="" class="w-100">
                <div class="layer position-absolute d-flex align-items-center p-2"><h3>${arr[i].strMeal}</h3></div>
            </div>
        </div>`
    }
    row.innerHTML = temp;
}

async function getCategories() {
    closeNav();
    $("#inner-loading").fadeIn(300);
    search.innerHTML = "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    apiResponse = await apiResponse.json();
    console.log(apiResponse)
    displayCategories(apiResponse.categories);
    $("#inner-loading").fadeOut(300);
}

function displayCategories(arr) {  
    let temp = '';
    for(let i=0 ; i < arr.length ; i++) {
        temp +=`
        <div class="col-md-3">
            <div onclick="filterByCategory('${arr[i].strCategory}')" class="meal-item rounded-2 position-relative cursor-pointer overflow-hidden">
                <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
                <div class="layer text-center position-absolute p-2">
                    <h3>${arr[i].strCategory}</h3>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                 </div>
            </div>
        </div>`
    }
    row.innerHTML = temp;
}

async function getArea() {
    closeNav();
    $("#inner-loading").fadeIn(300);
    search.innerHTML = "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    apiResponse = await apiResponse.json();
    displayArea(apiResponse.meals);
    $("#inner-loading").fadeOut(300);
}    

function displayArea(arr) {
    let temp = '';
    for(let i=0 ; i < arr.length ; i++) {
        temp +=`
        <div class="col-md-3">
            <div onclick="filterByArea('${arr[i].strArea}')" class="image shadow-lg rounded-2 p-3 text-center cursor-pointer">
                <i class="fa-solid fa-building text-danger fa-3x"></i>
                <h3 class="h3 text-white py-2">${arr[i].strArea}</h3>
            </div>
        </div>`
    }
    row.innerHTML = temp;
}

async function getIngredients() {
    closeNav();
    $("#inner-loading").fadeIn(300);
    search.innerHTML = "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i`);
    apiResponse = await apiResponse.json();
    displayIngredients(apiResponse.meals.slice(0,20));
    $("#inner-loading").fadeOut(300);
}   

function displayIngredients(arr) {
    let temp = '';
    for(let i=0 ; i < arr.length ; i++) {
        temp +=`
        <div class="col-md-3 ">
            <div onclick="filterByIngredients('${arr[i].strIngredient}')" class="image shadow-lg rounded-2 p-3 text-center cursor-pointer">
                <i class="fa-solid fa-bowl-food text-success fa-3x"></i>
                <h3 class="h3 text-white">${arr[i].strIngredient}</h3>
                <p class="text-white">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>`
    }
    row.innerHTML = temp;
}

async function filterByCategory(category) {
    closeNav();
    $("#inner-loading").fadeIn(300);
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`);
    apiResponse = await apiResponse.json();
    apiResponse.meals ? displayMeals(apiResponse.meals) : displayMeals([]);
    $("#inner-loading").fadeOut(300);
}

async function filterByArea(area) {
    closeNav();
    $("#inner-loading").fadeIn(300);
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    apiResponse = await apiResponse.json();
    displayMeals(apiResponse.meals);
    $("#inner-loading").fadeOut(300);
}

async function filterByIngredients(ingredients) {
    closeNav();
    $("#inner-loading").fadeIn(300);
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    apiResponse = await apiResponse.json();
    displayMeals(apiResponse.meals);
    $("#inner-loading").fadeOut(300);
}

async function getMealDetails(mealId){
    closeNav();
    $("#inner-loading").fadeIn(300);
    search.innerHTML = "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    apiResponse = await apiResponse.json();
    displayMealDetails(apiResponse.meals[0]);
    $("#inner-loading").fadeOut(300);
}

function displayMealDetails(meal){
    let ingredients = "";
    let tagStr="";
    let tags = meal.strTags?.split(",")
    for(let i = 1 ; i <= 20 ; i++){
        if(meal[`strIngredient${i}`]){
            ingredients += `<li class="alert alert-success border border-success p-1 px-2 text-success m-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }
    if (!tags) {tags= []}
    for(let i= 0 ; i < tags.length ; i++){
        tagStr += `<li class="alert alert-danger border border-danger p-1 px-2 text-danger m-1">${tags[i]}</li>`
    }
    
    let temp ='';
    temp = `<div class="col-md-4 text-center">
    <img src="${meal.strMealThumb}" alt="" class="w-100">
    <h2 class="text-white my-2">${meal.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <p><span class="fw-bold">Area : </span>${meal.strArea}</p>
    <p><span class="fw-bold">Category : </span>${meal.strCategory}</p>
    <h4>Recipes :</h4>
    <ul class="list-unstyled recipes d-flex flex-wrap">${ingredients}</ul>
    <h4>Tags :</h4>
    <ul class="list-unstyled tags d-flex flex-wrap g-1">
        ${tagStr}
    </ul>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success mx-1">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
</div>`
row.innerHTML = temp
}
function showSearch (){
    closeNav();
    row.innerHTML = "";
    let temp = `<div class="row g-5">
    <div class="col-md-6 shadow">
        <input onkeyup="getMeals(this.value)" class="text-center rounded-0 bg-transparent border-0 border-bottom form-control text-white"  placeholder="Search By Name">
    </div>    
    <div class="col-md-6 shadow">
        <input onkeyup="searchByFName(this.value)" class="text-center rounded-0 bg-transparent border-0 border-bottom form-control text-white" maxlength="1" placeholder="Search By First Letter">
    </div>    
</div>`
search.innerHTML = temp;
}

async function getMeals(term) {
    closeNav();
    $("#inner-loading").fadeIn(300);
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    apiResponse = await apiResponse.json();
    (apiResponse.meals) ? displayMeals(apiResponse.meals) : displayMeals([]);
    $("#inner-loading").fadeOut(300);
}
async function searchByFName(fl) {
    closeNav();
    $("#inner-loading").fadeIn(300);
    fl == "" ? fl = 'a' : "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fl}`);
    apiResponse = await apiResponse.json();
    displayMeals(apiResponse.meals);
    $("#inner-loading").fadeOut(300);
}

function showForm() {
    closeNav();
    search.innerHTML = "";
    row.innerHTML = 
    `<h2 class="text-white text-center mt-5">Contact Us...</h2>
    <div class="col-md-6 shadow">
        <input onkeyup ="inputsValidation()" type="text" id="nameInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Special Characters and numbers are not allowed
        </div>
    </div>    
    <div class="col-md-6 shadow">
        <input onkeyup ="inputsValidation()" type="email" id="emailInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Enter valid email. *EX: xxx@yyy.zzz
        </div>
    </div>    
    <div class="col-md-6 shadow">
        <input onkeyup ="inputsValidation()" id="phoneInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Enter valid phone number
        </div>
    </div>    
    <div class="col-md-6 shadow">
        <input onkeyup ="inputsValidation()" id="ageInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter Age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Enter valid age
        </div>
    </div>    
    <div class="col-md-6 shadow">
        <input onkeyup ="inputsValidation()" type="password" id="passwordInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter Password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Enter valid password *Minimun eight Characters, at least one letter and one number:*
        </div>
    </div>    
    <div class="col-md-6 shadow">
        <input  onkeyup ="inputsValidation()" type="password" id="repasswordInput" class="rounded-0 bg-transparent border-0 border-bottom form-control text-white" placeholder="Enter RePassword">
        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 p-2 d-none">
            Enter valid repassword
        </div>
    </div>    
</div>
<div class="submit"><button id="submitBtn" class="btn btn-outline-danger mt-4 text-center" disabled>Submit</button></div>`
nameInput = document.getElementById("nameInput");
emailInput = document.getElementById("emailInput");
ageInput = document.getElementById("ageInput");
phoneInput = document.getElementById("phoneInput");
passwordInput = document.getElementById("passwordInput");
repasswordInput = document.getElementById("repasswordInput");
submitBtn = document.getElementById("submitBtn");
nameAlert = document.getElementById("nameAlert");
emailAlert = document.getElementById("emailAlert");
ageAlert = document.getElementById("ageAlert");
phoneAlert = document.getElementById("phoneAlert");
passwordAlert = document.getElementById("passwordAlert");
repasswordAlert = document.getElementById("repasswordAlert");

nameInput.addEventListener("focus", ()=> {
    nameInputTouched = true;
})
emailInput.addEventListener("focus", ()=> {
    emailInputTouched = true;
})
phoneInput.addEventListener("focus", ()=> {
    phoneInputTouched = true;
})
ageInput.addEventListener("focus", ()=> {
    ageInputTouched = true;
})
passwordInput.addEventListener("focus", ()=> {
    passwordInputTouched = true;
})
repasswordInput.addEventListener("focus", ()=> {
    repasswordInputTouched = true;
})
}

function inputsValidation(){
    if(nameInputTouched){
        if(isNameValid()){
            nameAlert.classList.replace("d-block","d-none");
        }
        else {
            nameAlert.classList.replace("d-none","d-block");
        }
    }
    if(emailInputTouched){
        if(isEmailValid()){
            emailAlert.classList.replace("d-block","d-none");
        }
        else {
            emailAlert.classList.replace("d-none","d-block");
        }
    }
    if(phoneInputTouched){
        if(isPhoneVaild()){
            phoneAlert.classList.replace("d-block","d-none");
         }
         else {
            phoneAlert.classList.replace("d-none","d-block");
         }
    }
    if(ageInputTouched){
        if(isAgeVaild()){
            ageAlert.classList.replace("d-block","d-none");
         }
         else {
            ageAlert.classList.replace("d-none","d-block");
         }
    }
    if(passwordInputTouched){
        if(isPasswordVaild()){
            passwordAlert.classList.replace("d-block","d-none");
         }
         else {
            passwordAlert.classList.replace("d-none","d-block");
         }
    } 
    if(repasswordInputTouched){
        if(isRepasswordVaild()){
            repasswordAlert.classList.replace("d-block","d-none");
         }
         else {
            repasswordAlert.classList.replace("d-none","d-block");
         }
    }
    allValid();
}

function allValid(){
    if(isNameValid() &&
    isEmailValid() &&
    isAgeVaild() &&
    isPhoneVaild() &&
    isPasswordVaild() &&
    isRepasswordVaild()){
        submitBtn.removeAttribute("disabled");
    }
    else {
        submitBtn.setAttribute("disabled",true);

    }
}

function isNameValid() {
   return ((/^[a-z ,.'-]+$/i).test(nameInput.value));
}
function isEmailValid() {
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailInput.value));
}
function isAgeVaild() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value));
}
function isPhoneVaild() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value));    
}
function isPasswordVaild() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value));
}
function isRepasswordVaild() {
    return passwordInput.value == repasswordInput.value;
}