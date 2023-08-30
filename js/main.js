
let searchInput =document.getElementById("search");
let place =document.getElementById("location");
let temperature =document.getElementById("num");
let currentImg =document.getElementById("img1");
let currenttext=document.getElementById('text')
let umbrella=document.getElementById('umbrella')
let wind=document.getElementById('wind')
let windDirction=document.getElementById('east')
let todayName=document.getElementById('currentDay')
let todayNumber=document.getElementById('todayNumber')
let todaymonth=document.getElementById('todayMonth')

//***********************


// 
// let lastImg =document.getElementsByClassName('lastImg');
// let degree =document.getElementsByClassName('degree');
// let degreeSmall =document.getElementsByClassName('degreeSmall');
// let lastText =document.getElementsByClassName('lastText');
//***********************


let lastImg =document.getElementById('twoImg');
let degree =document.getElementById('twoDegree');
let degreeSmall =document.getElementById('degreeSmall');
let lastText =document.getElementById('twoText');
let nextDay =document.getElementById('nextday');

//***********************
let threeImg =document.getElementById('threeImg');
let threedegree =document.getElementById('threeDegree');
let threedegreeSmall =document.getElementById('threeDegreeSmall');
let threeText =document.getElementById('threeText');
let nextDay2 =document.getElementById('nextday2');



// **********API*************

async function getApi(city){
   let urlApi= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eba9a04f9ea5464081d10706232908&q=${city}&days-3`)
   let respons =await urlApi.json();
   return respons
}

// ***********************



searchInput.addEventListener('input',function(){

   displayAPP(searchInput.value)
   
    
})

function currentweather(data){
    let todayDate = new Date()
    todayName.innerHTML=todayDate.toLocaleDateString('en-us',{weekday:'long'})
    todayNumber.innerHTML=todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})

    place.innerHTML=data.location.name;
    temperature.innerHTML=data.current.temp_c +`<sup>o</sup>C`;
    currentImg.setAttribute("src",'https:'+data.current.condition.icon);
    currenttext.innerHTML=data.current.condition.text
    umbrella.innerHTML=data.current.humidity+'%';
    wind.innerHTML=data.current.wind_kph+'km/h';
    windDirction.innerHTML='<i class="fa-regular fa-compass fa-lg"></i>'+data.current.wind_dir;




}
// ****************************************************

function displayNextData(data)
{
    let forecastData = data.forecast.forecastday[0]
    let nextData= new Date(forecastData.date)
    console.log(nextData);
    nextDay.innerHTML = nextData.toLocaleDateString("en-US",{weekday:"long"})

    degree.innerHTML=forecastData.day.maxtemp_c+'<sup>o</sup>C'
    degreeSmall.innerHTML=forecastData.day.mintemp_c+'<sup>o</sup>C'
    lastText.innerHTML=forecastData.day.condition.text
    lastImg.setAttribute('src','https:'+forecastData.day.condition.icon)


    
    
}

// ****************************************************
function displayThree(data)
{
    let forecastData = data.forecast.forecastday[0]
    let nextData= new Date(forecastData.date)
    nextDay2.innerHTML = nextData.toLocaleDateString("en-US",{weekday:"long"})


    threedegree.innerHTML=forecastData.day.maxtemp_c+'<sup>o</sup>C'
    threedegreeSmall.innerHTML=forecastData.day.mintemp_c+'<sup>o</sup>C'
    threeText.innerHTML=forecastData.day.condition.text
    threeImg.setAttribute('src','https:'+forecastData.day.condition.icon)


    
    
}




// ****************************************************


async function displayAPP(city="london"){
  let currentdisplay= await getApi(city)
 
  if(!currentdisplay.error)
  {
    currentweather(currentdisplay)
    displayNextData(currentdisplay)
    displayThree(currentdisplay)
  }





}
displayAPP()