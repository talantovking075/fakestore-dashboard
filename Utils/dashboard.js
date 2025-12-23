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
          <td>${id}</td>
          <td>${title}</td>
          <td>${category}</td>
          <td>${description}</td>
          <td>$${price}</td>
          <td><img width="80" src="${image}" alt="${title}" style="border-radius: 8px; object-fit: cover;"></td>
          <td>
            <button class="dashboard__view__btn" data-id="${id}">View</button>
            <button class="dashboard__edit__btn" data-id="${id}">Edit</button>
            <button class="dashboard__delete__btn" data-id="${id}">Delete</button>
        </td>
        </tr>
      `;
    }).join(''); 

    tableBody.innerHTML = rows;

  } catch (error) {
    console.error("Ma'lumotlarni yuklashda xatolik:", error);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:red;">Ma'lumotlar yuklanmadi!</td></tr>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchAndShowData);

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('dashboard__view__btn')) {
    const productId = e.target.getAttribute('data-id');
    console.log('View product:', productId);  }
});



const deleteProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}` , {
    method: "delete",
  })
  .then((res) => res.json())
  .then((data) => {
    if(data) {
      alert("malumot Muffaqiyatli ochiri")
    }
  });
}

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