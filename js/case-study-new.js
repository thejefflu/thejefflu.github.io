// -----------------
// ON-SCROLL EFFECTS
// -----------------

window.addEventListener('scroll', reveal);

function reveal(){
  var reveals = document.querySelectorAll('.highlight,.subcontainer,.title-small,h1,h2,.specs,.banner,.button');

  for (var i = 0; i < reveals.length; i++) {  
    var revealTop = reveals[i].getBoundingClientRect().top;

    if (revealTop < window.innerHeight - 50) {
      reveals[i].classList.add('shown');
    } else {
      reveals[i].classList.remove('shown');
    }
  }
}


// -----------------
// SMOOTH SCROLLING
// -----------------

function smoothScroll(target, duration) {
  navMenu.checked = false;
  target = document.querySelector(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.scrollY;
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

var nav0 = document.querySelector('.nav-top');
nav0.addEventListener('click', function() {
  smoothScroll('.scroll-helper-top', 1500);
});

var nav1 = document.querySelector('.nav-brief');
nav1.addEventListener('click', function() {
  smoothScroll('.scroll-helper-brief', 1500);
});

var nav2 = document.querySelector('.nav-research');
nav2.addEventListener('click', function() {
  smoothScroll('.scroll-helper-research', 1500);
});

var nav3 = document.querySelector('.nav-process');
nav3.addEventListener('click', function() {
  smoothScroll('.scroll-helper-process', 1500);
});

var nav4 = document.querySelector('.nav-testing');
nav4.addEventListener('click', function() {
  smoothScroll('.scroll-helper-testing', 1500);
});

var nav5 = document.querySelector('.nav-designs');
nav5.addEventListener('click', function() {
  smoothScroll('.scroll-helper-designs', 1500);
});

var nav6 = document.querySelector('.nav-impact');
nav6.addEventListener('click', function() {
  /* compute the height of the about section, plus the height of the nav bar (without any padding it might have) */
  let about = document.querySelector('.impact');
  let nav = document.querySelector('.nav');
  let navStyle = getComputedStyle(nav);
  let navHeight = document.querySelector('.nav').offsetHeight - parseFloat(navStyle.paddingTop);

  let aboutHeight = about.offsetHeight + navHeight;

  let viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  if (aboutHeight >= viewportHeight) {
    smoothScroll('.scroll-helper-impact', 1500);
  } else {
    smoothScroll('.scroll-helper-bottom', 1500);
  }
});

var nav7 = document.querySelector('.nav-designs2');
nav7.addEventListener('click', function() {
  smoothScroll('.scroll-helper-designs', 1500);
});


// -----------------
// DYNAMIC HEADER
// -----------------
var navMenu = document.getElementById("nav-menu");

window.addEventListener("scroll", function() {
  var navBar = document.getElementById("nav");
  navBar.classList.toggle("sticky", window.scrollY > 0);
})


// -----------------
// SCROLL PREVENTION
// -----------------

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


var scrollEnabled = true;

function toggleScroll() {
  if (scrollEnabled) {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    scrollEnabled = false;
  } else {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    scrollEnabled = true;
  }
  console.log(scrollEnabled);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  scrollEnabled = true;
}