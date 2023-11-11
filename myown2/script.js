document.addEventListener('DOMContentLoaded', function () {
  var commonAncestor = document.getElementById('your-common-ancestor'); // Replace with the actual common ancestor element

  // Your carousel code
  function initializeCarousel() {
    var radius = 240; // how big is the radius
    var autoRotate = true; // auto rotate or not
    var rotateSpeed = -60; // unit: seconds/360 degrees
    var imgWidth = 120; // width of images (unit: px)
    var imgHeight = 170; // height of images (unit: px)
    var zoomLevel = 1.0; // Initial zoom level
    var maxZoomLevel = 2.0; // Maximum allowed zoom level
    var minZoomLevel = 0.5; // Minimum allowed zoom level
    var zoomIncrement = 0.1; // Zoom level increment

    // Link to background music - set to 'null' if you don't want to play background music
    var bgMusicURL = null;

    // Animation starts after 1000 milliseconds
    setTimeout(init, 1000);

    var odrag = commonAncestor.querySelector('#drag-container');
    var ospin = commonAncestor.querySelector('#spin-container');
    var aImg = ospin.querySelectorAll('img');
    var aVid = ospin.querySelectorAll('video');
    var aEle = [...aImg, ...aVid]; // combine 2 arrays

    // Size of images
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";

    // Size of the ground - depends on radius
    var ground = commonAncestor.querySelector('#ground');
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";

    function init(delayTime) {
      for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
      }
    }

    function applyTransform(obj) {
      // Constrain the angle of the camera (between 0 and 180)
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;

      // Apply the angle and zoom
      obj.style.transform = `scale(${zoomLevel}) rotateX(${(-tY)}deg) rotateY(${tX}deg)`;
    }

    function playSpin(yes) {
      ospin.style.animationPlayState = (yes ? 'running' : 'paused');
    }

    var sX, sY, nX, nY, desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

    // Auto spin
    if (autoRotate) {
      var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    // Add background music
    // ...

    // Setup events
    commonAncestor.onpointerdown = function (e) {
      clearInterval(odrag.timer);
      e = e || window.event;
      var sX = e.clientX,
          sY = e.clientY;

      this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;
      };

      this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);
        this.onpointermove = this.onpointerup = null;
      };

      return false;
    };

    /*document.onmousewheel = function(e) {
      e = e || window.event;
      var d = e.wheelDelta / 20 || -e.detail;
      radius += d;
      init(1);
    };*/

    // Zoom in and zoom out buttons
    commonAncestor.querySelector('#zoom-in-button').addEventListener('click', function() {
      zoomLevel += zoomIncrement;
      applyTransform(odrag);
    });

    commonAncestor.querySelector('#zoom-out-button').addEventListener('click', function() {
      zoomLevel -= zoomIncrement;
      applyTransform(odrag);
    });

    var imageElement = commonAncestor.querySelector("#redirectImage1");

    // Add a click event listener to the image
    imageElement.addEventListener("click", function() {
        window.location.href = "https://mdzak09.github.io/portfolio/my1.html";
    });
    var imageElement = commonAncestor.querySelector("#redirectImage2");
    imageElement.addEventListener("click", function() {
      window.location.href = "https://github.com/Mdzak09/cyber-hawk.git";
    });
    var imageElement = commonAncestor.querySelector("#redirectImage3");
    imageElement.addEventListener("click", function() {
      window.location.href = "https://github.com/Mdzak09/rat-in-maze_python-project.git";
    });
    var imageElement = commonAncestor.querySelector("#redirectImage4");
    imageElement.addEventListener("click", function() {
      window.location.href = "https://github.com/Mdzak09/hangman-game.git";
    });
    var imageElement = commonAncestor.querySelector("#redirectImage5");
    imageElement.addEventListener("click", function() {
      window.location.href = "https://github.com/Mdzak09/PivotTablesAndGraphs.git";
    });
    var imageElement = commonAncestor.querySelector("#redirectImage6");
    imageElement.addEventListener("click", function() {
      window.location.href = "https://qrguide.onrender.com/";
    });
  }
  
  // Call the initialization function for the 3D carousel
  initializeCarousel();

  // Your form code

  // Call the initialization function for the 3D carousel
  initializeCarousel();
});





