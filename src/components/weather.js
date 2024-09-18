const myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("accept-language", "en-US,en;q=0.9");
myHeaders.append("origin", "https://edition.cnn.com");
myHeaders.append("priority", "u=1, i");
myHeaders.append("referer", "https://edition.cnn.com/");
myHeaders.append("sec-ch-ua", "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
myHeaders.append("sec-fetch-dest", "empty");
myHeaders.append("sec-fetch-mode", "cors");
myHeaders.append("sec-fetch-site", "cross-site");
myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
myHeaders.append("x-apihub-key", "NAXE81koS7NCfG6x76kF34UvNdHsy3KUizVZzbJRsO0l1Mng3m");
myHeaders.append("x-apihub-host", "Weather-API.allthingsdev.co");
myHeaders.append("x-apihub-endpoint", "175f72ec-0ec4-4986-bbc6-b098d29b8200");

const requestOptions = {
   method: "POST",
   headers: myHeaders,
   redirect: "follow"
};

// Function to fetch weather based on city name
export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`https://Weather-API.proxy-production.allthingsdev.co/weather/citySearch?search_term=${city}`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.message || 'Error fetching data');
  }
};

// Function to fetch weather based on latitude and longitude
export const fetchWeatherByLocation = async (latitude, longitude) => {
  // Construct the API URL dynamically with latitude and longitude
  const url = `https://Weather-API.proxy-production.allthingsdev.co/weather/getForecast?latitude=${latitude}&longitude=${longitude}&unit=celsius`;

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result; // Optionally return the result to be used by the caller
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};
