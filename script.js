//retrieve HTML elements
const $form = document.getElementById('form');
const $date = document.getElementById('date');
const $recent = document.getElementById('recent');
const $content = document.getElementById('content');



//create a data array

//array of objects
//each object is a new entry
let datas = [];

//build recent searches
function buildRecent() {
    const html = []

    //use for loop to loop through the array
    for (let i = 0; i < datas.length; i++) {
       //to get each data: datas[i]
       const data = datas[i];
       
    html.push(`
    <div class="card d-flex align-items-center p-3 mb-3" style="max-width: 540;">
    <div class="row g-0">
    <div class="col-md-4">
    
    <img src="${data.url}" class="img-fluid rounded-start"></img>
    </div>
    <div class="col-md-8">
    <div class="card-body me-auto">
    <h5 class="card-title">${data.title}</h5>
          <p class ="card-text">${data.explanation}</p>
        <p class="card-text"><small class="text-muted">${data.date}</small></p>
           <a href="${data.hdurl}" class="btn btn-primary">View in HD</a>
           <button class="btn btn-close" data-index="${i}"></button>
    </div>
    </div>
    </div>
    </div> `)
    }
    
         //console.log(json);
         $recent.innerHTML = html.join('');
}


// add listerner to form
// will make a request to the server

$form.addEventListener('submit',
 async function(e) {
     e.preventDefault();

     //making a async request using fetch
     //will return a promise
     // two methods: then and catch

     //make fetch request to get response
     //API expects a date in the format YYYY-MM-DD
     const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=Ou3ia2FhK7xTMFJBLx14TZc3gmbeTnz1baShtTof' + '&date=' + $date.value);


     //use the response to get the json data
     const json = await response.json();

datas.push(json);

//store the data in the local storage
localStorage.setItem('datas', JSON.stringify(datas));

 buildRecent();



});
//adding a listener to the recent using event delegation to the close button
$recent.addEventListener('click', function(e) {
//check if the target is a button was clicked
if (e.target.classList.contains('btn-close')) {
    //get the index of the button
const index = e.target.dataset.index;
//remove the data from the array
datas.splice(index, 1);

//update the local storage
localStorage.setItem('datas', JSON.stringify(datas));

//rebuild the recent
buildRecent();
}
});

//check if there is data in the local storage
const ls = localStorage.getItem('datas');

if(ls) {
    //override the datas array with the data in the local storage
    datas = JSON.parse(ls);



}
buildRecent();