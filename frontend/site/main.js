import { productService } from "../model/model.js";
const cate_hotdeal= document.getElementById('hotdeal');
const cate_tivi= document.getElementById('tivi');
const cate_tulanh= document.getElementById('tulanh');

productService.fetchData('http://localhost:3000/api/products?productType=2&limit=5').then(res=> {
res.data.forEach(function (item) {
    cate_hotdeal.innerHTML+=`
    <div class="sanpham border-blue">
    <span class="label-tragop">Trả góp 0%</span>
    <a href="detail.html?id=${item._id}"><img src="${item.image}" alt="" /></a>
    <span class="label-sale"
      ><i class="fa-regular fa-bell"></i> FLASH SALE GIÁ SỐC</span
    >
    <br />
    <span>${item.name}</span>
    <br />
    <p class="gia">${item.price}đ <del> ${item.price} đ</del></p>
    <p class="online-gia-re">Online giá rẻ</p>
    
  </div>
    `
  });
});
productService.fetchData('http://localhost:3000/api/products?categoryId=66f79ee650d6a85cdab75499&limit=5').then(res=> {
  res.data.forEach(function (item) {
    cate_tivi.innerHTML+=`
    <div class="sanpham border-green">
    <span class="label-tragop">Trả góp 0%</span>
    <a href="detail.html?id=${item._id}"><img src="${item.image}" alt="" /></a>
    <span class="label-sale"
      ><i class="fa-regular fa-bell"></i> FLASH SALE GIÁ SỐC</span
    >
    <br />
    <span>${item.name}</span>
    <br />
    <p class="gia">${item.price}đ <del> ${item.price} đ</del></p>
    <p class="online-gia-re">Online giá rẻ</p>
    
  </div>
    `
  });
});
productService.fetchData('http://127.0.0.1:3000/api/products?categoryId=671ee6ad134606c36c808968&limit=5').then(res=> {
  res.data.forEach(function (item) {
    cate_tulanh.innerHTML+=`
    <div class="sanpham border-red">
    <span class="label-tragop">Trả góp 0%</span>
    <a href="detail.html?id=${item._id}"><img src="${item.image}" alt="" /></a>
    <span class="label-sale"
      ><i class="fa-regular fa-bell"></i> FLASH SALE GIÁ SỐC</span
    >
    <br />
    <span>${item.name}</span>
    <br />
    <p class="gia">${item.price}đ <del> ${item.price} đ</del></p>
    <p class="online-gia-re">Online giá rẻ</p>
    
  </div>
    `
  });
});
