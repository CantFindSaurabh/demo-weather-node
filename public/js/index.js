const input = document.querySelector("#inputLocation");
const output= document.querySelector("#output-text");
const getWeather = async (e) => {
    e.preventDefault();
    try {

        const value = input.value;
        const response = await fetch('http://localhost:4000/weather?address=' + encodeURIComponent(value));
        if (!response.ok) {
            throw new Error('Server not working');
        }
        const data = await response.json()
        if (data.error) {
            throw new Error(data.error);
        }
        output.innerText=`Currently it is ${data.forecast.temp_c} and it is ${data.forecast.condition.text} in ${data.location}`;
        console.log(data);
    } catch (e) {
        output.innerText=e.message
    }
}