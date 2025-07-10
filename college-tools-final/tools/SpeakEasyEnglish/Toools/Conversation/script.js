// 状态初始化
let currentRole = "A";
let isListening = false;
let recognition;
let promptIndex = 0;
let currentConversation = null;

// ==================== GÉNÉRATION DE CONVERSATIONS PRÉDEFINIES ====================
// Modèles de conversations (gabarits + éléments aléatoires)
const conversationTemplates = [
  {
    topic: "日常问候 (Daily Greetings)",
    A: [
      "{GREETING}! How are you today?",
      "Nice to {MEET} you! What's new?",
      "{TIME}! How's it going?"
    ],
    B: [
      "I'm {MOOD}, thanks. And you?",
      "{RESPONSE}, actually. What about you?",
      "Not bad, just {ACTIVITY}."
    ],
    replacements: {
      "{GREETING}": ["Hi", "Hello", "Hey", "Good day"],
      "{MEET}": ["see", "meet", "run into", "bump into"],
      "{TIME}": ["Good morning", "Good afternoon", "Good evening", "Hi there"],
      "{MOOD}": ["good", "great", "fine", "okay", "alright"],
      "{RESPONSE}": ["Pretty good", "Doing well", "Can't complain", "All right"],
      "{ACTIVITY}": ["working", "studying", "chilling", "relaxing", "reading"]
    }
  },
  {
    topic: "兴趣爱好 (Hobbies)",
    A: [
      "What's your favorite {HOBBY}?",
      "Do you like {ACTIVITY} in your free time?",
      "How often do you {HOBBY_VERB}?"
    ],
    B: [
      "I love {HOBBY}! It's so {DESCRIPTION}.",
      "Yes, {ACTIVITY} is my favorite way to {RELAX}.",
      "I {HOBBY_VERB} {FREQUENCY} a week."
    ],
    replacements: {
      "{HOBBY}": ["hobby", "activity", "pastime"],
      "{ACTIVITY}": ["painting", "reading", "hiking", "cooking", "dancing"],
      "{DESCRIPTION}": ["fun", "relaxing", "exciting", "creative", "calming"],
      "{RELAX}": ["unwind", "relax", "de-stress", "chill out"],
      "{HOBBY_VERB}": ["paint", "read", "hike", "cook", "dance"],
      "{FREQUENCY}": ["once", "twice", "a few times", "every other day"]
    }
  },
  {
    topic: "旅行计划 (Travel Plans)",
    A: [
      "Where are you {TRAVEL_VERB} next?",
      "Have you ever {TRAVEL_PAST} {DESTINATION}?",
      "What's your dream {TRAVEL_DEST}?"
    ],
    B: [
      "I'm {TRAVEL_VERB} to {DESTINATION}! So excited.",
      "Yes, I {TRAVEL_PAST} {DESTINATION} last year. It was {AMAZING}.",
      "My dream {TRAVEL_DEST} is {DESTINATION}. I want to {ACTIVITY} there."
    ],
    replacements: {
      "{TRAVEL_VERB}": ["traveling", "going", "visiting"],
      "{TRAVEL_PAST}": ["visited", "went to", "explored"],
      "{DESTINATION}": ["Japan", "France", "Australia", "Brazil", "Canada"],
      "{AMAZING}": ["incredible", "beautiful", "unforgettable", "breathtaking"],
      "{TRAVEL_DEST}": ["destination", "place to visit", "travel spot"],
      "{ACTIVITY}": ["see the sights", "try local food", "hike", "relax on the beach"]
    }
  }
];

// Générer une conversation à partir d'un modèle aléatoire
function generateRandomConversationFromTemplate() {
  // Choisir un modèle aléatoire
  const randomTemplate = conversationTemplates[Math.floor(Math.random() * conversationTemplates.length)];
  
  // Fonction pour remplacer les tags par des valeurs aléatoires
  const replaceTags = (sentence, replacements) => {
    return sentence.replace(/{[^}]+}/g, (tag) => {
      const options = replacements[tag] || [];
      return options[Math.floor(Math.random() * options.length)] || tag;
    });
  };
  
  // Générer les phrases pour A et B
  const generatedA = randomTemplate.A.map(sentence => replaceTags(sentence, randomTemplate.replacements));
  const generatedB = randomTemplate.B.map(sentence => replaceTags(sentence, randomTemplate.replacements));
  
  return {
    topic: randomTemplate.topic,
    A: generatedA,
    B: generatedB
  };
}

