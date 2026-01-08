// use XML httpRequest
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});
// xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.open('GET', 'https://supersimplebackend.dev/products/404');
xhr.send(); // like click a button
//take time to get a response
// xhr.response