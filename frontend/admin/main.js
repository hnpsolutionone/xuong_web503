import { productService } from "../model/model.js";

//Authencation: Kiểm tra user đã đăng nhập chưa qua access token, nếu chưa thì rediect đến trang login
//productService.isAuth();

//Chức năng show sản phẩm
var tbody = document.querySelector("tbody");
function showPro() {
  tbody.innerHTML = "";
  productService.fetchData('http://localhost:3000/products/api/products').then((res) => {
    console.log(res)
    res.data.forEach((item) => {
      tbody.innerHTML += `
        <tr>
          <td>${item._id}</td>
          <td>${item.name}</td>
          <td><img src="${item.image}" width="120"></td>
          <td>${item.price}</td>
          <td>${item.categoryId.name || null}</td>
          <td>${item.description}</td>
          <td>
            <button class="deletePro" data-id="${item._id}">Xóa</button>
            <button class="openEditPage" data-id="${item._id}">Sửa</button>
          </td>
        </tr>
      `;
    });
  }
  );
}
showPro();
//// viết logout
var logoutBtn = document.getElementById("logout");
logoutBtn.onclick = function () {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/ASM_ES6/site/login.html';
};

//// viết chức năng thêm sản phẩm
var modal = document.getElementById("myModal");
var btn = document.getElementById("openAddPage");
btn.onclick = () => modal.style.display = "block";
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};
document.querySelector("#addPro").addEventListener("click", addPro);
function addPro() {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const newPro = {
    'name': name,
    'price': price,
    'quantity': quantity,
    'image': image,
    'description': description,
    'categoryId': category,
    'productType': 0,
    'viewed': 1
  };
  productService.addData(newPro);
  showPro();
  modal.style.display = "none";
}

// viết chức năng xóa sản phẩm
document.querySelector("tbody").addEventListener("click", function (e) {
  if (e.target.classList.contains("deletePro")) {
    const id = e.target.dataset.id;
    console.log(id);
    productService.deleteData(id);
    showPro();
  }
});
// viết chức năng sửa sản phẩm
var editModal = document.getElementById("editModal");
document.querySelector("tbody").addEventListener("click", function (e) {
  if (e.target.classList.contains("openEditPage")) {
    const id = e.target.dataset.id;
    productService.getDataById(id).then((pro) => {
      editModal.style.display = "block";
      const selectOptions = pro.categories.map(item =>
        `<option ${pro.product.categoryId === item ? 'selected' : ''} value="${item._id}">${item.name}</option>`
      ).join('');
      editModal.innerHTML = `
    <div class="modal-content">
                        <span class="close">&times;</span>
                        <label for="">Tên sản phẩm</label>
                        <br />
                        <input value="${pro.product.name}" type="text" id="editName" />
                        <br />
                        <label for="">Hình ảnh</label>
                        <br />
                        <img id="showImage"  src="${pro.product.image}" width="120">
                        <br />
                        <input value="" type="text" id="editImage" placeholder="Nhập URL" />
                        <br />
                        <br />
                        <label for="">Danh mục</label>
                        <br />
                        <section>
                        <select id="editCategory">
                          ${selectOptions}
                        </select>
                        </section>
                        <br />
                        <label for="">Giá</label>
                        <br />
                        <input value="${pro.product.price}" type="number" id="editPrice" />
                        <br />
                        <br />
                        <label for="">Số lượng</label>
                        <br />
                        <input value="${pro.product.quantity}" type="number" id="editQuantity" />
                        <br />
                        <br />
                        <label for="">Loại sản phẩm</label>
                        <br />
                        <section>
                          <select id="editProductType">
                            <option ${pro.product.productType == 0 ? 'selected' : ''} value="0">--None--</option>
                            <option ${pro.product.productType == 1 ? 'selected' : ''} value="1">Hot</option>
                            <option ${pro.product.productType == 2 ? 'selected' : ''} value="2">New</option>
                          </select>
                        </section>
                        <br />
                        <label for="">Mô tả</label>
                        <br />
                        <textarea id="editDescription" name="w3review" rows="4" cols="50">${pro.product.description}</textarea>
                        <br />
                        <input value="${pro.product.viewed}" type="hidden" id="editViewed" />
                        <button class="editPro" data-id="${id}">Sửa</button>
                      </div>
    `
    });
  }
}
);

editModal.addEventListener("click", function (e) {
  if (e.target.classList.contains("editPro")) {
    const id = e.target.dataset.id;
    const name = document.getElementById("editName").value;
    const image = document.getElementById("editImage").value;
    const price = document.getElementById("editPrice").value;
    const quantity = document.getElementById("editQuantity").value;
    const productType = document.getElementById("editProductType").value;
    const category = document.getElementById("editCategory").value;
    const description = document.getElementById("editDescription").value;
    console.log(id + name + image + price + category + description);
    productService.updateData(id, {
      'name': name,
      'price': price,
      'quantity': quantity,
      'description': description,
      'image': image,
      'categoryId': category,
      'productType': productType,
      'viewed': 100
    });
    showPro();
    editModal.style.display = "none";
  }
}
);