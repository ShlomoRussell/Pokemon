
async function page() {

async function getShapes(shapes) {
   await fetch("https://pokeapi.co/api/v2/pokemon-shape")
      .then((res) => res.json())
          .then((res) => (shapes = res));
      console.log(shapes)
    return shapes;
    }

    async function getSpecies(url) {
      await fetch(url)
        .then((res) => res.json())
        .then((res) => (url = res));
      return url;
  }
  
   async function getVarieties(url) {
     await fetch(url)
       .then((res) => res.json())
       .then((res) => res.varieties[0].pokemon.url)
       .then((res) => fetch(res)).then(res=>res.json()).then(res=>(url = res.sprites));
     return url;
   }

    var currentItem = 0;
    const getCarouselNextButton = (arr) => {
      currentItem++;
      if (currentItem > arr.length - 1) {
        currentItem = 0;
      }
      return currentItem;
    };
    
    const getcarouselPrevButton = (arr) => {
      currentItem--;
        if (currentItem < 0) {
          currentItem = arr.length - 1;
        }
      return currentItem;
    };

    
    return {
      shapes: getShapes,
      species: getSpecies,
      varieties:getVarieties,
      carouselNextButton: getCarouselNextButton,
      carouselPrevButton: getcarouselPrevButton,
    };
}
