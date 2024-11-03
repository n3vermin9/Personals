import { peoples } from './peoples.js';

const input = document.querySelector('input');
const autocomplete = document.querySelector('.autocomplete');
const btn = document.querySelector('#btn');

const container = document.querySelector('.container');
const containerRight = document.querySelector('.container-right');

const person = document.querySelector('#person');
const age = document.querySelector('#age');
const gender = document.querySelector('#gender');
const ethnicity = document.querySelector('#ethnicity');
const country = document.querySelector('#country');
const city = document.querySelector('#city');
const occupation = document.querySelector('#occupation');

window.onload = function () {
  input.value = '';
};

function searchUp(name) {
try {
    const currentPerson = peoples.find(p => p.person === name);
    if (currentPerson) {
      person.innerText = `Name: ${currentPerson.person}`;
      age.innerText = `Age: ${currentPerson.age}`;
      gender.innerText = `Gender: ${currentPerson.gender}`;
      ethnicity.innerText = `Ethnicity: ${currentPerson.ethnicity}`;
      country.innerText = `Country: ${currentPerson.country}`;
      city.innerText = `City: ${currentPerson.city}`;
      occupation.innerText = `Occupation: ${currentPerson.occupation}`;
      container.classList.add('visible');
      containerRight.classList.add('visible');
    } else {
      container.classList.remove('visible');
      containerRight.classList.remove('visible');
    }
} catch (error) {
  console.log(error)
}
}

function resetInput(result) {
  autocomplete.innerText = result;
}

resetInput('Input name');

input.addEventListener('input', () => {
  let inputValue = input.value;
  if (inputValue.length === 0) {
    resetInput('Input name');
    container.classList.remove('visible');
    containerRight.classList.remove('visible');
    return;
  }

  const formattedName = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

  let foundElems = peoples.filter(obj => obj.person.toLowerCase().startsWith(formattedName.toLowerCase()));
  if (foundElems.length > 0) {
    let suggestions = foundElems.map(elem => elem.person);
    autocomplete.innerText = suggestions[0];
    console.log(suggestions)
    if (formattedName === suggestions[0]) {
      input.style.color = "green"
    }else{
      input.style.color = "white"
    }
    container.classList.remove('visible');
    containerRight.classList.remove('visible');
    let counter = 1
    searchUp(suggestions[0]);
    btn.addEventListener('click', ()=>{
      searchUp(foundElems[counter])
    })
  } else {
    resetInput('');
    container.classList.remove('visible');
    containerRight.classList.remove('visible');
  }
});


