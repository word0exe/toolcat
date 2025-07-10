// 应用状态
const appState = {
    dailyGoal: 0,
    consumed: 0,
    interval: 2,
    reminderTimer: null,
    plantStage: 0,
    lastReset: null,
    activity: 'medium',
    waterPortion: 200
};

// DOM 元素
const elements = {
    welcomeSection: document.getElementById('welcome-section'),
    configSection: document.getElementById('config-section'),
    trackerSection: document.getElementById('tracker-section'),
    startBtn: document.getElementById('start-btn'),
    configForm: document.getElementById('config-form'),
    dailyGoal: document.getElementById('daily-goal'),
    consumedAmount: document.getElementById('consumed-amount'),
    progressPercent: document.getElementById('progress-percent'),
    plantVisual: document.getElementById('plant-visual'),
    plantMessage: document.getElementById('plant-message'),
    addWaterBtn: document.getElementById('add-water'),
    resetBtn: document.getElementById('reset-day'),
    notificationCard: document.getElementById('notification-card'),
    enableNotificationsBtn: document.getElementById('enable-notifications'),
    editSettingsBtn: document.getElementById('edit-settings'),
    toastContainer: document.getElementById('toast-container')
};

// 初始化应用
function init() {
    loadSavedData();
    setupEventListeners();
    checkNewDay();
}

// 配置所有事件监听
function setupEventListeners() {
    elements.startBtn.addEventListener('click', () => {
        elements.welcomeSection.classList.add('hidden');
        elements.configSection.classList.remove('hidden');
    });

    elements.configForm.addEventListener('submit', handleFormSubmit);
    elements.addWaterBtn.addEventListener('click', addWater);
    elements.resetBtn.addEventListener('click', resetDay);
    elements.enableNotificationsBtn.addEventListener('click', requestNotificationPermission);
    elements.editSettingsBtn.addEventListener('click', editSettings);
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const weight = parseInt(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    appState.interval = parseInt(document.getElementById('reminder-interval').value);
    appState.activity = activity;
    
    // 计算每日目标
    const activityFactors = {
        low: 30,
        medium: 35,
        high: 40,
        extreme: 45
    };
    
    appState.dailyGoal = Math.round(weight * activityFactors[activity]);
    
    // 仅在首次设置或用户明确选择时重置饮水量
    if (!appState.lastReset || confirm("是否同时重置今日饮水量？")) {
        appState.consumed = 0;
    }
    
    appState.lastReset = appState.lastReset || new Date().toDateString();

    saveData();
    updateTrackerUI();
    
    // 切换到追踪页面
    elements.configSection.classList.add('hidden');
    elements.trackerSection.classList.remove('hidden');

    startReminders();
    checkNotificationPermission();
    
    showToast(`设置已更新！每日目标: ${appState.dailyGoal}ml`);
}

// 编辑设置
function editSettings() {
    // 保存当前饮水量
    const tempConsumed = appState.consumed;
    
    // 显示配置页面
    elements.trackerSection.classList.add('hidden');
    elements.configSection.classList.remove('hidden');
    
    // 填充当前值
    document.getElementById('weight').value = Math.round(appState.dailyGoal / getActivityFactor(appState.activity));
    document.getElementById('activity').value = appState.activity;
    document.getElementById('reminder-interval').value = appState.interval;
    
    // 恢复饮水量
    appState.consumed = tempConsumed;
}

// 获取活动系数
function getActivityFactor(activityLevel) {
    const factors = {
        low: 30,
        medium: 35,
        high: 40,
        extreme: 45
    };
    return factors[activityLevel] || 35;
}

// 更新界面追踪
function updateTrackerUI() {
    elements.dailyGoal.textContent = `${appState.dailyGoal} ml`;
    elements.consumedAmount.textContent = `${appState.consumed} ml`;
    
    const progress = Math.min(Math.round((appState.consumed / appState.dailyGoal) * 100), 100);
    elements.progressPercent.textContent = `${progress}%`;

    updatePlant(progress);
}

// 更新植物状态
function updatePlant(progress) {
    // 重置所有类
    elements.plantVisual.className = 'plant-visual';
    
    // 设置新类
    if (progress >= 100) {
        appState.plantStage = 3;
        elements.plantVisual.classList.add('plant-stage-3');
        elements.plantMessage.textContent = "恭喜！您的植物已100%绽放 🌸";
        if (progress === 100) showToast("🎉 太棒了！您已达成今日目标！");
    } else if (progress >= 70) {
        appState.plantStage = 2;
        elements.plantVisual.classList.add('plant-stage-2');
        elements.plantMessage.textContent = "您的植物长势良好！继续保持饮水 💧";
    } else if (progress >= 30) {
        appState.plantStage = 1;
        elements.plantVisual.classList.add('plant-stage-1');
        elements.plantMessage.textContent = "您的植物开始生长了 🌱";
    } else {
        appState.plantStage = 0;
        elements.plantVisual.classList.add('plant-stage-0');
        elements.plantMessage.textContent = "您的植物很渴... 喝点水吧！";
    }
    
    console.log(`植物状态更新: 进度=${progress}% → 阶段=${appState.plantStage}`);
}

// 添加饮水量
function addWater() {
    // 随机选择常见饮水量（可改为自定义输入）
    const portions = [100, 200, 300, 500];
    const portion = portions[Math.floor(Math.random() * portions.length)];
    
    appState.consumed = Math.min(appState.consumed + portion, appState.dailyGoal);
    
    saveData();
    updateTrackerUI();
    showToast(`+${portion}ml 已添加！`);
}

// 重置每日记录
function resetDay() {
    if (confirm("确定要重置今日的饮水记录吗？这将清除今天的所有数据。")) {
        appState.consumed = 0;
        appState.lastReset = new Date().toDateString();
        saveData();
        updateTrackerUI();
    }
}

// 启动提醒
function startReminders() {
    if (appState.reminderTimer) clearInterval(appState.reminderTimer);

    const intervalMs = appState.interval * 60 * 60 * 1000;
    
    // 1分钟后发送第一个提醒
    setTimeout(() => {
        if (Notification.permission === 'granted') showNotification();
    }, 60 * 1000);

    appState.reminderTimer = setInterval(() => {
        if (Notification.permission === 'granted') showNotification();
    }, intervalMs);
}

// 显示通知
function showNotification() {
    const progress = Math.round((appState.consumed / appState.dailyGoal) * 100);
    const title = "💧 该喝水了！";
    const body = `今日已饮 ${appState.consumed}ml，目标 ${appState.dailyGoal}ml (${progress}%)`;
    
    const options = {
        body,
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%234CAF50" d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>',
        vibrate: [200, 100, 200]
    };

    if (Notification.permission === 'granted') {
        new Notification(title, options);
    }
}

// 请求通知权限
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                elements.notificationCard.classList.add('hidden');
                showToast("✅ 通知已启用");
            } else {
                showToast("❌ 通知已禁用。您可以在浏览器设置中重新启用。");
            }
        });
    }
}

