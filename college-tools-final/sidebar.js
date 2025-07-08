document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const closeBtn = document.querySelector('.close-btn');
  const showFavoritesBtn = document.getElementById('showFavorites');
  const showAllBtn = document.getElementById('showAll');
  const darkModeBtn = document.getElementById('darkMode');
  
  // 如果元素存在才添加事件监听（适用于所有页面）
  if (sidebarToggle && sidebar && sidebarOverlay && closeBtn) {
    // 切换侧边栏
    function toggleSidebar() {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    }
    
    // 事件监听
    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
  }
  
  // 只在首页添加这些功能
  if (showFavoritesBtn && showAllBtn) {
    const toolLinks = document.querySelectorAll('.tool-grid a');
    
    // 显示收藏工具
    showFavoritesBtn.addEventListener('click', function() {
      toolLinks.forEach(link => {
        const star = link.querySelector('.star i');
        if (star && star.classList.contains('fas')) {
          link.style.display = 'block';
        } else {
          link.style.display = 'none';
        }
      });
      toggleSidebar();
    });
    
    // 显示全部工具
    showAllBtn.addEventListener('click', function() {
      toolLinks.forEach(link => {
        link.style.display = 'block';
      });
      toggleSidebar();
    });
  }
  
  // 夜间模式切换（适用于所有页面）
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      if (sidebar && sidebarOverlay) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    });
    
    // 检查本地存储中的夜间模式设置
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
});