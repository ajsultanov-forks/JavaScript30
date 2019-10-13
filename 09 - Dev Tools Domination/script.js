const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('hello');

// Interpolated
console.log('hello im %s string', 'bleh');

const thingy = "wow"
console.log(`hello im a ${thingy}`);

// Styled
console.log('%c >>interesting', 'font-size:25px');

// warning!
console.warn("oh noooo")

// Error :|
console.error("crap!!")

// Info
console.info('this only works in firefox')

// Testing
console.assert(1 === 1, "hmmmm")        // <-- wont show if expression is true

let para = document.querySelector("p")
console.assert(para.classList.contains('ouchie'), 'wrong wrong wrong')

// clearing
console.clear()

// Viewing DOM Elements
console.dir(para);

// Grouping together
dogs.forEach(d => {
  console.group(`${d.name}`)
  console.log(`this is ${d.name}`);
  console.log(`age is ${d.age}`);
  console.log(`thats ${d.age * 7} in dog years`);
  console.groupEnd(`${d.name}`)
});

// counting
console.count('dog');

// timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
  })