// ==================== FONCTIONS DE BASE ====================
// 初始化语音识别
function initRecognition() {
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript;
      document.getElementById('userSpeech').textContent = userSpeech;
      
      // Évaluation de la prononciation (similaire à avant)
      const targetSentence = currentConversation[currentRole][promptIndex];
      const score = evaluatePronunciation(userSpeech, targetSentence);
      document.getElementById('pronunciationScore').textContent = `${score}/100`;

      addToHistory(`你 (${currentRole})`, userSpeech);
    };

    recognition.onerror = (event) => {
      console.error("识别错误：", event.error);
      document.getElementById('userSpeech').textContent = "识别失败，请重试";
      document.getElementById('pronunciationScore').textContent = "0/100";
    };

    recognition.onend = () => {
      isListening = false;
      document.getElementById('startBtn').style.display = "inline-block";
      document.getElementById('systemReplyBtn').disabled = false;
    };
  } else {
    alert("你的浏览器不支持Web Speech API（推荐使用Chrome）");
  }
}

// 开始监听语音
function startListening() {
  if (!isListening && recognition) {
    resetResult();
    document.getElementById('systemReplyBtn').disabled = true;
    recognition.start();
    isListening = true;
    document.getElementById('startBtn').style.display = "none";
    document.getElementById('stopListeningBtn').style.display = "inline-block";
  }
}

// 停止监听
function stopListening() {
  if (isListening && recognition) {
    recognition.stop();
    isListening = false;
    document.getElementById('startBtn').style.display = "inline-block";
    document.getElementById('stopListeningBtn').style.display = "none";
  }
}

// 切换角色
function switchRole() {
  currentRole = currentRole === "A" ? "B" : "A";
  promptIndex = 0;
  updatePrompt();
  addToHistory("系统", `已切换到角色${currentRole}`);
  resetResult();
}

// 更新提示句子
function updatePrompt() {
  const promptElement = document.getElementById('currentPrompt');
  if (currentConversation && currentConversation[currentRole]) {
    promptElement.textContent = `${currentRole}: ${currentConversation[currentRole][promptIndex]}`;
  } else {
    promptElement.textContent = "对话加载中...";
  }
}

// 系统回应
function systemReply() {
  if (!currentConversation || !currentConversation[currentRole]) return;
  
  const targetRole = currentRole === "A" ? "B" : "A";
  const replySentence = currentConversation[targetRole][promptIndex];
  
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(replySentence);
  utterance.lang = "en-US";
  synth.speak(utterance);

  addToHistory(`系统 (${targetRole})`, replySentence);

  promptIndex = (promptIndex + 1) % currentConversation[currentRole].length;
  updatePrompt();
  resetResult();
}

// 新随机对话（使用 le modèle génératif）
function newRandomConversation() {
  currentConversation = generateRandomConversationFromTemplate();
  currentRole = "A";
  promptIndex = 0;
  updatePrompt();
  resetResult();
  clearHistory();
  addToHistory("系统", `新对话主题：${currentConversation.topic} 已生成，请开始练习！`);
}

// 评估发音（identique à avant）
function evaluatePronunciation(userText, targetText) {
  const cleanUser = userText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  const cleanTarget = targetText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  
  let matchingChars = 0;
  const minLength = Math.min(cleanUser.length, cleanTarget.length);
  
  for (let i = 0; i < minLength; i++) {
    if (cleanUser[i] === cleanTarget[i]) {
      matchingChars++;
    }
  }
  
  let similarityScore = Math.round((matchingChars / cleanTarget.length) * 100);
  const randomFactor = Math.floor(Math.random() * 21) - 10; 
  similarityScore = Math.max(0, Math.min(100, similarityScore + randomFactor));
  
  return similarityScore;
}

// 重置结果区域
function resetResult() {
  document.getElementById('userSpeech').textContent = "-";
  document.getElementById('pronunciationScore').textContent = "--/100";
}

// Après avoir obtenu le score et le thème
updateProgress(score, currentConversation.topic);

// 添加到对话历史
function addToHistory(sender, message) {
  const historyDiv = document.getElementById('dialogueHistory');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender.includes("系统") ? "system" : "user"}`;
  messageDiv.innerHTML = `<p><strong>${sender}</strong>：${message}</p>`;
  historyDiv.appendChild(messageDiv);
  historyDiv.scrollTop = historyDiv.scrollHeight;
}

// 清除历史记录
function clearHistory() {
  const historyDiv = document.getElementById('dialogueHistory');
  historyDiv.innerHTML = '';
}

// 页面加载时初始化
window.onload = () => {
  initRecognition();
  newRandomConversation(); // Générer une conversation immédiatement
};