document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const plot = urlParams.get("plot");
  const rating = urlParams.get("rating");
  const poster = urlParams.get("poster");

  if (title && plot && rating && poster) {
    document.body.style.backgroundImage = `url(${poster})`;
    document.getElementById("movie-title").textContent = title;
    document.getElementById("movie-rating").innerHTML =
      generateStarRating(rating);
    document.getElementById("movie-plot").textContent = plot;
    document.getElementById("movie-poster").src = poster;
  } else {
    window.location.href = "index.html";
  }

  function generateStarRating(rating) {
    const roundedRating = Math.round(parseFloat(rating) / 2);
    let stars = "";
    for (let i = 0; i < roundedRating; i++) {
      stars += '<span style="font-size: 38px;">&#9733;</span>';
    }
    for (let i = roundedRating; i < 5; i++) {
      stars += '<span style="font-size: 38px;">&#9734;</span>';
    }
    return stars;
  }

  document.getElementById("back-home").addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
