// 数据库：习语列表及信息
const idiomsDatabase = [
  {
    phrase: "Break a leg",
    meaning: "祝你好运（尤其用于表演前）",
    example: "You have a big presentation today. Break a leg!",
    exampleTranslation: "你今天有个重要的演讲，祝你好运！",
    category: "everyday",
    categoryName: "日常用语"
  },
  {
    phrase: "Piece of cake",
    meaning: "小菜一碟，非常容易",
    example: "The exam was a piece of cake. I finished in 20 minutes.",
    exampleTranslation: "这次考试太简单了，我20分钟就做完了。",
    category: "everyday",
    categoryName: "日常用语"
  },
  {
    phrase: "On cloud nine",
    meaning: "非常开心，欣喜若狂",
    example: "She was on cloud nine after winning the competition.",
    exampleTranslation: "赢得比赛后，她欣喜若狂。",
    category: "emotions",
    categoryName: "情感表达"
  },
  {
    phrase: "Cry over spilt milk",
    meaning: "为已经发生的事懊悔（于事无补）",
    example: "I know you missed the deadline, but there's no use crying over spilt milk.",
    exampleTranslation: "我知道你错过了截止日期，但事已至此，懊悔也没用。",
    category: "emotions",
    categoryName: "情感表达"
  },
  {
    phrase: "Hit the jackpot",
    meaning: "获得巨大成功或好运",
    example: "He hit the jackpot with his new business idea.",
    exampleTranslation: "他凭借新的商业理念获得了巨大成功。",
    category: "success",
    categoryName: "成功与失败"
  },
  {
    phrase: "Burn the midnight oil",
    meaning: "熬夜工作或学习",
    example: "I have to burn the midnight oil to finish this report.",
    exampleTranslation: "我得熬夜完成这份报告。",
    category: "success",
    categoryName: "成功与失败"
  }
];

// 状态初始化
let currentIdiom = idiomsDatabase[0];

// 初始化页面
function init() {
  // 绑定分类筛选事件
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      filterByCategory(this.dataset.category);
    });
  });
  
  // 显示初始习语
  displayIdiom(currentIdiom);
}

// 显示习语详情
function displayIdiom(idiom) {
  document.getElementById('idiom-phrase').textContent = `"${idiom.phrase}"`;
  document.getElementById('idiom-meaning').textContent = idiom.meaning;
  document.getElementById('idiom-example').textContent = `"${idiom.example}"`;
  document.getElementById('example-translation').textContent = idiom.exampleTranslation;
  document.getElementById('idiom-category').textContent = idiom.categoryName;
  
  currentIdiom = idiom;
}

// 随机显示一个习语
function showRandomIdiom() {
  const randomIndex = Math.floor(Math.random() * idiomsDatabase.length);
  displayIdiom(idiomsDatabase[randomIndex]);
}

// 播放发音（使用Web Speech API）
function playPronunciation() {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(currentIdiom.phrase);
  utterance.lang = 'en-US';
  synth.speak(utterance);
}

// 搜索习语
function searchIdiom() {
  const searchTerm = document.getElementById('idiom-search').value.toLowerCase().trim();
  if (!searchTerm) {
    alert('请输入搜索内容');
    return;
  }

  const foundIdiom = idiomsDatabase.find(
    item => item.phrase.toLowerCase().includes(searchTerm) || 
            item.meaning.includes(searchTerm)
  );
  
  if (foundIdom) {
    displayIdiom(foundIdom);
  } else {
    alert('未找到相关习语');
  }
}

// 筛选分类
function filterByCategory(category) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  if (category === 'all') {
    displayIdiom(idiomsDatabase[0]);
    return;
  }
  
  const filtered = idiomsDatabase.filter(item => item.category === category);
  if (filtered.length > 0) {
    displayIdiom(filtered[0]);
  }
}

// 页面加载时初始化
window.onload = init;