const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";

const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/sunset.png") {
    myImage.setAttribute("src", "images/night.jpg");
  } else {
    myImage.setAttribute("src", "images/sunset.png");
  }
};