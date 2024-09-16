document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.getElementById("swiper-wrapper");
  const apiKey = "8eac0ca3";
  const page = 1;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&page=${page}&type=movie`;
  const movieQuantity = 9;
  let movies = [];

  const fetchData = async () => {
    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      if (data.Response === "True") {
        movies = data.Search;
        getMovies();
      } else {
        console.error("Response is false:", data.Error);
      }
    } catch (error) {
      console.error("Failed to receive data:", error);
    }
  };

  async function getMovies() {
    for (const movie of movies.slice(0, movieQuantity)) {
      const movieData = await movieDetails(movie.imdbID);
      const truncatedPlot = truncateText(movieData.Plot, 120);
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `
          <div class="card">
            <img class="movieImg" src="${movie.Poster}" alt="${movie.Title}">
            <div class="movieInfo">
              <h2 class="ratedMovieTitle">${movie.Title}</h2>
              <p class="stars">${generateStarRating(movieData.imdbRating)}</p>
              <p class="releaseDate">${movieData.Released}</p>
              <p class="newTabPlot">${truncatedPlot}</p>
              <p class="rating">${movieData.imdbRating}</p>
            </div>
          </div>`;
      if (movieData.imdbRating > 6) {
        swiperWrapper.appendChild(slide);
      }
    }

    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      },
    });
  }

  async function movieDetails(imdbID) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  }

  fetchData();

  function generateStarRating(rating) {
    const roundedRating = Math.round(parseFloat(rating) / 2);
    let stars = "";
    for (let i = 0; i < roundedRating; i++) {
      stars += '<span style="font-size: 24px;">&#9733;</span>';
    }
    for (let i = roundedRating; i < 5; i++) {
      stars += '<span style="font-size: 24px;">&#9734;</span>';
    }
    return stars;
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  }
  const backHome = document.querySelector(".onClick");
  backHome.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
