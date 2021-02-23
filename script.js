function apiCall(url) {
    fetch(url)
        .then(response => response.json())
        .then(meals => displayResult(meals['meals']));
}

apiCall('https://www.themealdb.com/api/json/v1/1/search.php?s=a');



function displayResult(meals) {
    meals.forEach(meal => {
        let elementBody = `
        <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title text-center">${meal.strMeal}</h5>
          </div>
        </div>
      `;
      let div = document.getElementById('meal-list');
      let element = document.createElement('div');
      element.innerHTML = elementBody;
      element.className = 'col-md-3';
      div.appendChild(element);
    });
}