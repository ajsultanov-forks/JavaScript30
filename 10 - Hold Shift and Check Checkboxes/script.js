
// const items = document.querySelectorAll('.inbox input[type="checkbox"]')
const items = document.querySelectorAll('.item input');
items.forEach(item => item.addEventListener('click', handleCheck));

let lastChecked;

// let shifted = false;
// document.addEventListener('keydown', e => {
//   if (e.keyCode === 16) {
//     shifted = true;
//   }
// })
// document.addEventListener('keyup', e => {
//   if (e.keyCode === 16) {
//     shifted = false;
//   }
// })

function handleCheck(e) {
  let inBetween = false

  if (e.shiftKey && this.checked) {
    items.forEach(item => {
      if (item === this || item === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        item.checked = true;
      }
    })
  }

  lastChecked = this;
}

console.log(items);
