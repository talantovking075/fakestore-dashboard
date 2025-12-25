const API = 'https://fakestoreapi.com/products';
const tableBody = document.querySelector('tbody');

async function fetchAndShowData() {
  try {
    const response = await fetch(API);
    const data = await response.json();

    tableBody.innerHTML = ''; 
    const rows = data.map(product => {
      const { id, title, price, image, description, category } = product;

      return `
        <tr>
          <td class="product-id">${id}</td>
          <td class="product-title">${title}</td>
          <td class="product-category">${category}</td>
          <td class="product-description">${description}</td>
          <td class="product-price">$${price}</td>
          <td><img width="80" src="${image}" alt="${title}" class="product-image"></td>
          <td>
            <button class="dashboard__view__btn" data-id="${id}">View</button>
            <button class="dashboard__edit__btn" data-id="${id}">Edit</button>
            <button class="dashboard__delete__btn" data-id="${id}">O'chirish</button> 
          </td>
        </tr>
      `;
    }).join(''); 

    tableBody.innerHTML = rows;

  } catch (error) {
    console.log("Ma'lumotlarni yuklashda xatolik:", error);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red;">Ma'lumotlar yuklanmadi!</td></tr>`;
  }
  
}



document.addEventListener('DOMContentLoaded', fetchAndShowData);

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('dashboard__view__btn')) {
    const productId = e.target.getAttribute('data-id');
    console.log('View product:', productId);  
  }
});

const addProductBtn = document.getElementById('addProductBtn');
const modal = document.getElementById('productModal');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');

addProductBtn.onclick = () => {
  modal.style.display = 'flex';
};

closeBtn.onclick = () => {
  modal.style.display = 'none';
};

cancelBtn.onclick = () => {
  modal.style.display = 'none';
  document.getElementById('addProductForm').reset();
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('addProductForm').reset();
  }
};

document.addEventListener('DOMContentLoaded', fetchAndShowData);

const editModal = document.getElementById('editModal');
const editCloseBtn = document.querySelector('.edit-close');
const editCancelBtn = document.querySelector('.edit-cancel-btn');
const editForm = document.getElementById('editProductForm');

let currentEditId = null;

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('dashboard__edit__btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    currentEditId = productId;

    const row = e.target.closest('tr');
    const cells = row.querySelectorAll('td');

    const title = cells[1].textContent.trim();
    const category = cells[2].textContent.trim();
    const description = cells[3].textContent.trim();
    const price = parseFloat(cells[4].textContent.replace('$', ''));
    const imageUrl = cells[5].querySelector('img').src;

    document.getElementById('editTitle').value = title;
    document.getElementById('editPrice').value = price;
    document.getElementById('editDescription').value = description;
    document.getElementById('editCategory').value = category;
    document.getElementById('editImage').value = imageUrl;

    editModal.style.display = 'flex';
  }
});

editCloseBtn.onclick = () => {
  editModal.style.display = 'none';
  currentEditId = null;
};

editCancelBtn.onclick = () => {
  editModal.style.display = 'none';
  currentEditId = null;
};

window.onclick = (event) => {
  if (event.target === editModal) {
    editModal.style.display = 'none';
    currentEditId = null;
  }
  if (event.target === modal) {
    modal.style.display = 'none';
    document.getElementById('addProductForm').reset();
  }
};

editForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const updatedProduct = {
    title: document.getElementById('editTitle').value,
    price: parseFloat(document.getElementById('editPrice').value),
    description: document.getElementById('editDescription').value,
    category: document.getElementById('editCategory').value,
    image: document.getElementById('editImage').value,
  };

  const row = document.querySelector(`button.dashboard__edit__btn[data-id="${currentEditId}"]`)?.closest('tr');
  if (row) {
    const cells = row.querySelectorAll('td');
    cells[1].textContent = updatedProduct.title;
    cells[2].textContent = updatedProduct.category;
    cells[3].textContent = updatedProduct.description;
    cells[4].textContent = `$${updatedProduct.price.toFixed(2)}`;
    cells[5].querySelector('img').src = updatedProduct.image;
    cells[5].querySelector('img').alt = updatedProduct.title;
  }

  editModal.style.display = 'none';
  currentEditId = null;
});

const deleteProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}` , {
    method: "delete",
  })
  .then((res) => res.json())
  .then((data) => {
    if(data) {
    }
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('dashboard__delete__btn')) { 
    const productId = e.target.getAttribute('data-id');
    const row = e.target.closest('tr');
    deleteProduct(productId);
    row.remove();
  }
});

const loading = document.getElementById('loading');
const table = document.querySelector('table');

