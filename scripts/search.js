// search.js
import { products } from './data/products.js'; // 你的产品数组
import { formatCurrency } from './utils/money.js'; // 如果你有格式化函数

const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');
const productsContainer = document.querySelector('.js-products-grid');

// 渲染函数
function renderProducts(productsToRender) {
  if (!productsContainer) return;

  if (productsToRender.length === 0) {
    productsContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  let html = '';
  productsToRender.forEach(product => {
    html += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${formatCurrency(product.priceCents)}</div>
      </div>
    `;
  });

  productsContainer.innerHTML = html;
}

// 搜索逻辑
function filterProducts(keyword) {
  const lowerKeyword = keyword.trim().toLowerCase();
  if (!lowerKeyword) return products; // 空输入显示所有

  return products.filter(product =>
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.keywords.some(k => k.toLowerCase().includes(lowerKeyword))
  );
}

// 点击搜索按钮
searchButton.addEventListener('click', () => {
  const keyword = searchInput.value;
  const filtered = filterProducts(keyword);
  renderProducts(filtered);
});

// 按回车也搜索
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// 初始渲染全部
renderProducts(products);
