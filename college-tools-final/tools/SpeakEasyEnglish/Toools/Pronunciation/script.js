// 全局变量
let currentPhoneticWord = ""; // 音标练习的当前单词
let currentWord = ""; // 单词发音的当前单词
let currentSentence = ""; // 句子发音的当前句子
let favorites = {
    phonetic: [],
    word: [],
    sentence: []
};

// 加载本地存储的收藏
loadFavorites();

// 标签页切换
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        const targetTab = document.getElementById(button.getAttribute('data-tab'));
        targetTab.classList.add('active');
    });
});

// 音标练习：随机单词库
const PHONETIC_WORDS = ["cat", "hat", "map", "pen", "ten", "ship", "fish", "dog", "log", "sun", "moon", "book", "tree", "chair", "table"];

function generateRandomPhoneticWord() {
    currentPhoneticWord = PHONETIC_WORDS[Math.floor(Math.random() * PHONETIC_WORDS.length)];
    document.getElementById('phonetic-word').textContent = currentPhoneticWord;
}

// 单词发音：处理用户输入
const customWordForm = document.getElementById('customWordForm');
customWordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    currentWord = document.getElementById('customWord').value.trim();
    if (currentWord) {
        document.getElementById('word-display').textContent = currentWord;
        // 自动播放发音
        playSample(currentWord);
    } else {
        alert('请输入有效的单词');
    }
});

// 句子发音：处理用户输入
const customSentenceForm = document.getElementById('customSentenceForm');
customSentenceForm.addEventListener('submit', function (e) {
    e.preventDefault();
    currentSentence = document.getElementById('customSentence').value.trim();
    if (currentSentence) {
        document.getElementById('sentence-display').textContent = currentSentence;
        // 自动播放发音
        playSample(currentSentence);
    } else {
        alert('请输入有效的句子');
    }
});

// 收藏功能
function toggleFavorite(type, item) {
    if (!item) return;

    // 检查是否已在收藏中
    if (favorites[type].includes(item)) {
        // 移除收藏
        favorites[type] = favorites[type].filter(fav => fav!== item);
        alert(`${item} 已从收藏中移除`);
    } else {
        // 添加收藏
        favorites[type].push(item);
        alert(`${item} 已加入收藏`);
    }
    saveFavorites();
    updateFavoritesUI();
}

function loadFavorites() {
    const storedFavorites = localStorage.getItem('speakEasyFavorites');
    if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
    }
    updateFavoritesUI();
}

function saveFavorites() {
    localStorage.setItem('speakEasyFavorites', JSON.stringify(favorites));
}

function updateFavoritesUI() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = `
        <h4>音标练习收藏</h4>
        <ul>${favorites.phonetic.map(fav => `<li>${fav}</li>`).join('') || '<li>暂无收藏</li>'}</ul>
        
        <h4>单词收藏</h4>
        <ul>${favorites.word.map(fav => `<li>${fav}</li>`).join('') || '<li>暂无收藏</li>'}</ul>
        
        <h4>句子收藏</h4>
        <ul>${favorites.sentence.map(fav => `<li>${fav}</li>`).join('') || '<li>暂无收藏</li>'}</ul>
    `;
}

// 发音播放（Web Speech API）
function playSample(text) {
    if (!text) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    // 选择英语发音
    const englishVoice = synth.getVoices().find(voice => voice.lang === 'en-US');
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    synth.speak(utterance);
}

// 录音功能
let mediaRecorder;
let audioChunks = [];
const practiceModal = document.getElementById('practice-modal');
const practiceTarget = document.getElementById('practice-target');
const recordingAudio = document.getElementById('recording-audio');

function startRecord(item) {
    if (!item) return;
    practiceTarget.textContent = `正在练习：${item}`;
    practiceModal.classList.add('active');
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
       .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.start();
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });
            document.querySelector('button[onclick="stopRecording()"]').style.display = 'inline-block';
        })
       .catch(err => alert('无法访问麦克风，请检查权限设置'));
}

function stopRecording() {
    mediaRecorder.stop();
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    recordingAudio.src = audioUrl;
    recordingAudio.style.display = 'block';
    document.querySelector('button[onclick="stopRecording()"]').style.display = 'none';
}

function closeModal() {
    practiceModal.classList.remove('active');
    recordingAudio.style.display = 'none';
}

function savePractice() {
    alert('练习已保存');
    closeModal();
}

// 收藏夹模态框
const favoritesModal = document.getElementById('favorites-modal');

// 添加"我的收藏"按钮到导航栏
const favoritesButton = document.createElement('button');
favoritesButton.textContent = '我的收藏';
favoritesButton.classList.add('action-button');
favoritesButton.style.marginLeft = '1rem';
favoritesButton.onclick = () => {
    favoritesModal.classList.add('active');
    updateFavoritesUI();
};

document.querySelector('header nav').appendChild(favoritesButton);

function closeFavoritesModal() {
    favoritesModal.classList.remove('active');
}