async function loadDashboard() {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();

            // Statistika
            document.getElementById('totalProducts').textContent = products.length;

            const categories = [...new Set(products.map(p => p.category))];
            document.getElementById('totalCategories').textContent = categories.length;

            const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
            document.getElementById('avgPrice').textContent = '$' + avgPrice.toFixed(2);

            const highest = products.reduce((max, p) => p.rating.rate > max ? p.rating.rate : max, 0);
            document.getElementById('highestRating').textContent = highest.toFixed(1);

            // Jadval - eng yuqori baholangan 8 ta mahsulot
            const topProducts = products
                .sort((a, b) => b.rating.rate - a.rating.rate)
                .slice(0, 8);

            const tbody = document.getElementById('productsTable');
            topProducts.forEach(p => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${p.image}" alt="${p.title}"></td>
                    <td>${p.title.substring(0, 30)}...</td>
                    <td>$${p.price}</td>
                    <td>${p.category}</td>
                    <td class="rating">${p.rating.rate} ⭐</td>
                `;
                tbody.appendChild(row);
            });

            // Chart - kategoriyalar bo'yicha soni
            const categoryCount = categories.map(cat => ({
                category: cat,
                count: products.filter(p => p.category === cat).length
            }));

            const ctx = document.getElementById('categoryChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: categoryCount.map(c => c.category),
                    datasets: [{
                        data: categoryCount.map(c => c.count),
                        backgroundColor: ['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#f87171'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#e2e8f0' }
                        }
                    }
                }
            });
        }

        loadDashboard();