// 状态初始化
let currentRole = "A";
let isListening = false;
let recognition;
let promptIndex = 0;
let currentConversation = null;

// ==================== 对话生成系统 ====================
// 预定义对话模板
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

// 从模板生成随机对话
function generateRandomConversationFromTemplate() {
  const randomTemplate = conversationTemplates[Math.floor(Math.random() * conversationTemplates.length)];
  
  const replaceTags = (sentence, replacements) => {
    return sentence.replace(/{[^}]+}/g, (tag) => {
      const options = replacements[tag] || [];
      return options[Math.floor(Math.random() * options.length)] || tag;
    });
  };
  
  const generatedA = randomTemplate.A.map(sentence => replaceTags(sentence, randomTemplate.replacements));
  const generatedB = randomTemplate.B.map(sentence => replaceTags(sentence, randomTemplate.replacements));
  
  return {
    topic: randomTemplate.topic,
    A: generatedA,
    B: generatedB
  };
}

// ==================== 语音识别系统 ====================
// 初始化语音识别
function initRecognition() {
  // 检查浏览器兼容性
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (window.SpeechRecognition) {
    recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US'; // 设置为英语
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // 识别成功时的回调
    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript;
      document.getElementById('userSpeech').textContent = userSpeech;
      
      // 评估发音
      const targetSentence = currentConversation[currentRole][promptIndex];
      const score = evaluatePronunciation(userSpeech, targetSentence);
      document.getElementById('pronunciationScore').textContent = `${score}/100`;

      addToHistory(`你 (${currentRole})`, userSpeech);
    };

    // 识别错误时的回调
    recognition.onerror = (event) => {
      console.error("识别错误:", event.error);
      
      // 显示友好的错误信息
      let errorMessage = "识别错误";
      switch (event.error) {
        case "not-allowed":
          errorMessage = "请允许麦克风访问权限";
          break;
        case "audio-capture":
          errorMessage = "无法访问麦克风";
          break;
        case "network":
          errorMessage = "网络问题导致识别失败";
          break;
      }
      
      document.getElementById('userSpeech').textContent = errorMessage;
      document.getElementById('pronunciationScore').textContent = "0/100";
    };

    // 识别结束时的回调
    recognition.onend = () => {
      isListening = false;
      document.getElementById('startBtn').style.display = "inline-block";
      document.getElementById('stopBtn').style.display = "none";
      document.getElementById('systemReplyBtn').disabled = false;
    };

  } else {
    // 浏览器不支持语音识别
    alert("您的浏览器不支持语音识别功能。请使用Chrome或Edge浏览器。");
    document.getElementById('startBtn').disabled = true;
    document.getElementById('startBtn').innerHTML = '<i class="fa-solid fa-microphone-slash"></i> 语音不可用';
  }
}

// 开始监听语音
function startListening() {
  if (!isListening && recognition) {
    try {
      resetResult();
      document.getElementById('systemReplyBtn').disabled = true;
      recognition.start();
      isListening = true;
      
      // 更新UI状态
      document.getElementById('startBtn').style.display = "none";
      document.getElementById('stopBtn').style.display = "inline-block";
      
      // 显示录音指示
      document.getElementById('userSpeech').textContent = "正在聆听...";
      document.getElementById('pronunciationScore').textContent = "--/100";
      
      console.log("语音识别已启动");
    } catch (error) {
      console.error("启动识别失败:", error);
      alert("无法启动语音识别，请刷新页面重试。");
      
      // 恢复UI状态
      isListening = false;
      document.getElementById('startBtn').style.display = "inline-block";
      document.getElementById('stopBtn').style.display = "none";
      document.getElementById('systemReplyBtn').disabled = false;
    }
  }
}

// 停止监听语音
function stopListening() {
  if (isListening && recognition) {
    recognition.stop();
    isListening = false;
    
    // 更新UI状态
    document.getElementById('startBtn').style.display = "inline-block";
    document.getElementById('stopBtn').style.display = "none";
    
    console.log("语音识别已停止");
  }
}

// ==================== 对话功能 ====================
// 切换角色
function switchRole() {
  currentRole = currentRole === "A" ? "B" : "A";
  promptIndex = 0;
  updatePrompt();
  addToHistory("系统", `已切换到角色${currentRole}`);
  resetResult();
}

// 更新当前提示
function updatePrompt() {
  const promptElement = document.getElementById('currentPrompt');
  if (currentConversation && currentConversation[currentRole]) {
    promptElement.textContent = `${currentRole}: ${currentConversation[currentRole][promptIndex]}`;
  } else {
    promptElement.textContent = "对话加载中...";
  }
}

// 系统回复
function systemReply() {
  if (!currentConversation || !currentConversation[currentRole]) return;
  
  const targetRole = currentRole === "A" ? "B" : "A";
  const replySentence = currentConversation[targetRole][promptIndex];
  
  // 语音合成（系统朗读回复）
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(replySentence);
  utterance.lang = "en-US";
  synth.speak(utterance);

  addToHistory(`系统 (${targetRole})`, replySentence);

  // 移动到下一个对话轮次
  promptIndex = (promptIndex + 1) % currentConversation[currentRole].length;
  updatePrompt();
  resetResult();
}

// 生成新的随机对话
function newRandomConversation() {
  currentConversation = generateRandomConversationFromTemplate();
  currentRole = "A";
  promptIndex = 0;
  updatePrompt();
  resetResult();
  clearHistory();
  addToHistory("系统", `新对话主题：${currentConversation.topic} 已生成，请开始练习！`);
}

// 评估发音（简化版算法）
function evaluatePronunciation(userText, targetText) {
  // 简单相似度计算（实际应用中可以使用更复杂的语音评估API）
  const cleanUser = userText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  const cleanTarget = targetText.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  
  let matchingChars = 0;
  const minLength = Math.min(cleanUser.length, cleanTarget.length);
  
  for (let i = 0; i < minLength; i++) {
    if (cleanUser[i] === cleanTarget[i]) {
      matchingChars++;
    }
  }
  
  // 计算相似度百分比，添加随机波动模拟真实评分
  let similarityScore = Math.round((matchingChars / cleanTarget.length) * 100);
  const randomFactor = Math.floor(Math.random() * 11) - 5; // ±5分的随机波动
  similarityScore = Math.max(0, Math.min(100, similarityScore + randomFactor));
  
  return similarityScore;
}

// 重置结果区域
function resetResult() {
  document.getElementById('userSpeech').textContent = "-";
  document.getElementById('pronunciationScore').textContent = "--/100";
}

// 添加到对话历史
function addToHistory(sender, message) {
  const historyDiv = document.getElementById('dialogueHistory');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender.includes("系统") ? "system" : "user"}`;
  messageDiv.innerHTML = `<p><strong>${sender}</strong>：${message}</p>`;
  historyDiv.appendChild(messageDiv);
  
  // 滚动到底部
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
  newRandomConversation();
  
  // 检查麦克风权限状态
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
      if (permissionStatus.state === 'denied') {
        document.getElementById('userSpeech').textContent = "请允许麦克风访问权限";
      }
    });
  }
};