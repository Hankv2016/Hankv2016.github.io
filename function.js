
function handleSearch() {
    const searchValue = document.getElementById('searchInput').value.trim();
    string (searchValue)
    if (searchValue === '') {
        alert('请输入搜索内容');
        return;
    }

    // 获取页面中所有需要搜索的文本节点（如 p, h1, h2 等）
    const elements = document.querySelectorAll('.banner-text, .content-left');
    let found = false;

    elements.forEach(el => {
        // 先移除之前可能添加的高亮标记
        el.innerHTML = el.innerHTML.replace(/<mark class="search-highlight">(.*?)<\/mark>/gi, '$1');
        
        if (el.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
            found = true;
            // 利用正则表达式替换匹配的文本，添加高亮标签
            const regex = new RegExp(`(${searchValue})`, 'gi');
            el.innerHTML = el.innerHTML.replace(regex, '<mark class="search-highlight">$1</mark>');
        }
    });

    if (!found) {
        alert('未找到相关内容');
    }
}

function toggleTheme() {
  const root = document.documentElement;
  const theme = root.getAttribute('data-theme');
  root.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("postList");

  try {
    const res = await fetch("/api/posts");
    const posts = await res.json();

    if (!posts.length) {
      container.innerHTML = "<p>No posts yet.</p>";
      return;
    }

    container.innerHTML = posts.map(p => `
      <article class="post-card">
        <h3><a href="/posts/${p.slug}">${p.title}</a></h3>
        <time>${new Date(p.created_at).toLocaleDateString()}</time>
        <p>${p.excerpt || ""}</p>
      </article>
    `).join("");
  } catch (e) {
    container.innerHTML = "<p>Failed to load posts.</p>";
  }
});