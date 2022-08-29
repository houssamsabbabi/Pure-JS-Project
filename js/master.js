// Start Setting window
let colorsIcon = document.querySelectorAll(".setting-option ul li");
let randomBtn = document.querySelectorAll(
  ".landing-page .setting-option .setting-options span"
);
let localCol = window.localStorage.getItem("them-color");
let backgorundOpt = window.localStorage.getItem("background-option");
let landingImg = document.querySelector(".landing-page");
let randombackground = true;
let randomBgBtn;
let gearIcon = document.querySelector(".gear-container");
let settingNav = document.querySelector(".setting-option");
//cheking if there is colors in local storage/ if yes put it as them color and update colors list with active class
//we apply the same for yes and no buttons (we checked if the random background in local storage), if yes we put the active class in to the latest clicked button
// we check also the data set if it yes run the background function if not we stop it
if (localCol) {
  document.documentElement.style.setProperty("--main-color", localCol);
  if (backgorundOpt) {
    if (backgorundOpt === "yes") {
      randomBtn.forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.bg === "yes") {
          e.classList.add("active");
          randombackground = true;
          randomBackground();
        }
      });
    } else {
      randomBtn.forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.bg === "no") {
          e.classList.add("active");
          randombackground = false;
          clearInterval(randomBgBtn);
        }
      });
    }
  }
  colorsIcon.forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === localCol) {
      el.classList.add("active");
    }
  });
}
// changing the backgorund image every 10 second
function randomBackground() {
  if (randombackground) {
    randomBgBtn = setInterval(() => {
      let num = Math.floor(Math.random() * 5 + 1);
      landingImg.style.backgroundImage =
        "url('images/landing-" + num + ".jpeg')";
    }, 10000);
  }
}
randomBackground();

gearIcon.addEventListener("click", () => {
  document.querySelector(".gear-container i").classList.toggle("fa-spin");
  settingNav.classList.toggle("toggle");
});
// changing the them color option and set it in to local storage
// remove all active classes from all colors list & add it to the cliked one
colorsIcon.forEach((el) => {
  el.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.getAttribute("data-color")
    );
    window.localStorage.setItem(
      "them-color",
      e.target.getAttribute("data-color")
    );
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
// remove the active class from both yes and no span button and add it to the clicked one.
randomBtn.forEach((ele) => {
  ele.addEventListener("click", (btn) => {
    btn.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    btn.target.classList.add("active");
    window.localStorage.setItem("background-option", btn.target.dataset.bg);
    if (btn.target.dataset.bg === "yes") {
      randombackground = true;
      randomBackground();
    } else {
      randombackground = false;
      clearInterval(randomBgBtn);
    }
  });
});
// bullets appearance option
randomBtn.forEach((ele) => {
  ele.addEventListener("click", () => {
    window.localStorage.setItem("bullets", ele.dataset.bullet);
    document.querySelector(".bullets-container").style.display =
      ele.dataset.bullet;
  });
});

if (window.localStorage.getItem("bullets")) {
  document.querySelector(".bullets-container").style.display =
    window.localStorage.getItem("bullets");
  randomBtn.forEach((e) => {
    if (e.dataset.bullet === window.localStorage.getItem("bullets")) {
      e.classList.add("active");
    }
  });
}
// reset button
let resetBtn = document.querySelector(".reset-options");
resetBtn.addEventListener("click", () => {
  window.localStorage.clear();
  window.location.reload();
});
// End setting window
// Start our skills
let skills = document.querySelector(".skills-container");

window.onscroll = function () {
  let skillsOffSet = skills.offsetTop;
  let skillsHeight = skills.offsetHeight;
  let windowHeight = window.innerHeight;

  if (window.pageYOffset > skillsOffSet + skillsHeight - windowHeight) {
    let skillPercent = document.querySelectorAll(
      ".skill-container .skill-level span"
    );
    skillPercent.forEach((e) => {
      e.style.width = e.dataset.skill;
    });
  }
};
// End our skills
// Start gallery
let galleryImgs = document.querySelectorAll(
  ".gallery-container .img-gallery-container img"
);

galleryImgs.forEach((image) => {
  image.addEventListener("click", () => {
    let pageOverlay = document.createElement("div");
    pageOverlay.className = "overlay";

    let imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    let clickedImage = document.createElement("img");
    clickedImage.src = image.src;
    if (image.alt !== "") {
      let imageAlt = document.createElement("p");
      imageAlt.className = "image-alternate";
      imageAlt.appendChild(document.createTextNode(image.alt));
      imgContainer.appendChild(imageAlt);
    }
    imgContainer.appendChild(clickedImage);
    pageOverlay.appendChild(imgContainer);
    document.body.appendChild(pageOverlay);

    let closeBtn = document.createElement("div");
    closeBtn.appendChild(document.createTextNode("X"));
    closeBtn.className = "close-btn";
    imgContainer.appendChild(closeBtn);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn" || e.target.className === "overlay") {
    let btnContainer = document.querySelector(".overlay");
    btnContainer.remove();
  }
});
// End gallery
// Start bullets & nav scroll
function scroll(ele) {
  ele.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.container).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}
let bullets = document.querySelectorAll(".bullets-container .bullet");
let navBar = document.querySelectorAll(".nav li a");
scroll(bullets);
scroll(navBar);
// End bullets & nav scroll
// start menu click event
let menuIcon = document.querySelector(".menu");
let menuLinks = document.querySelector(".landing-page .container .nav");

menuIcon.addEventListener("click", (e) => {
  e.target.parentElement.classList.toggle("hide");
  menuLinks.classList.toggle("block");
});
document.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("fa-bars") &&
    !e.target.parentElement.classList.contains("check")
  ) {
    if (!menuLinks.classList.contains("block")) {
      menuLinks.classList.toggle("block");
      menuIcon.classList.toggle("hide");
    }
  }
});
// end menu click event
//footer date 
let todayDate = new Date()
let spanDate = document.querySelector(".footer-date");
spanDate.appendChild(document.createTextNode(todayDate.getFullYear()));

