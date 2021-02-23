function mealDetails(id) {
    console.log('clicked')
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(response => response.json())
    .then(data => displayMealDetails(data['meals'][0]));
}

function displayMealDetails(data) {
    document.getElementById('meal-details-img').src = data.strMealThumb;
    document.getElementById('meal-details-title').innerText = data.strMeal;

    document.getElementById('meal-search-area').style.display = 'none';
    document.getElementById('meal-display-area').style.display = 'none';
    document.getElementById('meal-details').style.display = 'block';

    for (let i = 1; i < 21; i++) {
        let ingredientName = 'strIngredient' + i;
        ingredientName = data[ingredientName];

        let ingredientMeasure = 'strMeasure' + i;
        ingredientMeasure = data[ingredientMeasure];
        
        if (ingredientName != null && ingredientName != "") {
            let p = document.createElement('p');
            p.innerHTML = `<p> <img src="./assets/tick.svg"> ${ingredientMeasure} ${ingredientName}</p>`;
            let div = document.getElementById('meal-details');
            div.appendChild(p);
        }
    
    }
}




// Set a default result
searchMeal('');

function searchMeal() {
    const searchQuery = document.getElementById('form-search').value;
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchQuery;
    let div = document.getElementById('meal-list');
    div.innerHTML = `<div class="col-md-12 text-center alert alert-info">Searching...</div>`;
    fetch(url)
        .then(response => response.json())
        .then(meals => displaySearchResult(meals['meals']));
}

function displaySearchResult(meals) {
    let div = document.getElementById('meal-list');
    div.innerHTML = '';
    if (meals != null) {
        meals.forEach(meal => {
            let elementBody = `
            <div onclick="mealDetails(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title text-center">${meal.strMeal}</h5>
                </div>
            </div>
            `;
            let element = document.createElement('div');
            element.innerHTML = elementBody;
            element.className = 'col-md-3';
            div.appendChild(element);
        });
    } else {
        div.innerHTML = `<div class="col-md-12 text-center alert alert-danger">No result found. Please try with different keyword.</div>`;
    }
}