// 检查通知权限
function checkNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            elements.notificationCard.classList.remove('hidden');
        } else {
            elements.notificationCard.classList.add('hidden');
        }
    }
}

// 保存数据到localStorage
function saveData() {
    const dataToSave = {
        dailyGoal: appState.dailyGoal,
        consumed: appState.consumed,
        interval: appState.interval,
        plantStage: appState.plantStage,
        lastReset: appState.lastReset,
        activity: appState.activity
    };
    localStorage.setItem('waterTimeData', JSON.stringify(dataToSave));
}

// 加载保存的数据
function loadSavedData() {
    const savedData = localStorage.getItem('waterTimeData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // 恢复所有状态
        appState.dailyGoal = parsedData.dailyGoal;
        appState.consumed = parsedData.consumed;
        appState.interval = parsedData.interval;
        appState.plantStage = parsedData.plantStage;
        appState.lastReset = parsedData.lastReset;
        appState.activity = parsedData.activity || 'medium';
        
        // 如果有数据，直接进入追踪页面
        if (appState.dailyGoal > 0) {
            elements.welcomeSection.classList.add('hidden');
            elements.configSection.classList.add('hidden');
            elements.trackerSection.classList.remove('hidden');
            
            // 强制更新UI和植物状态
            updateTrackerUI();
            startReminders();
            checkNotificationPermission();
        }
    }
}

// 检查是否为新的一天（自动重置）
function checkNewDay() {
    const today = new Date().toDateString();
    if (appState.lastReset && appState.lastReset !== today) {
        appState.consumed = 0;
        appState.lastReset = today;
        saveData();
        updateTrackerUI();
        showToast("新的一天开始了！今日目标: " + appState.dailyGoal + "ml");
    }
}

// 显示提示消息
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    // 添加到容器
    elements.toastContainer.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 自动消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (elements.toastContainer.contains(toast)) {
                elements.toastContainer.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 页面加载完成后启动应用
document.addEventListener('DOMContentLoaded', init);