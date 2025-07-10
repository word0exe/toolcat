function getChineseZodiac(year) {
  const zodiacs = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
  return zodiacs[(year - 1900) % 12];
}

function getWesternZodiac(month, day) {
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "水瓶座 (Aquarius)";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "双鱼座 (Pisces)";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "白羊座 (Aries)";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "金牛座 (Taurus)";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "双子座 (Gemini)";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "巨蟹座 (Cancer)";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "狮子座 (Leo)";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "处女座 (Virgo)";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "天秤座 (Libra)";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "天蝎座 (Scorpio)";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "射手座 (Sagittarius)";
  return "摩羯座 (Capricorn)";
}

function getFortune() {
  const fortunes = [
    "✨ 好运就在转角遇见你",
    "🌟 今天适合做大胆的决定",
    "🍀 你将遇到一位特别的人",
    "💰 钱财运上升，记得微笑",
    "📚 多读书会带来惊喜灵感",
    "🎯 今天目标明确，事半功倍",
    "🌈 运气爆棚，连水都特别甜",
    "🧃 放松一下，会有意外好消息"
  ];
  return fortunes[Math.floor(Math.random() * fortunes.length)];
}

function showInfo() {
  const input = document.getElementById("birthdate").value;
  const output = document.getElementById("output");

  if (!input) return alert("请输入你的生日！");

  const birth = new Date(input);
  const now = new Date();

  let ageYears = now.getFullYear() - birth.getFullYear();
  let ageMonths = now.getMonth() - birth.getMonth();
  let ageDays = now.getDate() - birth.getDate();

  if (ageDays < 0) {
    ageDays += 30;
    ageMonths--;
  }
  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  const zodiac = getChineseZodiac(birth.getFullYear());
  const constellation = getWesternZodiac(birth.getMonth() + 1, birth.getDate());
  const luckyNumber = Math.floor(Math.random() * 99) + 1;
  const fortune = getFortune();

  output.innerHTML = `
    🎂 你的年龄是：${ageYears} 岁 ${ageMonths} 个月 ${ageDays} 天<br>
    🐲 你的生肖是：${zodiac}<br>
    🔮 你的星座是：${constellation}<br>
    🍀 你的幸运数字是：${luckyNumber}<br>
    🃏 今日运势预测：${fortune}
  `;
  output.classList.remove("hidden");
}