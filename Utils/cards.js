// carts.js - hammasi alohida

const modal = document.getElementById('cartModal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

function openModal() {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

async function loadCarts() {
  try {
    const res = await fetch('https://fakestoreapi.com/carts');
    const carts = await res.json();

    const container = document.getElementById('carts-container');
    container.innerHTML = '';

    if (carts.length === 0) {
      container.innerHTML = '<div class="loading">No carts found.</div>';
      return;
    }

    // Barcha productlarni oldindan olish
    const productMap = new Map();
    const promises = [];

    carts.forEach(cart => {
      cart.products.forEach(item => {
        if (!productMap.has(item.productId)) {
          productMap.set(item.productId, null);
          promises.push(
            fetch(`https://fakestoreapi.com/products/${item.productId}`)
              .then(r => r.json())
              .then(prod => productMap.set(item.productId, prod))
              .catch(() => productMap.set(item.productId, { title: 'Noma\'lum', price: 0, image: '', category: '', description: '' }))
          );
        }
      });
    });

    await Promise.all(promises);

    // Cardlarni yaratish
    carts.forEach(cart => {
      const card = document.createElement('div');
      card.className = 'cart-card';

      let totalPrice = 0;
      let itemsList = '<ul>';

      cart.products.forEach(item => {
        const prod = productMap.get(item.productId) || { title: 'Noma\'lum', price: 0 };
        

      });

      itemsList += '</ul>';

      card.innerHTML = `
        <h3>${cart.id}-mahsulot</h3>
        <p><strong>User ID:</strong> ${cart.userId}</p>
        <p><strong>Sana:</strong> ${new Date(cart.date).toLocaleDateString()}</p>
        <p><strong>Mahsulotlar soni:</strong> ${cart.products.length}</p>
        <button class="View">View</button>
      `;

      card.querySelector('button.View').addEventListener('click', () => {
        showCartModal(cart, productMap);
      });

      container.appendChild(card);
    });

  } catch (error) {
    document.getElementById('carts-container').innerHTML = 
      '<div class="loading" style="color:#ff6b6b;">Xato yuz berdi.</div>';
    console.error(error);
  }
}

function showCartModal(cart, productMap) {
  let html = `
    <p><strong>User ID:</strong> ${cart.userId}</p>
    <p><strong>Sana:</strong> ${new Date(cart.date).toLocaleDateString()}</p>
    <div class="modal-products">
  `;

  let total = 0;

  cart.products.forEach(item => {
    const prod = productMap.get(item.productId) || { title: 'Noma\'lum', price: 0, image: '', category: '', description: '' };
    const itemTotal = prod.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="modal-product">
        <img src="${prod.image}" alt="${prod.title}">
        <div class="modal-product-info">
          <h4>${prod.title}</h4>
          <p><strong>Kategoriya:</strong> ${prod.category}</p>
          <p><strong>Soni:</strong> ${item.quantity}</p>
          <p><strong>Narxi:</strong> $${prod.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  modalBody.innerHTML = html;
  openModal();
}

// Sahifa yuklanganda ishga tushadi
document.addEventListener('DOMContentLoaded', loadCarts);