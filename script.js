("use strict");

api_key = 'LgMSmaBZAb4Ob7M36pdmsrt9PlYXzbx1dUHbsnck'

const formatDate = function (date) {
  return date.toISOString().split("T")[0];
};

let to_date = new Date();
let from_date = new Date();
from_date.setDate(from_date.getDate() - 10);

$.getJSON(
  `https://api.nasa.gov/planetary/apod?api_key=${api_key}&start_date=${formatDate(
    from_date
  )}&end_date=${formatDate(to_date)}`,
  function (data) {
    for (let i = data.length - 1; i >= 0; i--) {
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
        console.log(like_button[i].src);
        like_button[i].src = like_button[i].src.includes("empty_heart.png")
          ? "../pink_heart.png"
          : "../empty_heart.png";
      });
  }
);

const firstRun = true;

const nearToBottom = 200;
let loading;

$(window).scroll(function () {
  if (
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.scrollingElement.scrollHeight
  ) {
    console.log("Reached bottom!");

    to_date.setDate(to_date.getDate() - 10);
    from_date.setDate(from_date.getDate() - 10);

    $.getJSON(
      `https://api.nasa.gov/planetary/apod?api_key=LgMSmaBZAb4Ob7M36pdmsrt9PlYXzbx1dUHbsnck&start_date=${formatDate(
        from_date
      )}&end_date=${formatDate(to_date)}`,
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
          console.log(from_date, to_date, i);
        }
        $("body").append(
          `<load class="loading"><p class="l"></p><p class="m"></p><p class="r"></p></load>`
        );
        const like_button = document.querySelectorAll(".like");

        // let loading = $("load:nth-last-child(2)");

        for (let i = 0; i < like_button.length; i++)
          like_button[i].addEventListener("click", function () {
            console.log(like_button[i].src);
            like_button[i].src = like_button[i].src.includes("empty_heart.png")
              ? "../pink_heart.png"
              : "../empty_heart.png";
          });
        loading = document.querySelectorAll("load");

        loading[loading.length - 2].classList.add("remove");
      }
    );
  }
});
