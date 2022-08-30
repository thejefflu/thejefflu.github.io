function smoothScroll(target, duration) {
  navMenu.checked = false;
  target = document.querySelector(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let startTime = null;

  function animation(currentTime) {
      if(startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;

      let run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t*t + b;
      t -= 2;
      return -c/2 * (t*t*t*t - 2) + b;
  };
          
  requestAnimationFrame(animation);
}

function menuOff() {
  navMenu.checked = false;
}

var nav1 = document.querySelector('.nav-hero');
nav1.addEventListener('click', function() {
  smoothScroll('.scroll-helper-top', 2000);
});

var nav2 = document.querySelector('.nav-work');
nav2.addEventListener('click', function() {
  smoothScroll('.scroll-helper-top', 2000);
});

var nav4 = document.querySelector('.nav-about');
nav4.addEventListener('click', function() {
  smoothScroll('.scroll-helper-about', 2000);
});

var nav5 = document.querySelector('.nav-contact');
nav5.addEventListener('click', function() {
  console.log('h');
  smoothScroll('.scroll-helper-contact', 2000);
});

var navMenu = document.getElementById("nav-menu");

window.addEventListener("scroll", function() {
  var navBar = document.getElementById("nav");
  navBar.classList.toggle("sticky", window.scrollY > 0);
})