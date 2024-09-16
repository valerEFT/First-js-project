document.addEventListener("DOMContentLoaded", () => {
  const topRatedContainer = document.getElementById("topRatedContainer");
  const apiKey = "8eac0ca3";
  const page = 1;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&page=${page}&type=movie`;
  const movieQuantity = 3;
  let movies = [];

  const fetchData = async () => {
    try {
      let response = await fetch(apiUrl);
      let data = await response.json();
      if (data.Response === "True") {
        movies = data.Search;
        getMovies();
      } else {
        console.error("Error fetching movie data:", data.Error);
      }
    } catch (error) {
      console.error("Failed to receive data:", error);
    }
  };

  function getMovies() {
    movies.slice(0, movieQuantity).forEach(async (movie) => {
      const movieData = await movieDetails(movie.imdbID);
      const truncatedPlot = truncateText(movieData.Plot, 120);
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img class="movieImg" src="${movie.Poster}" alt="${movie.Title}">
        <div class="movieInfo">
          <h2 class="ratedMovieTitle">${movie.Title}</h2>
          <p class="stars">${generateStarRating(movieData.imdbRating)}</p>
          <p class="releaseDate">${movieData.Released}</p>
          <p class="newTabPlot">${truncatedPlot}</p>
          <p class="rating">${movieData.imdbRating}</p>
        </div>`;
      topRatedContainer.appendChild(card);
      card.addEventListener("click", () => {
        const queryString = `?title=${encodeURIComponent(movie.Title)}
        &plot=${encodeURIComponent(movieData.Plot)}
        &rating=${encodeURIComponent(movieData.imdbRating)}
        &poster=${encodeURIComponent(movieData.Poster)}`;
        window.location.href = "TopRatedMovies.html" + queryString;
      });
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
  // search

  const results = document.getElementById("results");
  const searchInput = document.querySelector(".input");
  // movie-item

  searchInput.addEventListener("input", async () => {
    try {
      const receivedInput = searchInput.value.trim();
      const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${receivedInput}`;
      results.innerHTML = "";

      const response = await fetch(apiUrl);
      const data = await response.json();
      let movies = data.Search;
      movies.forEach(async (movie) => {
        try {
          const li = document.createElement("li");
          results.appendChild(li);
          li.classList.add("movieSearchItem");
          li.innerHTML = `<h3>${movie.Title}</h3>
          <img class="movieSearchImage" src="${movie.Poster}">
          `;
        } catch (error) {
          console.error("error receiving movie", error);
        }
      });
    } catch (error) {
      console.error("error fetchn data:", error);
    }
  });

  const topRated = document.querySelector(".onclick");
  topRated.addEventListener("click", () => {
    window.location.href = "swiper.html";
  });

  const menuToggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-btn");

  menuToggle.addEventListener("click", function () {
    document.body.classList.toggle("opened");
    menuToggle.classList.toggle("hidden");
  });

  closeBtn.addEventListener("click", function () {
    document.body.classList.remove("opened");
    menuToggle.classList.remove("hidden");
  });
});
