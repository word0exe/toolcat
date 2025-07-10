// 应用状态
const appState = {
    dailyGoal: 0,         // 每日饮水目标
    consumed: 0,          // 已饮水量
    interval: 2,          // 提醒间隔
    reminderTimer: null,  // 提醒计时器
    plantStage: 0,        // 植物生长阶段
    lastReset: null       // 最后重置日期（用于每日自动重置）
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
    enableNotificationsBtn: document.getElementById('enable-notifications')
};

// 初始化应用
function init() {
    // 加载保存的数据（如果有）
    loadSavedData();
    
    // 事件监听
    elements.startBtn.addEventListener('click', () => {
        elements.welcomeSection.classList.add('hidden');
        elements.configSection.classList.remove('hidden');
    });

    elements.configForm.addEventListener('submit', handleFormSubmit);
    elements.addWaterBtn.addEventListener('click', addWater);
    elements.resetBtn.addEventListener('click', resetDay);
    elements.enableNotificationsBtn.addEventListener('click', requestNotificationPermission);

    // 检查是否为新的一天（自动重置）
    checkNewDay();
}

// 处理配置表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const weight = parseInt(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;
    appState.interval = parseInt(document.getElementById('reminder-interval').value);

    // 计算每日饮水目标（毫升）
    // 基于通用推荐的系数（毫升/公斤）
    const activityFactors = {
        low: 30,      // 低活动量：30ml/公斤/天
        medium: 35,   // 中等活动量：35ml/公斤/天
        high: 40,     // 高活动量：40ml/公斤/天
        extreme: 45   // 极高活动量：45ml/公斤/天
    };
    
    appState.dailyGoal = weight * activityFactors[activity];
    appState.consumed = 0;
    appState.plantStage = 0;
    appState.lastReset = new Date().toDateString(); // 记录重置日期

    // 保存数据
    saveData();

    // 更新界面
    updateTrackerUI();
    
    // 切换到追踪页面
    elements.configSection.classList.add('hidden');
    elements.trackerSection.classList.remove('hidden');

    // 启动提醒
    startReminders();

    // 检查通知权限
    checkNotificationPermission();
}

// 更新追踪界面
function updateTrackerUI() {
    // 显示统计数据
    elements.dailyGoal.textContent = `${appState.dailyGoal} ml`;
    elements.consumedAmount.textContent = `${appState.consumed} ml`;
    
    // 计算进度
    const progress = Math.min(Math.round((appState.consumed / appState.dailyGoal) * 100), 100);
    elements.progressPercent.textContent = `${progress}%`;

    // 更新虚拟植物
    updatePlant(progress);
}

// 根据进度更新植物外观
function updatePlant(progress) {
    // 移除所有阶段类
    elements.plantVisual.className = 'plant-visual';
    
    // 根据进度定义植物阶段
    if (progress >= 100) {
        appState.plantStage = 3;
        elements.plantVisual.classList.add('plant-stage-3');
        elements.plantMessage.textContent = "恭喜！您的植物已100%绽放 🌸";
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
}

// 添加饮水量（默认200ml，可扩展为自定义选择）
function addWater() {
    const portion = 200; // 每份200ml
    appState.consumed = Math.min(appState.consumed + portion, appState.dailyGoal);
    
    // 保存数据
    saveData();
    
    // 更新界面
    updateTrackerUI();
}

// 重置今日记录
function resetDay() {
    if (confirm("确定要重置今日的饮水记录吗？")) {
        appState.consumed = 0;
        appState.lastReset = new Date().toDateString();
        saveData();
        updateTrackerUI();
    }
}

// 管理提醒（通知）
function startReminders() {
    // 如有现有提醒，先停止
    if (appState.reminderTimer) {
        clearInterval(appState.reminderTimer);
    }

    // 将间隔转换为毫秒（小时 → 毫秒）
    const intervalMs = appState.interval * 60 * 60 * 1000;

    // 立即发送第一个提醒
    if (Notification.permission === 'granted') {
        showNotification();
    }

    // 设置定期提醒
    appState.reminderTimer = setInterval(() => {
        showNotification();
    }, intervalMs);
}

// 显示通知
function showNotification() {
    if (Notification.permission !== 'granted') return;

    const title = "💧 该喝水了！";
    const body = `今日已饮水 ${appState.consumed} ml，目标 ${appState.dailyGoal} ml。`;
    
    // 通知选项
    const options = {
        body: body,
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%234CAF50" d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/></svg>',
        vibrate: [200, 100, 200] // 兼容设备的震动反馈
    };

    // 显示通知
    new Notification(title, options);
}

// 请求通知权限
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                elements.notificationCard.classList.add('hidden');
                showNotification(); // 发送确认通知
            } else {
                alert("通知已禁用。您可以在浏览器设置中重新启用。");
            }
        });
    }
}

// 检查通知权限
function checkNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            elements.notificationCard.classList.remove('hidden');
        } else if (Notification.permission === 'denied') {
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
        lastReset: appState.lastReset
    };
    localStorage.setItem('waterTimeData', JSON.stringify(dataToSave));
}

// 加载保存的数据
function loadSavedData() {
    const savedData = localStorage.getItem('waterTimeData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        appState.dailyGoal = parsedData.dailyGoal;
        appState.consumed = parsedData.consumed;
        appState.interval = parsedData.interval;
        appState.plantStage = parsedData.plantStage;
        appState.lastReset = parsedData.lastReset;

        // 如果有数据，直接进入追踪页面
        if (appState.dailyGoal > 0) {
            elements.welcomeSection.classList.add('hidden');
            elements.configSection.classList.add('hidden');
            elements.trackerSection.classList.remove('hidden');
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
    }
}

// 页面加载完成后启动应用
document.addEventListener('DOMContentLoaded', init);