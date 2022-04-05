("use strict");

let to_date = new Date();
let from_date = new Date();
from_date.setDate(from_date.getDate() - 10);

const generateImages = function (API_KEY, to_date, from_date) {
  $.getJSON(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formatDate(from_date)}&end_date=${formatDate(to_date)}`,
    function (data) {
      for (let i = data.length - 2; i >= 0; i--) {
        $("body").append(`<div class="image"></div>`);
        if (data[i].media_type === "image") {
          $(`div`).last().append(`<img src="${data[i].hdurl}"> </img>`);
        } else {
          $(`div`).last().append(`<iframe src="${data[i].url}"></iframe>`);
        }
        $(`div`).last().append(`<div class="title_like ${i}"></div>`);
        $(`div:last-child div`).append(
          `<h2> ${data[i].title}: ${data[i].date}</h2>`
        );
        $(`div:last-child div`).append(
          `<img src="./empty_heart.png" class="like"></img>`
        );
        $(`div.image:last-child`).append(`<p> ${data[i].explanation} </p>`);
      }
      $("body").append(
        `<load class="loading"><p class="l"></p><p class="m"></p><p class="r"></p></load>`
      );
      const like_button = document.querySelectorAll(".like");

      for (let i = 0; i < like_button.length; i++)
        like_button[i].addEventListener("click", function () {
          like_button[i].src = like_button[i].src.includes("empty_heart.png")
            ? "../pink_heart.png"
            : "../empty_heart.png";
        });
      let loading = document.querySelectorAll("load");
      if (loading.length - 2 >= 0) {
        loading[loading.length - 2].classList.add("remove");
      }
    }
  );
}

const formatDate = function (date) {
  return date.toISOString().split("T")[0];
};

const API_KEY = JSON.parse($('#variableJSON').text());
$('#variableJSON').remove();

generateImages(API_KEY, to_date, from_date);

const nearToBottom = 200;

$(window).scroll(function () {
  if (
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.scrollingElement.scrollHeight
  ) {
    to_date.setDate(to_date.getDate() - 10);
    from_date.setDate(from_date.getDate() - 10);

    generateImages(API_KEY, to_date, from_date);
  }
});
