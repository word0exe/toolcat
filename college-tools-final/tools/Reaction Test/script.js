// 获取DOM元素
const testArea = document.getElementById('testArea');
const message = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const lastTimeDisplay = document.getElementById('lastTime');
const bestTimeDisplay = document.getElementById('bestTime');
const avgTimeDisplay = document.getElementById('avgTime');

// 初始化变量
let startTime;
let timeoutId;
let reactionTimes = [];
let isTesting = false;

// 最小和最大等待时间（毫秒）
const MIN_WAIT_TIME = 1000;
const MAX_WAIT_TIME = 5000;

// 事件监听
startBtn.addEventListener('click', startTest);
testArea.addEventListener('click', handleTestAreaClick);

// 开始测试函数
function startTest() {
    // 重置状态
    resetTest();
    
    // 随机等待时间
    const waitTime = MIN_WAIT_TIME + Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME);
    
    // 设置超时，当可以点击时
    timeoutId = setTimeout(function() {
        if (isTesting) {
            setReadyState();
            startTime = Date.now();
        }
    }, waitTime);
}

// 处理测试区域点击
function handleTestAreaClick() {
    if (!isTesting) return;
    
    if (testArea.classList.contains('waiting')) {
        // 过早点击
        handleEarlyClick();
    } else if (testArea.classList.contains('ready')) {
        // 正确反应
        const reactionTime = Date.now() - startTime;
        recordReaction(reactionTime);
        showResult(reactionTime);
    }
}

// 重置测试状态
function resetTest() {
    testArea.className = 'test-area waiting';
    message.textContent = '等待变绿...';
    startBtn.textContent = '测试中...';
    startBtn.disabled = true;
    isTesting = true;
}

// 设置准备状态
function setReadyState() {
    testArea.classList.remove('waiting');
    testArea.classList.add('ready');
    message.textContent = '点击！';
}

// 处理过早点击
function handleEarlyClick() {
    testArea.classList.remove('waiting');
    testArea.classList.add('too-early');
    message.textContent = '点击过早！';
    isTesting = false;
    startBtn.textContent = '重新开始';
    startBtn.disabled = false;
}

// 显示结果
function showResult(time) {
    testArea.classList.remove('ready');
    message.textContent = `反应时间: ${time} 毫秒`;
    isTesting = false;
    startBtn.textContent = '再来一次';
    startBtn.disabled = false;
}

// 记录反应时间
function recordReaction(time) {
    // 记录反应时间
    reactionTimes.push(time);
    
    // 更新显示
    updateStatsDisplay();
}

// 更新统计显示
function updateStatsDisplay() {
    // 上次反应时间
    lastTimeDisplay.textContent = `${reactionTimes[reactionTimes.length - 1]} ms`;
    
    // 计算最佳成绩
    const bestTime = Math.min(...reactionTimes);
    bestTimeDisplay.textContent = `${bestTime} ms`;
    
    // 计算平均成绩
    const avgTime = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
    avgTimeDisplay.textContent = `${avgTime} ms`;
}