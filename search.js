
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

