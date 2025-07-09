const allCountries = {
  非洲: [ 
  { name: "阿尔及利亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/330px-Flag_of_Algeria.svg.png" },
  { name: "安哥拉", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/330px-Flag_of_Angola.svg.png" },
  { name: "贝宁", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/330px-Flag_of_Benin.svg.png" },
  { name: "博茨瓦纳", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_Botswana.svg/330px-Flag_of_Botswana.svg.png" },
  { name: "布基纳法索", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/330px-Flag_of_Burkina_Faso.svg.png" },
  { name: "布隆迪", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Burundi.svg/330px-Flag_of_Burundi.svg.png" },
  { name: "佛得角", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Cape_Verde.svg/330px-Flag_of_Cape_Verde.svg.png" },
  { name: "喀麦隆", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/330px-Flag_of_Cameroon.svg.png" },
  { name: "乍得", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Flag_of_Chad.svg/330px-Flag_of_Chad.svg.png" },
  { name: "科摩罗", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/330px-Flag_of_the_Comoros.svg.png" },
  { name: "刚果共和国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_the_Republic_of_the_Congo.svg/330px-Flag_of_the_Republic_of_the_Congo.svg.png" },
  { name: "科特迪瓦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/330px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png" },
  { name: "埃及", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/330px-Flag_of_Egypt.svg.png" },
  { name: "厄立特里亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/330px-Flag_of_Eritrea.svg.png" },
  { name: "斯威士兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Eswatini.svg/330px-Flag_of_Eswatini.svg.png" },
  { name: "埃塞俄比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/330px-Flag_of_Ethiopia.svg.png" },
  { name: "加蓬", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Gabon.svg/330px-Flag_of_Gabon.svg.png" },
  { name: "冈比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_The_Gambia.svg/330px-Flag_of_The_Gambia.svg.png" },
  { name: "加纳", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/330px-Flag_of_Ghana.svg.png" },
  { name: "几内亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/330px-Flag_of_Guinea.svg.png" },
  { name: "几内亚比绍", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/330px-Flag_of_Guinea-Bissau.svg.png" },
  { name: "赤道几内亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Equatorial_Guinea.svg/330px-Flag_of_Equatorial_Guinea.svg.png" },
  { name: "肯尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/330px-Flag_of_Kenya.svg.png" },
  { name: "莱索托", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Lesotho.svg/330px-Flag_of_Lesotho.svg.png" },
  { name: "利比里亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_Liberia.svg/330px-Flag_of_Liberia.svg.png" },
  { name: "利比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Libya.svg/330px-Flag_of_Libya.svg.png" },
  { name: "马达加斯加", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Madagascar.svg/330px-Flag_of_Madagascar.svg.png" },
  { name: "马拉维", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_Malawi.svg/330px-Flag_of_Malawi.svg.png" },
  { name: "马里", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/330px-Flag_of_Mali.svg.png" },
  { name: "摩洛哥", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/330px-Flag_of_Morocco.svg.png" },
  { name: "毛里求斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Mauritius.svg/330px-Flag_of_Mauritius.svg.png" },
  { name: "毛里塔尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/330px-Flag_of_Mauritania.svg.png" },
  { name: "莫桑比克", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/330px-Flag_of_Mozambique.svg.png" },
  { name: "纳米比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/330px-Flag_of_Namibia.svg.png" },
  { name: "尼日尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Flag_of_Niger.svg/330px-Flag_of_Niger.svg.png" },
  { name: "尼日利亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/330px-Flag_of_Nigeria.svg.png" },
  { name: "中非共和国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Central_African_Republic.svg/330px-Flag_of_the_Central_African_Republic.svg.png" },
  { name: "刚果民主共和国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/330px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png" },
  { name: "卢旺达", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/330px-Flag_of_Rwanda.svg.png" },
  { name: "圣多美和普林西比", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe.svg/330px-Flag_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe.svg.png" },
  { name: "塞内加尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/330px-Flag_of_Senegal.svg.png" },
  { name: "塞舌尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Seychelles.svg/330px-Flag_of_Seychelles.svg.png" },
  { name: "塞拉利昂", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Sierra_Leone.svg/330px-Flag_of_Sierra_Leone.svg.png" },
  { name: "索马里", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Somalia.svg/330px-Flag_of_Somalia.svg.png" },
  { name: "南非", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/330px-Flag_of_South_Africa.svg.png" },
  { name: "苏丹", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/330px-Flag_of_Sudan.svg.png" },
  { name: "南苏丹", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_South_Sudan.svg/330px-Flag_of_South_Sudan.svg.png" },
  { name: "坦桑尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/330px-Flag_of_Tanzania.svg.png" },
  { name: "多哥", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/330px-Flag_of_Togo.svg.png" },
  { name: "突尼斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/330px-Flag_of_Tunisia.svg.png" },
  { name: "乌干达", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/330px-Flag_of_Uganda.svg.png" },
  { name: "吉布提", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Djibouti.svg/330px-Flag_of_Djibouti.svg.png" },
  { name: "赞比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/330px-Flag_of_Zambia.svg.png" },
  { name: "津巴布韦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/330px-Flag_of_Zimbabwe.svg.png" }
  ],
  美洲: [
  { name: "安提瓜和巴布达", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/330px-Flag_of_Antigua_and_Barbuda.svg.png" },
  { name: "阿根廷", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/330px-Flag_of_Argentina.svg.png" },
  { name: "巴哈马", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_the_Bahamas.svg/330px-Flag_of_the_Bahamas.svg.png" },
  { name: "巴巴多斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Barbados.svg/330px-Flag_of_Barbados.svg.png" },
  { name: "伯利兹", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/330px-Flag_of_Belize.svg.png" },
  { name: "玻利维亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/330px-Flag_of_Bolivia.svg.png" },
  { name: "巴西", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/330px-Flag_of_Brazil.svg.png" },
  { name: "加拿大", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/330px-Flag_of_Canada_%28Pantone%29.svg.png" },
  { name: "智利", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/330px-Flag_of_Chile.svg.png" },
  { name: "哥伦比亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/330px-Flag_of_Colombia.svg.png" },
  { name: "哥斯达黎加", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/330px-Flag_of_Costa_Rica.svg.png" },
  { name: "古巴", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Cuba.svg/330px-Flag_of_Cuba.svg.png" },
  { name: "多米尼克", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Dominica.svg/330px-Flag_of_Dominica.svg.png" },
  { name: "厄瓜多尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/330px-Flag_of_Ecuador.svg.png" },
  { name: "萨尔瓦多", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/330px-Flag_of_El_Salvador.svg.png" },
  { name: "美国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/330px-Flag_of_the_United_States_%28Pantone%29.svg.png" },
  { name: "格林纳达", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Bandera_de_Granada_%28Granada%29.svg/250px-Bandera_de_Granada_%28Granada%29.svg.png" },
  { name: "危地马拉", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_Guatemala.svg/330px-Flag_of_Guatemala.svg.png" },
  { name: "圭亚那", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_Guyana.svg/330px-Flag_of_Guyana.svg.png" },
  { name: "海地", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Haiti.svg/330px-Flag_of_Haiti.svg.png" },
  { name: "洪都拉斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Honduras_%282022-%29.svg/330px-Flag_of_Honduras_%282022-%29.svg.png" },
  { name: "牙买加", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/330px-Flag_of_Jamaica.svg.png" },
  { name: "墨西哥", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/330px-Flag_of_Mexico.svg.png" },
  { name: "尼加拉瓜", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Nicaragua.svg/330px-Flag_of_Nicaragua.svg.png" },
  { name: "巴拿马", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/330px-Flag_of_Panama.svg.png" },
  { name: "巴拉圭", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Paraguay.svg/330px-Flag_of_Paraguay.svg.png" },
  { name: "秘鲁", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/330px-Flag_of_Peru.svg.png" },
  { name: "多米尼加共和国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_the_Dominican_Republic.svg/330px-Flag_of_the_Dominican_Republic.svg.png" },
  { name: "圣基茨和尼维斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg/330px-Flag_of_Saint_Kitts_and_Nevis.svg.png" },
  { name: "圣文森特和格林纳丁斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg/330px-Flag_of_Saint_Vincent_and_the_Grenadines.svg.png" },
  { name: "圣卢西亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Saint_Lucia.svg/330px-Flag_of_Saint_Lucia.svg.png" },
  { name: "苏里南", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flag_of_Suriname.svg/330px-Flag_of_Suriname.svg.png" },
  { name: "特立尼达和多巴哥", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Trinidad_and_Tobago.svg/330px-Flag_of_Trinidad_and_Tobago.svg.png" },
  { name: "乌拉圭", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/330px-Flag_of_Uruguay.svg.png" },
  { name: "委内瑞拉", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/330px-Flag_of_Venezuela.svg.png" }
  ],
  亚洲: [
     { name: "阿富汗", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/330px-Flag_of_the_Taliban.svg.png" },
  { name: "沙特阿拉伯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/330px-Flag_of_Saudi_Arabia.svg.png" },
  { name: "亚美尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/330px-Flag_of_Armenia.svg.png" },
  { name: "阿塞拜疆", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/330px-Flag_of_Azerbaijan.svg.png" },
  { name: "巴林", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/330px-Flag_of_Bahrain.svg.png" },
  { name: "孟加拉国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/330px-Flag_of_Bangladesh.svg.png" },
  { name: "缅甸", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/330px-Flag_of_Myanmar.svg.png" },
  { name: "文莱", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Brunei.svg/330px-Flag_of_Brunei.svg.png" },
  { name: "不丹", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Flag_of_Bhutan.svg/330px-Flag_of_Bhutan.svg.png" },
  { name: "柬埔寨", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/330px-Flag_of_Cambodia.svg.png" },
  { name: "卡塔尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/330px-Flag_of_Qatar.svg.png" },
  { name: "中国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/330px-Flag_of_the_People%27s_Republic_of_China.svg.png" },
  { name: "塞浦路斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/330px-Flag_of_Cyprus.svg.png" },
  { name: "朝鲜", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/330px-Flag_of_North_Korea.svg.png" },
  { name: "韩国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/330px-Flag_of_South_Korea.svg.png" },
  { name: "阿联酋", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/330px-Flag_of_the_United_Arab_Emirates.svg.png" },
  { name: "菲律宾", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/330px-Flag_of_the_Philippines.svg.png" },
  { name: "格鲁吉亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/330px-Flag_of_Georgia.svg.png" },
  { name: "印度", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/330px-Flag_of_India.svg.png" },
  { name: "印度尼西亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/330px-Flag_of_Indonesia.svg.png" },
  { name: "伊拉克", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/330px-Flag_of_Iraq.svg.png" },
  { name: "伊朗", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_Iran_%28official%29.svg/330px-Flag_of_Iran_%28official%29.svg.png" },
  { name: "以色列", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/330px-Flag_of_Israel.svg.png" },
  { name: "日本", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/510px-Flag_of_Japan.svg.png" },
  { name: "约旦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/330px-Flag_of_Jordan.svg.png" },
  { name: "哈萨克斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/330px-Flag_of_Kazakhstan.svg.png" },
  { name: "吉尔吉斯斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/330px-Flag_of_Kyrgyzstan.svg.png" },
  { name: "科威特", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/330px-Flag_of_Kuwait.svg.png" },
  { name: "老挝", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/330px-Flag_of_Laos.svg.png" },
  { name: "黎巴嫩", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/330px-Flag_of_Lebanon.svg.png" },
  { name: "马来西亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/330px-Flag_of_Malaysia.svg.png" },
  { name: "马尔代夫", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Maldives.svg/330px-Flag_of_Maldives.svg.png" },
  { name: "蒙古", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/330px-Flag_of_Mongolia.svg.png" },
  { name: "尼泊尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/250px-Flag_of_Nepal.svg.png" },
  { name: "阿曼", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/330px-Flag_of_Oman.svg.png" },
  { name: "巴基斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/330px-Flag_of_Pakistan.svg.png" },
  { name: "巴勒斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/330px-Flag_of_Palestine.svg.png" },
  { name: "俄罗斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/330px-Flag_of_Russia.svg.png" },
  { name: "新加坡", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/330px-Flag_of_Singapore.svg.png" },
  { name: "叙利亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Syria_%282025-%29.svg/330px-Flag_of_Syria_%282025-%29.svg.png" },
  { name: "斯里兰卡", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/330px-Flag_of_Sri_Lanka.svg.png" },
  { name: "泰国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/330px-Flag_of_Thailand.svg.png" },
  { name: "塔吉克斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/330px-Flag_of_Tajikistan.svg.png" },
  { name: "东帝汶", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_East_Timor.svg/330px-Flag_of_East_Timor.svg.png" },
  { name: "土耳其", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/330px-Flag_of_Turkey.svg.png" },
  { name: "土库曼斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/330px-Flag_of_Turkmenistan.svg.png" },
  { name: "乌兹别克斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/330px-Flag_of_Uzbekistan.svg.png" },
  { name: "越南", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/330px-Flag_of_Vietnam.svg.png" },
  { name: "也门", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Yemen.svg/330px-Flag_of_Yemen.svg.png" }
  ],
  欧洲: [
    { name: "阿尔巴尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/330px-Flag_of_Albania.svg.png" },
    { name: "德国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/330px-Flag_of_Germany.svg.png" },
    { name: "安道尔", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/330px-Flag_of_Andorra.svg.png" },
    { name: "奥地利", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/330px-Flag_of_Austria.svg.png" },
    { name: "比利时", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/330px-Flag_of_Belgium.svg.png" },
    { name: "白俄罗斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/330px-Flag_of_Belarus.svg.png" },
    { name: "波黑", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/330px-Flag_of_Bosnia_and_Herzegovina.svg.png" },
    { name: "保加利亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/330px-Flag_of_Bulgaria.svg.png" },
    { name: "梵蒂冈", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Flag_of_Vatican_City_%282023%E2%80%93present%29.svg/250px-Flag_of_Vatican_City_%282023%E2%80%93present%29.svg.png" },
    { name: "克罗地亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/330px-Flag_of_Croatia.svg.png" },
    { name: "丹麦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/250px-Flag_of_Denmark.svg.png" },
    { name: "斯洛伐克", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/330px-Flag_of_Slovakia.svg.png" },
    { name: "斯洛文尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/330px-Flag_of_Slovenia.svg.png" },
    { name: "西班牙", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/330px-Bandera_de_Espa%C3%B1a.svg.png" },
    { name: "爱沙尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/330px-Flag_of_Estonia.svg.png" },
    { name: "芬兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/960px-Flag_of_Finland.svg.png" },
    { name: "法国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/330px-Flag_of_France.svg.png" },
    { name: "格鲁吉亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/330px-Flag_of_Georgia.svg.png" },
    { name: "希腊", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/330px-Flag_of_Greece.svg.png" },
    { name: "匈牙利", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/330px-Flag_of_Hungary.svg.png" },
    { name: "爱尔兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/330px-Flag_of_Ireland.svg.png" },
    { name: "冰岛", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/330px-Flag_of_Iceland.svg.png" },
    { name: "意大利", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/330px-Flag_of_Italy.svg.png" },
    { name: "哈萨克斯坦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/330px-Flag_of_Kazakhstan.svg.png" },
    { name: "科索沃", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Kosovo.svg/330px-Flag_of_Kosovo.svg.png" },
    { name: "拉脱维亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/330px-Flag_of_Latvia.svg.png" },
    { name: "列支敦士登", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Liechtenstein.svg/330px-Flag_of_Liechtenstein.svg.png" },
    { name: "立陶宛", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/330px-Flag_of_Lithuania.svg.png" },
    { name: "卢森堡", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/330px-Flag_of_Luxembourg.svg.png" },
    { name: "马耳他", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/330px-Flag_of_Malta.svg.png" },
    { name: "摩尔多瓦", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/330px-Flag_of_Moldova.svg.png" },
    { name: "摩纳哥", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/330px-Flag_of_Monaco.svg.png" },
    { name: "黑山", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Montenegro.svg/330px-Flag_of_Montenegro.svg.png" },
    { name: "挪威", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/330px-Flag_of_Norway.svg.png" },
    { name: "荷兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/330px-Flag_of_the_Netherlands.svg.png" },
    { name: "波兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/330px-Flag_of_Poland.svg.png" },
    { name: "葡萄牙", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Flag_of_Portugal_%28official%29.svg/330px-Flag_of_Portugal_%28official%29.svg.png" },
    { name: "英国", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/330px-Flag_of_the_United_Kingdom_%281-2%29.svg.png" },
    { name: "捷克", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/330px-Flag_of_the_Czech_Republic.svg.png" },
    { name: "罗马尼亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/330px-Flag_of_Romania.svg.png" },
    { name: "俄罗斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/330px-Flag_of_Russia.svg.png" },
    { name: "圣马力诺", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_San_Marino.svg/330px-Flag_of_San_Marino.svg.png" },
    { name: "塞尔维亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/330px-Flag_of_Serbia.svg.png" },
    { name: "瑞典", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/330px-Flag_of_Sweden.svg.png" },
    { name: "瑞士", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Flag_of_Switzerland_%28Pantone%29.svg/250px-Flag_of_Switzerland_%28Pantone%29.svg.png" },
    { name: "乌克兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/330px-Flag_of_Ukraine.svg.png" }
  ],
  大洋洲: [
    { name: "澳大利亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/330px-Flag_of_Australia_%28converted%29.svg.png" },
  { name: "斐济", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Fiji.svg/330px-Flag_of_Fiji.svg.png" },
  { name: "马绍尔群岛", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_the_Marshall_Islands.svg/330px-Flag_of_the_Marshall_Islands.svg.png" },
  { name: "所罗门群岛", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Solomon_Islands.svg/330px-Flag_of_the_Solomon_Islands.svg.png" },
  { name: "基里巴斯", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kiribati.svg/330px-Flag_of_Kiribati.svg.png" },
  { name: "密克罗尼西亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg/510px-Flag_of_the_Federated_States_of_Micronesia.svg.png" },
  { name: "瑙鲁", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Flag_of_Nauru.svg/330px-Flag_of_Nauru.svg.png" },
  { name: "新西兰", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/330px-Flag_of_New_Zealand.svg.png" },
  { name: "帕劳", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Palau.svg/330px-Flag_of_Palau.svg.png" },
  { name: "巴布亚新几内亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Papua_New_Guinea.svg/330px-Flag_of_Papua_New_Guinea.svg.png" },
  { name: "萨摩亚", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Samoa.svg/330px-Flag_of_Samoa.svg.png" },
  { name: "汤加", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Tonga.svg/330px-Flag_of_Tonga.svg.png" },
  { name: "图瓦卢", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tuvalu.svg/330px-Flag_of_Tuvalu.svg.png" },
  { name: "瓦努阿图", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Vanuatu.svg/330px-Flag_of_Vanuatu.svg.png" }
  ]
};

let selectedCountries = [];
let currentIndex = 0;
let score = 0;
let incorrect = 0;
let totalFlags = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const quitBtn = document.getElementById("quit-btn");
const flagContainer = document.getElementById("flag-container");
const flagImg = document.getElementById("flag-img");
const optionsBox = document.getElementById("options");
const feedbackBox = document.getElementById("feedback");
const resultBox = document.getElementById("result");
const counterBox = document.getElementById("counter");
const continentSelect = document.getElementById("continent-select");
const selectorBox = document.getElementById("selector-box");

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function updateCounter() {
  counterBox.innerText = `${currentIndex + 1}/${totalFlags} 面国旗`;
  counterBox.style.display = "block";
}

function startGame() {
  const selectedContinent = continentSelect.value;
  if (selectedContinent === "全部") {
    selectedCountries = Object.values(allCountries).flat();
  } else {
    selectedCountries = allCountries[selectedContinent];
  }

  selectedCountries = shuffleArray([...selectedCountries]);
  currentIndex = 0;
  score = 0;
  incorrect = 0;
  totalFlags = selectedCountries.length;

  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  quitBtn.style.display = "inline-block";
  selectorBox.style.display = "none";
  flagContainer.style.display = "block";
  resultBox.style.display = "none";
  resultBox.innerText = "";
  showNextFlag();
}

function showNextFlag() {
  if (currentIndex >= selectedCountries.length) {
    endGame();
    return;
  }

  const current = selectedCountries[currentIndex];
  flagImg.src = current.url;
  updateCounter();

  const options = [current.name];
  while (options.length < 4) {
    const random = selectedCountries[Math.floor(Math.random() * selectedCountries.length)];
    if (!options.includes(random.name)) options.push(random.name);
  }

  const shuffled = shuffleArray(options);
  optionsBox.innerHTML = "";
  feedbackBox.innerText = "";

  shuffled.forEach(name => {
    const btn = document.createElement("button");
    btn.innerText = name;
    btn.onclick = () => {
      if (name === current.name) {
        score++;
        feedbackBox.innerText = "正确！";
      } else {
        incorrect++;
        feedbackBox.innerText = ` 错了！正确答案是: ${current.name}`;
      }
      currentIndex++;
      updateCounter();
      setTimeout(showNextFlag, 1200);
    };
    optionsBox.appendChild(btn);
  });
}

function endGame() {
  flagContainer.style.display = "none";
  resultBox.style.display = "block";
  feedbackBox.innerText = "";
  resultBox.innerHTML = `游戏结束！<br>
  <i class="fa-solid fa-circle-check" style="color:rgb(53, 56, 53);"></i> 正确：${score}
<i class="fa-solid fa-circle-xmark" style="color: rgb(53, 56, 53); margin-left: 10px;"></i> 错误：${incorrect}  
<i class="fa-solid fa-circle-question" style="color: rgb(53, 56, 53); margin-left: 10px;"></i> 未答：${totalFlags - currentIndex}
  `;
  restartBtn.style.display = "inline-block";
  quitBtn.style.display = "none";
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", () => {
  selectorBox.style.display = "block";
  startBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  resultBox.style.display = "none";
  resultBox.innerText = "";
  counterBox.style.display = "none";
});
quitBtn.addEventListener("click", endGame);