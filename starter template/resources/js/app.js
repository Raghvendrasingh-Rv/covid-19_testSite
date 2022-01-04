/* ---------------------------------------------- */
/*            CODE EXPLAINED TUTORIALS            */
/*         www.youtube.com/CodeExplained          */
/* ---------------------------------------------- */

//select all element
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

//app variable
let app_data = [],
	cases_list = [],
	recovered_list = [],
	deaths = [],
	dates = [];

// get user country code
let country_code = geoplugin_countryCode();

let user_country;

country_list.forEach(country => {
	if (country.code == country_code) {
		user_country = country.name;
	}
});

console.log(user_country);
/* ---------------------------------------------- */
/*                API URL AND KEY                 */
/* ---------------------------------------------- */
function fetchData(country_name) {
	fetch("https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=India", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e41c128a02mshedc47527fe4f0f5p1fdb1ejsn637259e56be5",
		"x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com"
	}
})
	.then(response => { return response.json();
	
	}).then(data => {
		dates = Object.keys(data);
		console.log(data);
		dates.forEach(date => {
			let DATA = data[date];

			app_data.push(DATA);
			cases_list.push(parseInt(DATA.total_cases.replace(/,/g,"")));
			recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g,"")));
			deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g,"")));
		})
	})
	.then(()=>{
		updateUI();
	}).catch(error =>{
		alert(error)
	})
}

fetchData(user_country);

// update UI
function updateUI(){
	updateStats();
	axesLinearChart();
}

function updateStats(){
	let last_entry = app_data[app_data.length-1];  // present date
	let before_last_entry = app_data[app_data.length-2];  // past date

	country_name_element.innerHTML = last_entry.country_name;
	total_cases_element.innerHTML =last_entry.total_cases ||0;
	new_cases_element.innerHTML = `+${last_entry.new_cases || 0}`;
	recovered_element.innerHTML = last_entry.total_recovered ||0;
	new_recovered_element.innerHTML =  `+${parseInt(last_entry.total_recovered.replace(/,/g,""))- parseInt(before_last_entry.replace(/,/g,""))}`;
	deaths_element.innerHTML = last_entry.total_deaths ||0;
	new_deaths_element.innerHTML = `+${last_entry.new_deaths ||0 }`;
}

//update chart 

let my_
