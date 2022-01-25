const shape = document.querySelectorAll(".shape");
const carousel = document.querySelector(".carousel-inner");
const header = document.querySelector(".fixed-top");
var run;
var fetchObject;

window.addEventListener("load", () => {
  page().then((result) => {
    run = result; 
    run.shapes().then((shapes) => {
      fetchObject = shapes;
      console.log(fetchObject);
      shapes.results.forEach((element, key) => {
        if (key == 0) {
          carousel.innerHTML += ` <div class="carousel-item active">
         <span class="align-middle">${element.name}</span>
        </div>`;
        } else {
          carousel.innerHTML += ` <div class="carousel-item">
        <span class="align-middle">${element.name}</span>
        </div>`;
        }
      });
      document.querySelectorAll(".align-middle").forEach((element) => {
        element.addEventListener("click", Species, { once: true });
      });
    });
  });
  carouselNextButton.addEventListener("click", (e) => {
    const index = run.carouselNextButton(fetchObject.results);
    const currentCarousel = document.querySelectorAll(".carousel-item");
    console.log(currentCarousel[currentCarousel.length - 1].classList);
    console.log(currentCarousel[index]);
    currentCarousel[
      index !== 0 ? index - 1 : currentCarousel.length - 1
    ].classList.remove("active");
    currentCarousel[index].classList.add("active");
  });

  carouselPrevButton.addEventListener("click", (e) => {
    const index = run.carouselPrevButton(fetchObject.results);
    const currentCarousel = document.querySelectorAll(".carousel-item");
    console.log(currentCarousel[currentCarousel.length - 1].classList);
    console.log(currentCarousel[index]);
    currentCarousel[
      index == currentCarousel.length - 1 ? 0 : index + 1
    ].classList.remove("active");
    currentCarousel[index].classList.add("active");
  });
document.querySelector(".shape-header").style.marginTop = `${
  header.getBoundingClientRect().height
}px`;

});

console.log(carousel);
const carouselPrevButton = document.querySelector(".carousel-control-prev");
const carouselNextButton = document.querySelector(".carousel-control-next");
const species = document.getElementById("species");
const progress = document.querySelector(".progress-bar");
var speciesHeight = species.offsetTop;



function Species(e) {
  var url;
  fetchObject.results.find((index) => {
    if (index.name == e.target.textContent) {
      url = index.url;
    }
  });
  run.species(url).then((res) => {
    console.log(res);
    fetchObject = res
    console.log(fetchObject)
    const arr = []
    
    fetchObject.pokemon_species.forEach(element => {
      arr.push(element.name)
    });
    toHtml(arr);
 
    document
        .querySelectorAll(".btn")
        .forEach((element) => {
          element.addEventListener("click", varieties);
        });
   
    scroll(speciesHeight);
  });
  const breadcrumbs = document.querySelector("#shapes");
  breadcrumbs.classList.add("active");
  progress.style.width = '33%';
   progress.ariaValueNow='33';
  progress.innerHTML='33%'
}

const scroll = (height) => {
  
  const headerHeight = header.getBoundingClientRect().height;
  console.log(headerHeight)
  const position = height - headerHeight;
  console.log(height);
  window.scrollTo({
    left: 0,
    top: position,
  });
};

const img = document.getElementById("img");
function varieties(e) {
  var url;
  fetchObject.pokemon_species.find((index) => {
    if (index.name == e.target.dataset.name) {
      url = index.url;
      
    }
  });
  run.varieties(url).then((res) => {
    console.log(res);
    var arr = [];
    const data = [];
    for (const iterator in res) {
      if (res[iterator] !== null && typeof res[iterator] !== "object") {
        arr.push(`<img src="${res[iterator]}" class="card-img-top" alt="...">`);
        data.push(`${iterator}`);
      }
       
    }
    toHtml(arr,data)
  });
  const breadcrumbs = document.querySelector("#Species");
  breadcrumbs.classList.add("active");
  progress.style.width = "66%";
  progress.ariaValueNow='66'
  progress.innerHTML = "66%";
}



function toHtml(arr,data) {
   const html = arr.reduce((array, element,index) => {
     array.push(`<div class="col-sm-2 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${element}</h5>
        <button type="button" class="btn btn-outline-primary" data-name="${data==undefined?element:data[index]}">select</button>
      </div>
    </div>
    </div>`);
     return array;
   }, []);
  species.innerHTML = html.join("");
}