document.addEventListener('DOMContentLoaded', function () {
// document.getElementById('contact-form').addEventListener('submit',function(event) {
//   event.preventDefault(); // Prevent form from submitting

//   // Retrieve form values
//   var name = document.getElementById("Name").value;
//   var phone = document.getElementById("phone").value;
//   var message = document.getElementById("message").value;
//   var rating = document.getElementById("rating-value").value;

//   // Validate phone number
//   var phoneRegex = /^(\+?91\s?|0?\s?|91\s?)?[6789]\d{9}$/;
//   var phoneError = document.getElementById("phone-error");
//   if (!phoneRegex.test(phone)) {
//     phoneError.textContent = "Invalid phone number. Please enter a valid Indian phone number.";
//     return; // Stop form submission
//   } else {
//     phoneError.textContent = "";
//   }

//   // Validate if any field is empty
//   var formFields = [name, phone, message];
//   for (var i = 0; i < formFields.length; i++) {
//     if (formFields[i] === "") {
//       alert("Please fill in all fields");
//       return; // Stop form submission
//     }
//   }

//   // Print form values to the console
//   console.log("Name: " + name);
//   console.log("Phone Number: " + phone);
//   console.log("Message: " + message);
//   console.log("Rating: " + rating);

//   var value = [name, phone, message, rating].join(','); 
//   document.cookie = 'keys='+value;

//   // Reset the form
//   document.getElementById("contact-form").reset()
//   resetStarRating();
// });

// Star rating functionality
var stars = document.getElementsByClassName("star");
var starRating = document.getElementById("star-rating");
var ratingValue = document.getElementById("rating-value");
var ratingCount = document.querySelector(".rating-count");

for (var i = 0; i < stars.length; i++) {
  stars[i].addEventListener("click", function(event) {
    var selectedRating = event.target.getAttribute("data-rating");

    // Update star colors based on selected rating
    for (var j = 0; j < stars.length; j++) {
      if (j < selectedRating) {
        stars[j].textContent = "★";
        stars[j].classList.add("rating");
      } else {
        stars[j].textContent = "☆";
        stars[j].classList.remove("rating");
      }
    }

    // Update the rating value input field
    ratingValue.value = selectedRating;

    // Update the rating count
    ratingCount.textContent = "(" + selectedRating + " rating" + (selectedRating > 1 ? "s" : "") + ")";
  });
}

// Function to reset star ratings
function resetStarRating() {
  for (var i = 0; i < stars.length; i++) {
    stars[i].textContent = "☆";
    stars[i].classList.remove("rating");
  }
  ratingValue.value = '0';
  ratingCount.textContent = "(0 ratings)";
}

});





var socialMediaImages = document.querySelectorAll('.social-media img');

socialMediaImages.forEach(function(img) {
 img.addEventListener('touchstart', function() {
   img.classList.add('active');
 });

 img.addEventListener('touchend', function() {
   img.classList.remove('active');
 });
});
const sliderContainer = document.querySelector('.slidercontainer');
const galleryControlsContainer = document.querySelector('.controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.g');

class Carousel {
 constructor(container, items, controls) {
   this.carouselContainer = container;
   this.carouselControls = controls;
   this.carouselArray = [...items];
 }

 updateGallery() {
   this.carouselArray.forEach((el) => {
     el.classList.remove('g1');
     el.classList.remove('g2');
     el.classList.remove('g3');
     el.classList.remove('g4');
     el.classList.remove('g5');
   });
   this.carouselArray.slice(0, 5).forEach((el, i) => {
     el.classList.add(`g${i + 1}`);
   });
 }

 setCurrentState(direction) {
   if (direction.className === 'controls-previous') {
     this.carouselArray.push(this.carouselArray.shift());
   } else {
     this.carouselArray.unshift(this.carouselArray.pop());
   }
   this.updateGallery();
 }

 setControls() {
   this.carouselControls.forEach((control) => {
     galleryControlsContainer.appendChild(document.createElement('button')).className = `controls-${control}`;
     document.querySelector(`.controls-${control}`).innerText = control;
   });
 }

 useControls() {
   const triggers = [...galleryControlsContainer.childNodes];
   triggers.forEach((control) => {
     control.addEventListener('click', (e) => {
       e.preventDefault();
       this.setCurrentState(control);
     });
   });
 }
}

const exampleCarousel = new Carousel(sliderContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();










/*const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('active');
        const closeBtn = document.getElementById('closeBtn');
        if (navbar.classList.contains('active')) {
            closeBtn.style.display = 'block'; // Show the close button when the menu is open
        } else {
            closeBtn.style.display = 'none'; // Hide the close button when the menu is closed
        }
    });

    function closeHamburger() {
        navbar.classList.remove('active');
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.style.display = 'none'; // Hide the close button
        }
    
    const typed = new Typed('.multiple-text',{
        strings:['Full-stack Developer','Ethical Hacker','Data Analyst'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    });*/










document.addEventListener('DOMContentLoaded', function () {

const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('active');
        const closeBtn = document.getElementById('closeBtn');
        if (navbar.classList.contains('active')) {
            closeBtn.style.display = 'block'; // Show the close button when the menu is open
        } else {
            closeBtn.style.display = 'none'; // Hide the close button when the menu is closed
        }
    });

    function closeHamburger() {
        navbar.classList.remove('active');
        const closeBtn = document.getElementById('closeBtn');
        closeBtn.style.display = 'none'; // Hide the close button
        }
    
    const typed = new Typed('.multiple-text',{
        strings:['Full-stack Developer','Ethical Hacker','Data Analyst'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
    });




    $(".option").click(function(){
   $(".option").removeClass("active");
   $(this).addClass("active");
   
});

});


