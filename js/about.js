// -----------------
// ON-SCROLL EFFECTS
// -----------------

window.addEventListener('load', revealOnLoad);
window.addEventListener('scroll', reveal);

function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function reveal(){
  var reveals = document.querySelectorAll('.highlight');

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('shown');
    } else {
      reveals[i].classList.remove('shown');
    }
  }
}

function revealOnLoad(){
  var revealsOnLoad = document.querySelectorAll('.highlight');

  for (var i = 0; i < revealsOnLoad.length; i++) {
    if (isInViewport(revealsOnLoad[i])) {
      revealsOnLoad[i].style.cssText += 'transition-delay:' + (i/2) + 's';
      revealsOnLoad[i].classList.add('shown');
    }
  }
}


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
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  scrollEnabled = true;
}