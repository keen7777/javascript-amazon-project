// use XML httpRequest
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.open('GET', 'https://supersimplebackend.dev/hello');
// xhr.open('GET', 'https://supersimplebackend.dev/products/first');
// xhr.open('GET', 'https://supersimplebackend.dev/products/404');
// xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
// but here we can only see raw data of the img, if we use URL, using browser, then make a GET request.
xhr.send(); // like click a button
//take time to get a response
// xhr.response