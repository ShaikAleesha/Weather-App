// ✅ Function to check weather of a given city
const checkWeather = async (name) => {

    // Your API key from OpenWeatherMap
    const apiid = "f2d4edb862df587b14bf325bf03f94a6";

    // API URL with city name and metric units (Celsius)
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiid}`

    // Fetching weather data from API
    const res = await fetch(apiurl);

    // Converting response to JSON
    const data = await res.json();

    // For debugging: log the data in console
    console.log(data);

    // If city is not found (API returns code "404")
    if (data.cod === "404") {
        document.getElementById("err").style.display = "block"; // Show error message
        return;
    } else {
        document.getElementById("err").style.display = "none"; // Hide error message if valid city
    }

    // ✅ Update UI with data from API

    // Update country/city name
    document.querySelector("#country").innerHTML = data.name;

    // Update temperature (rounded value)
    document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";

    // Update weather description (e.g., "clear sky")
    document.querySelector(".des").innerHTML = data.weather[0].description;

    // Update humidity percentage
    document.querySelector(".hum").innerHTML = data.main.humidity + "%";

    // Update wind speed
    document.querySelector(".speed").innerHTML = data.wind.speed + "km/hr";

    // ✅ Dynamically change weather image based on main weather condition
    const weatherMain = data.weather[0].main.toLowerCase(); // e.g., "clouds", "rain"
    const weatherImg = document.querySelector(".center img"); // Get image element

    // Choose image based on condition
    if (weatherMain.includes("cloud")) {
        weatherImg.src = "imgs/clouds.png";
    } else if (weatherMain.includes("rain")) {
        weatherImg.src = "imgs/rain.png";
    } else if (weatherMain.includes("clear")) {
        weatherImg.src = "imgs/clear.png";
    } else if (weatherMain.includes("snow")) {
        weatherImg.src = "imgs/snow.png";
    } else if (weatherMain.includes("mist") || weatherMain.includes("haze")) {
        weatherImg.src = "imgs/mist.png";
    } else {
        weatherImg.src = "imgs/clouds.png"; // Fallback/default image
    }
};

// ✅ Add event listener to button for user search
document.querySelector(".navBar button").addEventListener("click", () => {

    // Get value entered in input box
    const location = document.querySelector(".navBar input").value;

    // Call checkWeather function with entered city

    checkWeather(location);
});

// ✅ Show weather for Germany when page loads by default
checkWeather("Germany");
