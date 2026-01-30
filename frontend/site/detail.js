import { productService } from "../model/model.js";
const detailPro= document.getElementById('detailPro');

// given url string
let url_str = window.location.href;
console.log(url_str);

let url = new URL(url_str);
let search_params = url.searchParams; 

// get value of "id" parameter
let id = search_params.get('id');
console.log(id);

productService.fetchData(`http://localhost:3000/api/products/${id}`).then(res=> {
console.log(res.product);
detailPro.innerHTML+=`
    <div class="">
    <img src="${res?.product?.image}" alt="" />
    <br />
    <span>${res?.product?.name}</span>
    <br />
    <p class="gia">${res.product.price}đ <del> ${res?.product?.quantity}</del></p>
    <p class="online-gia-re">${res?.product?.description}</p>
  </div>
    `;
});
