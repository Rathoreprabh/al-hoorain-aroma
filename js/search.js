const SearchModule = (() => {
    let debounceTimer;

    function debounce(fn, delay) {
        return function (...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    function performSearch(query, results) {
        if (!query) {
            results.style.display = 'none';
            return;
        }

        const q = query.toLowerCase();
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.notes.some(n => n.toLowerCase().includes(q))
        );

        results.style.display = 'block';

        if (filtered.length > 0) {
            results.innerHTML = filtered.map(p => `
                <div class="search-result-item" onclick="viewProduct(${p.id}); document.getElementById('searchInput').value = '';">
                    <strong>${p.name} <span style="float:right; color:var(--accent-gold);">$${p.price}</span></strong>
                    <span style="color:var(--text-gray); font-size:0.78rem;">${p.description}</span>
                </div>
            `).join('');
        } else {
            results.innerHTML = `<div class="search-result-item" style="text-align:center; color:var(--text-gray);">No fragrances found</div>`;
        }
    }

    function init() {
        const input = document.getElementById('searchInput');
        const results = document.getElementById('searchResults');
        if (!input || !results) return;

        input.addEventListener('input', debounce(() => {
            performSearch(input.value.trim(), results);
        }, 200));

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                results.style.display = 'none';
            }
        });

        // Close on Escape
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                results.style.display = 'none';
                input.blur();
            }
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => SearchModule.init());
