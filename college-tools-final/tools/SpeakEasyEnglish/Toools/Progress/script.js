// ==================== STOCKAGE DES DONNÉES ====================
// Utilisation de localStorage pour enregistrer la progression
const PROGRESS_KEY = "speakeasy_progress";

// Structure des données de progression
const initialProgress = {
  conversationCount: 0,    // Nombre de conversations terminées
  totalScore: 0,           // Somme des scores de prononciation
  totalTime: 0,            // Durée totale d'entraînement (minutes)
  history: []              // Historique détaillé : { date, score, topic }
};

// Récupérer les données de progression
function getProgressData() {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : initialProgress;
}

// Enregistrer les données de progression
function saveProgressData(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

// ==================== MISE À JOUR DE LA PROGRESSION ====================
// Mettre à jour les données lors d'une nouvelle conversation
function updateProgress(score, topic) {
  const progress = getProgressData();
  
  // Mettre à jour les compteurs
  progress.conversationCount++;
  progress.totalScore += score;
  progress.totalTime += Math.floor(Math.random() * 5) + 1; // Durée aléatoire (1-5 minutes)
  
  // Ajouter à l'historique
  const now = new Date();
  const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  progress.history.unshift({
    date: dateString,
    score: score,
    topic: topic
  });
  
  // Enregistrer
  saveProgressData(progress);
  
  // Mettre à jour l'affichage
  renderProgress();
}

// ==================== AFFICHAGE DE LA PROGRESSION ====================
// Afficher les données dans la page
function renderProgress() {
  const progress = getProgressData();
  
  // Nombre de conversations
  document.getElementById("conversation-count").textContent = progress.conversationCount;
  
  // Score moyen
  const average = progress.conversationCount > 0 
    ? Math.round(progress.totalScore / progress.conversationCount) 
    : "--";
  document.getElementById("average-score").textContent = `${average}/100`;
  
  // Durée totale
  document.getElementById("total-time").textContent = `${progress.totalTime} 分钟`;
  
  // Historique détaillé
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = ""; // Vider l'historique
  
  progress.history.forEach(item => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerHTML = `
      <span>${item.date}</span> | 
      <span>评分: ${item.score}/100</span> | 
      <span>主题: ${item.topic}</span>
    `;
    historyList.appendChild(historyItem);
  });
}

// ==================== INITIALISATION ====================
// Au chargement de la page
window.onload = () => {
  renderProgress();
};