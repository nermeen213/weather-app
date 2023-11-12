
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
let lastImg =document.getElementsByClassName('lastImg');
let degree =document.getElementsByClassName('degree');
let degreeSmall =document.getElementsByClassName('degreeSmall');
let lastText =document.getElementsByClassName('lastText');
let nextDay =document.getElementsByClassName('nextday');
console.log(nextDay);
//***********************






// **********API*************

async function getApi(city){
   let respons= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eba9a04f9ea5464081d10706232908&q=${city}&days=3`)
    respons =await respons.json();
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
    todaymonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})

    place.innerHTML=data.location.name;
    temperature.innerHTML=data.current.temp_c +`<sup>o</sup>C`;
    currentImg.setAttribute("src",'https:'+data.current.condition.icon);
    currenttext.innerHTML=data.current.condition.text
    umbrella.innerHTML=data.current.humidity+`% <i class="fa-solid fa-umbrella fa-lg">`;
    wind.innerHTML=data.current.wind_kph+`km/h <i class="fa-solid fa-wind fa-lg">`;
    windDirction.innerHTML='<i class="fa-regular fa-compass fa-lg"></i>'+data.current.wind_dir;




}
// ****************************************************



function NextDay(data){
  let forecastData = data.forecast.forecastday
  
  
  
  for(let i=0 ; i<2 ;i++){
    let nextdata= new Date(forecastData[i+1].date)

    nextDay[i].innerHTML = nextdata.toLocaleDateString("en-US",{weekday:"long"})

    degree[i].innerHTML=forecastData[i+1].day.maxtemp_c+'<sup>o</sup>C'
    degreeSmall[i].innerHTML=forecastData[i+1].day.mintemp_c+'<sup>o</sup>C'
    lastText[i].innerHTML=forecastData[i+1].day.condition.text
    lastImg[i].setAttribute('src','https:'+forecastData[i+1].day.condition.icon)



  }

}




// ****************************************************


async function displayAPP(city="cairo"){
  let currentdisplay= await getApi(city)
 
  if(!currentdisplay.error)
  {
    currentweather(currentdisplay)
    NextDay(currentdisplay)
    
  }





}
displayAPP()