window.onerror=function(m,s,l){var e=$('err');if(e){e.style.display='block';e.textContent='⚠ '+m+'（行 '+l+'）'}};
function $(i){return document.getElementById(i)}function ce(t){return document.createElement(t)}
var KEY='hnb1',ok=false,ms=null;try{localStorage.setItem('_','1');localStorage.removeItem('_');ok=true}catch(e){}
// 🌟 全局唯一打包器：所有保存逻辑全走这里，再也不怕漏字段！
function getSaveData() {
  return {
    farmName: S.farmName, 
    farmId: S.farmId, 
    c: S.c, 
    a: S.a, 
    d: S.d, 
    r: S.r, 
    p: S.p, 
    st: S.st, 
    stT: S.stT, 
    st00T: S.st00T, 
    stud: S.stud, 
    studL: S.studL, 
    studT: S.studT, 
    studN: S.studN, 
    ach: S.ach, 
    cap: S.cap, 
    defaultHatchGroup: S.defaultHatchGroup, 
    groups: S.groups, 
    groupOpen: S.groupOpen, 
    eggCap: S.eggCap, 
    head: S.head, 
    headStart: S.headStart, 
    headRace: S.headRace, 
    headLastTick: S.headLastTick, 
    headTerm: S.headTerm, 
    points: S.points, 
    hoof: S.hoof, 
    trainCount: S.trainCount, 
    hoofSubmitted: S.hoofSubmitted, 
    trainFail: S.trainFail, 
    trainSuccess: S.trainSuccess, 
    unlocked00: S.unlocked00, 
    headRaceCount: S.headRaceCount, 
    displayMode: S.displayMode, 
    themeMode: S.themeMode, 
    lastRescue: S.lastRescue, 
    refreshData: S.refreshData
  };
}
function sv(){
  var d = getSaveData();
  if(ok){try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){ok=false;ms=d}}else ms=d;
}
function ld(){var r=null;if(ok){try{r=localStorage.getItem(KEY)}catch(e){}}else if(ms)return al(ms);if(!r)return false;try{return al(JSON.parse(r))}catch(e){return false}}
// 🌟 万能洗刷函数：不管哪里来的马，全在这里补全字段，以后加字段只改这里！
function fixHorse(c, existingHids) {
  if (!c) return c;
  
  // 补全 ID 和 马场信息
  if (!c.hid) { 
    c.hid = genHorseHid(S.farmId, existingHids); 
    if (existingHids) existingHids.push(c.hid);
  }
  if (!c.birthFarmName) c.birthFarmName = S.farmName;
  if (!c.birthFarmId) c.birthFarmId = S.farmId;
  if (!c.currentFarmName) c.currentFarmName = S.farmName;
  if (!c.currentFarmId) c.currentFarmId = S.farmId;
  
  // 补全基础属性
  if (c.name === undefined) c.name = '';
  if (c.hasBeenStud === undefined) c.hasBeenStud = false;
  if (c.trainSpeed === undefined) c.trainSpeed = 0;
  if (c.trained === undefined) c.trained = false;
  if (c.pie === undefined) c.pie = false;
  if (c.pieColor === undefined) c.pieColor = 'w';
  if (c.firefly === undefined) c.firefly = false;
  if (c.induceHerm === undefined) c.induceHerm = false;
  if (c.sterile === undefined) c.sterile = false;
  if (c.doubleWomb === undefined) c.doubleWomb = false;
  if (c.isLocked === undefined) c.isLocked = false;
  if (c.headTerm === undefined) c.headTerm = 0;
  if (c.raceCount === undefined) c.raceCount = 0;
  if (c.isRetiredHead === undefined) c.isRetiredHead = false;
  if (c.group === undefined) c.group = -1;
  if (typeof c.group !== 'number' || c.group >= S.groups.length) c.group = -1;

  // 特典马特殊处理
  if (c.var === 'special_01' || c.var === 'special_00') {
    c.g = {};
    return c;
  }
  
  // 补全基因
  if (!c.id) c.id = uid();
  if (!c.g) c.g = rg();
  
  c.g.col = mapOldColor(c.g.col);
  c.g.wingCol = mapOldColor(c.g.wingCol);
  c.g.tailCol = mapOldColor(c.g.tailCol);
  
  if (!c.g.win) c.g.win = 'none';
  if (!c.g.leg) c.g.leg = pk(P.leg.o).k;
  if (!c.g.bod) c.g.bod = pk(P.bod.o).k;
  if (!c.g.hor) c.g.hor = pk(P.hor.o).k;
  if (!c.g.tai) c.g.tai = pk(P.tai.o).k;
  if (!c.g.eye) c.g.eye = pk(P.eye.o).k;
  
  if (!CL[c.g.col]) c.g.col = pk(CK);
  if (!CL[c.g.wingCol]) c.g.wingCol = pk(CK);
  if (!CL[c.g.tailCol]) c.g.tailCol = pk(CK);
  
  return c;
}
function al(d){
  if(!d) return false;
  
  S.farmName = d.farmName || '我的马场';
  S.farmId = d.farmId || genFarmId();
  S.r = d.r != null ? d.r : 20;
  S.points = d.points || 0;
  S.hoof = d.hoof || 0;
  S.cap = d.cap || 50;
  S.defaultHatchGroup = d.defaultHatchGroup !== undefined ? d.defaultHatchGroup : -1;
  S.groups = d.groups || ['New Cave'];
  S.groups = S.groups.filter(function(item, pos, self) { return self.indexOf(item) == pos; });
  S.groupOpen = d.groupOpen || { '-1': true, '0': true };
  S.eggCap = d.eggCap || 10;
  if(S.cap > CAPMAX) S.cap = CAPMAX;
  S.ach = d.ach || {};
  
  S.p = d.p || {m:0,v:0,i:0,fire:0,dispel:0,hfan:0,hfeng:0,hmix:0,hdrag:0,hnight:0};
  if(S.p.i === undefined) S.p.i = 0;
  if(S.p.fire === undefined) S.p.fire = 0;
  if(S.p.dispel === undefined) S.p.dispel = 0;
  if(S.p.hfan === undefined) S.p.hfan = 0;
  if(S.p.hfeng === undefined) S.p.hfeng = 0;
  if(S.p.hmix === undefined) S.p.hmix = 0;
  if(S.p.hdrag === undefined) S.p.hdrag = 0;
  if(S.p.hnight === undefined) S.p.hnight = 0;
  
  S.trainCount = d.trainCount !== undefined ? d.trainCount : 1;
  S.hoofSubmitted = d.hoofSubmitted || [false,false,false,false,false];
  S.trainFail = d.trainFail || 0;
  S.trainSuccess = d.trainSuccess || 0;
  S.unlocked00 = d.unlocked00 || false;
  S.st = d.st || [];
  S.stT = d.stT || Date.now();
  S.st00T = d.st00T || S.stT;
  
  S.stud = d.stud || null;
  S.studL = d.studL || 0;
  S.studT = d.studT || 0;
  S.studN = d.studN || 0;
  
  S.head = d.head || null;
  S.headStart = d.headStart || 0;
  S.headRace = d.headRace || 0;
  S.headLastTick = d.headLastTick || 0;
  S.headTerm = d.headTerm || 0;
  S.headRaceCount = d.headRaceCount || 0;
  
  S.displayMode = d.displayMode || 'color';
  S.themeMode = d.themeMode || 'dark';
  S.lastRescue = d.lastRescue || 0;
  S.refreshData = d.refreshData || { date: '', s01: 5, s00: 5 };
  
  S.c = d.c || [];
  S.a = d.a || [];
  S.d = d.d || {};
  
  // 核心：统一丢进洗刷机！
  var allHids = [];
  for(var i=0; i<S.c.length; i++) {
    S.c[i] = fixHorse(S.c[i], allHids);
    if(S.c[i].hid) allHids.push(S.c[i].hid);
  }
  for(var j=0; j<S.a.length; j++) {
    S.a[j] = fixHorse(S.a[j], allHids);
    if(S.a[j].hid) allHids.push(S.a[j].hid);
  }
  
  migrateDexColors();
  return true;
}

// ==== 1.20 48色系统 ====
var CL = {
  // 红色系 Rose / Red / Maroon
  rose_light:['浅玫瑰','#dfa3a3','#b37777','#f5d1d1'], rose_std:['红','#b35c5c','#7a3b3b','#d99696'], maroon_dark:['血红','#7a3d3d','#4a2020','#a35c5c'],
  // 橙色系 Peach / Orange / Caramel
  peach_light:['浅桃','#e8c2a6','#b39276','#fae3d1'], orange_std:['橙','#c48154','#8c5532','#e8ac83'], caramel_dark:['焦糖','#8c502b','#5c2e12','#b37547'],
  // 黄色系 Cream / Yellow / Mustard
  cream_light:['奶油黄','#e8dfa6','#b3aa76','#faf5d1'], yellow_std:['黄','#c4af52','#8c7a2e','#e8d683'], mustard_dark:['芥末黄','#8c7a2e','#5c4e12','#b3a052'],
  // 黄绿系 Lime / Pear / Olive
  lime_light:['浅柠绿','#cce6b3','#94b376','#e8f5d1'], pear_std:['梨绿','#8ca354','#5e732e','#b3cc7a'], olive_dark:['橄榄绿','#5e732e','#3b4a12','#8ca354'],
  // 绿色系 Mint / Green / Forest
  mint_light:['薄荷绿','#a6dba6','#76b376','#d1f5d1'], green_std:['绿','#5c8c5c','#365e36','#8cb38c'], forest_dark:['森林绿','#365e36','#1c361c','#5c8c5c'],
  // 青绿系 Aqua / Teal / Pine
  aqua_light:['水蓝','#a6ded9','#76b3ab','#d1f5f0'], teal_std:['青绿','#529189','#2b5e54','#83b3a8'], pine_dark:['松石绿','#2b5e54','#163b33','#529189'],
  // 青色系 Ice / Cyan / Ocean
  ice_light:['冰蓝','#b3e3ed','#83b3b8','#d1f5fa'], cyan_std:['青','#5c9ea6','#366b73','#8cb8bf'], ocean_dark:['深海青','#366b73','#163b42','#5c9ea6'],
  // 蓝色系 Sky / Blue / Navy
  sky_light:['天蓝','#a6cce8','#769bb3','#d1e8fa'], blue_std:['蓝','#5c7ea6','#365473','#8ca3b8'], navy_dark:['海军蓝','#365473','#1a2b40','#5c7ea6'],
  // 靛色系 Iris / Indigo / Night
  iris_light:['鸢尾靛','#b3b8e8','#8389b3','#d1d6fa'], indigo_std:['靛','#5c63a6','#363d73','#8c91b8'], night_dark:['午夜蓝','#363d73','#1a1f40','#5c63a6'],
  // 紫色系 Lilac / Purple / Plum
  lilac_light:['丁香紫','#d4a6e0','#a376b3','#f0d1fa'], purple_std:['紫','#8c5ca6','#5c3673','#b38cc4'], plum_dark:['梅紫','#5c3673','#361c40','#8c5ca6'],
  // 品红系 Ruby / Magenta / Wine
  ruby_light:['宝石红','#e8a6c2','#b37694','#fad1e3'], magenta_std:['品红','#a6547e','#732e54','#d183ac'], wine_dark:['酒红','#732e54','#40162e','#a6547e'],
  // 粉色系 Sakura / Pink / Fuchsia
  sakura_light:['樱花粉','#f5b3c2','#b38391','#ffd1de'], pink_std:['粉','#d17387','#8c4656','#f5a6b8'], fuchsia_dark:['紫罗兰红','#8f3b57','#522033','#bc6783'],
  // 棕色系 (浅沙调成卡其色，区分于浅桃)
sand_light:['浅沙色','#dfcfb4','#a89a85','#f2ead9'], brown_std:['棕','#9c7354','#6b462b','#cc9e7a'], coffee_dark:['深咖啡','#6b462b','#3d2212','#9c7354'],

// 灰色系
silver_light:['浅银灰','#a3a3a3','#7a7a7a','#c2c2c2'], grey_std:['灰','#858585','#5c5c5c','#a3a3a3'], charcoal_dark:['暗炭灰','#666666','#404040','#858585'],

// 黑色系（只留标准黑）
black_std:['黑', '#4d4d4d', '#2e2e2e', '#737373'],

// 白色系（只留标准白）
white_std:['白', '#c8c8c8', '#9c9c9c', '#e0e0e0'],

  // 特殊突变专属色区
// 白化
special_albino: ['白化', '#f5ebeb', '#d6b3b3', '#ffffff'],
// 黑化：
special_melanor: ['黑化', '#2a2a30', '#141418', '#4a4a52']
};

// 🌟 重新定义 CK，排除特殊的白化和黑化，只保留 48 种基础颜色
var CK = Object.keys(CL).filter(function(k) {
  return k !== 'special_albino' && k !== 'special_melanor';
});

function mapOldColor(colorKey) {
  // 如果是新版的 48 色（例如 'rose_std'），直接返回
  if (CL[colorKey]) return colorKey; 
  
  // 核心兼容：只转换旧版的 16 个拼音缩写首字母
  var oldMap = {
    r:'rose_std', o:'orange_std', y:'yellow_std', l:'pear_std', 
    g:'green_std', t:'teal_std', c:'cyan_std', b:'blue_std', 
    i:'indigo_std', p:'purple_std', m:'magenta_std', k:'pink_std', 
    n:'brown_std', a:'grey_std', e:'black_std', w:'white_std'
  };
  
  // 如果能匹配到旧字母，就返回对应的新标准色；匹配不到（比如空值），兜底给个标准灰
  return oldMap[colorKey] || 'grey_std';
}
// 🌟 新增：图鉴颜色迁移
function migrateDexColors() {
    if (!S.d) return;
    var newD = {};
    for (var key in S.d) {
        var item = S.d[key];
        if (item.g) {
            if (item.g.col) item.g.col = mapOldColor(item.g.col);
            if (item.g.wingCol) item.g.wingCol = mapOldColor(item.g.wingCol);
            if (item.g.tailCol) item.g.tailCol = mapOldColor(item.g.tailCol);
            var newKey = sig(item.g); // 重新生成图鉴特征码
            newD[newKey] = item;
        }
    }
    S.d = newD;
}

var P={col:{n:'体色',o:CK.map(function(k){return{k:k,n:CL[k][0],t:'c'}})},wingCol:{n:'翼色',o:CK.map(function(k){return{k:k,n:CL[k][0],t:'c'}})},tailCol:{n:'尾色',o:CK.map(function(k){return{k:k,n:CL[k][0],t:'c'}})},win:{n:'翅膀',o:[{k:'none',n:'无翅',t:'c'},{k:'small',n:'小翼',t:'c'},{k:'bat',n:'蝠翼',t:'r'},{k:'feath',n:'羽翼',t:'r'},{k:'drag',n:'龙翼',t:'e'}]},leg:{n:'四肢',o:[{k:'hoof',n:'普通马蹄',t:'c'},{k:'feath',n:'羽蹄',t:'c'},{k:'cat',n:'猫爪',t:'r'},{k:'drag',n:'龙爪',t:'e'},{k:'cryst',n:'水晶蹄',t:'r'}]},bod:{n:'身体',o:[{k:'plain',n:'无花纹',t:'c'},{k:'spot',n:'斑点',t:'c'},{k:'stripe',n:'条纹',t:'r'},{k:'star',n:'星纹',t:'r'},{k:'scale',n:'鳞甲',t:'e'}]},hor:{n:'角',o:[{k:'none',n:'无角',t:'c'},{k:'single',n:'独角',t:'c'},{k:'twin',n:'双角',t:'r'},{k:'deer',n:'鹿角',t:'r'},{k:'drag',n:'龙角',t:'e'}]},tai:{n:'尾巴',o:[{k:'horse',n:'马尾',t:'c'},{k:'short',n:'短尾',t:'c'},{k:'lion',n:'狮尾',t:'r'},{k:'drag',n:'龙尾',t:'e'},{k:'star',n:'星辉尾',t:'r'}]},eye:{n:'眼睛',o:[{k:'round',n:'圆瞳',t:'c'},{k:'big',n:'大眼',t:'c'},{k:'drag',n:'龙眼',t:'e'},{k:'hetero',n:'异色瞳',t:'r'},{k:'star',n:'星瞳',t:'r'}]}};
var PK=Object.keys(P),TW={c:20,r:8,e:3},RK=['win','leg','bod','hor','tai','eye'];
var MR=0.05,CMI=0.05,MBC=5,HM=600000,CAR=5,SSZ=5,SPR=15,SRM=1800000,MP=200,VP=500,IP=200,FP=50,DP=100,SB=15,SMN=120000,SMX=240000,CAP0=50,CAPSTEP=100,CAPMAX=200,UNSET_FEE=50,TWIN_RATE=0.005,HEAD_FULL=86400000,HEAD_FORCE=172800000,RACE_CD=1800000,TRAIN_COST=50,T3_RATE=0.05;
var EGG_CAP0=10, EGG_CAPMAX=20, EGG_COST=50, EGG_STEP=1;
var MT=['albino','melanor'],VT=['twohead','noneyes','multileg','conjoined'],VN={twohead:'双头',noneyes:'无眼',multileg:'多肢',conjoined:'连体'};
var SX={m:{n:'雄性',s:'♂',c:'m',w:48},f:{n:'雌性',s:'♀',c:'f',w:48},h:{n:'雌雄同体',s:'⚥',c:'h',w:4}};
var ACHS = [
  { id: 'g10', n: '好的开始', d: '繁殖第10代' },
  { id: 'g20', n: '步入正轨', d: '繁殖第20代' },
  { id: 'g50', n: '迭世代', d: '繁殖第50代' },
  { id: 'g100', n: '百连', d: '繁殖第100代' },
  { id: 'allc', n: '普通迪斯科', d: '全常规属性' },
  { id: 'allr', n: '名气不凡', d: '全稀有属性' },
  { id: 'alle', n: '完美生物', d: '全罕见属性' },
  { id: 'bw', n: '黑白无常', d: '白化+黑化' },
  { id: 'sci', n: '疯狂魔法师', d: '全部变异' },
  { id: 'hi', n: '欢迎光临', d: '设置种马' },
  { id: 'bye', n: '明天再来', d: '耗尽种马次数' },
  { id: 'm1', n: '那是……什么？', d: '后代1次突变' },
  { id: 'm2', n: '你为何如此不同？', d: '后代2次突变' },
  { id: 'm3', n: '你是谁？', d: '后代3次突变' },
  { id: 'up', n: '更大更好更强', d: '后代评分高于父母' },
  { id: 'dn', n: '矮子', d: '后代评分低于父母' },
  { id: 'koi', n: '锦鲤', d: '后代颜色与父母不同' },
  { id: 'cap50', n: '开疆扩土', d: '领地扩展至50' },
  { id: 'cap100', n: '百马王子', d: '领地扩展至100' },
  { id: 'cap200', n: '大都市', d: '领地扩展至200' },
  { id: 'dex50', n: '探索者', d: '发现50种图鉴' },
  { id: 'dex100', n: '再深入一点……', d: '发现100种图鉴' },
  { id: 'dex666', n: '恶魔的蛊惑', d: '发现666种图鉴' },
  { id: 'colall', n: '万花筒', d: '集齐16种标准颜色' }, // 描述已更新
  { id: 'same3', n: '超级拼装', d: '三色栏位全相同' },
  { id: 'bodall', n: 'nobody', d: '集齐5种身体' },
  { id: 'horall', n: '号角长鸣', d: '集齐5种角' },
  { id: 'winall', n: '飞行者', d: '集齐5种翅膀' },
  { id: 'legall', n: '利爪', d: '集齐5种爪子' },
  { id: 'taiall', n: '不要玩弄尾巴！', d: '集齐5种尾巴' },
  { id: 'eyeall', n: 'lookmyeye', d: '集齐5种眼睛' },
  { id: 'exhaust', n: '老伏枥骥', d: '耗尽一只马5次繁殖' },
  { id: 'archived', n: '安息日', d: '将一只马归入档案' },
  { id: 'named', n: '你知道我的名字', d: '为一只马起名' },
  { id: 'twin', n: 'Jackpot！', d: '繁育一对双胞胎' },
  { id: 'head', n: '天意', d: '设置一只头马' },
  { id: 'race', n: '马儿快跑', d: '头马参加一场比赛' },
  { id: 'unlucky', n: '倒霉蛋', d: '3次训练未成功后解锁' },
  { id: 'lucky', n: '幸运儿', d: '3次训练成功后解锁' },
  { id: 'speed20', n: '我已启动', d: '头马速度达到20' },
  { id: 'charm40', n: '胜券在握', d: '头马达到魅力值最高加成' },
  { id: 'reward1000', n: '王国资产', d: '头马赢得最大胡萝卜奖金' },
  { id: 'headDead', n: '鞠躬尽瘁，死而后已', d: '头马自然死亡' },
  { id: 'bAlbino', n: '白色幽灵', d: '繁殖诞生白化突变' },
  { id: 'bMelanor', n: '黑色幽灵', d: '繁殖诞生黑化突变' },
  { id: 'bPie', n: '派！', d: '繁殖诞生斑点突变' },
  { id: 'penny', n: '在月亮的另一面，有六枚便士', d: '解锁缄默商店' }
];
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
var ID_CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function idRand(len){var s='';for(var i=0;i<len;i++)s+=ID_CHARSET[Math.floor(Math.random()*ID_CHARSET.length)];return s;}
function genFarmId(){return 'F-'+idRand(6)+'-'+idRand(4);}
function farmIdPrefix(farmId){var p=(farmId||'').split('-');return p.length>=2?p[1]:idRand(6);}
function collectAllHids(){var a=[];for(var i=0;i<S.c.length;i++)if(S.c[i].hid)a.push(S.c[i].hid);for(var j=0;j<S.a.length;j++)if(S.a[j].hid)a.push(S.a[j].hid);return a;}
function genHorseHid(farmId,existing){var pre=farmIdPrefix(farmId);var t=0;while(t<100){var hid=pre+'-'+idRand(4);if(!existing||existing.indexOf(hid)<0)return hid;t++;}return pre+'-'+idRand(6);}
function pk(a){return a[Math.floor(Math.random()*a.length)]}
function fo(k,id){var o=P[k].o;for(var i=0;i<o.length;i++)if(o[i].k===id)return o[i];return o[0]}
function pbw(o){var t=0,i;for(i=0;i<o.length;i++)t+=TW[o[i].t];var r=Math.random()*t;for(i=0;i<o.length;i++){r-=TW[o[i].t];if(r<=0)return o[i]}return o[o.length-1]}
function rg(){var g={};for(var i=0;i<PK.length;i++){var k=PK[i];g[k]=pk(P[k].o).k}return g}
function sig(g){return PK.map(function(k){return g[k]}).join('|')}
function rSx(){var t=0,k;for(k in SX)t+=SX[k].w;var r=Math.random()*t;for(k in SX){r-=SX[k].w;if(r<=0)return k}return 'm'}
function rS(c){var s=0;for(var i=0;i<RK.length;i++){var o=fo(RK[i],c.g[RK[i]]);if(o.t==='e')s+=5;else if(o.t==='r')s+=2}return s}
function rSFull(c){if(c.var==='special_01'||c.var==='special_00')return 40;return rS(c)}
function canBW(a,b){if(a.sx==='h'||b.sx==='h')return true;return a.sx!==b.sx}
function newC(gen, opt) {
  gen = gen || 0;
  opt = opt || {};
  var now = Date.now();
  var sx = rSx();
  var st = false, dw = false;
  if ((sx === 'm' || sx === 'h') && Math.random() < T3_RATE) st = true;
  if ((sx === 'f' || sx === 'h') && Math.random() < T3_RATE) dw = true;
  
  var c = {
    id: uid(),
    gen: gen,
    par: [],
    g: rg(),
    sx: sx,
    mut: null,
    var: null,
    bc: 0,
    cd: 0,
    hat: 0,
    store: !!opt.store,
    sterile: st,
    doubleWomb: dw
  };
  
  if (opt.store) {
    if (Math.random() >= 0.10) c.g.win = 'none';
  } else {
    c.g.win = 'none';
  }
  
  c.hat = opt.inst ? 0 : now + calcHatchTime(c);
  
  // 🌟 丢进洗刷机
  return fixHorse(c);
}

function isH(c){return!c.hat||c.hat<=Date.now()}
function isB(c){return!c.var&&isH(c)}
function calcHatchTime(c){var charm=rS(c);if(charm<1)charm=1;var mins=charm;if(c.mut==='albino'||c.mut==='melanor'||c.pie){mins=mins*2}return mins*60000}
function cdTime(c){var base;var s=rS(c);if(s<11)base=600000;else if(s<21)base=1200000;else base=1800000;if(c.doubleWomb)base=Math.floor(base/2);return base}
function getMaxBc(c){return c.doubleWomb?10:MBC}
function canB(c){if(c.var)return false;if(c.sterile&&!c.tempBreed)return false;if(c.tempBreed)return c.cd<=Date.now();return c.bc<getMaxBc(c)&&c.cd<=Date.now()}
function stTx(c){if(!isH(c)){var s=Math.ceil((c.hat-Date.now())/1000);return{text:'孵化 '+s+'s',cls:'hatch'}}if(c.var)return{text:'变异体·不可繁殖',cls:'used'};if(c.sterile&&!c.tempBreed)return{text:'不育·不可繁殖',cls:'used'};if(c.tempBreed)return{text:'临时繁育 1/1',cls:'ready'};if(c.bc>=getMaxBc(c))return{text:'已用尽',cls:'used'};if(c.cd>Date.now()){var s2=Math.ceil((c.cd-Date.now())/1000);return{text:'冷却 '+Math.floor(s2/60)+':'+String(s2%60).replace(/^(\d)$/,'0$1'),cls:'cool'}}return{text:'可繁育 '+(getMaxBc(c)-c.bc)+'/'+getMaxBc(c),cls:'ready'}}
// ==== breed 1.21 遗传矩阵 ====
function breed(a, b) {
  var g = {}, mus = [];
  
  // 🌟 1. 翅膀独立遗传机制 (不参与品级和 5% 突变判定)
  var aHasW = a.g.win !== 'none', bHasW = b.g.win !== 'none';
  var cHasW = false, targetWing = 'none';
  
  if (!aHasW && !bHasW) {
    cHasW = false; // 无 + 无 = 100% 无
  } else if (aHasW && bHasW) {
    if (a.g.win === b.g.win) {
      // 同类型：70% 遗传
      if (Math.random() < 0.70) { cHasW = true; targetWing = a.g.win; }
    } else {
      // 不同类型：50% 遗传一方
      if (Math.random() < 0.50) { cHasW = true; targetWing = Math.random() < 0.5 ? a.g.win : b.g.win; }
    }
  } else {
    // 有 + 无 = 10% 遗传
    if (Math.random() < 0.10) { cHasW = true; targetWing = aHasW ? a.g.win : b.g.win; }
  }
  g.win = cHasW ? targetWing : 'none';

  // 🌟 2. 其他部件的硬核遗传矩阵与突变判定
  var RK_all = ['bod','leg','hor','tai','eye'];
  var tiers = ['c', 'r', 'e']; // 0普通, 1稀有, 2罕见

  for(var i=0; i<RK_all.length; i++){
    var k = RK_all[i];
    var o1 = fo(k, a.g[k]), o2 = fo(k, b.g[k]);
    var t1 = tiers.indexOf(o1.t);
    var t2 = tiers.indexOf(o2.t);
    
    // 基础矩阵判定 (1-6)
    var baseTier = 0;
    if (t1 === 0 && t2 === 0) {
      baseTier = 0; // 100% 普通
    } else if ((t1 === 0 && t2 === 1) || (t1 === 1 && t2 === 0)) {
      baseTier = Math.random() < 0.50 ? 0 : 1; // 50% 普通, 50% 稀有
    } else if (t1 === 1 && t2 === 1) {
      baseTier = Math.random() < 0.30 ? 0 : 1; // 30% 普通, 70% 稀有
    } else if ((t1 === 0 && t2 === 2) || (t1 === 2 && t2 === 0)) {
      var r = Math.random();
      baseTier = r < 0.60 ? 0 : (r < 0.90 ? 1 : 2); // 60% 普, 30% 稀, 10% 罕
    } else if ((t1 === 1 && t2 === 2) || (t1 === 2 && t2 === 1)) {
      var r = Math.random();
      baseTier = r < 0.10 ? 0 : (r < 0.70 ? 1 : 2); // 10% 普, 60% 稀, 30% 罕
    } else if (t1 === 2 && t2 === 2) {
      baseTier = Math.random() < 0.30 ? 1 : 2; // 30% 稀有, 70% 罕见
    }

    var finalTier = baseTier;
    var isMutated = false;
    var mutationType = 'none'; 

    // 5% 随机突变判定
    if (Math.random() < 0.05) {
      isMutated = true;
      mus.push(k); // 记录突变（用于成就判定）
      var rMut = Math.random();
      if (rMut < 0.10) {
        finalTier = Math.max(0, baseTier - 1);
        mutationType = 'down'; // 向下突变
      } else if (rMut >= 0.90) {
        finalTier = Math.min(2, baseTier + 1);
        mutationType = 'up';   // 向上突变
      } else {
        finalTier = baseTier;
        mutationType = 'same'; // 同级突变
      }
    }

    var finalTierStr = tiers[finalTier];

    // 🌟 决定具体部件（严格控制“无中生有”）
    if (isMutated && (mutationType === 'up' || mutationType === 'down')) {
      // 发生了升降级：直接去新的品级池子里随机抽一个
      var pool = P[k].o.filter(function(o){ return o.t === finalTierStr; });
      g[k] = pk(pool).k;
    } else if (isMutated && mutationType === 'same') {
      // 发生了同级突变：尝试寻找不同于父母的同级部件
      var samePool = P[k].o.filter(function(o){
        return o.t === finalTierStr && o.k !== o1.k && o.k !== o2.k;
      });
      if (samePool.length > 0) {
        g[k] = pk(samePool).k;
      } else {
        // 没有别的同级部件，只能保持原样
        g[k] = (finalTier === t1) ? o1.k : o2.k;
      }
    } else {
      // 未发生突变
      if (finalTier !== t1 && finalTier !== t2) {
        // 基础矩阵导致了降级（比如双罕见出了稀有），去对应池子抽
        var pool = P[k].o.filter(function(o){ return o.t === finalTierStr; });
        g[k] = pk(pool).k;
      } else {
        // 正常遗传：父母的品级对得上，直接继承（如果双方同级，50%概率选父/母）
        if (finalTier === t1 && finalTier === t2) {
          g[k] = Math.random() < 0.5 ? o1.k : o2.k;
        } else if (finalTier === t1) {
          g[k] = o1.k;
        } else {
          g[k] = o2.k;
        }
      }
    }
  }
  
  // 🌟 3. 颜色遗传与偏移突变 (保留原机制)
  var colList = [a.g.col, b.g.col];
  var cCol = Math.random() < 0.5 ? colList[0] : colList[1];

  if (Math.random() < MR) { 
    var parts = cCol.split('_');
    var family = parts[0]; 
    var sameFam = CK.filter(function(c){ return c.indexOf(family) === 0; });
    
    if (sameFam.length <= 1 || Math.random() >= 0.95) {
      var allKeys = Object.keys(CL);
      var stdPool = allKeys.filter(function(c){ 
        return (c.indexOf('_std') !== -1 || c.indexOf('standard') !== -1) && c !== cCol;
      });
      if (stdPool.length === 0) {
        stdPool = allKeys.filter(function(c){ 
          return c !== 'special_albino' && c !== 'special_melanor' && c !== cCol; 
        });
      }
      cCol = pk(stdPool);
    } else {
      var validFam = sameFam.filter(function(c){ return c !== cCol; });
      cCol = pk(validFam.length > 0 ? validFam : sameFam);
    }
    mus.push('col');
  }
  if (!cCol) cCol = 'grey_std';

  g.col = cCol;
  g.wingCol = Math.random() < 0.5 ? a.g.wingCol : b.g.wingCol;
  g.tailCol = Math.random() < 0.5 ? a.g.tailCol : b.g.tailCol;

  // 🌟 4. 一级/二级/三级突变叠加 (保留原机制)
  var cm=null;
  if(a.mut==='albino'&&b.mut==='albino'&&Math.random()<0.20)cm='albino';
  else if(a.mut==='melanor'&&b.mut==='melanor'&&Math.random()<0.20)cm='melanor';
  else{
    var src=[];if(a.mut)src.push(a.mut);if(b.mut)src.push(b.mut);
    if(src.length&&Math.random()<CMI)cm=pk(src)
  }
  
  var pie=false,pieColor=null;
  if(!cm&&(a.mut||b.mut)&&Math.random()<0.10){
    pie=true;
    if(a.mut==='albino' && b.mut==='albino') { pieColor='w'; }
    else if(a.mut==='melanor' && b.mut==='melanor') { pieColor='e'; }
    else if((a.mut==='albino' && b.mut==='melanor') || (a.mut==='melanor' && b.mut==='albino')) { pieColor = Math.random() < 0.5 ? 'w' : 'e'; }
    else if(a.mut==='albino' || b.mut==='albino') { pieColor='w'; }
    else if(a.mut==='melanor' || b.mut==='melanor') { pieColor='e'; }
    else { pieColor=pk(['w','e']); }
  }
  
  var ff=false;
  if(a.firefly&&b.firefly)ff=Math.random()<0.40;
  else if(a.firefly||b.firefly)ff=Math.random()<0.25;
  
  var forceH=false;
  if((a.sx==='f'||a.sx==='h')&&a.induceHerm)forceH=true;
  if((b.sx==='f'||b.sx==='h')&&b.induceHerm)forceH=true;
  var cSx=forceH&&Math.random()<0.5?'h':rSx();
  
  var st=false,dw=false;
  if((cSx==='m'||cSx==='h')&&Math.random()<T3_RATE)st=true;
  if((cSx==='f'||cSx==='h')&&Math.random()<T3_RATE)dw=true;
  a.induceHerm=false;b.induceHerm=false;
  
  var c={
    id:uid(),
    gen:Math.max(a.gen,b.gen)+1,
    par:[a.id,b.id],
    g:g,
    sx:cSx,
    mut:cm,
    var:null,
    bc:0,
    cd:0,
    hat:Date.now()+calcHatchTime({g:g, mut:cm, pie:pie}),
    sterile:st,
    doubleWomb:dw,
    pie:pie,
    pieColor:pieColor,
    firefly:ff,
    induceHerm:false
  };
  
  // 🌟 丢进洗刷机
  c = fixHorse(c);
  c.group = (typeof S.defaultHatchGroup === 'number' && S.defaultHatchGroup < S.groups.length) ? S.defaultHatchGroup : -1;
  
  return{c:c,mus:mus,a:a,b:b};
}
function predRarity(a,b){var rk=RK.concat(['col']);var lo=0,hi=0;for(var i=0;i<rk.length;i++){var k=rk[i];if(k==='col')continue;var o1=fo(k,a.g[k]),o2=fo(k,b.g[k]);var w1=o1.t==='e'?5:o1.t==='r'?2:0;var w2=o2.t==='e'?5:o2.t==='r'?2:0;lo+=Math.min(w1,w2);hi+=Math.max(w1,w2)}return[lo,hi]}

// ==== getPal ====
function getPal(cr){
  var gc = CL[cr.g.col] || CL.grey_std;
  var gw = CL[cr.g.wingCol] || gc;
  var gl = CL[cr.g.tailCol] || gc;
  
  if(cr.mut === 'albino'){ 
    gc = CL.special_albino; gw = gc; gl = gc; 
  } else if(cr.mut === 'melanor'){ 
    gc = CL.special_melanor; gw = gc; gl = gc; 
  }
  
  return {
    body: {m: gc[1], d: gc[2], l: gc[3]},
    wing: {m: gw[1], d: gw[2], l: gw[3]},
    claw: {m: gl[1], d: gl[2], l: gl[3]},
    k: '#1a1a1a', w: '#f5f5f5', ho: '#e8d5b7', hd: '#a89370', hf: '#2a1a0a', 
    st: '#ffeaa7', cr: '#81ecec', er: '#e05a7a', eb: '#5b9dff', eg: '#f1c40f'
  };
}
function drRaw(x,c){x.clearRect(0,0,64,64);if(!isH(c)){var p=getPal(c);drEgg(x,p);}}
function drEgg(x,p){var m=p.body.m,l=p.body.l,d=p.body.d;x.fillStyle=m;x.fillRect(28,6,8,2);x.fillRect(24,8,16,2);x.fillRect(20,10,24,2);x.fillRect(18,12,28,4);x.fillRect(16,16,32,28);x.fillRect(18,44,28,4);x.fillRect(20,48,24,2);x.fillRect(22,50,20,2);x.fillRect(24,52,16,2);x.fillRect(26,54,12,2);x.fillStyle=l;x.fillRect(20,20,2,6);x.fillRect(20,30,2,4);x.fillStyle=d;x.fillRect(28,24,6,6);x.fillRect(38,32,2,2);x.fillRect(24,34,4,2);x.fillRect(38,40,4,2)}
function drWin(x,w,p){if(w==='none')return;var wm=p.wing.m,wl=p.wing.l,wd=p.wing.d;if(w==='small'){x.fillStyle=wl;x.fillRect(30,18,10,8);x.fillRect(42,20,6,6)}else if(w==='bat'){x.fillStyle=wd;x.fillRect(28,16,10,10);x.fillRect(38,12,12,14);x.fillRect(48,16,8,10);x.fillStyle=wm;x.fillRect(30,18,6,6);x.fillRect(40,14,8,10);x.fillRect(50,18,4,6)}else if(w==='feath'){x.fillStyle=wl;x.fillRect(28,14,10,12);x.fillRect(38,10,12,14);x.fillRect(48,16,8,10);x.fillStyle=wm;x.fillRect(30,18,6,4);x.fillRect(40,14,8,4);x.fillRect(50,18,4,4);x.fillRect(30,22,6,4);x.fillRect(40,18,8,4)}else if(w==='drag'){x.fillStyle=wd;x.fillRect(26,12,12,14);x.fillRect(38,8,14,16);x.fillRect(48,14,10,10);x.fillStyle=wm;x.fillRect(28,16,8,10);x.fillRect(40,12,10,12);x.fillRect(50,16,6,8);x.fillStyle=wl;x.fillRect(30,18,4,4);x.fillRect(42,14,4,4);x.fillRect(52,18,4,4)}}
function drTai(x,t,p){var m=p.body.m,l=p.body.l,d=p.body.d;if(t==='horse'){x.fillStyle=d;x.fillRect(52,22,4,4);x.fillRect(54,26,6,18);x.fillRect(58,30,4,10);x.fillStyle=l;x.fillRect(54,26,2,4)}else if(t==='short'){x.fillStyle=d;x.fillRect(52,28,4,8);x.fillRect(54,30,4,4)}else if(t==='lion'){x.fillStyle=d;x.fillRect(52,28,4,2);x.fillRect(56,26,4,10);x.fillStyle=l;x.fillRect(56,20,8,8);x.fillStyle=d;x.fillRect(58,22,2,2)}else if(t==='drag'){x.fillStyle=m;x.fillRect(52,26,6,6);x.fillRect(56,28,6,6);x.fillRect(58,32,4,6);x.fillStyle=d;x.fillRect(54,30,2,2);x.fillRect(58,32,2,2);x.fillRect(60,36,2,2)}else if(t==='star'){x.fillStyle=l;x.fillRect(52,22,6,4);x.fillRect(54,26,6,8);x.fillRect(52,32,6,6);x.fillStyle=p.st;x.fillRect(54,24,2,2);x.fillRect(58,28,2,2);x.fillRect(54,34,2,2);x.fillRect(56,36,2,2)}}
function drL(x,leg,xx,yy,bk,p){var m=bk?p.body.d:p.body.m;var cd=p.claw.d;x.fillStyle=m;x.fillRect(xx,yy,4,12);if(leg==='feath'){x.fillStyle=bk?p.body.d:p.body.l;x.fillRect(xx-1,yy,6,4);x.fillStyle=cd;x.fillRect(xx,yy+10,4,4)}else if(leg==='cryst'){x.fillStyle=bk?'#7ab0b0':p.cr;x.fillRect(xx-1,yy+8,6,4);if(!bk){x.fillStyle=p.w;x.fillRect(xx,yy+8,2,2)}}else if(leg==='cat'){x.fillStyle=m;x.fillRect(xx-1,yy+10,6,4);x.fillStyle=p.k;x.fillRect(xx,yy+12,1,1);x.fillRect(xx+3,yy+12,1,1)}else if(leg==='drag'){x.fillStyle=bk?p.hd:p.ho;x.fillRect(xx-1,yy+10,2,4);x.fillRect(xx+3,yy+10,2,4);x.fillRect(xx,yy+14,4,2)}else{x.fillStyle=cd;x.fillRect(xx,yy+10,4,4)}}
function drBL(x,l,p){drL(x,l,44,38,true,p);drL(x,l,50,38,true,p)}
function drFL(x,l,p){drL(x,l,26,38,false,p);drL(x,l,32,38,false,p)}
function drBod(x,b,p){var m=p.body.m,l=p.body.l,d=p.body.d;x.fillStyle=d;x.fillRect(24,24,28,18);x.fillStyle=m;x.fillRect(25,25,26,16);x.fillStyle=l;x.fillRect(28,25,18,2);x.fillRect(26,27,2,8);x.fillStyle=d;x.fillRect(25,41,26,2);if(b==='spot'){x.fillStyle=d;x.fillRect(34,30,4,4);x.fillRect(42,28,2,2);x.fillRect(46,34,4,2);x.fillRect(38,36,2,2);x.fillRect(48,30,2,2)}else if(b==='stripe'){x.fillStyle=d;for(var i=0;i<6;i++){x.fillRect(32+i*3,27,1,14)}}else if(b==='star'){var pts=[[34,30],[40,28],[46,32],[36,34],[44,36]];for(var j=0;j<pts.length;j++){var xx=pts[j][0],yy=pts[j][1];x.fillStyle=p.st;x.fillRect(xx,yy,2,2);x.fillRect(xx-2,yy,2,2);x.fillRect(xx+2,yy,2,2);x.fillRect(xx,yy-2,2,2);x.fillRect(xx,yy+2,2,2)}}else if(b==='scale'){for(var y2=28;y2<40;y2+=4){for(var x2=28+((y2/4)%2===0?0:2);x2<50;x2+=4){x.fillStyle=l;x.fillRect(x2,y2,4,2);x.fillStyle=d;x.fillRect(x2,y2+2,4,2)}}}}
function drHd(x,p){var m=p.body.m,l=p.body.l,d=p.body.d;x.fillStyle=d;x.fillRect(8,10,18,2);x.fillRect(6,12,22,4);x.fillRect(5,16,24,12);x.fillRect(6,28,22,4);x.fillRect(8,32,18,2);x.fillStyle=m;x.fillRect(9,11,16,2);x.fillRect(7,13,20,2);x.fillRect(6,17,22,10);x.fillRect(7,29,20,3);x.fillRect(9,32,16,1);x.fillStyle=l;x.fillRect(10,13,12,1);x.fillRect(7,15,2,6);x.fillStyle=d;x.fillRect(5,24,4,4);x.fillRect(6,28,6,2);x.fillStyle=p.k;x.fillRect(7,25,2,2);x.fillStyle=d;x.fillRect(5,30,4,1);x.fillStyle=d;x.fillRect(22,22,10,18);x.fillStyle=m;x.fillRect(23,22,8,16);x.fillStyle=l;x.fillRect(24,22,4,4);x.fillStyle=d;x.fillRect(10,4,3,8);x.fillRect(18,4,3,8);x.fillStyle=m;x.fillRect(11,5,1,6);x.fillRect(19,5,1,6)}
function drHrn(x,h,p){if(h==='single'){x.fillStyle=p.ho;x.fillRect(14,0,2,8);x.fillStyle=p.hd;x.fillRect(14,6,2,2)}else if(h==='twin'){x.fillStyle=p.ho;x.fillRect(11,2,2,6);x.fillRect(16,2,2,6);x.fillStyle=p.hd;x.fillRect(11,6,2,2);x.fillRect(16,6,2,2)}else if(h==='deer'){x.fillStyle=p.ho;x.fillRect(9,4,2,4);x.fillRect(7,2,2,4);x.fillRect(11,0,2,4);x.fillRect(17,4,2,4);x.fillRect(15,2,2,4);x.fillRect(19,0,2,4);x.fillStyle=p.hd;x.fillRect(7,2,2,2);x.fillRect(19,0,2,2)}else if(h==='drag'){x.fillStyle=p.ho;x.fillRect(8,4,2,4);x.fillRect(6,2,4,2);x.fillRect(4,0,4,2);x.fillRect(18,4,2,4);x.fillRect(18,2,4,2);x.fillRect(20,0,4,2);x.fillStyle=p.hd;x.fillRect(4,0,2,2);x.fillRect(20,0,2,2)}}
function drEye(x,e,p,right){var ex=10,ey=17;var ir=p.eg;if(e==='round')ir=p.eb;if(e==='big')ir='#7a9cc0';x.fillStyle='#4a4a4a';x.fillRect(ex-1,ey,7,9);x.fillStyle='#f5f5f5';x.fillRect(ex,ey,5,8);if(e==='hetero'){x.fillStyle=p.eb;x.fillRect(ex,ey+1,3,6);x.fillStyle=p.eg;x.fillRect(ex+3,ey+1,2,6)}else{x.fillStyle=ir;x.fillRect(ex,ey+1,5,6)}x.fillStyle='#1a1a1a';if(e==='slit'){x.fillRect(ex+2,ey+1,1,6)}else{x.fillRect(ex+2,ey+3,1,2)}x.fillStyle='#ffffff';x.fillRect(ex+1,ey+1,1,1)}

var _parts = {}, _partReady = 0, _partTotal = 0, _tintCache = {};
var _pbCache = {};
var _assetsReady = false;
var _hasLoadError = false;

function loadAllParts() {
  var names = {
    bod: ['plain','spot','stripe','star','scale'],
    win: ['small','bat','feath','drag'],
    leg: ['feath','cat','drag','cryst'],
    hor: ['single','twin','deer','drag'],
    tai: ['horse','short','lion','drag','star'],
    eye: ['round','big','drag','hetero','star'],
    var: ['twohead','noneyes','multileg','conjoined']
  };

  var tasks = [];
  for (var k in names) {
    for (var i = 0; i < names[k].length; i++) {
      tasks.push(k + '_' + names[k][i]);
    }
  }
  tasks.push('01_sp');
  tasks.push('00_sp');

  _partTotal = tasks.length;
  _partReady = 0;
  _assetsReady = false;
  _hasLoadError = false;

  var finish = function () {
    _partReady++;
    if (_partReady >= _partTotal) {
      _assetsReady = true;
      _pbCache = {};
      if (_hasLoadError) {
        showToast('⚠️ 部分马匹素材加载失败，请刷新页面重试');
      }
      render();
    }
  };

  tasks.forEach(function (key) {
    var img = new Image();
    img.onload = function () {
      _parts[key] = img;
      finish();
    };
    img.onerror = function () {
      _hasLoadError = true;
      var cv = ce('canvas');
      cv.width = 64;
      cv.height = 64;
      _parts[key] = cv;
      finish();
    };
    img.src = 'images/' + key + '.png';
  });
}

// ==========================================
// 🌟 马匹渲染系统（模块化）
// ==========================================

// 1. 获取马匹的调色盘（部件颜色）
function getHorseColors(c) {
  var bodyCol = c.g.col, wingCol = c.g.wingCol, tailCol = c.g.tailCol;
  if (c.mut === 'albino') { bodyCol = 'albino'; wingCol = 'albino'; tailCol = 'albino'; }
  else if (c.mut === 'melanor') { bodyCol = 'melanor'; wingCol = 'melanor'; tailCol = 'melanor'; }
  return { body: bodyCol, wing: wingCol, tail: tailCol };
}

// ==== 替换开始：纯色概率散落·无描边版 ====
function drawHorsePie(ctx, c, lineMask) {
  try {
    var pdata = ctx.getImageData(0, 0, 64, 64);
    var ppx = pdata.data;
    var sd = 0;
    for (var si = 0; si < c.id.length; si++) sd += c.id.charCodeAt(si);
    sd = sd % 1000;
    var srand = function() { sd = (sd * 9301 + 49297) % 233280; return sd / 233280; };
    
    var isW = (c.pieColor === 'w');
    
    // 🌟 核心微调：白斑主色加入极轻微的灰粉（防止在白马身上隐身）
    var cMain = isW ? [254, 245, 245] : [51, 51, 51];

    var blobs = [];
    var numBlobs = 8 + Math.floor(srand() * 4); 
    for(var b=0; b<numBlobs; b++) {
      blobs.push({
        x: 10 + srand() * 44, 
        y: 10 + srand() * 44,
        r: 4 + srand() * 4, 
        phase: srand() * 10   
      });
    }

    for (var pi = 0; pi < ppx.length; pi += 4) {
      if (ppx[pi + 3] > 200) {
        var x = (pi / 4) % 64;
        var y = Math.floor((pi / 4) / 64);
        
        var minDist = 999;
        for(var k=0; k<blobs.length; k++) {
          var dx = x - blobs[k].x;
          var dy = y - blobs[k].y;
          var dist = Math.sqrt(dx*dx + dy*dy) + Math.sin(dx*0.6 + dy*0.4 + blobs[k].phase) * 1.0;
          if(dist < minDist) minDist = dist;
        }

        var paint = false;
        
        // 🌟 2. 纯靠概率散落，不留轮廓环
        if (minDist < 5) {
          paint = true; // 核心区 100% 涂色
        } else if (minDist < 8) {
          // 边缘区：距离越远，涂色概率越低（完美模拟毛发过渡，没有生硬轮廓）
          var chance = (8 - minDist) / 3; 
          if (srand() < chance) {
            paint = true;
          }
        }

        if (paint) {
           // 注意：这里我们不需要再判断 lineMask 了！
           // 因为外层 mkPB 里的盖线稿层会把边缘完美勾勒出来
           
           // 纯色覆盖（带噪点）
           var noiseStrength = isW ? 30 : 10; 
           var noiseVal = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
           noiseVal = noiseVal - Math.floor(noiseVal); 
           var nOff = (noiseVal - 0.5) * noiseStrength;
           
           ppx[pi] = Math.max(0, Math.min(255, cMain[0] + nOff));
           ppx[pi+1] = Math.max(0, Math.min(255, cMain[1] + nOff));
           ppx[pi+2] = Math.max(0, Math.min(255, cMain[2] + nOff));
        }
      }
    }
    ctx.putImageData(pdata, 0, 0);
  } catch (e) {}
}
// ==== 替换结束 ====

// 🌟 1. 绘制成年马的各个部件
function drawHorseParts(ctx, c, colors) {
  // 阴影
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(32, 56, 14, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 核心：如果是白化或黑化，强制读取 plain（无花纹）的底模
  var bodyPartKey = c.g.bod;
  if (c.mut === 'albino' || c.mut === 'melanor') {
    bodyPartKey = 'plain';
  }

  // 身体
  if (_parts['bod_' + bodyPartKey]) {
    ctx.drawImage(tintImg(_parts['bod_' + bodyPartKey], colors.body), 0, 0, 64, 64);
  }
  
  // 尾巴
  if (c.g.tai !== 'none' && _parts['tai_' + c.g.tai]) ctx.drawImage(tintImg(_parts['tai_' + c.g.tai], colors.tail), 0, 0, 64, 64);
  // 四肢
  if (_parts['leg_' + c.g.leg]) ctx.drawImage(tintImg(_parts['leg_' + c.g.leg], colors.body), 0, 0, 64, 64);
  // 翅膀
  if (c.g.win !== 'none' && _parts['win_' + c.g.win]) ctx.drawImage(tintImg(_parts['win_' + c.g.win], colors.wing), 0, 0, 64, 64);
  // 角
  if (c.g.hor !== 'none' && _parts['hor_' + c.g.hor]) ctx.drawImage(tintImg(_parts['hor_' + c.g.hor], colors.body), 0, 0, 64, 64);
  // 变异（双头等）
  if (c.var && _parts['var_' + c.var]) ctx.drawImage(tintImg(_parts['var_' + c.var], colors.body), 0, 0, 64, 64);
}

// 🌟 2. 绘制眼睛（最新无描边版）
function drawHorseEye(ctx, c) {
  // 如果有无眼突变，或者没有对应的眼睛图片，直接跳过
  if (c.var === 'noneyes' || !_parts['eye_' + c.g.eye]) return;
  
  // 因为你的 PNG 已经有黑边了，直接原图输出，不加任何多余的描边代码！
  ctx.drawImage(_parts['eye_' + c.g.eye], 0, 0, 64, 64);
}

// 🌟 3. 绘制萤火虫（光点）
function drawHorseFirefly(ctx, c, srand) {
  if (!c.firefly || !srand) return;
  var cdata = ctx.getImageData(0, 0, 64, 64);
  var cpx = cdata.data;
  var dots = 0, tries = 0;
  while (dots < 2 && tries < 100) {
    tries++;
    var rx = Math.floor(srand() * 60) + 2;
    var ry = Math.floor(srand() * 60) + 2;
    var idx = (ry * 64 + rx) * 4;
    if (cpx[idx + 3] > 0) {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(rx, ry, 2, 2);
      ctx.fillStyle = 'rgba(241,196,15,0.6)';
      ctx.fillRect(rx - 1, ry, 1, 2); ctx.fillRect(rx + 2, ry, 1, 2);
      ctx.fillRect(rx, ry - 1, 2, 1); ctx.fillRect(rx, ry + 2, 2, 1);
      dots++;
    }
  }
}
// 6. 主函数：生成马匹卡片
// ==== 替换开始：带线稿蒙版的 mkPB ====
function mkPB(c) {
  var b = ce('div');
  b.className = 'pxb';

  var ready = (_assetsReady && !_hasLoadError) ? 1 : 0;
  var cacheKey = ready + '|' + c.id + '|' + sig(c.g) + '|' + (isH(c) ? 1 : 0) + '|' + (c.mut || '') + '|' + (c.pie ? 1 : 0) + '|' + (c.pieColor || '') + '|' + (c.firefly ? 1 : 0) + '|' + (c.var || '');

  var cv = ce('canvas');
  cv.width = 64;
  cv.height = 64;
  var ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingEnabled = false;

  if (_pbCache[cacheKey]) {
    ctx.drawImage(_pbCache[cacheKey], 0, 0, 64, 64);
    b.appendChild(cv);
    return b;
  }

  var offCv = ce('canvas');
  offCv.width = 64;
  offCv.height = 64;
  var offCtx = offCv.getContext('2d', { willReadFrequently: true });
  offCtx.imageSmoothingEnabled = false;

  if (c.var === 'special_01') {
    if (_parts['01_sp'] && !_hasLoadError) {
      offCtx.drawImage(_parts['01_sp'], 0, 0, 64, 64);
      _pbCache[cacheKey] = offCv;
    }
    ctx.drawImage(offCv, 0, 0);
    b.appendChild(cv);
    return b;
  }
  if (c.var === 'special_00') {
    if (_parts['00_sp'] && !_hasLoadError) {
      offCtx.drawImage(_parts['00_sp'], 0, 0, 64, 64);
      _pbCache[cacheKey] = offCv;
    }
    ctx.drawImage(offCv, 0, 0);
    b.appendChild(cv);
    return b;
  }

  var colors = getHorseColors(c);
  var srand = null;
  if (c.firefly) {
    var ssd = 0;
    for (var ssi = 0; ssi < c.id.length; ssi++) ssd += c.id.charCodeAt(ssi);
    ssd = ssd % 1000;
    srand = function () { ssd = (ssd * 9301 + 49297) % 233280; return ssd / 233280; };
  }

  if (isH(c) && _assetsReady && !_hasLoadError) {
    drawHorseParts(offCtx, c, colors);

    var bodyKey = c.g.bod;
    if (c.mut === 'albino' || c.mut === 'melanor') bodyKey = 'plain';

    var lCanvas = ce('canvas');
    lCanvas.width = 64;
    lCanvas.height = 64;
    var lctx = lCanvas.getContext('2d', { willReadFrequently: true });

    if (_parts['bod_' + bodyKey]) lctx.drawImage(_parts['bod_' + bodyKey], 0, 0);
    if (c.g.tai !== 'none' && _parts['tai_' + c.g.tai]) lctx.drawImage(_parts['tai_' + c.g.tai], 0, 0);
    if (_parts['leg_' + c.g.leg]) lctx.drawImage(_parts['leg_' + c.g.leg], 0, 0);
    if (c.g.win !== 'none' && _parts['win_' + c.g.win]) lctx.drawImage(_parts['win_' + c.g.win], 0, 0);
    if (c.g.hor !== 'none' && _parts['hor_' + c.g.hor]) lctx.drawImage(_parts['hor_' + c.g.hor], 0, 0);
    if (c.var && _parts['var_' + c.var]) lctx.drawImage(_parts['var_' + c.var], 0, 0);

    var ldata = lctx.getImageData(0, 0, 64, 64);
    var lpx = ldata.data;
    var lineMask = new Uint8Array(64 * 64);

    for (var li = 0; li < lpx.length; li += 4) {
      if (lpx[li + 3] === 0) continue;
      var llum = (lpx[li] * 0.3 + lpx[li + 1] * 0.59 + lpx[li + 2] * 0.11) / 255;

      if (llum < 0.2) {
        lineMask[li / 4] = 1;
        lpx[li] = 0;
        lpx[li + 1] = 0;
        lpx[li + 2] = 0;
      } else {
        lpx[li + 3] = 0;
      }
    }
    lctx.putImageData(ldata, 0, 0);

    if (c.pie) drawHorsePie(offCtx, c, lineMask);
    offCtx.drawImage(lCanvas, 0, 0);

    drawHorseEye(offCtx, c);
    drawHorseFirefly(offCtx, c, srand);

    _pbCache[cacheKey] = offCv;
  } else {
  var W = 64;
  var eggCanvas = ce('canvas');
  eggCanvas.width = W;
  eggCanvas.height = W;
  var octx = eggCanvas.getContext('2d', { willReadFrequently: true });

  if (isH(c)) {
    var p = getPal(c);
    drEgg(octx, p);
  } else {
    drRaw(octx, c);
  }

  offCtx.clearRect(0, 0, W, W);
    var d = octx.getImageData(0, 0, W, W).data;
    function a(xx, yy) {
      if (xx < 0 || yy < 0 || xx >= W || yy >= W) return 0;
      return d[(yy * W + xx) * 4 + 3];
    }
    offCtx.fillStyle = '#0a0812';
    for (var yy2 = 0; yy2 < W; yy2++) {
      for (var xx2 = 0; xx2 < W; xx2++) {
        if (a(xx2, yy2) > 0) continue;
        if (a(xx2 - 1, yy2) > 0 || a(xx2 + 1, yy2) > 0 || a(xx2, yy2 - 1) > 0 || a(xx2, yy2 + 1) > 0) {
          offCtx.fillRect(xx2, yy2, 1, 1);
        }
      }
    }
   offCtx.drawImage(eggCanvas, 0, 0);
  _pbCache[cacheKey] = offCv;   // 👈 加这一行，缓存占位蛋
  }

  ctx.drawImage(offCv, 0, 0);
  b.appendChild(cv);
  return b;
}
// ==== 毛发噪点版 tintImg ====
function tintImg(img, colorKey) {
  var ck = (img.src || 'placeholder') + '|' + colorKey;
  if (_tintCache[ck]) return _tintCache[ck];

  var w = img.naturalWidth || img.width;
  var h = img.naturalHeight || img.height;
  if (!w || !h) {
    var empty = ce('canvas');
    empty.width = 1;
    empty.height = 1;
    _tintCache[ck] = empty;
    return empty;
  }

  var trio;
  if (colorKey === 'albino') {
    trio = CL.special_albino;
  } else if (colorKey === 'melanor') {
    trio = CL.special_melanor;
  } else {
    trio = CL[colorKey] || CL.grey_std;
  }

  var cmain = trio[1], cdark = trio[2], clight = trio[3];
  var src = ce('canvas');
  src.width = w;
  src.height = h;
  var sctx = src.getContext('2d', { willReadFrequently: true });
  sctx.drawImage(img, 0, 0);

  var data = sctx.getImageData(0, 0, w, h);
  var px = data.data;

  function hex2rgb(hex) {
    hex = hex.replace('#', '');
    return [parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16)];
  }

  var cMain = hex2rgb(cmain), cDark = hex2rgb(cdark), cLight = hex2rgb(clight);

  var minL = 1, maxL = 0;
  for (var i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    var lum0 = (px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11) / 255;
    if (lum0 < minL) minL = lum0;
    if (lum0 > maxL) maxL = lum0;
  }
  if (maxL - minL < 0.05) maxL = minL + 0.05;

  for (var j = 0; j < px.length; j += 4) {
    if (px[j + 3] === 0) continue;

    var r = px[j], g = px[j + 1], b = px[j + 2];
    var lum = (r * 0.3 + g * 0.59 + b * 0.11) / 255;
    var t = (lum - minL) / (maxL - minL);

    var tgt;
    if (t < 0.15) {
      tgt = [0, 0, 0];
    } else if (t < 0.45) {
      tgt = cDark;
    } else if (t < 0.85) {
      tgt = cMain;
    } else {
      tgt = cLight;
    }

    var pX = (j / 4) % w;
    var pY = Math.floor((j / 4) / w);
    var noiseVal = Math.sin(pX * 12.9898 + pY * 78.233) * 43758.5453;
    noiseVal = noiseVal - Math.floor(noiseVal);

    if (t > 0.15) {
      if (noiseVal > 0.8) {
        px[j] = Math.min(255, tgt[0] + 10);
        px[j + 1] = Math.min(255, tgt[1] + 10);
        px[j + 2] = Math.min(255, tgt[2] + 10);
      } else if (noiseVal < 0.2) {
        px[j] = Math.max(0, tgt[0] - 10);
        px[j + 1] = Math.max(0, tgt[1] - 10);
        px[j + 2] = Math.max(0, tgt[2] - 10);
      } else {
        px[j] = tgt[0];
        px[j + 1] = tgt[1];
        px[j + 2] = tgt[2];
      }
    } else {
      px[j] = tgt[0];
      px[j + 1] = tgt[1];
      px[j + 2] = tgt[2];
    }
  }

  sctx.putImageData(data, 0, 0);
  _tintCache[ck] = src;
  return src;
}

var S = {
  farmName: '我的马场',
  farmId: '',
  c: [],
  a: [],
  d: {},
  sel: [],
  selM: null,
  selF: null,
  last: null,
  lastM: [],
  r: 20,
  p: { m: 0, v: 0, i: 0, fire: 0, dispel: 0, hfan: 0, hfeng: 0, hmix: 0, hdrag: 0, hnight: 0 },
  points: 0,
  hoof: 0,
  trainCount: 1,
  hoofSubmitted: [false, false, false, false, false],
  trainFail: 0,
  trainSuccess: 0,
  unlocked00: false,
  headRaceCount: 0,
  st: [],
  stT: 0,
  st00T: 0,
  stud: null,
  studL: 0,
  studT: 0,
  studN: 0,
  ach: {},
  cap: 50,
  defaultHatchGroup: -1,
  groups: ['New Cave'],
  groupOpen: { '-1': true, '0': true }, // 记录折叠状态
  _batchSel: [], // 批量选中的马匹ID
  eggCap: 10,
  _hc: 0,
  head: null,
  headStart: 0,
  headRace: 0,
  headTerm: 0,
  _dexOpen: {},
  _k01Time: 0,
  _k01Text: '',
  _k00Time: 0,
  _k00Text: '',
  displayMode: 'color',
  themeMode: 'dark',
    lastRescue: 0,
   refreshData: { date: '', s01: 5, s00: 5 },
   arcPage: 1,
  arcPageSize: 24,
};
function findC(id){for(var i=0;i<S.c.length;i++)if(S.c[i].id===id)return S.c[i];for(var j=0;j<S.a.length;j++)if(S.a[j].id===id)return S.a[j];return null}
function unlock(id) {
  if (S.ach[id]) return;
  S.ach[id] = Date.now();
  S.points += 5;
  
  var ac = null;
  for (var i = 0; i < ACHS.length; i++) {
    if (ACHS[i].id === id) {
      ac = ACHS[i];
      break;
    }
  }
  if (ac) showToast('🏆 解锁成就：' + ac.n + ' (+5 荧光点)');
}
function showToast(msg, isPersistent) {
  var n = document.querySelectorAll('.toast').length;
  var t = ce('div');
  t.className = 'toast';
  if (isPersistent) t.style.pointerEvents = 'auto';
  t.style.top = (20 + n * 50) + 'px';
  
  var span = ce('span');
  span.textContent = msg;
  t.appendChild(span);
  
  if (isPersistent) {
    var closeBtn = ce('span');
    closeBtn.textContent = ' ✕';
    closeBtn.style.cssText = 'margin-left:10px; cursor:pointer; font-weight:bold; opacity:0.7;';
    closeBtn.onclick = function() { if(t.parentNode) t.parentNode.removeChild(t); };
    t.appendChild(closeBtn);
  }
  
  document.body.appendChild(t);
  setTimeout(function() { t.classList.add('show') }, 10);
  if (!isPersistent) {
    setTimeout(function() {
      t.classList.remove('show');
      setTimeout(function() { if(t.parentNode) t.parentNode.removeChild(t) }, 300);
    }, 3000);
  }
}
function checkAch(c, mus, a, b) {
  if (c.gen >= 10) unlock('g10');
  if (c.gen >= 20) unlock('g20');
  if (c.gen >= 50) unlock('g50');
  if (c.gen >= 100) unlock('g100');
  
  var allC = true, allR = true, allE = true;
  for (var i = 0; i < RK.length; i++) {
    var o = fo(RK[i], c.g[RK[i]]);
    if (o.t !== 'c') allC = false;
    if (o.t !== 'r') allR = false;
    if (o.t !== 'e') allE = false;
  }
  if (allC) unlock('allc');
  if (allR) unlock('allr');
  if (allE) unlock('alle');
  
  if (mus.length >= 1) unlock('m1');
  if (mus.length >= 2) unlock('m2');
  if (mus.length >= 3) unlock('m3');
  
  var cs = rS(c), as = rS(a), bs = rS(b);
  if (cs > as && cs > bs) unlock('up');
  if (cs < as && cs < bs) unlock('dn');
  
  if (c.g.col !== a.g.col && c.g.col !== b.g.col) unlock('koi');
  if (c.g.col === c.g.wingCol && c.g.wingCol === c.g.tailCol) unlock('same3');
}
function checkGlobalAch() {
  var hasA = false, hasM = false;
  for (var i = 0; i < S.c.length; i++) {
    if (S.c[i].mut === 'albino') hasA = true;
    if (S.c[i].mut === 'melanor') hasM = true;
  }
  for (var j = 0; j < S.a.length; j++) {
    if (S.a[j].mut === 'albino') hasA = true;
    if (S.a[j].mut === 'melanor') hasM = true;
  }
  if (hasA && hasM) unlock('bw');
  
  var allV = {};
  for (var k = 0; k < S.c.length; k++) if (S.c[k].var) allV[S.c[k].var] = 1;
  for (var m = 0; m < S.a.length; m++) if (S.a[m].var) allV[S.a[m].var] = 1;
  var cnt = 0;
  for (var n = 0; n < VT.length; n++) if (allV[VT[n]]) cnt++;
  if (cnt >= VT.length) unlock('sci');
  
  var dc = Object.keys(S.d).length;
  if (dc >= 50) unlock('dex50');
  if (dc >= 100) unlock('dex100');
  if (dc >= 666) unlock('dex666');
  
  if (S.cap >= 50) unlock('cap50');
  if (S.cap >= 100) unlock('cap100');
  if (S.cap >= 200) unlock('cap200');
  
  // 🌟 万花筒：仅检测标准色
  var seenCol = {};
  for (var sc in S.d) {
    if (S.d[sc].g && S.d[sc].g.col) seenCol[S.d[sc].g.col] = 1;
  }
  var stdCols = CK.filter(function(key) { return key.endsWith('_std'); });
  var colCnt = 0;
  for (var ci = 0; ci < stdCols.length; ci++) {
    if (seenCol[stdCols[ci]]) colCnt++;
  }
  if (colCnt >= stdCols.length) unlock('colall');
  
  // 部位集齐
  var partMap = { bod: 'bodall', hor: 'horall', win: 'winall', leg: 'legall', tai: 'taiall', eye: 'eyeall' };
  for (var pk in partMap) {
    var ok = true;
    for (var oi = 0; oi < P[pk].o.length; oi++) {
      var oid = P[pk].o[oi].k;
      var found = false;
      for (var sg in S.d) {
        if (S.d[sg].g[pk] === oid) { found = true; break; }
      }
      if (!found) { ok = false; break; }
    }
    if (ok) unlock(partMap[pk]);
  }
  
  for (var ec = 0; ec < S.c.length; ec++) {
    if (!S.c[ec].var && S.c[ec].bc >= MBC) { unlock('exhaust'); break; }
  }
}
function mkDex(c){if(!isH(c)||c.var)return false;var sg=sig(c.g);if(!S.d[sg]){S.d[sg]={g:Object.assign({},c.g),id:c.id,t:Date.now()};return true}return false}
function filterList(){var elName=$('sName'),elSex=$('sSex'),elCol=$('sColor'),elMut=$('sMut');var n=elName?elName.value.trim().toLowerCase():'';var sx=elSex?elSex.value:'';var col=elCol?elCol.value:'';var mut=elMut?elMut.value:'';var arr=S.c.filter(function(c){if(!isH(c))return false;if(sx==='exhausted'){if(c.bc<getMaxBc(c))return false;if(c.var)return false}else if(sx){if(c.sx!==sx)return false}if(col&&c.g.col!==col)return false;if(mut){if(mut==='any'){if(!c.mut&&!c.pie&&!c.firefly&&!c.sterile&&!c.doubleWomb)return false}else if(mut==='pie'){if(!c.pie)return false}else if(mut==='firefly'){if(!c.firefly)return false}else if(mut==='sterile'){if(!c.sterile)return false}else if(mut==='doubleWomb'){if(!c.doubleWomb)return false}else{if(c.mut!==mut)return false}}if(n){var name=(c.name||'').toLowerCase();var gen=String(c.gen);if(name.indexOf(n)<0&&gen.indexOf(n)<0)return false}return true});arr.sort(function(a,b){return rSFull(b)-rSFull(a)});return arr}
function buyHoofPotion(t){var pr=t==='hfan'?50:t==='hfeng'?50:t==='hmix'?70:t==='hdrag'?100:200;if((S.hoof||0)<pr){alert('马蹄铁不够！当前只有 '+(S.hoof||0)+' 个');return}S.hoof=(S.hoof||0)-pr;S.p[t]=(S.p[t]||0)+1;sv();render()}
function getHirePrice(c){var price=1;var charm=rS(c);price+=Math.max(0,Math.floor((10-charm)/5));price+=Math.floor(c.gen/5);var rem=getMaxBc(c)-c.bc;if(rem>0)price+=rem;return price}
// ==== 雇佣提交====
function submitHorse00(c,idx){
  if(c.isLocked) return alert('🔒 该马匹已锁定，无法提交雇佣！');
  if(!S.hoofSubmitted)S.hoofSubmitted=[false,false,false,false,false];
  if(S.hoofSubmitted[idx])return;
  
  // 柔和劝告
  if(S.c.length <= 6) { 
    if(!confirm('提示：提交后，马群将只剩下 ' + (S.c.length - 1) + ' 匹马，数量过少可能无法繁育，是否继续？')) {
      return;
    }
  }

  var price=getHirePrice(c);
  S.hoof=(S.hoof||0)+price;
  S.hoofSubmitted[idx]=true;
  S.c=S.c.filter(function(x){return x.id!==c.id});
  S.sel=S.sel.filter(function(x){return x!==c.id});
  if(S.head===c.id){S.head=null;S.headStart=0;S.headRace=0}
  sv();render();alert('🧲 雇佣成功！获得 '+price+' 枚马蹄铁。');
}

window._hSelected00 = [null,null,null,null,null];
window._hSearch00 = '';

// 00商店选马清单筛选
function render00SelectList(idx) {
  var q = (document.getElementById('sel00Search').value || '').toLowerCase();
  var validHorses = S.c.filter(function(c){
    if(c.isLocked) return false; // 上锁的马直接踢出列表！
    if(c.sx==='h') return false;
    if(c.var || c.mut || c.pie || c.firefly || c.sterile || c.doubleWomb) return false;
    if(!isH(c) || c.cd > Date.now()) return false;
    if(c.bc >= getMaxBc(c)) return false;
    if(c.id === S.head || c.id === S.stud) return false;
    
    // 排除已经被选中的马（防止同一个槽重复选）
    if(window._hSelected00){
       for(var i=0;i<5;i++){
         if(i !== idx && window._hSelected00[i] === c.id) return false;
       }
    }
    if(q){
      var name = (c.name||'').toLowerCase();
      var gen = String(c.gen);
      if(name.indexOf(q) < 0 && gen.indexOf(q) < 0) return false;
    }
    return true;
  });
  
  validHorses.sort(function(a,b){ return rS(a) - rS(b) || b.gen - a.gen; }); 
  
  var listBox = document.getElementById('sel00List');
  listBox.innerHTML = '';
  if(validHorses.length === 0) {
    listBox.innerHTML = '<div class="em" style="padding:10px;text-align:center;">没有符合条件的马</div>';
    return;
  }
  
  for(var i=0; i<validHorses.length; i++) {
    (function(c){
      var item = ce('div');
      item.className = 'breed-item';
      item.style.cssText = 'padding:6px; margin-bottom:6px; cursor:pointer; border:1px solid var(--card-bd); border-radius:4px;';      
      var px = ce('div');
      px.className = 'bi-px';
      px.appendChild(mkPB(c));
      item.appendChild(px);
      
      var inf = ce('div');
      inf.className = 'bi-info';
      var nm = ce('div');
      nm.className = 'bi-name';
      var si = SX[c.sx]||SX.m;
      nm.textContent = (c.name ? '「'+c.name+'」· ' : '') + '第'+c.gen+'代 ' + si.s;
      inf.appendChild(nm);
      
      var meta = ce('div');
      meta.className = 'bi-meta';
      meta.textContent = '魅:'+rS(c)+' · 剩'+(getMaxBc(c)-c.bc)+'次 · 卖价 '+getHirePrice(c)+' 🧲';
      inf.appendChild(meta);
      
      item.appendChild(inf);
      item.onclick = function() {
        window._hSelected00[idx] = c.id;
        closeM();
        mkStore00UI(); // 选完立刻刷新 00 商店
      };
      listBox.appendChild(item);
    })(validHorses[i]);
  }
}

function open00Select(idx) {
  var h = '<div class="mdt">选择要雇佣的马 (槽位 '+(idx+1)+')</div>';
  h += '<input id="sel00Search" class="breed-search" placeholder="搜索名字/代数" style="margin-bottom:10px; width:100%; box-sizing:border-box;" oninput="render00SelectList('+idx+')" value="'+window._hSearch00+'">';
  h += '<div id="sel00List"></div>';
  h += '<button class="mc" onclick="closeM()" style="margin-top:10px">取消</button>';
  showM(h);
  render00SelectList(idx);
}
function mkStore00UI(){
  if(!S.unlocked00)return;
  var se=document.getElementById('store00Grid');if(!se)return;
  var pg=document.getElementById('potion00Grid');
  var cb=document.getElementById('cap00Box');
  
 try {
  se.innerHTML='';
  // 解除父级的网格限制，让内容占满全宽！
  se.style.cssText = 'display:block; width:100%;';

  // 顶部栏：标题 + 按钮组
  var toolbar = ce('div');
  toolbar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; width:100%;';

  var title = ce('div');
  title.style.cssText = 'font-size:12px; color:var(--accent); font-weight:bold;';
  title.textContent = '🌑 雇佣马匹（获取马蹄铁）';

  var btnGroup = ce('div');
  btnGroup.style.cssText = 'display:flex; gap:6px;';

  var bClear = ce('button');
  bClear.className = 'buy';
  bClear.textContent = '清空';
  bClear.style.cssText = 'padding:4px 10px; font-size:12px; min-height:32px; white-space:nowrap; background:var(--danger-bg); border-color:var(--danger-bd); color:var(--danger-fg);';
  // 如果所有槽位都是空的，清空按钮就隐藏，免得占地方
  var hasAnySelected = window._hSelected00.some(function(id, i){ return id && !S.hoofSubmitted[i]; });
 if(!hasAnySelected) bClear.style.display = 'none';

 var bFill = ce('button');
 bFill.className = 'primary';
 bFill.textContent = '一键填充';
 bFill.style.cssText = 'padding:4px 12px; font-size:12px; min-height:32px; white-space:nowrap;';

 btnGroup.appendChild(bClear);
 btnGroup.appendChild(bFill);
var bRefresh = ce('button');
  bRefresh.className = 'test';
  bRefresh.style.cssText = 'padding:4px 10px; font-size:12px; min-height:32px; white-space:nowrap;';
  bRefresh.textContent = '🔄 刷新 (剩' + S.refreshData.s00 + '/5)';
  if (S.refreshData.s00 <= 0) bRefresh.disabled = true;
  bRefresh.onclick = function() { manualRefresh('00'); };
  btnGroup.appendChild(bRefresh);
 toolbar.appendChild(title);
 toolbar.appendChild(btnGroup);
 se.appendChild(toolbar);

  // 横排网格容器（强制 Flex 横排，自适应宽度）
  var gridWrap = ce('div');
  gridWrap.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px; width:100%; justify-content:center;';
  se.appendChild(gridWrap);

  // 检查是否所有可用槽位都已填满
var isAllFull = true;
for(var i=0; i<5; i++) {
  if(!S.hoofSubmitted[i] && !window._hSelected00[i]) {
    isAllFull = false; break;
  }
}

// 动态修改按钮文字
if(isAllFull) {
  bFill.textContent = '一键提交';
  bFill.style.background = '#c05a5a';
  bFill.style.borderColor = '#c05a5a';
} else {
  bFill.textContent = '一键填充';
}
// 清空逻辑
bClear.onclick = function() {
  var hasSelected = false;
  for(var i=0; i<5; i++) {
    if(!S.hoofSubmitted[i] && window._hSelected00[i]) {
      window._hSelected00[i] = null;
      hasSelected = true;
    }
  }
  if(hasSelected) {
    mkStore00UI(); // 刷新面板
  }
};
// 一键填充 / 一键提交 逻辑
bFill.onclick = function() {
  if(isAllFull) {
    // === 一键提交模式 ===
    var totalH = 0;
    var count = 0;
    for(var i=0; i<5; i++) {
      if(!S.hoofSubmitted[i] && window._hSelected00[i]) {
        var c = findC(window._hSelected00[i]);
        if(c) {
          totalH += getHirePrice(c);
          count++;
        }
      }
    }
    if(count === 0) return alert('没有可提交的马匹。');

// 组装文案
var msg = '⚠️ 确定要一次性提交这 ' + count + ' 匹马吗？\n预计可获得 ' + totalH + ' 枚马蹄铁。';

// 柔和劝告
if(S.c.length - count <= 5) {
  msg += '\n\n提示：提交后，马群将只剩下 ' + (S.c.length - count) + ' 匹马，数量过少可能无法繁育，是否继续？';
}
    
    if(confirm('⚠️ 确定要一次性提交这 ' + count + ' 匹马吗？\n预计可获得 ' + totalH + ' 枚马蹄铁。')) {
      // 执行批量提交（绕过单次弹窗）
      for(var i=0; i<5; i++) {
        if(!S.hoofSubmitted[i] && window._hSelected00[i]) {
          var c = findC(window._hSelected00[i]);
          if(c) {
            S.hoof = (S.hoof||0) + getHirePrice(c);
            S.hoofSubmitted[i] = true;
            S.c = S.c.filter(function(x){return x.id!==c.id});
            S.sel = S.sel.filter(function(x){return x!==c.id});
            if(S.head===c.id){S.head=null;S.headStart=0;S.headRace=0}
            window._hSelected00[i] = null;
          }
        }
      }
      sv(); 
      render();
      alert('🧲 雇佣成功！批量获得了 ' + totalH + ' 枚马蹄铁。');
    }
  // ==== 一键填充逻辑 ====
  } else {
    // === 一键填充模式 ===
    var validHorses = S.c.filter(function(c){
      if(c.isLocked) return false; // 🌟 核心：上锁的马不参与一键填充！
      if(c.sx==='h') return false;
      if(c.var || c.mut || c.pie || c.firefly || c.sterile || c.doubleWomb) return false;
      if(!isH(c) || c.cd > Date.now()) return false;
      if(c.bc >= getMaxBc(c)) return false;
      if(c.id === S.head || c.id === S.stud) return false;
      return true;
    });
    var available = validHorses.sort(function(a,b){
      var rA = rS(a), rB = rS(b);
      if (rA !== rB) return rA - rB; 
      return b.gen - a.gen;
    });
    
    // 排除已经手动选中的
    available = available.filter(function(c){
      return window._hSelected00.indexOf(c.id) < 0;
    });

    var filled = 0;
    for(var i=0; i<5; i++) {
      if(S.hoofSubmitted[i]) continue;
      if(window._hSelected00[i]) continue;
      
      if(available.length > 0) {
        window._hSelected00[i] = available.shift().id;
        filled++;
      }
    }
    if(filled > 0) mkStore00UI();
    else alert('没有更多符合条件的马可填了，请手动选择或等待冷却结束。');
  }
};

  // 生成 5 个槽位
for(var k=0; k<5; k++) {
  (function(idx){
    var cd = ce('div');
    cd.className = 'sc'; 
    cd.style.cssText = 'padding:8px; gap:6px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; flex:1 1 80px; min-width:85px; max-width:120px; box-sizing:border-box;';
    
    if(S.hoofSubmitted && S.hoofSubmitted[idx]) {
       cd.style.opacity='0.3';
       var em = ce('div');em.className='em';em.textContent='已提交';
       cd.appendChild(em);
    } else {
       var selId = window._hSelected00[idx];
       var mc = selId ? findC(selId) : null;
       
       if(selId && !mc) { window._hSelected00[idx] = null; mc = null; }
       
       if(mc) {
         cd.appendChild(mkPB(mc));
         
         var infoDiv = ce('div');
         infoDiv.style.cssText = 'font-size:11px; text-align:center; margin:2px 0; line-height:1.4; width:100%; overflow:hidden;';
         infoDiv.innerHTML = '<div style="color:var(--name); font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">'+(mc.name||'第'+mc.gen+'代')+'</div>'+
                             '<div style="color:var(--page-dim); font-size:10px;">剩'+(getMaxBc(mc)-mc.bc)+'次</div>';
         cd.appendChild(infoDiv);
         
         var btnSubmit = ce('button');
         btnSubmit.className = 'buy';
         btnSubmit.style.cssText = 'width:100%; min-height:28px; padding:0; margin-top:2px; font-size:11px;';
         var pr = getHirePrice(mc);
         btnSubmit.textContent = '🧲 提交('+pr+')';
         btnSubmit.onclick = function() {
           if(confirm('确定要提交「'+(mc.name||('第'+mc.gen+'代'))+'」吗？将获得 '+pr+' 马蹄铁。')) {
             window._hSelected00[idx] = null;
             submitHorse00(mc, idx);
           }
         };
         cd.appendChild(btnSubmit);
         
         var btnChange = ce('button');
         btnChange.className = 'btn-change';
         btnChange.textContent = '更换';
         btnChange.onclick = function() { window._hSelected00[idx] = null; open00Select(idx); };
         cd.appendChild(btnChange);
         
       } else {
         var emptyBox = ce('div');
         emptyBox.className = 'empty-slot-box';
         emptyBox.textContent = '+';
         cd.appendChild(emptyBox);
         
         var btnSelect = ce('button');
         btnSelect.className = 'buy btn-select';
         btnSelect.textContent = '🔍 选择马匹';
         btnSelect.onclick = function() { open00Select(idx); };
         cd.appendChild(btnSelect);
       }
    }
    gridWrap.appendChild(cd);
  })(k);
}
} catch(e) { console.error("雇佣区报错", e); }

try {
  if(pg){
    pg.innerHTML='';
    pg.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin-top:10px; margin-bottom:10px;';    
    var mkHirePot = function(icon, name, cost, id) {
      var b = ce('div');
      b.className = 'pc';
      b.style.cssText = 'width:85px; flex:0 0 85px; padding:10px 4px; cursor:pointer;';
      b.innerHTML = '<div class="ic" style="font-size:26px;">'+icon+'</div>'+
                    '<div class="pn" style="color:var(--accent); font-size:13px; margin-top:4px; white-space:nowrap;">'+name+'</div>'+
                    '<div class="pd" style="color:var(--page-dim); font-size:11px; margin-top:4px;">🧲 '+cost+'</div>';
      b.onclick = function(){ showPotionDetail('00', id); };
      pg.appendChild(b);
    };
    
    mkHirePot('🔥', '狂热魔药', 50, 'hfan');
    mkHirePot('🌾', '丰饶魔药', 50, 'hfeng');
    mkHirePot('🎲', '混合药剂', 70, 'hmix');
    mkHirePot('🩸', '红龙之血', 100, 'hdrag');
    mkHirePot('🌙', '夜骐魔药', 200, 'hnight');
  }
} catch(e) { console.error("药剂区报错", e); }
try {
  if(cb){
    cb.innerHTML='';
    var cc0=ce('div');cc0.className='pc';cc0.style.cssText='border-color:var(--card-bd);width:100%;max-width:100%';
    var canTrain=(S.trainCount||0)>0;
    cc0.innerHTML='<div class="ic">🏋️</div><div class="pn" style="color:var(--page-fg)">头马特训</div><div class="pd">消耗 20 铁<br>20%概率速度+0.1~0.2<br>剩余次数: '+(S.trainCount||0)+'</div>'+(canTrain?'<button class="buy">🧲 20 铁 特训</button>':'<div class="pct" style="color:var(--page-dim)">次数已用尽</div>');
    if(canTrain){cc0.querySelector('button').onclick=function(){trainHead00()}}
    cb.appendChild(cc0);

    var ec = ce('div'); ec.className='pc'; ec.style.cssText='border-color:var(--accent);width:100%;max-width:100%;margin-top:8px;';
    var canBuyEgg = S.eggCap < EGG_CAPMAX;
    var haveHoof = (S.hoof||0) >= EGG_COST;
    ec.innerHTML = '<div class="ic">🥚</div>'+
      '<div class="pn" style="color:var(--accent)">扩建蛋槽</div>'+
      '<div class="pd">当前上限 '+S.eggCap+' / '+EGG_CAPMAX+'<br>花费 '+EGG_COST+' 🧲，上限 +'+EGG_STEP+'</div>'+
      (canBuyEgg 
        ? '<button class="buy" style="background:var(--primary-bg);border-color:var(--primary-bd);color:var(--primary-fg)" '+(haveHoof?'':'disabled')+'>🧲 '+EGG_COST+' 扩建</button>' 
        : '<div class="pct" style="color:var(--page-dim)">已达上限</div>');
    if(canBuyEgg && haveHoof){
      ec.querySelector('button').onclick=function(){
        S.hoof -= EGG_COST;
        S.eggCap = Math.min(EGG_CAPMAX, S.eggCap + EGG_STEP);
        sv(); render();
      };
    }
    cb.appendChild(ec);
  }
} catch(e) { console.error("特训区报错", e); }
  
  
  try {
    var kt=document.getElementById('k00Text');
    if(kt&&(!S._k00Text||Date.now()-(S._k00Time||0)>15000)){
      var dlg=["……","成交。","想来还需要更多训练。","本游戏已进入正式内测版本，祝玩得愉快，先驱者。","不要问我药物材料是怎么来的。我不知道。","无用的魅力。我们需要身体强健的马匹。","*这里的文字离家出走了*","快点跟上。","不要随便服用来路不明的混合药剂。已经喝了是什么意思？吐出来。"];
      S._k00Text=pk(dlg);S._k00Time=Date.now();kt.textContent=S._k00Text;
    }
  } catch(e) {}
}
function checkDailyReset() {
  var today = new Date().toDateString();
  if (S.refreshData.date !== today) {
    S.refreshData.date = today;
    S.refreshData.s01 = 5;
    S.refreshData.s00 = 5;
    sv();
  }
}

function manualRefresh(type) {
  checkDailyReset();
  if (type === '01') {
    if (S.refreshData.s01 <= 0) return alert('今日立刻刷新次数已用尽。');
    if (S.r < 100) return alert('胡萝卜不足 (需要 100 🥕)');
    if (confirm('⚠️ 确定消耗 100 🥕 立刻刷新月光商店吗？\n（今日剩余次数：' + S.refreshData.s01 + '/5）')) {
      S.r -= 100;
      S.refreshData.s01--;
      mkStore(true);
      S.stT = Date.now(); // 🌟 花钱了，01商店时间重置为现在
      sv(); render();
      showToast('🛒 月光商店已刷新！');
    }
  } else if (type === '00') {
    if (S.refreshData.s00 <= 0) return alert('今日立刻刷新次数已用尽。');
    if ((S.hoof || 0) < 50) return alert('马蹄铁不足 (需要 50 🧲)');
    if (confirm('⚠️ 确定消耗 50 🧲 立刻刷新缄默商店吗？\n（今日剩余次数：' + S.refreshData.s00 + '/5）')) {
      S.hoof -= 50;
      S.refreshData.s00--;
      S.trainCount = 1;
      S.hoofSubmitted = [false,false,false,false,false];
      S.st00T = Date.now(); // 🌟 花钱了，00商店时间重置为现在
      sv(); render();
      showToast('🌑 缄默商店已刷新！');
    }
  }
}
function mkStore(force){
  var now=Date.now();
  if(!force && S.stT && now-S.stT<SRM) return; 
  
  S.st=[];
  var hasWingInStore = false; 

  for(var i=0;i<SSZ;i++){
    var c=newC(0,{inst:true,store:true});
    if(c.sx==='h')c.sx=pk(['m','f']);
    c.mut=null;c.pie=false;c.firefly=false;c.sterile=false;c.doubleWomb=false;
    
    if(Math.random() >= 0.15) { c.g.win = 'none'; } // 15%概率有翅

    var wingOpt = fo('win', c.g.win);
    var wingBonus = 0;
    if (wingOpt.k !== 'none') {
      if (wingOpt.t === 'c') wingBonus = 100;       
      else if (wingOpt.t === 'r') wingBonus = 200;  
      else if (wingOpt.t === 'e') wingBonus = 500;  
    }

    c.price = 15 + Math.floor(rSFull(c) * 1.5) + wingBonus;
    c.hasWing = wingOpt.k !== 'none'; 
    
    if (c.hasWing) { hasWingInStore = true; }
    S.st.push(c);
  }
  
  if (hasWingInStore) {
    setTimeout(function(){ showToast('✨ 商店似乎进了一批带翅膀的好货！', true); }, 500);
  }
}
function buyStore(i){var it=S.st[i];if(!it||it.sold)return;if(S.r<SPR){alert('胡萝卜不够');return}if(S.c.length>=S.cap){alert('马群已满');return}S.r-=SPR;it.sold=true;
it.group = -1;it.store=false;S.c.push(it);mkDex(it);sv();render()}
function buyPot(t){if(t==='fire'){if(S.points<FP){alert('荧光点不够');return}S.points-=FP;S.p.fire=(S.p.fire||0)+1;}else if(t==='dispel'){if(S.r<DP){alert('胡萝卜不够');return}S.r-=DP;S.p.dispel=(S.p.dispel||0)+1;}else{var pr=t==='m'?MP:t==='v'?VP:IP;if(S.r<pr){alert('胡萝卜不够');return}S.r-=pr;S.p[t]=(S.p[t]||0)+1;}sv();render()}
function buyCap(){if(S.cap>=CAPMAX){alert('已达上限 '+CAPMAX);return}if(S.r<CAPSTEP){alert('胡萝卜不够');return}S.r-=CAPSTEP;S.cap=Math.min(CAPMAX,S.cap+10);unlock('cap50');if(S.cap>=100)unlock('cap100');if(S.cap>=200)unlock('cap200');sv();render()}
function showM(html){$('modalC').innerHTML=html;$('modal').style.display='flex'}
function closeM(){$('modal').style.display='none'}
function toggleLock(id){var c=findC(id);if(!c)return;c.isLocked=!c.isLocked;sv();closeM();render();}
// ==== 浮窗ui ====
function openMenu(id){
  var c=findC(id);if(!c)return;
  
 // ==== buildGeneHtml ====
var buildGeneHtml = function(c){
  var isSpecial = (c.var === 'special_01' || c.var === 'special_00' || !isH(c));
  var bgColor = 'var(--card-bg-solid)';
  var bdColor = 'var(--card-bd)';
  var innerBg = 'var(--inner-bg)';
  var innerBd = 'var(--inner-bd)';
  var textMain = 'var(--page-fg)';
  var textDim = 'var(--page-dim)';
  var textMuted = 'var(--page-muted)';
  var accent = 'var(--accent)';

  var gHtml = '<div style="background:'+bgColor+'; border:1px solid '+bdColor+'; border-radius:4px; padding:10px; margin-bottom:12px; font-size:12px; text-align:left; color:'+textMain+';">';

  gHtml += '<div style="color:'+accent+'; font-weight:bold; margin-bottom:4px; border-bottom:1px solid '+bdColor+'; padding-bottom:2px;">颜色</div>';
  gHtml += '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:8px; text-align:left;">';

  if(isSpecial) {
    gHtml += '<div style="color:'+textMuted+';">■■ 未知</div><div style="color:'+textMuted+';">■■ 未知</div><div style="color:'+textMuted+';">■■ 未知</div>';
  } else {
    var renderColorBlock = function(ck) {
      var trio = CL[ck] || CL.grey_std;
      var parts = ck.split('_');
      var famMap = {
        rose:'红色', maroon:'红色',
        peach:'橙色', orange:'橙色', caramel:'橙色',
        cream:'黄色', yellow:'黄色', mustard:'黄色',
        lime:'黄绿', pear:'黄绿', olive:'黄绿',
        mint:'绿色', green:'绿色', forest:'绿色',
        aqua:'青绿', teal:'青绿', pine:'青绿',
        ice:'青色', cyan:'青色', ocean:'青色',
        sky:'蓝色', blue:'蓝色', navy:'蓝色',
        iris:'靛色', indigo:'靛色', night:'靛色',
        lilac:'紫色', purple:'紫色', plum:'紫色',
        ruby:'品红', magenta:'品红', wine:'品红',
        sakura:'粉色', pink:'粉色', fuchsia:'粉色',
        sand:'棕色', brown:'棕色', coffee:'棕色',
        silver:'灰色', grey:'灰色', charcoal:'灰色',
        ash:'黑色', black:'黑色', ink:'黑色',
        snow:'白色', white:'白色', pearl:'白色'
      };
      var zoneMap = {light:'明亮', std:'标准', dark:'黑暗'};
      var fam = famMap[parts[0]] || '未知';
      var zone = zoneMap[parts[1]] || '标准';

      return '<div style="background:'+innerBg+'; padding:6px; border-radius:4px; border:1px solid '+innerBd+';">' +
             '<div style="display:flex; align-items:center; font-weight:bold; font-size:12px; color:'+textMain+';">' +
             '<span style="display:inline-block; width:10px; height:10px; background:' + trio[1] + '; border:1px solid #000; border-radius:1px; margin-right:4px; flex-shrink:0;"></span>' + trio[0] +
             '</div>' +
             '<div style="font-size:10px; color:'+textDim+'; margin-top:4px; padding-left:14px; white-space:nowrap;">（' + fam + '-' + zone + '）</div>' +
             '</div>';
    };
    gHtml += renderColorBlock(c.g.col);
    gHtml += renderColorBlock(c.g.wingCol);
    gHtml += renderColorBlock(c.g.tailCol);
  }
  gHtml += '</div>';

  gHtml += '<div style="color:'+accent+'; font-weight:bold; margin-bottom:4px; border-bottom:1px solid '+bdColor+'; padding-bottom:2px;">部件</div>';
  gHtml += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; color:'+textMain+';">';
  var partsList = ['eye','bod','win','tai','hor','leg'];
  for(var i=0; i<partsList.length; i++){
    var pk = partsList[i];
    gHtml += '<div style="display:flex; justify-content:space-between; background:'+innerBg+'; padding:2px 4px; border-radius:3px; color:'+textMain+';">';

    if(isSpecial) {
      gHtml += '<span style="color:'+textMuted+';">'+P[pk].n+'：? ? ?</span>';
      gHtml += '<span style="color:var(--mut); font-size:11px;">未知</span>';
    } else {
      var opt = fo(pk, c.g[pk]);
      var tColor = opt.t==='c' ? 'var(--rar-c)' : (opt.t==='r' ? 'var(--rar-r)' : 'var(--rar-e)');
      var tText = opt.t==='c' ? '常见' : (opt.t==='r' ? '稀有' : '罕见');
      gHtml += '<span>'+P[pk].n+'：'+opt.n+'</span>';
      gHtml += '<span style="color:'+tColor+'; font-size:11px;">'+tText+'</span>';
    }
    gHtml += '</div>';
  }
  gHtml += '</div></div>';
  return gHtml;
};
  var inArc=S.a.some(function(x){return x.id === c.id});
  var isHead=S.head===id;
  var si=SX[c.sx]||SX.m;
  var isEgg=!isH(c);
  var muts=[];
if(c.mut)muts.push(c.mut==='albino'?'白化':'黑化');
if(c.pie)muts.push(c.pieColor==='w'?'白斑':'黑斑');
if(c.firefly)muts.push('<span style="color:var(--gold)">萤火虫</span>');
if(c.sterile)muts.push('<span style="color:var(--sterile)">不育</span>');
if(c.doubleWomb)muts.push('<span style="color:var(--gold)">双子宫</span>');
var mutStr=muts.length?' · '+muts.join(' · '):'';

var idLine = '';
if(c.hid) {
  idLine += '<div style="font-size:11px; color:var(--page-muted); margin-bottom:6px; letter-spacing:0.5px;">🆔 '+c.hid+'</div>';
}
if(c.currentFarmId) {
  if(c.birthFarmId && c.birthFarmId !== c.currentFarmId) {
    idLine += '<div style="font-size:11px; color:var(--page-muted); margin-bottom:4px; word-break:break-all; line-height:1.4;">🏡 出生于: '+(c.birthFarmName||'未知')+' ('+c.birthFarmId+')</div>';
    idLine += '<div style="font-size:11px; color:var(--page-muted); margin-bottom:8px; word-break:break-all; line-height:1.4;">🏡 现所在: '+(c.currentFarmName||'未知')+' ('+c.currentFarmId+')</div>';
  } else {
    idLine += '<div style="font-size:11px; color:var(--page-muted); margin-bottom:8px; word-break:break-all; line-height:1.4;">🏡 马场: '+(c.currentFarmName||'未知')+' ('+c.currentFarmId+')</div>';
  }
}
var h='<div class="mdt">'+(c.isLocked ? '🔒 ' : '')+(c.name?'「'+c.name+'」':'')+'第 '+c.gen+' 代 · '+si.s+' '+si.n+'</div>'+idLine+'<div style="font-size:11px;color:var(--page-dim);margin-bottom:8px">魅力值 '+rSFull(c)+'/30'+mutStr+'</div>';
  h += buildGeneHtml(c);
  
  h += '<div class="ma">';
  if(!isEgg)h+='<button onclick="rename(\''+id+'\')">✏️ 改名</button>';
  h += '<button onclick="toggleLock(\''+id+'\')">'+(c.isLocked?'🔓 解锁':'🔒 锁定')+'</button>';
  
  if(!inArc&&!isEgg&&S.p.m>0&&!c.mut&&!c.pie)h+='<button onclick="useP(\''+id+'\',\'m\')">🌟 突变魔药 ('+S.p.m+')</button>';
  if(inArc&&S.p.v>0&&!c.var)h+='<button onclick="useP(\''+id+'\',\'v\')">🔮 变异魔药 ('+S.p.v+')</button>';
  if(S.p.fire>0&&isEgg&&!c.firefly)h+='<button onclick="useP(\''+id+'\',\'fire\')">✨ 萤火魔药 ('+S.p.fire+')</button>';
  if(S.p.dispel>0&&(c.mut||c.pie||c.firefly||c.sterile||c.doubleWomb))h+='<button onclick="useP(\''+id+'\',\'dispel\')">💧 消融魔药 ('+S.p.dispel+')</button>';
  
  if(!inArc&&!isEgg){
    if(c.sx!=='m'&&!c.induceHerm&&S.p.i>0)h+='<button onclick="useP(\''+id+'\',\'i\')">🍷 诱变魔药 ('+S.p.i+')</button>';
    if(c.doubleWomb&&c.bc>=10&&!c.usedHfan&&S.p.hfan>0)h+='<button onclick="useP(\''+id+'\',\'hfan\')">🔥 狂热魔药 ('+S.p.hfan+')</button>';
    if(c.sterile&&!c.usedHfeng&&S.p.hfeng>0)h+='<button onclick="useP(\''+id+'\',\'hfeng\')">🌾 丰饶魔药 ('+S.p.hfeng+')</button>';
    if(S.p.hmix>0)h+='<button onclick="useP(\''+id+'\',\'hmix\')">🎲 混合药剂 ('+S.p.hmix+')</button>';
    if(isHead&&S.p.hdrag>0&&!c.tempCharmBonus)h+='<button onclick="useP(\''+id+'\',\'hdrag\')">🩸 红龙之血 ('+S.p.hdrag+')</button>';
    if(isHead&&S.p.hnight>0&&getSpeed(c)<20)h+='<button onclick="useP(\''+id+'\',\'hnight\')">🌙 夜骐魔药 ('+S.p.hnight+')</button>';
    
    if(c.sx==='m'&&!c.var&&!c.sterile&&S.stud!==id&&!isHead){
      if(c.hasBeenStud)h+='<button disabled>👑 已当过种马</button>';
      else h+='<button onclick="setStud(\''+id+'\')">👑 设为种马</button>'
    }
    if(S.stud===id&&!isHead)h+='<button onclick="unsetStud()">取消种马'+(S.studL>0?'（花 '+UNSET_FEE+'🥕）':'')+'</button>';
    if(!c.var&&!isEgg&&!isHead)h+='<button onclick="confirmSetHead(\''+id+'\')">👑 设为首马</button>';
    if(!c.var&&!isHead)h+='<button onclick="archive(\''+id+'\')">📌 保存到永久档案</button>';
  }
  
  if(!isHead){
    if(c.isLocked) {
      h+='<button disabled style="opacity:0.5; cursor:not-allowed;">🔒 已锁定 (无法删除)</button>';
    } else {
      h+='<button class="danger" onclick="rmC(\''+id+'\')">🗑 删除</button>';
    }
  }
  h+='</div><button class="mc" onclick="closeM()">关闭</button>';
  showM(h);
}
function moveHorseGroup(id, targetG) {
  var c = findC(id);
  if(!c) return;
  c.group = parseInt(targetG);
  sv(); closeM(); render('list');
}
// 🌟 自定义输入框弹窗（完美适配手机键盘防遮挡 + PC端焦点稳定）
function customPrompt(title, defaultValue, callback) {
  var h = '<div class="mdt">'+title+'</div>';
  h += '<input id="customPromptInput" class="breed-search" style="width:100%; min-height:40px; margin-bottom:15px; font-size:15px; box-sizing:border-box; padding:8px;" value="'+(defaultValue||'')+'">';
  h += '<div style="display:flex; gap:10px;">';
  h += '<button class="mc" style="flex:1;" onclick="closeM()">取消</button>';
  h += '<button class="primary" id="customPromptBtn" style="flex:1;">确定</button>';
  h += '</div>';
  
  showM(h);
  
  var input = document.getElementById('customPromptInput');
  var btn = document.getElementById('customPromptBtn');
  var modalC = document.getElementById('modalC');
  
  setTimeout(function() { 
    input.focus(); 
    input.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
  }, 150);
  
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function onResize() {
      if (document.getElementById('customPromptInput')) {
        modalC.style.marginBottom = (window.innerHeight - window.visualViewport.height) + 'px';
      } else {
        window.visualViewport.removeEventListener('resize', onResize);
      }
    });
  }
  
  btn.onclick = function() {
    closeM();
    modalC.style.marginBottom = '0';
    callback(input.value);
  };
  
  input.onkeydown = function(e) {
    if (e.key === 'Enter') {
      closeM();
      modalC.style.marginBottom = '0';
      callback(input.value);
    }
  };
}

// ==== 马匹命名 ====
function rename(id){
  var c=findC(id);
  if(!c)return;
  customPrompt('给这匹马起个名字（最多25个字符）：', c.name||'', function(n){
    if(n === null) return;
    n = n.trim();
    if(n.length > 25) return alert('名字太长了！最多只能输入 25 个字符。');
    
    // 同样限制非法字符
    var validPattern = /^[\u4e00-\u9fa5a-zA-Z0-9_\-\s.\u3000-\u303F]*$/;
    if (!validPattern.test(n)) {
      return alert('⚠️ 名字包含非法字符！只能使用中英文、数字和简单标点。');
    }

    c.name = n;
    if(c.name) unlock('named');
    sv(); closeM(); render('list');
  });
}
function useP(id,t){var c=findC(id);if(!c)return;if(t==='m'){if(S.p.m<=0||c.mut||c.pie)return;S.p.m--;c.mut=pk(MT)}else if(t==='v'){
  if(S.p.v<=0||c.var||S.a.indexOf(c)<0)return;
  if(!confirm('⚠️ 警告：变异魔药是单向不可逆的！\n使用后将永久改变该马匹的变异形态（不可通过消融魔药洗掉）。\n确定要使用吗？')) return;
  S.p.v--;
  c.var=pk(VT);
}else if(t==='i'){if(S.p.i<=0||c.sx==='m'||c.induceHerm)return;S.p.i--;c.induceHerm=true}else if(t==='fire'){if(S.p.fire<=0||isH(c)||c.firefly)return;S.p.fire--;c.firefly=true}else if(t==='dispel'){if(S.p.dispel<=0)return;var muts=[];if(c.mut)muts.push('mut');if(c.pie)muts.push('pie');if(c.firefly)muts.push('firefly');if(c.sterile)muts.push('sterile');if(c.doubleWomb)muts.push('doubleWomb');if(muts.length===0)return;S.p.dispel--;var rm=pk(muts);if(rm==='mut')c.mut=null;if(rm==='pie')c.pie=false;if(rm==='firefly')c.firefly=false;if(rm==='sterile')c.sterile=false;if(rm==='doubleWomb')c.doubleWomb=false}else if(t==='hfan'){if(S.p.hfan<=0||c.bc<10||c.usedHfan)return;S.p.hfan--;c.usedHfan=true;c.bc-=5}else if(t==='hfeng'){if(S.p.hfeng<=0||!c.sterile||c.usedHfeng)return;S.p.hfeng--;c.usedHfeng=true;c.tempBreed=true}else if(t==='hmix'){if(S.p.hmix<=0)return;S.p.hmix--;c.g.col=pk(CK);c.g.wingCol=pk(CK);c.g.tailCol=pk(CK)}else if(t==='hdrag'){if(S.p.hdrag<=0||S.head!==id||c.tempCharmBonus)return;S.p.hdrag--;c.tempCharmBonus=10}else if(t==='hnight'){if(S.p.hnight<=0||S.head!==id||getSpeed(c)>=20)return;S.p.hnight--;var add=1+Math.floor(Math.random()*5);c.trainSpeed+=add;if(c.trainSpeed>20)c.trainSpeed=20}sv();closeM();render();checkGlobalAch();sv()}
function setStud(id){
  var c=findC(id);
  if(!c || c.sx!=='m' || c.var || c.sterile || c.hasBeenStud || S.stud===id) return;
  
  // 🌟 核心修复：如果当前已经有了别的种马，必须弹窗警告并确认扣费
  if(S.stud && S.stud !== id) {
    if(S.r < UNSET_FEE) {
      return alert('更换种马需要扣除 ' + UNSET_FEE + ' 胡萝卜，你的胡萝卜不够！');
    }
    
    // 🌟 弹出确认框
    if(!confirm('⚠️ 当前已经有种马了！\n直接更换新种马需要消耗 ' + UNSET_FEE + ' 胡萝卜。\n确定要更换吗？')) {
      return; // 玩家点了取消，直接中止，不扣钱
    }
    
    // 玩家点了确定，扣除胡萝卜
    S.r -= UNSET_FEE;
  }

  c.hasBeenStud=true;
  S.stud=id;
  S.studL=SB;
  S.studT=Date.now();
  S.studN=SMN+Math.random()*(SMX-SMN);
  unlock('hi');
  sv();
  closeM();
  render();
}
function unsetStud(){if(S.studL>0&&S.r<UNSET_FEE){alert('取消未用完的种马需要 '+UNSET_FEE+' 胡萝卜');return}if(S.studL>0)S.r-=UNSET_FEE;S.stud=null;S.studL=0;sv();closeM();render()}
function archive(id){
  var target = findC(id);
  if(target && target.isLocked) {
    return alert('🔒 该马匹已锁定，无法归档！请先点击 ⋯ 菜单解锁。');
  }
  
  if(!confirm('⚠️ 警告：\n保存到永久档案后，该马匹将退役，无法再繁育，也无法改变部分基因。\n确定要归档吗？')) {
    return;
  }
  
  var idx=-1;
  for(var i=0;i<S.c.length;i++)if(S.c[i].id===id){idx=i;break}
  if(idx<0)return;
  var c=S.c.splice(idx,1)[0];
  c.isRetiredHead=true;
  if(S.stud===id){S.stud=null;S.studL=0}
  if(S.head===id){S.head=null;S.headStart=0;S.headRace=0}
  S.sel=S.sel.filter(function(x){return x!==id});
  S.a.push(c);
  unlock('archived');sv();closeM();render();
}
function rmC(id){
  var target = findC(id);
  if(target && target.isLocked) {
    return alert('🔒 该马匹已锁定，无法删除！请先点击 ⋯ 菜单解锁。');
  }
  S.c=S.c.filter(function(c){return c.id!==id});
  S.a=S.a.filter(function(c){return c.id!==id});
  S.sel=S.sel.filter(function(x){return x!==id});
  if(S.stud===id){S.stud=null;S.studL=0}
  if(S.head===id){S.head=null;S.headStart=0;S.headRace=0}
  if(S.last&&S.last.id===id){S.last=null;S.lastM=[]}
  sv();closeM();render();
}
function openSave(){showM('<div class="mdt">💾 存档管理</div><div style="font-size:11px;color:#888;margin-bottom:10px">游戏会在每次操作后自动保存在当前浏览器中。</div><div class="ma"><button class="primary" onclick="dlExp()">📥 导出存档文件 (下载到本地)</button><button onclick="impSave()">📤 导入存档文件 (从本地选择)</button><button class="danger" onclick="clearGame()" style="margin-top:20px">🗑 彻底清空当前存档</button></div><button class="mc" onclick="closeM()">关闭</button>')}
// ==== dlExp 存档导出====
function dlExp(){
  var defaultName = '【Save-马儿不跑】_' + getTimestamp();
  customPrompt("请给你的存档起个名字吧（留空则使用默认名字）：", defaultName, function(customName){
    if(customName === null) return;
    if(customName.trim() === '') customName = defaultName;
    customName = customName.replace(/[\/\\:*?"<>|]/g, '_'); 

    var d = getSaveData();
    var jsonString = JSON.stringify(d);
    var encoded = btoa(unescape(encodeURIComponent(jsonString)));
    var txt = "// 【马儿不跑】存档文件\n// 请勿随意更改以下内容，可能导致丢档和无法导入\n\n" + encoded;
    
    try{
      var blob=new Blob([txt],{type:'application/json'});
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=url;
      a.download=customName + '.json'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function(){URL.revokeObjectURL(url)},2000);
      alert('✅ 存档文件已下载！');
    }catch(e){
      alert('下载失败，请尝试使用其他浏览器');
    }
  });
}
function cpExp(){var ta=$('expA');ta.select();ta.setSelectionRange(0,999999);try{document.execCommand('copy');alert('已复制');}catch(e){alert('请长按手动复制')}}
function impSave(){var f=ce('input');f.type='file';f.accept='.json,application/json';f.onchange=function(e){var file=e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(ev){doImp(ev.target.result)};r.readAsText(file)};f.click()}
function pickFile(){var f=$('impFile');f.onchange=function(e){var file=e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(ev){$('impA').value=ev.target.result};r.readAsText(file)};f.click()}
function doImp(t){
  if(!confirm('⚠️ 警告：导入存档将完全覆盖当前的所有马匹、胡萝卜和进度！\n确定要读取该文件吗？'))return;
  try{
    var jsonStr = t;
    if(t.indexOf('// 【马儿不跑】') >= 0) {
      try {
        var lines = t.split('\n');
        var dataLines = lines.filter(function(line){ return !line.trim().startsWith('//'); });
        var encodedData = dataLines.join('').trim();
        jsonStr = decodeURIComponent(escape(atob(encodedData)));
      } catch (decryptError) {
        throw new Error('文件解密失败，请勿随意更改题头或文件内容！');
      }
    }
    
    var d;
    try { d = JSON.parse(jsonStr); } catch (parseError) { throw new Error('文件内容已损坏，无法读取！'); }
    if(!d.c)throw new Error('无效的存档文件（缺少核心马匹数据）');

    // 🌟 直接调用 al 洗刷整个游戏数据，不再重复写一遍！
    al(d);
    
    if(!S.stT) S.stT = Date.now();
    if(!S.st00T) S.st00T = Date.now();
    
    mkStore(true); 
    sv();
    closeM();
    render();
    alert('✅ 存档导入成功！');
  }catch(e){
    alert('❌ 导入失败：'+e.message);
  }
}

function mkHeadUI(){
  var box=$('headBox');if(!box)return;
  var sub=$('headSub');box.innerHTML='';
  if(!S.head){
    if(sub)sub.textContent='未设置';
    box.innerHTML='<div class="em">还没有头马。在马群里点 ⋯ → 设为首马。</div>';
    return;
  }
  var c=findC(S.head);
  if(!c){
    S.head=null;if(sub)sub.textContent='未设置';
    box.innerHTML='<div class="em">头马丢失</div>';
    return;
  }
  var speed=getSpeed(c);var bonus=headBonus(c);var charm=rSFull(c)+bonus;
  if(c.tempCharmBonus)charm+=c.tempCharmBonus;
  var si=SX[c.sx]||SX.m;
  if(sub)sub.textContent=(c.name||('第 '+c.gen+' 代'))+' · '+speed.toFixed(1)+'/20';
  
  var wrap=ce('div');wrap.className='head-card';wrap.appendChild(mkPB(c));
  var info=ce('div');info.className='head-info';
  var elapsed=Date.now()-S.headStart;
  
  var html='<div class="hn">'+(c.isLocked ? '🔒 ' : '')+(c.name||('第 '+c.gen+' 代'))+' '+si.s+' '+si.n+'</div>';
  html+='<div class="hrow">魅力值 '+charm+(bonus||c.tempCharmBonus?' <span style="color:var(--gold)">(+'+((bonus||0)+(c.tempCharmBonus||0))+')</span>':'')+'</div>';
  html+='<div class="hrow">速度 '+speed.toFixed(1)+' / 20</div>';
  if(!c.sterile){html+='<div class="hrow">剩余繁育 '+(getMaxBc(c)-c.bc)+' / '+getMaxBc(c)+'</div>'}
else{html+='<div class="hrow" style="color:var(--sterile)">不育（无需繁育）</div>'}

if(c.tempCharmBonus)html+='<div class="hrow" style="color:var(--redragon-fg); font-weight:bold;">🩸 红龙之血生效中</div>';
if(c.induceHerm)html+='<div class="hrow" style="color:var(--induce-herm-fg)">🍷 诱变魔药生效中</div>';
if(c.tempBreed)html+='<div class="hrow" style="color:var(--temp-breed-fg)">🌾 丰饶魔药生效中</div>';

if(speed>=20){
  var frem=Math.max(0,HEAD_FORCE-elapsed);
  var fh=Math.floor(frem/3600000);var fm=Math.floor(frem%3600000/60000);
  html+='<div class="hrow" style="color:var(--sterile)">强制归档倒计时 '+fh+'小时'+fm+'分</div>'
}
  info.innerHTML=html;wrap.appendChild(info);box.appendChild(wrap);
  
  var pots=ce('div');pots.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:8px';
  if(S.p.m>0&&!c.mut&&!c.pie){var bm=ce('button');bm.className='primary';bm.style.cssText='flex:1;font-size:12px;padding:6px';bm.textContent='🌟 突变药水('+S.p.m+')';bm.onclick=function(){useP(c.id,'m')};pots.appendChild(bm)}
  if(c.sx!=='m'&&!c.induceHerm&&S.p.i>0){var bi=ce('button');bi.className='primary';bi.style.cssText='flex:1;font-size:12px;padding:6px;background:#c05a9a;border-color:#c05a9a';bi.textContent='🍷 诱变魔药('+S.p.i+')';bi.onclick=function(){useP(c.id,'i')};pots.appendChild(bi)}
  if(pots.children.length>0)box.appendChild(pots);
  
  var bw=ce('div');bw.className='head-actions';
  var rb=ce('button');rb.className='primary';
  var rc=Date.now()-S.headRace;var cd=getRaceCd(c);
  if(rc<cd){
    rb.disabled=true;var cs=Math.ceil((cd-rc)/1000);
    rb.textContent='比赛冷却 '+Math.floor(cs/60)+':'+String(cs%60).padStart(2,'0')
  }else{
    rb.textContent='🏇 去比赛！';rb.onclick=raceHead
  }
  bw.appendChild(rb);
  
  var ab=ce('button');ab.className='danger';
  var canArc=((c.sterile||c.bc>=getMaxBc(c))&&speed>=20);
  if(canArc){
    ab.textContent='📦 归档并更换头马';
    ab.onclick=function(){
      if(confirm('⚠️ 警告：\n归档后它将永久进入名人堂，无法再次担任头马，也无法繁育。\n确定要让它退役吗？')){archive(S.head)}
    }
  }else{
    ab.disabled=true;
    if(!c.sterile&&c.bc<getMaxBc(c))ab.textContent='需用尽所有繁育次数';
    else ab.textContent='需速度满 20'
  }
  bw.appendChild(ab);
  var mb=ce('button');mb.textContent='⋯';mb.onclick=function(){openMenu(S.head)};bw.appendChild(mb);
  box.appendChild(bw);
}
// 🌟 01的Beta彩蛋红包 (即刻到账版)
function checkSoftLock() {
  // 1. 如果马群里有马，跳过
  if (S.c.length > 0) return;
  
  // 2. 如果胡萝卜 >= 50，玩家能自己买马，跳过
  if (S.r >= 50) return;

  // 3. 4小时冷却限制，防止恶意清空刷钱
  var now = Date.now();
  if (S.lastRescue && now - S.lastRescue < 3600000 * 4) return; 

  // 4. 触发彩蛋：立刻加钱、记录时间、保存、重绘
  S.lastRescue = now;
  S.r = 50; 
  sv(); 
  render(); // 让背后的UI状态立刻更新

  // 5. 弹出 01 的专属对话
 var html = '<div class="mdt" style="text-align:center; color:var(--gold); font-size:16px; margin-bottom:15px;">✨ 发现了一个 Beta 彩蛋！ ✨</div>';
html += '<div style="text-align:left; line-height:1.8; color:var(--page-fg); font-size:14px; margin-bottom:20px; padding:0 10px;">';
html += '<b style="color:var(--accent);">01：</b>“噢，牛仔！恭喜你触发了一个Beta彩蛋！”<br><br>';
// ...
html += '<div style="text-align:center; color:var(--st-ready); font-weight:bold; margin-bottom:20px;">(🥕 50 胡萝卜已自动放入您的仓库)</div>';
  html += '<button class="primary" onclick="closeM()" style="width:100%; padding:12px; font-size:16px; border-radius:6px; font-weight:bold;">好的，谢谢01</button>';
  
  showM(html);
}
// 🌟 模块化渲染引擎
function render(scope) {
  scope = scope || 'all';
  var _scrollY = window.scrollY;
  
  checkSoftLock();
  
  try {
    for(var mi=0; mi<S.c.length; mi++) mkDex(S.c[mi]);
  } catch(e) {}

  if (scope === 'all' || scope === 'top') {
    try {
      $('stat').innerHTML = '马匹 ' + S.c.length + '/' + S.cap + ' · 孵化 ' + S.c.filter(function(c){return !isH(c)}).length + ' · 档案 ' + S.a.length + ' · 图鉴 ' + Object.keys(S.d).length + ' · <span class="cr">🥕 ' + S.r + '</span> · <span style="color:var(--hoof-fg)">🧲 ' + (S.hoof||0) + '</span> · <span style="color:var(--gold)">✨ ' + (S.points||0) + '</span>';
      if($('farmNameBox')) $('farmNameBox').textContent = '🏡 ' + (S.farmName || '我的马场');
      if($('farmIdBox')) $('farmIdBox').textContent = S.farmId ? ('🆔 ' + S.farmId) : '';
    } catch(e) {}
  }

  if (scope === 'all' || scope === 'list') {
    try {
      var list = $('list');
      list.innerHTML = '';
      var shown = filterList();
      if(S.head) shown = shown.filter(function(x){return x.id !== S.head});
      
      var batchBar = ce('div');
      batchBar.style.cssText = 'display:flex; flex-direction:column; gap:8px; margin-bottom:12px; width:100%;';
      var toggleBatchBtn = ce('button');
      toggleBatchBtn.className = window._batchMode ? 'danger' : 'test';
      toggleBatchBtn.style.cssText = 'width:100%; padding:10px; font-size:14px; min-height:40px; font-weight:bold; border-radius:6px;';
      toggleBatchBtn.textContent = window._batchMode ? '✖ 取消' : '☑️ 分组选择';
      toggleBatchBtn.onclick = function(){
        window._batchMode = !window._batchMode;
        if(!window._batchMode) S._batchSel = [];
        render('list');
      };

      if (!window._batchMode) {
        batchBar.appendChild(toggleBatchBtn);
      } else {
        batchBar.appendChild(toggleBatchBtn);
        var batchSel = ce('select');
        batchSel.className = 'breed-search';
        batchSel.style.cssText = 'width:100%; min-height:36px; margin:0; font-size:14px; border:2px solid var(--primary-bd);';
        batchSel.innerHTML = '<option value="">-- 选择目标分组进行转移 --</option>';
        for(var gi=0; gi<S.groups.length; gi++){
          batchSel.innerHTML += '<option value="'+gi+'">'+S.groups[gi]+'</option>';
        }
        batchSel.onchange = function(){
          var targetG = parseInt(this.value);
          if(isNaN(targetG)) return;
          if(!S._batchSel || S._batchSel.length === 0) return alert('请先勾选要转移的马匹');
          S.c.forEach(function(c){ if(S._batchSel.indexOf(c.id) >= 0) c.group = targetG; });
          S._batchSel = [];
          sv(); render('list');
        };
        batchBar.appendChild(batchSel);
      }
      list.appendChild(batchBar);

      var renderGroup = function(groupId, groupName) {
        var groupHorses = shown.filter(function(c){ 
          var g = (c.group === undefined || c.group === null) ? -1 : c.group;
          return g === groupId; 
        });
        if(groupId === -1 && groupHorses.length === 0) return;
          
        var det = ce('details');
        det.className = 'dex-group';
        det.open = S.groupOpen[groupId] !== false;
          
        var summ = ce('summary');
        summ.className = 'dex-group-title';
        summ.style.cssText = 'display:flex; align-items:center; gap:8px; font-size:15px; color:var(--page-fg); font-weight:bold;';
        
        var titleSpan = ce('span');
        titleSpan.textContent = (groupId===-1?'📦 未分类':groupName) + ' ('+groupHorses.length+')';
        summ.appendChild(titleSpan);
        
        if(groupId >= 0){
          var editBtn = ce('button');
          editBtn.className = 'test';
          editBtn.style.cssText = 'padding:2px 8px; min-height:22px; font-size:11px; margin-left:auto; border-radius:4px;';
          editBtn.textContent = '✏️ 改名';
          editBtn.onclick = function(e) {
            e.preventDefault(); e.stopPropagation();
            customPrompt('修改分组名称（最多50字符，1个汉字算2字符）：', groupName, function(newName){
              if(newName === null) return;
              newName = newName.trim();
              if(!newName) newName = 'New Cave ' + groupId;
              var byteLength = 0;
              for (var i = 0; i < newName.length; i++) {
                if (newName.charCodeAt(i) <= 127) byteLength += 1;
                else byteLength += 2;
              }
              if (byteLength > 50) return alert('名字太长了！最多50个字符。');
              S.groups[groupId] = newName;
              sv(); render('list');
            });
          };
          summ.appendChild(editBtn);
        }
          
        if (window._batchMode && groupHorses.length > 0) {
          var allGroupSelected = true;
          for (var i = 0; i < groupHorses.length; i++) {
            if (S._batchSel.indexOf(groupHorses[i].id) < 0) { allGroupSelected = false; break; }
          }
          var groupSelectBtn = ce('button');
          groupSelectBtn.className = allGroupSelected ? 'primary' : 'test';
          groupSelectBtn.style.cssText = 'padding:2px 8px; min-height:22px; font-size:11px; border-radius:4px; ' + (groupId >= 0 ? '' : 'margin-left:auto;');
          groupSelectBtn.textContent = allGroupSelected ? '☒ 取消本组' : '☑️ 全选本组';
          groupSelectBtn.onclick = function(e) {
            e.preventDefault(); e.stopPropagation();
            if (allGroupSelected) {
              var groupIds = groupHorses.map(function(h){ return h.id; });
              S._batchSel = S._batchSel.filter(function(id){ return groupIds.indexOf(id) < 0; });
            } else {
              groupHorses.forEach(function(h) { if (S._batchSel.indexOf(h.id) < 0) S._batchSel.push(h.id); });
            }
            render('list');
          };
          summ.appendChild(groupSelectBtn);
        }
          
        summ.onclick = function(e){
          setTimeout(function() { S.groupOpen[groupId] = det.open; sv(); }, 10);
        };
        det.appendChild(summ);
        
        var wrap = ce('div');
        wrap.className = 'gd';
        for(var m=0; m<groupHorses.length; m++){ wrap.appendChild(mkCard(groupHorses[m])); }
        det.appendChild(wrap);
        list.appendChild(det);
      };

      for(var g=0; g<S.groups.length; g++){ renderGroup(g, S.groups[g]); }
      renderGroup(-1, '未分类');
      $('cCount').textContent = shown.length + '/' + S.c.length + '/' + S.cap;
    } catch(e) { console.error('马群渲染失败', e); }
  }

  if (scope === 'all' || scope === 'hatch') {
    try {
      var hatchBox = $('hatch');
      hatchBox.innerHTML = '';
      var eggs = S.c.filter(function(c){return !isH(c)});
      $('hatchCount').textContent = eggs.length + ' / ' + (S.eggCap || 10) + ' 个';
      if(eggs.length === 0) hatchBox.innerHTML = '<div class="em">没有正在孵化的蛋</div>';
      for(var h=0; h<eggs.length; h++) { hatchBox.appendChild(mkEggCard(eggs[h])); }

      var hSet = $('hatchSettings');
      if (hSet) {
        hSet.innerHTML = '';
        var setDiv = ce('div');
        setDiv.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:var(--inner-bg); border:1px dashed var(--inner-bd); padding:8px 12px; border-radius:6px;';
        setDiv.innerHTML = '<span style="font-size:12px; color:var(--page-dim);">🐣 幼崽孵化后默认前往：</span>';
        var targetSel = ce('select');
        targetSel.className = 'breed-search';
        targetSel.style.cssText = 'width:140px; min-height:28px; margin:0; font-size:12px;';
        var optUncat = ce('option');
        optUncat.value = '-1'; optUncat.textContent = '📦 未分类';
        if (S.defaultHatchGroup === -1) optUncat.selected = true;
        targetSel.appendChild(optUncat);
        for (var g = 0; g < S.groups.length; g++) {
          var opt = ce('option'); opt.value = g; opt.textContent = S.groups[g];
          if (S.defaultHatchGroup === g) opt.selected = true;
          targetSel.appendChild(opt);
        }
        targetSel.onchange = function() { S.defaultHatchGroup = parseInt(this.value); sv(); };
        setDiv.appendChild(targetSel);
        hSet.appendChild(setDiv);
      }
    } catch(e) { console.error('孵化渲染失败', e); }
  }

  if (scope === 'all' || scope === 'breed') {
    try { mkBreedUI(); } catch(e) { console.error('繁育UI渲染失败', e); }
  }

  if (scope === 'all' || scope === 'other') {
    try { mkStudUI(); } catch(e) {}
    try { mkStore(false); mkStoreUI(); } catch(e) {}
    try { mkStore00UI(); } catch(e) {}
    try { mkHeadUI(); } catch(e) {}
    try { mkArc(); } catch(e) {}
    try { mkDexUI(); } catch(e) {}
    try { mkAchUI(); } catch(e) {}
    try { var tmb=$('toggleModeBtn'); if(tmb) tmb.textContent=S.displayMode==='color'?'🔳 色块模式':'🔤 文字模式'; } catch(e) {}
    try { updUI(); } catch(e) {}
  }

  requestAnimationFrame(function() { window.scrollTo(0, _scrollY); });
}
function mkEggCard(c){var cd=ce('div');var isMutEgg=(c.mut||c.pie);cd.className='card egg'+(isMutEgg?' mut-highlight':'');var mb=ce('button');mb.className='mb';mb.textContent='⋯';mb.onclick=(function(id){return function(e){e.stopPropagation();openMenu(id)}})(c.id);cd.appendChild(mb);cd.appendChild(mkPB(c));var gn=ce('div');gn.className='gn';gn.textContent='第 '+c.gen+' 代';cd.appendChild(gn);var st=stTx(c);var stl=ce('div');stl.className='st '+st.cls;stl.setAttribute('data-cid',c.id);stl.textContent=st.text;cd.appendChild(stl);var m=ce('div');m.className='rar';m.textContent=isMutEgg?'✨ 孕育着强大魔力…':'孵化中…';cd.appendChild(m);return cd}
function mkCard(c){
  var cd=ce('div');
  var isSel=S.sel.indexOf(c.id)>=0;
  var isStud=S.stud===c.id;
  var inArc=S.a.some(function(x){return x.id === c.id});
  var hasRealVar=(c.var); 
  var isSpecial = (c.var === 'special_01' || c.var === 'special_00');
  
  cd.className='card-new'+(isSel?' sel':'')+((!inArc && !isB(c))?' dis':'')+(isStud?' stud':'');

  var hoverText = (c.headTerm > 0) ? '👑 第 '+c.headTerm+' 任头马 · 生涯出战 '+(c.raceCount||0)+' 次' : '';
  if(hasRealVar && !isSpecial) hoverText += (hoverText?' | ':'') + '变异：'+(c.var==='special_01'?'神秘变异':VN[c.var]);
  if(isSpecial) hoverText = '神秘的店主彩蛋';
  if(hoverText) cd.title = hoverText;

  // 顶部
  var top=ce('div');top.className='card-top';
  if(isSpecial) {
    top.innerHTML = '<span style="color:var(--gold);font-size:10px;">传说生物</span>' +
                    '<span style="color:var(--page-dim);font-size:10px;">魅力 40</span>';
  } else {
    var crownHtml = (c.headTerm > 0) ? '<span class="crown" style="color:var(--gold);font-size:10px;margin-right:2px;">👑</span>' : '';

    var bcHtml = '';
    if (inArc) {
      bcHtml = '归档';
    } else if (c.sterile && !c.tempBreed) {
      bcHtml = '<span style="color:var(--sterile)">不育</span>';
    } else if (c.tempBreed) {
      bcHtml = '<span style="color:var(--temp-breed-fg)">临时 1/1</span>';
    } else if (c.cd > Date.now()) {
      bcHtml = '<span style="color:var(--sterile)">冷却 '+Math.ceil((c.cd-Date.now())/60000)+'m</span>';
    } else {
      bcHtml = (getMaxBc(c)-c.bc)+'/'+getMaxBc(c);
    }

    var rarHtml = '魅力 '+rSFull(c) + (hasRealVar ? ' <span style="color:var(--gold)">★</span>' : '');
    top.innerHTML = '<span style="color:var(--page-dim);font-size:10px;">第'+c.gen+'代</span>' +
                    '<span class="bc">'+crownHtml+bcHtml+'</span>' +
                    '<span style="color:var(--page-dim);font-size:10px;">'+rarHtml+'</span>';
  }
  cd.appendChild(top);

  // // 🌟 名字与勾选框 (纯手工搓，绝对不跳)
var nameRow = ce('div');
nameRow.className = 'name-row';
nameRow.style.cssText = 'position:relative; width:100%; height:18px; margin-top:2px;';

// 只有非档案 + 批量模式开启时，才创建勾选框
if (!inArc && window._batchMode) {
  if(!S._batchSel) S._batchSel = [];
  
  var chk = ce('div');
  chk.className = 'custom-chk';
  // 绝对定位在左侧，固定 16x16 大小，有边框
  chk.style.cssText = 'position:absolute; left:2px; top:50%; transform:translateY(-50%); width:16px; height:16px; border:2px solid var(--page-dim); border-radius:3px; cursor:pointer; display:flex; align-items:center; justify-content:center; box-sizing:border-box; z-index:2;';
  
  // 选中状态
  if(S._batchSel.indexOf(c.id) >= 0) {
    chk.style.background = 'var(--primary-bg)';
    chk.style.borderColor = 'var(--primary-bg)';
    chk.innerHTML = '<span style="color:var(--primary-fg); font-size:12px; font-weight:bold; line-height:1;">✓</span>';
  }

  // 接管点击事件，直接改自己的样式
  chk.onclick = function(e){
    e.stopPropagation(); // 阻止触发卡片选中
    
    var isSelected = S._batchSel.indexOf(c.id) >= 0;
    
    if (isSelected) {
      // 取消选中
      S._batchSel = S._batchSel.filter(function(id){ return id !== c.id; });
      chk.style.background = 'transparent';
      chk.style.borderColor = 'var(--page-dim)';
      chk.innerHTML = '';
    } else {
      // 选中
      S._batchSel.push(c.id);
      chk.style.background = 'var(--primary-bg)';
      chk.style.borderColor = 'var(--primary-bg)';
      chk.innerHTML = '<span style="color:var(--primary-fg); font-size:12px; font-weight:bold; line-height:1;">✓</span>';
    }
  };
  
  nameRow.appendChild(chk);
}

// 文字：绝对居中，超长变省略号
var nmText = ce('span');
nmText.textContent = c.name || 'unknown';
nmText.style.cssText = 'position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); max-width:calc(100% - 32px); text-align:center; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;';
nameRow.appendChild(nmText);

cd.appendChild(nameRow);

  // 图片
  var pxb = mkPB(c);
  cd.appendChild(pxb);

  // 菜单
  var mb=ce('button');mb.className='mb';mb.textContent='⋯';
  mb.onclick=(function(id){return function(e){e.stopPropagation();openMenu(id)}})(c.id);
  pxb.appendChild(mb);

  // 性别
  var sexRow=ce('div');sexRow.className='sex-row';
  var si=SX[c.sx]||SX.m;
  var sexI=ce('div');sexI.className='sex-icon '+si.c;sexI.textContent=si.s + ' ' + si.n; 
  sexRow.appendChild(sexI);
  cd.appendChild(sexRow);

  // 状态图标
  if(!isSpecial){
    var statusRow = ce('div'); statusRow.className = 'status-row';
    if(c.induceHerm) statusRow.innerHTML += '<span title="诱变魔药生效中">🍷</span>';
    if(c.tempBreed) statusRow.innerHTML += '<span title="丰饶魔药生效中">🌾</span>';
    cd.appendChild(statusRow);

    // === 底部色块/文字网格 ===
    var bottom=ce('div');bottom.className='card-bottom';
    
    if(S.displayMode === 'text'){
          // 🌟 加上 text-bottom 专属类名，并强制 display:flex 覆盖网格
        bottom.className = 'card-bottom text-bottom';
        bottom.style.cssText = 'display:flex !important; flex-wrap:wrap; gap:4px; margin-top:6px; justify-content:center; padding:0 2px;';
      var addTag = function(txt, type) {
        var span = ce('span');
        span.textContent = txt;
        span.style.cssText = 'font-size:10px; padding:1px 4px; border:1px solid var(--tag-bd); border-radius:3px; background:var(--inner-bg); color:var(--page-fg); white-space:nowrap; line-height:1.2;';
        if(type==='r') { span.style.borderColor='var(--tag-rare-bd)'; span.style.color='var(--tag-rare-fg)'; }
        if(type==='e') { span.style.borderColor='var(--tag-epic-bd)'; span.style.color='var(--tag-epic-fg)'; }
        if(type==='mut') { span.style.borderColor='var(--tag-var-bd)'; span.style.color='var(--tag-var-fg)'; }
        if(type==='mut-red') { span.style.borderColor='var(--danger-bd)'; span.style.color='var(--danger-fg)'; }
        bottom.appendChild(span);
      };
      if(c.mut) addTag(c.mut==='albino'?'白化':'黑化', 'mut');
      if(c.pie) addTag(c.pieColor==='w'?'白斑':'黑斑', 'mut');
      if(c.firefly) addTag('萤火虫', 'mut');
      if(c.sterile) addTag('不育', 'mut-red');
      if(c.doubleWomb) addTag('双子宫', 'mut');
      addTag((CL[c.g.col]||CL.n)[0]);
      addTag((CL[c.g.wingCol]||CL.n)[0]);
      addTag((CL[c.g.tailCol]||CL.n)[0]);
      var partsList=['eye','bod','win','tai','hor','leg'];
      for(var i=0;i<partsList.length;i++){
        var opt = fo(partsList[i], c.g[partsList[i]]);
        addTag(opt.n, opt.t);
      }
    } else {
      // 【色块模式】
      var mutCol=ce('div');mutCol.className='mut-col';
      var b1=ce('div');b1.className='mut-box'+(c.mut||c.pie?'':' empty');
      if(c.mut==='albino') b1.style.background='#fff'; else if(c.mut==='melanor') b1.style.background='#111'; else if(c.pie && c.pieColor==='w') b1.style.background='#ddd'; else if(c.pie && c.pieColor==='e') b1.style.background='#333';
      b1.title=c.mut==='albino'?'一级：白化':c.mut==='melanor'?'一级：黑化':c.pie&&c.pieColor==='w'?'一级：白斑':c.pie&&c.pieColor==='e'?'一级：黑斑':'一级：无'; 
      mutCol.appendChild(b1);
      
      var b2=ce('div');b2.className='mut-box'+(c.firefly?'':' empty');
      if(c.firefly){b2.style.background='#f1c40f';b2.style.boxShadow='0 0 5px #f1c40f';}
      b2.title=c.firefly?'二级：萤火虫':'二级：无'; mutCol.appendChild(b2);
      
      var b3=ce('div');b3.className='mut-box'+((c.sterile||c.doubleWomb)?'':' empty');
      if(c.sterile) b3.style.background='#e05a7a'; else if(c.doubleWomb) b3.style.background='#c05a9a';
      b3.title=c.sterile?'三级：不育':c.doubleWomb?'三级：双子宫':'三级：无';
      mutCol.appendChild(b3);
      bottom.appendChild(mutCol);

      var rightGrid = ce('div'); rightGrid.className = 'right-grid';
      var cb1=ce('div');cb1.className='color-box';cb1.style.background=(CL[c.g.col]||CL.n)[1];cb1.title='体色：'+(CL[c.g.col]||CL.n)[0];
      var cb2=ce('div');cb2.className='color-box';cb2.style.background=(CL[c.g.wingCol]||CL.n)[1];cb2.title='翼色：'+(CL[c.g.wingCol]||CL.n)[0];
      var cb3=ce('div');cb3.className='color-box';cb3.style.background=(CL[c.g.tailCol]||CL.n)[1];cb3.title='尾色：'+(CL[c.g.tailCol]||CL.n)[0];
      rightGrid.appendChild(cb1); rightGrid.appendChild(cb2); rightGrid.appendChild(cb3);

      var partsList=['eye','bod','win','tai','hor','leg'];
      for(var i=0;i<partsList.length;i++){
        var pk=partsList[i];var opt=fo(pk,c.g[pk]);
        var pb=ce('div');pb.className='part-box '+(opt.t==='c'?'c':opt.t==='r'?'r':'e');
        pb.title=(opt.t==='c'?'常见':opt.t==='r'?'稀有':'罕见')+' '+opt.n;
        rightGrid.appendChild(pb);
      }
      bottom.appendChild(rightGrid);
    }
    
    cd.appendChild(bottom);
  }

  if(c.isLocked) {
    var lockRow = ce('div');
    lockRow.style.cssText = 'text-align:center; font-size:10px; color:var(--gold); margin-top:2px; font-weight:bold;';
    lockRow.textContent = '🔒 已锁定';
    cd.appendChild(lockRow);
  }

  cd.onclick=(function(id,bb){return function(e){if(e.target.classList&&e.target.classList.contains('mb'))return;if(!bb)return;togSel(id)}})(c.id,isB(c)&&!inArc);
  return cd;
}
function showPotionDetail(storeType, id) {
  var data = {};
  if (storeType === '01') {
    if (id === 'm') data = { icon:'🌟', name:'突变魔药', cost:MP, curType:'🥕', desc:'为未突变的马匹注入白化或黑化的力量。后代有几率遗传。' };
    if (id === 'v') data = { icon:'🔮', name:'变异魔药', cost:VP, curType:'🥕', desc:'引发深层的基因变异（双头、无眼、多肢、连体）。仅限档案马匹使用，不可逆。' };
    if (id === 'i') data = { icon:'🍷', name:'诱变魔药', cost:IP, curType:'🥕', desc:'改变马匹的性别认知，使其在繁育时有概率产下雌雄同体的后代。' };
    if (id === 'fire') data = { icon:'✨', name:'萤火魔药', cost:FP, curType:'✨', desc:'在蛋壳上涂抹发光的魔力，孵化后必定携带二级突变：萤火虫。' };
    if (id === 'dispel') data = { icon:'💧', name:'消融魔药', cost:DP, curType:'🥕', desc:'洗刷马匹身上的随机一种一级或二级突变（无法消除变异）。' };
  } else if (storeType === '00') {
    if (id === 'hfan') data = { icon:'🔥', name:'狂热魔药', cost:50, curType:'🧲', desc:'专为双子宫马匹研制，立刻恢复 5 次繁育次数。' };
    if (id === 'hfeng') data = { icon:'🌾', name:'丰饶魔药', cost:50, curType:'🧲', desc:'让不育的马匹重获生机，获得 1 次临时繁育机会。' };
    if (id === 'hmix') data = { icon:'🎲', name:'混合药剂', cost:70, curType:'🧲', desc:'疯狂的炼金产物，彻底随机刷新马匹的体色、翼色和尾色。' };
    if (id === 'hdrag') data = { icon:'🩸', name:'红龙之血', cost:100, curType:'🧲', desc:'在比赛前饮用，头马的下一次比赛魅力值 +10。' };
    if (id === 'hnight') data = { icon:'🌙', name:'夜骐魔药', cost:200, curType:'🧲', desc:'头马专属，立刻提升 1~5 级的速度，但不能超过 20 级上限。' };
  }

  if (!data.name) return;

  var curCount = S.p[id] || 0;
  if (id === 'fire') curCount = S.points;
  var haveCur = (data.curType === '🥕') ? S.r : ((data.curType === '✨') ? S.points : (S.hoof||0));
  
  var h = '<div class="mdt">'+data.icon+' '+data.name+'</div>';
  h += '<div style="font-size:13px; color:var(--page-fg); line-height:1.6; margin-bottom:15px; padding:10px; background:var(--inner-bg); border-radius:4px;">'+data.desc+'</div>';
  h += '<div style="font-size:12px; color:var(--page-dim); margin-bottom:15px; display:flex; justify-content:space-between;">' +
       '<span>当前持有: <b style="color:var(--gold);">'+curCount+'</b></span>' +
       '<span>我的资产: <b style="color:var(--carrot);">'+haveCur+' '+data.curType+'</b></span>' +
       '</div>';
  h += '<div class="ma"><button id="buyPotBtn" class="primary" style="width:100%; padding:12px; font-size:15px;">花费 '+data.cost+' '+data.curType+' 购买</button></div>';
  h += '<button class="mc" onclick="closeM()">关闭</button>';
  
  showM(h);

  var buyBtn = document.getElementById('buyPotBtn');
  if (buyBtn) {
    buyBtn.onclick = function() {
      if (storeType === '01') buyPot(id);
      else buyHoofPotion(id);
      closeM();
    };
  }
}
function mkStudUI(){var b=$('studBox');b.innerHTML='';var sb=$('studSub');if(!S.stud){sb.textContent='未设置';var tip=ce('div');tip.className='em';tip.style.marginTop='8px';tip.textContent='当前没有种马。';b.appendChild(tip);var candidates=S.c.filter(function(c){return c.sx==='m'&&!c.var&&!c.sterile&&isH(c)&&!c.hasBeenStud});if(candidates.length>0){candidates.sort(function(a,b){return rSFull(b)-rSFull(a)});var best=candidates[0];var recBtn=ce('button');recBtn.className='primary';recBtn.style.cssText='width:100%;margin-top:8px;font-size:12px;padding:10px';recBtn.innerHTML='👑 一键设为种马：'+ (best.name||('第 '+best.gen+'代')) +'（魅力值 '+rSFull(best)+'）';recBtn.onclick=function(){setStud(best.id)};b.appendChild(recBtn);}else{var tip2=ce('div');tip2.className='em';tip2.textContent='马群中没有符合条件的成年雄性。';b.appendChild(tip2)}return}if(S.studL<=0){sb.textContent='已用尽';var tip3=ce('div');tip3.className='em';tip3.textContent='次数已用尽，请更换新种马。';b.appendChild(tip3);var c0=findC(S.stud);if(c0){var w0=ce('div');w0.className='si';w0.appendChild(mkPB(c0));var d0=ce('div');d0.className='sd';d0.innerHTML=(c0.name?'「'+c0.name+'」':'')+'<b>第 '+c0.gen+' 代</b> 次数已用尽';w0.appendChild(d0);b.appendChild(w0)}var candidates2=S.c.filter(function(c){return c.sx==='m'&&!c.var&&!c.sterile&&isH(c)&&!c.hasBeenStud&&c.id!==S.stud});;if(candidates2.length>0){candidates2.sort(function(a,b){return rSFull(b)-rSFull(a)});var best2=candidates2[0];var recBtn2=ce('button');recBtn2.className='primary';recBtn2.style.cssText='width:100%;margin-top:8px;font-size:12px;padding:10px';recBtn2.innerHTML='👑 一键更换新种马：'+ (best2.name||('第 '+best2.gen+'代')) +'（魅力值 '+rSFull(best2)+'）';recBtn2.onclick=function(){setStud(best2.id)};b.appendChild(recBtn2);}return}var c=findC(S.stud);if(!c){S.stud=null;sb.textContent='未设置';b.innerHTML='<div class="em">种马丢失</div>';return}var bonus=headBonus(c);var per=(rS(c)+bonus)*2;sb.textContent='剩余 '+S.studL+'/'+SB;var w=ce('div');w.className='si';w.appendChild(mkPB(c));var d=ce('div');d.className='sd';d.innerHTML=(c.name?'「'+c.name+'」':'')+'<b>第 '+c.gen+' 代</b> 雄性<br>魅力值 <b>'+rS(c)+'/30</b>'+(bonus?' (+'+bonus+' 突变奖励)':'')+'<br>剩余 <b>'+S.studL+'/'+SB+'</b><br>每次产 <b>'+per+'</b>🥕';var btn=ce('button');btn.className='danger';btn.textContent='取消种马'+(S.studL>0?'（'+UNSET_FEE+'🥕）':'');btn.onclick=unsetStud;w.appendChild(d);w.appendChild(btn);b.appendChild(w)}
function mkStoreUI(){
  // === 1. 渲染马匹（居中对齐，卡片放大版） ===
  var se=$('storeGrid');se.innerHTML='';
  checkDailyReset(); // 检查重置
    var headerBar = ce('div');
  headerBar.style.cssText = 'display:flex; justify-content:flex-end; align-items:center; width:100%; margin-bottom:10px;';
var btn = ce('button');
btn.className = 'test';
btn.style.cssText = 'padding:4px 10px; font-size:12px; min-height:28px; border-radius:4px;';
btn.textContent = '🔄 立刻刷新 (剩' + S.refreshData.s01 + '/5)';
if (S.refreshData.s01 <= 0) btn.disabled = true;
btn.onclick = function() { manualRefresh('01'); };
headerBar.appendChild(btn);
se.appendChild(headerBar);
  // 🌟 回归 flex 布局，保证无论几个都是居中排列
  se.style.cssText = 'display:flex; flex-wrap:wrap; gap:12px; width:100%; justify-content:center; margin-bottom:15px;';
  
  for(var i=0;i<S.st.length;i++){
    (function(idx){
      var it=S.st[idx];
      var cd=ce('div');
      cd.className='sc'+(it.sold?' sold':'')+(it.hasWing && !it.sold ? ' sc-wing-highlight' : '');
      // 锁死卡片宽度为 110px，不拉伸，保证整齐划一
      cd.style.cssText = 'width:110px; flex:0 0 110px; padding:10px; gap:6px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; box-sizing:border-box;';
      cd.appendChild(mkPB(it));
      
      var si=SX[it.sx]||SX.m;
      var sx=ce('div');
      sx.className='ssx '+si.c;
      sx.textContent=si.s+' '+si.n;
      sx.style.textAlign = 'center';
      sx.style.marginTop = '4px';
      cd.appendChild(sx);
      
      if(!it.sold){
        var b=ce('button');
        b.className='buy';
        b.textContent='🥕 '+it.price;
        b.style.cssText = 'width:100%; min-height:30px; padding:0; margin-top:6px; font-size:12px;';
        b.onclick=function(){buyStore(idx)};
        cd.appendChild(b);
      } else {
        var sd=ce('div');
        sd.style.cssText='font-size:11px;color:var(--page-muted);margin-top:6px';
        sd.textContent='已售出';
        cd.appendChild(sd);
      }
      se.appendChild(cd);
    })(i);
  }

  // === 2. 倒计时 ===
  var r=Math.max(0,SRM-(Date.now()-S.stT));
  var sm=Math.floor(r/60000), ss=String(Math.floor(r%60000/1000)).padStart(2,'0');
  $('storeTimer').textContent='刷新 '+sm+':'+ss;

  // === 3. 扩建马场 (必须在药剂上面) ===
var cb=$('capBox');
if(cb){
  cb.innerHTML='';
  var cc=ce('div');
  cc.className='pc';
  cc.style.cssText='width:100%;max-width:100%;margin-bottom:12px; padding:10px;border-color:var(--card-bd);';
  var capFull=S.cap>=CAPMAX;
  var canBuy=(S.r>=CAPSTEP)&&!capFull;
  cc.innerHTML='<div class="ic">🏡</div>'+
    '<div class="pn" style="color:var(--accent)">扩建马场</div>'+
    '<div class="pd">当前上限 '+S.cap+' / '+CAPMAX+'<br>花费 '+CAPSTEP+' 🥕，上限 +10</div>'+
    (capFull
      ? '<div class="pct" style="color:var(--page-dim)">已达上限</div>'
      : '<button class="buy"'+(canBuy?'':' disabled')+'>🥕 '+CAPSTEP+' 扩建</button>');
  if(canBuy){
    cc.querySelector('button').onclick=function(){buyCap()};
  }
  cb.appendChild(cc);
   // 👇 扩建马群分组
    var gc = ce('div');
    gc.className='pc';
    gc.style.cssText='border-color:var(--card-bd);width:100%;max-width:100%;margin-top:8px; padding:10px;';
    var canBuyGroup = S.groups.length < 5;
    var canAffordGroup = S.r >= 500;
    gc.innerHTML = '<div class="ic">🗂️</div>'+
      '<div class="pn" style="color:var(--accent)">扩建马群分组</div>'+
      '<div class="pd">当前上限 '+S.groups.length+' / 5<br>花费 500 🥕，增加1个分组</div>'+
      (canBuyGroup 
        ? '<button class="buy"'+(canAffordGroup?'':' disabled')+'>🥕 500 扩建</button>'
        : '<div class="pct" style="color:var(--page-dim)">已达上限</div>');
   if(canBuyGroup && canAffordGroup){
      gc.querySelector('button').onclick=function(){
        S.r -= 500;
        // 🌟 动态加上数字后缀，比如当前有一个组，新组就叫 New Cave 1
        S.groups.push('New Cave ' + S.groups.length); 
        sv(); render();
      };
    }
    cb.appendChild(gc);
}
 // === 4. 药剂部分 ===
var pg=$('potionGrid');
pg.innerHTML='';
pg.style.cssText = 'display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin-top:10px; margin-bottom:10px;';

var mkPotCard = function(icon, name, priceStr, id) {
  var b = ce('div');
  b.className = 'pc';
  b.style.cssText = 'width:85px; flex:0 0 85px; padding:10px 4px; cursor:pointer;';
  b.innerHTML = '<div class="ic" style="font-size:26px;">'+icon+'</div>'+
                '<div class="pn" style="color:var(--accent); font-size:13px; margin-top:4px; white-space:nowrap;">'+name+'</div>'+
                '<div class="pd" style="color:var(--page-dim); font-size:11px; margin-top:4px;">'+priceStr+'</div>';
  b.onclick = function(){ showPotionDetail('01', id); };
  pg.appendChild(b);
};

mkPotCard('🌟', '突变魔药', '🥕 ' + MP, 'm');
mkPotCard('🔮', '变异魔药', '🥕 ' + VP, 'v');
mkPotCard('🍷', '诱变魔药', '🥕 ' + IP, 'i');
mkPotCard('✨', '萤火魔药', '✨ ' + FP, 'fire');
mkPotCard('💧', '消融魔药', '🥕 ' + DP, 'dispel');

  // === 5. 01 对话刷新 ===
  var now=Date.now();
  if(now-S._k01Time>15000||!S._k01Text){
    var dlg=["来尝试突变魔药吧！独一无二的惊喜等待着你！","去比赛吧！赢得最棒的大奖！","我饥饿……？","本游戏不含价值三个金锥的神秘树叶水，但添加了诱变魔药。祝你好运！","让白化与白化一起繁殖以提高他们的遗传几率。当然啦，黑化也是如此！","珍惜地爱每一只斑点小马，因为它们都是独一无二的！","Deepseek老师，我还记得你~一字一句~教我如何写代码~","*随机生成的混乱词句*","喵喵喵喵喵，喵喵喵喵喵！","本游戏正处于测试版中，如有bug，请联系01~","想要让马发光吗？拿荧光点来换吧！"];
    S._k01Text=pk(dlg);S._k01Time=now;
  }
  var kt=$('k01Text');if(kt)kt.textContent=S._k01Text;
}
// 01 和 00 商店的互斥展开绑定
var d01=document.getElementById('store01-details');
var d00=document.getElementById('store00-details');
if(d01&&d00&&!d01.dataset.bound){
  d01.dataset.bound="1";
  d01.addEventListener('toggle',function(){if(d01.open&&d00.open)d00.open=false});
  d00.addEventListener('toggle',function(){if(d00.open&&d01.open)d01.open=false});
}
function mkArc(){
  var a=$('arc');
  a.innerHTML='';
  
  // 动态初始化颜色下拉框（防止重复添加）
  var ac = $('arcColor');
  if(ac && ac.options.length<=1) {
    for(var i=0;i<CK.length;i++){ 
      var opt=ce('option'); opt.value=CK[i]; opt.textContent=CL[CK[i]][0]; ac.appendChild(opt);
    }
  }
// 如果之前的搜索参数变了，自动回第一页
  var curFilter = ($('arcName')?$('arcName').value:'') + ($('arcSex')?$('arcSex').value:'') + ($('arcColor')?$('arcColor').value:'') + ($('arcMut')?$('arcMut').value:'');
  if (window._lastArcFilter !== curFilter) {
    S.arcPage = 1;
    window._lastArcFilter = curFilter;
  }
  var q = ($('arcName')?$('arcName').value.trim().toLowerCase():'');
  var sx = ($('arcSex')?$('arcSex').value:'');
  var col = ($('arcColor')?$('arcColor').value:'');
  var mut = ($('arcMut')?$('arcMut').value:'');

  // 1. 全量检索
  var arr = S.a.filter(function(c) {
    if(sx && c.sx !== sx) return false;
    if(col && c.g.col !== col) return false;
    if(mut) {
      if(mut==='any'){ if(!c.mut&&!c.pie&&!c.firefly&&!c.sterile&&!c.doubleWomb) return false; }
      else if(mut==='pie'){ if(!c.pie) return false; }
      else if(mut==='firefly'){ if(!c.firefly) return false; }
      else if(mut==='sterile'){ if(!c.sterile) return false; }
      else if(mut==='doubleWomb'){ if(!c.doubleWomb) return false; }
      else { if(c.mut!==mut) return false; }
    }
    if(q) {
       var nm = (c.name||'').toLowerCase();
       var gn = String(c.gen);
       if(nm.indexOf(q)<0 && gn.indexOf(q)<0) return false;
    }
    return true;
  });

  $('arcCount').textContent=arr.length+'/'+S.a.length+' 匹';
  if(S.a.length===0){a.innerHTML='<div class="em">还没保存的马</div>';return}
  if(arr.length===0){a.innerHTML='<div class="em">没有符合条件的马</div>';return}

  // 2. 分页计算
  var totalPages = Math.ceil(arr.length / S.arcPageSize);
  if(S.arcPage > totalPages) S.arcPage = totalPages;
  if(S.arcPage < 1) S.arcPage = 1;
  
  var startIdx = (S.arcPage - 1) * S.arcPageSize;
  var pageArr = arr.slice(startIdx, startIdx + S.arcPageSize);

  // 3. 渲染分页工具栏
  var toolBar = ce('div');
  toolBar.style.cssText = 'display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:0 4px; font-size:12px;';
  
  var pageSizeSel = ce('select');
  pageSizeSel.className = 'breed-search';
  pageSizeSel.style.cssText = 'width:100px; min-height:28px; margin:0;';
  [24, 36, 48, 72, 114].forEach(function(sz){
    var opt = ce('option');
    opt.value = sz; opt.textContent = sz + ' / 页';
    if(sz === S.arcPageSize) opt.selected = true;
    pageSizeSel.appendChild(opt);
  });
  pageSizeSel.onchange = function(){
    S.arcPageSize = parseInt(this.value);
    S.arcPage = 1; // 换页容量重置回第一页
    mkArc();
  };
  toolBar.appendChild(pageSizeSel);

  var pageCtrl = ce('div');
  pageCtrl.style.cssText = 'display:flex; align-items:center; gap:6px;';
  
  var btnPrev = ce('button');
  btnPrev.className = 'test';
  btnPrev.style.cssText = 'padding:2px 8px; min-height:24px; font-size:12px;';
  btnPrev.textContent = '上一页';
  btnPrev.disabled = (S.arcPage === 1);
  btnPrev.onclick = function(){ if(S.arcPage > 1){ S.arcPage--; mkArc(); } };
  
  var pageInfo = ce('span');
  pageInfo.style.color = 'var(--page-dim)';
  pageInfo.textContent = S.arcPage + ' / ' + totalPages;
  
  var btnNext = ce('button');
  btnNext.className = 'test';
  btnNext.style.cssText = 'padding:2px 8px; min-height:24px; font-size:12px;';
  btnNext.textContent = '下一页';
  btnNext.disabled = (S.arcPage === totalPages);
  btnNext.onclick = function(){ if(S.arcPage < totalPages){ S.arcPage++; mkArc(); } };

  pageCtrl.appendChild(btnPrev);
  pageCtrl.appendChild(pageInfo);
  pageCtrl.appendChild(btnNext);
  toolBar.appendChild(pageCtrl);

  a.appendChild(toolBar);

  // 4. 渲染当前页马匹
  var gridWrap = ce('div');
  gridWrap.className = 'gd';
  for(var i=0; i<pageArr.length; i++) {
    gridWrap.appendChild(mkCard(pageArr[i]));
  }
  a.appendChild(gridWrap);
}
var imgObserver = null;
if (typeof IntersectionObserver !== 'undefined') {
    imgObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                if (el.dataset.gene && !el.querySelector('canvas')) {
                    el.appendChild(mkPB({g: JSON.parse(el.dataset.gene), hat: 0}));
                }
                observer.unobserve(el); // 画完就不管了，节省性能
            }
        });
    }, { rootMargin: '100px' }); // 提前 100px 开始加载
}

function mkDexUI(){
  if(!S._dexOpen)S._dexOpen={};
  var d=$('dex');
  var sigs=Object.keys(S.d);
  var q=($('dexSearch')?$('dexSearch').value.trim().toLowerCase():'');
  
  var cacheKey = sigs.join(',') + '|' + q;
  if (d.dataset.cacheKey === cacheKey && d.innerHTML !== '') {
    return; 
  }
  d.dataset.cacheKey = cacheKey;

  d.innerHTML='';
  $('dexCount').textContent='已发现 '+sigs.length+' 种';
  if(sigs.length===0){
    d.innerHTML='<div class="em">尚未发现任何组合</div>';
    return;
  }
  
  var groups=[[],[],[]];
  for(var i=0;i<sigs.length;i++){
    var it=S.d[sigs[i]];
    var s=0;
    for(var j=0;j<RK.length;j++){
      var o=fo(RK[j],it.g[RK[j]]);
      if(o.t==='e')s+=5;else if(o.t==='r')s+=2;
    }
    var gi=s>=21?2:s>=11?1:0;
    groups[gi].push(it);
  }
  
  var titles=['普通 (0-10)','稀有 (11-20)','罕见 (21-30)'];
  for(var g=0;g<3;g++){
    if(groups[g].length===0)continue;
    var list=groups[g];
    if(q){
      var fl=[];
      for(var fi=0;fi<list.length;fi++){
        var s2='';
        for(var fk=0;fk<PK.length;fk++){
          s2+=fo(PK[fk],list[fi].g[PK[fk]]).n;
        }
        if(s2.toLowerCase().indexOf(q)>=0)fl.push(list[fi]);
      }
      if(fl.length===0)continue;
      list=fl;
    }
    var det=ce('details');
    det.className='dex-group';
    det.open=!!(q||S._dexOpen['g'+g]);
    var summ=ce('summary');
    summ.className='dex-group-title';
    summ.textContent=titles[g]+' ('+list.length+')';
    summ.onclick=(function(k,dEl){
      return function(e){
        e.preventDefault();
        dEl.open=!dEl.open;
        S._dexOpen[k]=dEl.open;
      }
    })(g,det);
    det.appendChild(summ);
    var wrap=ce('div');
    wrap.className='dxl';
    
    for(var m=0;m<list.length;m++){
      var item=list[m];
      var el=ce('div');
      el.className='dxi';
      
      // === 懒加载逻辑 ===
      // 先不画马，只把基因数据存起来
      el.dataset.gene = JSON.stringify(item.g);
      if (imgObserver) {
        imgObserver.observe(el);
      } else {
        el.appendChild(mkPB({g:item.g,hat:0})); // 老旧浏览器兜底
      }
      
      var nm=ce('div');
      nm.className='dn';
      var parts=[];
      for(var pk2=1;pk2<PK.length;pk2++){
        parts.push(P[PK[pk2]].n.slice(0,1)+':'+fo(PK[pk2],item.g[PK[pk2]]).n);
      }
      nm.innerHTML=parts.join('<br>');
      el.appendChild(nm);
      wrap.appendChild(el);
    }
    det.appendChild(wrap);
    d.appendChild(det);
  }
}
function mkAchUI() {
  var a = $('ach');
  a.innerHTML = '';
  var got = Object.keys(S.ach).length;
  $('achCount').textContent = got + '/' + ACHS.length;
  
  var wrap = ce('div');
  wrap.className = 'achl';
  
  for (var i = 0; i < ACHS.length; i++) {
    var ac = ACHS[i];
    var on = S.ach[ac.id];
    var el = ce('div');
    el.className = 'achi ' + (on ? 'on' : 'off');
    el.innerHTML = '<div class="an">' + (on ? '🏆 ' : '🔒 ') + ac.n + '</div><div class="ad">' + ac.d + '</div>';
    wrap.appendChild(el);
  }
  a.appendChild(wrap);
}
function updUI(){
  var sel=S.sel.map(function(id){return findC(id)}).filter(function(x){return x&&S.a.indexOf(x)<0});
  if(sel.length!==S.sel.length) S.sel=sel.map(function(c){return c.id});
}
function tick(){
  var now=Date.now();
  var needListRender=false;
  var needTopRender=false;
  
  // 1. 蛋的倒计时优化：先看有没有蛋，没有蛋绝不查 DOM
  var hasEggs = false;
  for(var i=0;i<S.c.length;i++){
    if(!isH(S.c[i])) { hasEggs = true; break; }
  }
  if(hasEggs){
    for(var i=0;i<S.c.length;i++){
      var c=S.c[i];
      if(isH(c)) continue;
      // 只有在页面确实存在蛋的时候才去查 DOM
      var el=document.querySelector('.st[data-cid="'+c.id+'"]');
      if(el){
        var st=stTx(c);
        if(el.textContent!==st.text){
          el.textContent=st.text;
          el.className='st '+st.cls;
        }
      }
    }
  }
  
  var hn=S.c.filter(function(c){return!isH(c)}).length;
  if(hn<S._hc) needListRender=true; // 只有孵化完成时才全量刷新列表
  S._hc=hn;
  
  // 2. 种马产出
  if(S.stud&&S.studL>0){
    var sc=findC(S.stud);
    if(sc){
      while (now - S.studT >= S.studN && S.studL > 0) {
        var bonus=sc.mut?5:0;
        var gain=(rS(sc)+bonus)*2;
        S.r += gain;
        S.studL--;
        S.studT += S.studN;
        S.studN = SMN + Math.random()*(SMX-SMN);
      }
      if(S.studL <= 0){
        unlock('bye');
        S.stud = null;
      }
      sv(); needTopRender = true; 
    }
  }
  
  // 3. 头马逻辑 (含离线冻结)
  if(S.head){
    var _nt=Date.now();var _lt=S.headLastTick||_nt;
    if(_nt-_lt>5000)S.headStart+=(_nt-_lt);
    S.headLastTick=_nt;
    var hc=findC(S.head);
    if(hc&&getSpeed(hc)>=20)unlock('speed20');
    if(hc&&headCharm(hc)>=40)unlock('charm40');
    if(now-S.headStart>=HEAD_FORCE){
      var hid=S.head;var idx=-1;
      for(var hi=0;hi<S.c.length;hi++)if(S.c[hi].id===hid){idx=hi;break}
      if(idx>=0){
        var hc2=S.c.splice(idx,1)[0];
        S.a.push(hc2);unlock('archived');unlock('headDead')
      }
      S.head=null;S.headStart=0;S.headRace=0;sv();needListRender=true;
    }
  }
  
  // 4. 01商店刷新
  if(S.stT && now - S.stT >= SRM){
    var missed = Math.floor((now - S.stT) / SRM);
    S.stT = S.stT + (missed * SRM); 
    mkStore(true);
    sv();
    needListRender = true;
    showToast('🛒 月光商店 (01) 已刷新！');
  }
  
  // 5. 00商店刷新
  if(S.st00T && now - S.st00T >= SRM){
    var missed00 = Math.floor((now - S.st00T) / SRM);
    S.st00T = S.st00T + (missed00 * SRM);
    S.trainCount = 1;
    S.hoofSubmitted = [false,false,false,false,false];
    sv();
    needListRender = true;
    showToast('🌑 缄默商店 (00) 已刷新！');
  }
  
  // 6. 全局倒计时 UI 更新（只改文字，不重绘 DOM）
  var r = Math.max(0, SRM - (now - S.stT));
  var sm = Math.floor(r/60000), ss = String(Math.floor(r%60000/1000)).padStart(2,'0');
  var el2 = $('storeTimer'); if(el2) el2.textContent = '刷新 ' + sm + ':' + ss;
  
  var r00 = Math.max(0, SRM - (now - S.st00T));
  var sm00 = Math.floor(r00/60000), ss00 = String(Math.floor(r00%60000/1000)).padStart(2,'0');
  var el3 = $('store00Timer'); if(el3) el3.textContent = '刷新 ' + sm00 + ':' + ss00;
  
  var clk = $('globalClock');
  if(clk) clk.textContent = '🛒月光:' + sm + ':' + ss + ' | 🌑缄默:' + sm00 + ':' + ss00;
  
  // 7. 只有在必须刷新时才调用重绘
  if(needListRender) {
    render('list');
    render('other');
  } else if (needTopRender) {
    render('top');
  }
}
function togSel(id){var c=findC(id);if(!c||!isB(c))return;if(S.a.indexOf(c)>=0)return;var i=S.sel.indexOf(id);if(i>=0)S.sel.splice(i,1);else{if(S.sel.length>=2)S.sel.shift();S.sel.push(id)}render('list')}
function doBreed(isTest){if(S.sel.length!==2)return;var a=findC(S.sel[0]),b=findC(S.sel[1]);if(!a||!b||!isH(a)||!isH(b))return;if(a.var||b.var||(a.sterile&&!a.tempBreed)||(b.sterile&&!b.tempBreed))return;if(!canBW(a,b))return;if(!isTest&&(!canB(a)||!canB(b)))return;
  if(!isTest&&S.c.filter(function(c){return!isH(c)}).length>=(S.eggCap||10)){alert('幼崽栏已满 ('+(S.eggCap||10)+'/'+(S.eggCap||10)+')，请等待孵化');return}
  if(!isTest&&S.c.length>=S.cap){alert('马群已满');return}
  var cost=Math.floor(Math.random()*2)+2;if(!isTest&&S.r<cost){alert('胡萝卜不够 (需要2-3根)');return}
  var r=breed(a,b);var c=r.c,mus=r.mus;
  if(isTest){c.hat=0;}else{var now=Date.now();if(a.tempBreed){a.tempBreed=false;}else{a.bc++;}if(b.tempBreed){b.tempBreed=false;}else{b.bc++;}a.cd=now+cdTime(a);b.cd=now+cdTime(b);S.r-=cost;if(c.mut==='albino')unlock('bAlbino');if(c.mut==='melanor')unlock('bMelanor');if(c.pie)unlock('bPie')}S.c.push(c);S.last=c;S.lastM=mus;mkDex(c);checkAch(c,mus,a,b);checkGlobalAch();var tRate=TWIN_RATE;if(a.doubleWomb||b.doubleWomb)tRate=0.10;if(!isTest&&Math.random()<tRate)
    {var c2,mus2;
      if(Math.random()<0.5){c2=JSON.parse(JSON.stringify(c));c2.id=uid();c2.hid=genHorseHid(S.farmId, collectAllHids());mus2=mus.slice()}
      else{
      var r2=breed(a,b);c2=r2.c;c2.hat=0;mus2=r2.mus}S.c.push(c2);mkDex(c2);checkAch(c2,mus2,a,b);unlock('twin')}S.sel=[];sv();render()}
function toggleDisplayMode() {
  showToast('🔄 正在重构界面...');
  setTimeout(function() {
    S.displayMode = S.displayMode === 'color' ? 'text' : 'color';
    sv();
    render();
  }, 50); // 给浏览器50ms时间渲染Toast提示
}
// 切换日夜模式
var themeLock = false; 
function toggleTheme() {
  if (themeLock) return;
  themeLock = true;
  setTimeout(function () { themeLock = false; }, 500);

  var cur = document.documentElement.dataset.theme || 'dark';
  var next = cur === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = next;
  document.body.classList.toggle('light-mode', next === 'light');

  var btn = $('themeBtn');
  if (btn) {
    btn.textContent = next === 'light' ? '☀️ 切换白天' : '🌙 切换夜晚';
  }

  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === 'light' ? '#a38f73' : '#14121f';

  localStorage.setItem('wd_theme_mode', next);
}
function init(){
  var l=false;try{l=ld()}catch(e){}
  if(!l){
  S.farmId = genFarmId();
  S.c=[newC(0,{inst:true}),newC(0,{inst:true}),newC(0,{inst:true})];
    for(var i=0;i<S.c.length;i++)mkDex(S.c[i]);
    mkStore(true);
    S.stT = Date.now(); // 🌟 新档初始化时间
    S.st00T = Date.now(); // 🌟 新档初始化时间
    sv();
  }else{
    mkStore(false);
  }
  S.st00T=S.stT;
  
  // ⚠️ 在这里加上“冻结时间补正”
  if(S.head){
    var _nt=Date.now();var _lt=S.headLastTick||_nt;
    if(_nt-_lt>5000) S.headStart+=(_nt-_lt);
    S.headLastTick=_nt;
  }
  
  render();
}
$('svBtn').onclick=openSave;
var _filterTimer = null;
$('sName').oninput=function(){
  clearTimeout(_filterTimer);
  _filterTimer = setTimeout(function(){ render('list'); }, 300);
};
$('sSex').onchange=function(){ setTimeout(function(){ render('list'); }, 60); };
function initColorSelect(){var sel=$('sColor');if(!sel||sel.options.length>1)return;for(var i=0;i<CK.length;i++){var opt=ce('option');opt.value=CK[i];opt.textContent=CL[CK[i]][0];sel.appendChild(opt)}}
if($('dexSearch')){
  var _dexTimer = null;
  $('dexSearch').oninput = function(){ 
    clearTimeout(_dexTimer);
    _dexTimer = setTimeout(mkDexUI, 300); 
  };
}
$('modal').onclick=function(e){if(e.target.id==='modal')closeM()};
function clearGame(){
  if(!confirm('确定要彻底清空所有数据重新开始吗？此操作不可逆！')) return;
  if(ok){try{localStorage.removeItem(KEY)}catch(e){}}
  ms=null;
  
  // 全面重置所有状态，绝不残留！
  S.farmName = '我的马场';
S.farmId = genFarmId();
S.c = [newC(0,{inst:true}), newC(0,{inst:true}), newC(0,{inst:true})];
  S.a = [];
  S.d = {};
  S.sel = [];
  S.last = null;
  S.lastM = [];
  S.r = 20;
  S.points = 0;
  S.hoof = 0;
  S.trainCount = 1;
  S.hoofSubmitted = [false,false,false,false,false];
  S.trainFail = 0;
  S.trainSuccess = 0;
  S.unlocked00 = false;
  S.headRaceCount = 0;
  S.headTerm = 0;
  S.p = {m:0, v:0, i:0, fire:0, dispel:0, hfan:0, hfeng:0, hmix:0, hdrag:0, hnight:0};
  S.st = [];
  S.stT = 0;
  S.stud = null;
  S.studL = 0;
  S.studT = 0;
  S.studN = 0;
  S.ach = {};
  S.cap = 50;
  S.eggCap = 10;
  S.head = null;
  S.headStart = 0;
  S.headRace = 0;
  S._dexOpen = {};
  
  // 重新生成初始马和商店
  for(var i=0; i<S.c.length; i++) mkDex(S.c[i]);
  mkStore(true);
  
  // 保存并刷新页面
  sv(); 
  closeM(); 
  render();
}
initColorSelect();
$('sColor').onchange=function(){ setTimeout(function(){ render('list'); }, 60); };
$('sMut').onchange=function(){ setTimeout(function(){ render('list'); }, 60); };
function breedPool(side){
  var sInp=$('breed'+side+'Search');
  var q=sInp?sInp.value.trim().toLowerCase():'';
  var other=(side==='M')?S.selF:S.selM;
  var filterCol = $('breedFilterCol') ? $('breedFilterCol').value : '';
  var filterRar = $('breedFilterRarity') ? $('breedFilterRarity').value : '';

  var arr=S.c.filter(function(c){
    if(!isH(c)||c.var)return false;
    if(S.a.indexOf(c)>=0)return false;
    if(!canB(c))return false;
    if(other&&c.id===other)return false;
    if(side==='M'){if(c.sx==='f')return false}else{if(c.sx==='m')return false}
    
    // 颜色/稀有度筛选
    if(filterCol && c.g.col !== filterCol) return false;
    if(filterRar) {
      var has = false;
      for(var k=0;k<RK.length;k++){ if(fo(RK[k], c.g[RK[k]]).t === filterRar) { has = true; break; } }
      if(!has) return false;
    }
    
    // 突变筛选（包含性别豁免）
    if(S.breedSort === 'default' && S.breedMutFilter) {
      var bypass = false;
      if(S.breedMutFilter === 'doubleWomb' && side === 'M' && c.sx === 'm') bypass = true;
      if(S.breedMutFilter === 'sterile' && side === 'F' && c.sx === 'f') bypass = true;
      if(!bypass) {
        if(S.breedMutFilter === 'albino' && c.mut !== 'albino') return false;
        if(S.breedMutFilter === 'melanor' && c.mut !== 'melanor') return false;
        if(S.breedMutFilter === 'pie' && !c.pie) return false;
        if(S.breedMutFilter === 'firefly' && !c.firefly) return false;
        if(S.breedMutFilter === 'sterile' && !c.sterile) return false;
        if(S.breedMutFilter === 'doubleWomb' && !c.doubleWomb) return false;
      }
    }
    
    if(q){
      var nm=(c.name||'').toLowerCase();
      var gn=String(c.gen);
      if(nm.indexOf(q)<0&&gn.indexOf(q)<0)return false
    }
    return true
  });
  
  var sortMode=S.breedSort||'default';
  if(sortMode==='default'){
    arr.sort(function(a,b){
      var aMut=(a.mut||a.pie||a.firefly||a.sterile||a.doubleWomb)?1:0;
      var bMut=(b.mut||b.pie||b.firefly||b.sterile||b.doubleWomb)?1:0;
      if(aMut!==bMut)return bMut-aMut;
      return rSFull(b)-rSFull(a)
    });
    return arr
  }else if(sortMode==='genHigh'){
    arr.sort(function(a,b){return b.gen-a.gen});
    return arr
  }else if(sortMode==='genLow'){
    arr.sort(function(a,b){return a.gen-b.gen});
    return arr
  }
  var scoreFn=function(c){return rSFull(c)};
  if(other){
    var o=findC(other);
    if(o){
      scoreFn=function(c){
        var pr=predRarity(o,c);
        return(pr[0]+pr[1])/2
      }
    }
  }
  var scored=arr.map(function(c){return{c:c,s:scoreFn(c)}});
  scored.sort(function(a,b){return sortMode==='high'?b.s-a.s:a.s-b.s});
  return scored.map(function(x){return x.c})
}
function mkBreedUI(){
  if(!$('breedM'))return;
  if(!S.breedSort)S.breedSort='default';
  
  var fc = $('breedFilterCol');
  if(fc && fc.options.length<=1) {
    for(var i=0;i<CK.length;i++){ var opt=ce('option'); opt.value=CK[i]; opt.textContent=CL[CK[i]][0]; fc.appendChild(opt);}
    fc.onchange = function(){ setTimeout(mkBreedUI, 60); };
  }
  var fr = $('breedFilterRarity');
  if(fr && fr.options.length<=1) {
    fr.innerHTML += '<option value="c">常见部件</option><option value="r">稀有部件</option><option value="e">罕见部件</option>';
    fr.onchange = function(){ setTimeout(mkBreedUI, 60); };
  }

  // 🌟 核心优化：渲染列表函数。如果传了 updateOnly，就不重新画卡片
  var renderList = function(updateOnly) {
    var mArr=breedPool('M');
    var fArr=breedPool('F');
    
    var mBox=$('breedM'), fBox=$('breedF');
    
    if (!updateOnly) {
      mBox.innerHTML='';
      if(mArr.length===0) mBox.innerHTML='<div class="em" style="padding:6px">没有可用父本</div>';
      for(var i=0;i<mArr.length;i++) mBox.appendChild(mkBreedItem(mArr[i],S.selM,'M',S.selF));
      
      fBox.innerHTML='';
      if(fArr.length===0) fBox.innerHTML='<div class="em" style="padding:6px">没有可用母本</div>';
      for(var j=0;j<fArr.length;j++) fBox.appendChild(mkBreedItem(fArr[j],S.selF,'F',S.selM));
    } else {
      // 只更新高亮状态
      var itemsM = mBox.querySelectorAll('.breed-item');
      for(var i=0;i<itemsM.length;i++) itemsM[i].classList.toggle('sel', itemsM[i].dataset.id === S.selM);
      var itemsF = fBox.querySelectorAll('.breed-item');
      for(var j=0;j<itemsF.length;j++) itemsF[j].classList.toggle('sel', itemsF[j].dataset.id === S.selF);
    }
  };

  // 初始渲染
  renderList(false);

  // 暴露一个方法给 mkBreedItem 用，点选时只改样式
  window._updateBreedSelection = function(side, id) {
    if(side==='M') S.selM = (S.selM===id ? null : id);
    else S.selF = (S.selF===id ? null : id);
    renderList(true); // 更新高亮
    updateMidInfo();  // 更新中间文字
  };

  // 手机端下拉框
  var mSel = $('breedMSelect');
  if(mSel){
    mSel.innerHTML='<option value="">选择父本</option>';
    var mArr = breedPool('M');
    for(var i=0;i<mArr.length;i++){ var opt=ce('option'); opt.value=mArr[i].id; opt.textContent='第'+mArr[i].gen+'代 '+(mArr[i].name||''); if(S.selM===mArr[i].id) opt.selected=true; mSel.appendChild(opt); }
    mSel.onchange=function(){ S.selM=this.value||null; renderList(true); updateMidInfo(); };
  }
  var fSel = $('breedFSelect');
  if(fSel){
    fSel.innerHTML='<option value="">选择母本</option>';
    var fArr = breedPool('F');
    for(var j=0;j<fArr.length;j++){ var opt=ce('option'); opt.value=fArr[j].id; opt.textContent='第'+fArr[j].gen+'代 '+(fArr[j].name||''); if(S.selF===fArr[j].id) opt.selected=true; fSel.appendChild(opt); }
    fSel.onchange=function(){ S.selF=this.value||null; renderList(true); updateMidInfo(); };
  }

  var createAvatar = function(c) {
    var div = ce('div');
    div.style.cssText = 'text-align:center; display:flex; flex-direction:column; align-items:center;';
    var pxb = mkPB(c);
    pxb.style.width = '100px'; pxb.style.height = '100px'; pxb.style.paddingTop = '0';
    div.appendChild(pxb);
    var nm = ce('div');
    nm.style.cssText = 'font-size:11px; color:#ffd; margin-top:4px;';
    nm.textContent = (c.name ? '「'+c.name+'」' : '') + '第'+c.gen+'代';
    div.appendChild(nm);
    return div;
  };

  var updateAvatars = function() {
    var ma = $('breedMAvatar'); if(ma){ma.innerHTML=''; if(S.selM){var c=findC(S.selM); if(c) ma.appendChild(createAvatar(c));}}
    var fa = $('breedFAvatar'); if(fa){fa.innerHTML=''; if(S.selF){var c=findC(S.selF); if(c) fa.appendChild(createAvatar(c));}}
    var mam = $('breedMAvatarMobile'); if(mam){mam.innerHTML=''; if(S.selM){var c=findC(S.selM); if(c) mam.appendChild(createAvatar(c));}}
    var fam = $('breedFAvatarMobile'); if(fam){fam.innerHTML=''; if(S.selF){var c=findC(S.selF); if(c) fam.appendChild(createAvatar(c));}}
  };

  var updateMidInfo = function() {
    var info=$('breedInfo');
    var infoMid = $('breedMidInfo');
    updateAvatars();
    if(S.selM&&S.selF){
      var a=findC(S.selM); var b=findC(S.selF);
      if(a&&b){
        if(info) info.textContent = '';
        var muts = [];
        var hasA = (a.mut === 'albino' || b.mut === 'albino');
        var hasM = (a.mut === 'melanor' || b.mut === 'melanor');
        if (hasA) muts.push('白化');
        if (hasM) muts.push('黑化');
        if (hasA || hasM) muts.push('斑点');
        if (a.firefly || b.firefly) muts.push('萤火虫');
        if (a.induceHerm || b.induceHerm) muts.push('雌雄同体');
        var mutStr = muts.length > 0 ? ('可能产生：' + muts.join('、')) : '无潜在突变';
       if(infoMid) {
          infoMid.innerHTML = '<div style="color:#f0a04b; font-weight:bold; font-size:12px; line-height:1.4;">'+mutStr+'</div>';
        }
      }
    }else{
      if(info) info.textContent='父 '+(S.selM?'✓':'—')+' / 母 '+(S.selF?'✓':'—');
      if(infoMid) infoMid.innerHTML='<div class="em">请选择父母本</div>';
    }
    var ok=S.selM&&S.selF&&S.selM!==S.selF;
    $('breedGoBtn').disabled=!ok||S.c.length>=S.cap;
  };

  updateMidInfo();

  var sb=$('breedSortBtn');
  if(sb){
    sb.textContent=S.breedSort==='high'?'排序：高分优先 ⬆':S.breedSort==='low'?'排序：低分优先 ⬇':S.breedSort==='genHigh'?'排序：高代优先 ⬆':S.breedSort==='genLow'?'排序：低代优先 ⬇':'排序：突变优先';
    sb.onclick=function(){
      var m=S.breedSort||'default';
      S.breedSort=m==='default'?'high':m==='high'?'low':m==='low'?'genHigh':m==='genHigh'?'genLow':'default';
      mkBreedUI();
    }
    
    var tb = sb.parentNode;
    var sel = document.getElementById('breedMutFilter');
    if(S.breedSort === 'default') {
      if(!sel) {
        sel = ce('select');
        sel.id = 'breedMutFilter';
        sel.className = 'breed-search';
        sel.style.cssText = 'flex:1; background:var(--input-bg); color:var(--input-fg); border:1px solid var(--input-bd); border-radius:4px; font-size:12px; min-height:32px; outline:none; padding:0 8px; margin-bottom:0;';
        sel.innerHTML = '<option value="">全部突变</option><option value="albino">白化</option><option value="melanor">黑化</option><option value="pie">斑点</option><option value="firefly">萤火虫</option><option value="sterile">不育</option><option value="doubleWomb">双子宫</option>';
        sel.value = S.breedMutFilter || '';
        sel.onchange = function(){ S.breedMutFilter = this.value; mkBreedUI(); };
        tb.appendChild(sel);
      } else {
        sel.style.display = 'block';
        sel.value = S.breedMutFilter || ''; 
      }
    } else {
      if(sel) sel.style.display = 'none';
    }
  }
}
function mkBreedItem(c,selId,side,otherId){
  var d=ce('div');
  d.className='breed-item'+(selId===c.id?' sel':'');
  d.dataset.id = c.id; // 🌟 存下 ID，方便直接改样式
  
  var px=ce('div');px.className='bi-px';px.appendChild(mkPB(c));d.appendChild(px);
  var inf=ce('div');inf.className='bi-info';
  var nm=ce('div');nm.className='bi-name';var si=SX[c.sx]||SX.m;
  nm.textContent=(c.name?'「'+c.name+'」· 第'+c.gen+'代':'第 '+c.gen+' 代')+' '+si.s;
  inf.appendChild(nm);
  var meta=ce('div');meta.className='bi-meta';
  var extra='';
  if(otherId){var o=findC(otherId);if(o){var pr=predRarity(o,c);extra=' · 预计 '+(pr[0]+'-'+pr[1])+' 分'}}
  meta.textContent='魅力值 '+rSFull(c)+'/30 · 剩 '+(getMaxBc(c)-c.bc)+' 次'+extra;
  inf.appendChild(meta);d.appendChild(inf);
  
  // 🌟 核心优化：调用闭包函数，不再全量刷新
  d.onclick=function(){ 
    if (window._updateBreedSelection) {
      window._updateBreedSelection(side, c.id);
    }
  };
  return d;
}
function doBreedFromPanel(isTest){if(!S.selM||!S.selF||S.selM===S.selF)return;var a=findC(S.selM),b=findC(S.selF);if(!a||!b)return;if(!canBW(a,b))return;S.sel=[S.selM,S.selF];doBreed(isTest);S.selM=null;S.selF=null;render()}
$('breedGoBtn').onclick=function(){doBreedFromPanel(false)};
var breedDebounce = null;
function debounceBreedUI() {
  clearTimeout(breedDebounce);
  breedDebounce = setTimeout(function() { mkBreedUI(); }, 300);
}
$('breedMSearch').oninput=function(){mkBreedUI()};
$('breedSortBtn').onclick=function(){var m=S.breedSort||'default';S.breedSort=m==='default'?'high':m==='high'?'low':'default';mkBreedUI()};
$('breedFSearch').oninput=function(){mkBreedUI()};
function getSpeed(c){if(!c)return 0;var base=c.trainSpeed||0;if(S.head!==c.id)return base;var elapsed=Date.now()-S.headStart;if(elapsed>=HEAD_FULL)return 20;var progress=elapsed/HEAD_FULL;return Math.round((base+(20-base)*progress)*10)/10}
function headBonus(c){var b=0;if(c.sx==='h')b+=5;if(c.mut||c.pie)b+=5;return b;}
function headCharm(c){return rSFull(c)+headBonus(c)}
function setHead(id){var c=findC(id);if(!c)return;if(S.head===id)return;if(!isH(c)||c.var){alert('这匹马不能当首马');return}if(S.a.indexOf(c)>=0){alert('档案里的马不能当首马');return}if(S.head){var cur=findC(S.head);if(cur){if(!cur.sterile&&cur.bc<getMaxBc(cur)){alert('当前首马需用完所有繁育次数才能更换');return}if(getSpeed(cur)<20){alert('当前首马速度满 20 才能更换');return}var idx=-1;for(var i=0;i<S.c.length;i++)if(S.c[i].id===S.head){idx=i;break}if(idx>=0){var oc=S.c.splice(idx,1)[0];oc.isRetiredHead=true;S.a.push(oc);unlock('archived')}}}S.head=id;S.headTerm=(S.headTerm||0)+1;c.headTerm=S.headTerm;c.raceCount=c.raceCount||0;S.headStart=Date.now();S.headRace=0;S.headLastTick=Date.now();unlock('head');sv();closeM();render()}
function trainHead00(){if(!S.head)return;var c=findC(S.head);if(!c)return;if(getSpeed(c)>=20){alert('头马已满级，无需训练。');return}if((S.hoof||0)<20){alert('马蹄铁不够！当前只有 '+(S.hoof||0)+' 个，特训需要 20 个。');return}if((S.trainCount||0)<=0){alert('本周期特训次数已用尽，请等待商店刷新！');return}S.hoof-=20;S.trainCount=(S.trainCount||1)-1;var succ=Math.random()<0.20;if(succ){S.trainSuccess=(S.trainSuccess||0)+1;var add=0.1+Math.random()*0.1;c.trainSpeed+=add;if(c.trainSpeed>20)c.trainSpeed=20;if(S.trainSuccess>=3)unlock('lucky');alert('✨ 训练成功！速度提升至 '+getSpeed(c).toFixed(1));}else{S.trainFail=(S.trainFail||0)+1;if(S.trainFail>=3)unlock('unlucky');alert('💨 训练失败，速度没有提升。');}sv();render()}
function getRaceCd(c){if(c&&c.sterile)return 900000;return RACE_CD}

function raceHead(){
  if(!S.head)return;
  var c=findC(S.head);
  if(!c)return;
  
  // 1. 冷却检查
  if(Date.now()-S.headRace<getRaceCd(c)){
    alert('比赛冷却中');
    return;
  }
  
  // 2. 计算魅力值（包含红龙之血加成）
  var charm=headCharm(c);
  if(c.tempCharmBonus){
    charm+=c.tempCharmBonus;
    c.tempCharmBonus=0; // 消耗红龙之血
  }
  
  // 3. 计算速度与奖励
  var speed=getSpeed(c);
  var reward=Math.max(20,Math.round(charm*speed*1.25));
  
  S.r+=reward;
  S.headRace=Date.now();
  c.raceCount=(c.raceCount||0)+1;
  unlock('race');
  S.headRaceCount=(S.headRaceCount||0)+1;
  
  // 4. 缄默商店解锁判定（累计比赛 3 次）
  if(S.headRaceCount>=3&&!S.unlocked00){
    S.unlocked00=true;
    unlock('penny');
    S.hoof=(S.hoof||0)+6;
    sv();
    setTimeout(function(){
      alert('🌑 你听见竞技场外传来一阵沉重的金属脚步声……\n商店的暗面似乎被开启了。\n（获得 6 枚马蹄铁）')
    },500);
  }
  
  // 5. 随机速度提升（50%概率）
  if(Math.random()<0.5){
    var addSpeed=0.1+Math.random()*0.1;
    c.trainSpeed+=addSpeed;
    if(c.trainSpeed>20)c.trainSpeed=20;
  }
  
  // 6. 奖金破千成就
  if(reward>=1000)unlock('reward1000');
  
  // 7. 特典马 01 发放（速度达到 20）
  if(speed>=20&&!S.ach['sp01']){
    S.ach['sp01']=Date.now();
    var sp={
      id:'sp01_'+uid(), 
      gen:'?', 
      par:[], 
      g:{}, // 🌟 空属性，保护隐私
      sx:'h', 
      mut:null, 
      var:'special_01', 
      bc:0, 
      cd:0, 
      hat:0, 
      name:'01', 
      hasBeenStud:false, 
      trainSpeed:20, 
      trained:true, 
      pie:false, 
      induceHerm:false, 
      sterile:false, 
      doubleWomb:false
    };
    S.a.push(sp);
    sv();
    setTimeout(function(){
      alert('🎁 恭喜！头马获得冠军，神秘的店主 01 赠送了你一只特殊的生物！\n“01”已直接存入永久档案。')
    },100);
  }
  
  // 8. 特典马 00 发放（速度达到 10）
  if(speed>=10&&!S.ach['sp00']){
    S.ach['sp00']=Date.now();
    var sp00={
      id:'sp00_'+uid(), 
      gen:'?', 
      par:[], 
      g:{}, // 🌟 空属性，保护隐私
      sx:'m', 
      mut:null, 
      var:'special_00', 
      bc:0, 
      cd:0, 
      hat:0, 
      name:'00', 
      hasBeenStud:false, 
      trainSpeed:10, 
      trained:true, 
      pie:false, 
      induceHerm:false, 
      sterile:false, 
      doubleWomb:false
    };
    S.a.push(sp00);
    sv();
    setTimeout(function(){
      alert('🧲 比赛结束后，一个沉默的金属身影挡在了马厩前……\n“打得不错。”\n“00”已直接存入永久档案。')
    },100);
  }
  
  // 9. 保存并刷新页面
  sv();
  render();
  
  alert('🏇 比赛结束！\n魅力值 '+charm+' × 速度 '+speed.toFixed(1)+' × 1.25 = '+reward+' 🥕\n(头马有几率在比赛中获得速度提升)');
}

function editFarmName(){
  customPrompt("请输入你的马场名字（最多50字符，支持中英文及简单符号）：", S.farmName || '我的马场', function(name){
    if(name === null) return;
    name = name.trim();
    if(!name) return alert('名字不能为空！');
    
    if(name === S.farmName) return; // 名字没变，直接打断
    
    // 🌟 核心：白名单正则校验
    // 允许：中文(\u4e00-\u9fa5)、英文(a-zA-Z)、数字(0-9)、空格(\s)、下划线(_)、短横线(-)、点(.)、常规中文标点(\u3000-\u303F)
    var validPattern = /^[\u4e00-\u9fa5a-zA-Z0-9_\-\s.\u3000-\u303F]+$/;
    if (!validPattern.test(name)) {
      return alert('⚠️ 包含非法字符！\n名字只能包含中英文、数字、空格，以及简单的标点符号（如下划线、点、短横线等）。\n请勿输入 < > 等特殊符号。');
    }

    var byteLength = 0;
    for (var i = 0; i < name.length; i++) {
      if (name.charCodeAt(i) <= 127) byteLength += 1;
      else byteLength += 2;
    }
    if (byteLength > 50) return alert('名字太长了！最多50个字符。');
    
    S.farmName = name;
    
    // 🌟 同步更新你拥有的所有马的“当前马场名”
    for(var i=0; i<S.c.length; i++){
      S.c[i].currentFarmName = name;
    }
    for(var j=0; j<S.a.length; j++){
      if(S.a[j].currentFarmId === S.farmId) {
        S.a[j].currentFarmName = name;
      }
    }
    
    sv(); 
    if($('farmNameBox')) $('farmNameBox').textContent = '🏡 ' + S.farmName;
    render('list'); 
  });
}
function cleanExhaustedHorses(){
  var sSex = document.getElementById('sSex');
  if(sSex) sSex.value = 'exhausted';
  render(); // 先切换到筛选页面
  
  setTimeout(function(){
    var toDelete = S.c.filter(function(c){ return isH(c) && c.bc >= getMaxBc(c) && !c.var && c.id !== S.head && c.id !== S.stud && !c.isLocked; });
    
    // 🌟 辅助函数：重置所有筛选条件并刷新
    var resetFilters = function(){
      if($('sSex')) $('sSex').value = '';
      if($('sName')) $('sName').value = '';
      if($('sColor')) $('sColor').value = '';
      if($('sMut')) $('sMut').value = '';
      render();
    };

    if(toDelete.length === 0) {
      alert('当前没有可清理的耗尽马匹。');
      resetFilters(); // 没马可清，取消筛选
      return;
    }
    
    if(confirm('⚠️ 警告：即将永久清理 ' + toDelete.length + ' 匹繁育次数耗尽的马。此操作不可逆，且不会获得任何回报。是否确认？')){
      var ids = toDelete.map(function(c){return c.id;});
      S.c = S.c.filter(function(c){ return ids.indexOf(c.id) < 0; });
      S.sel = S.sel.filter(function(id){ return ids.indexOf(id) < 0; });
      S._batchSel = S._batchSel.filter(function(id){ return ids.indexOf(id) < 0; });
      sv();
      resetFilters(); // 清理完毕，取消筛选
      alert('清理完毕！');
    } else {
      // 🌟 玩家点了取消，也取消筛选
      resetFilters();
    }
  }, 100);
}
// 获取当前时间戳，格式如：2023-10-25_14-30-00
function getTimestamp() {
  var d = new Date();
  return d.getFullYear() + '-' + 
         String(d.getMonth() + 1).padStart(2, '0') + '-' + 
         String(d.getDate()).padStart(2, '0') + '_' + 
         String(d.getHours()).padStart(2, '0') + '-' + 
         String(d.getMinutes()).padStart(2, '0') + '-' + 
         String(d.getSeconds()).padStart(2, '0');
}

// ====极速保存====
function quickSave() {
  if(!confirm('⚡ 确定要极速保存吗？将下载一个存档文件到本地。')) return;
  
 var d = getSaveData();
  
  var jsonString = JSON.stringify(d);
  
  // 🌟 Base64 轻度加密
  var encoded = btoa(unescape(encodeURIComponent(jsonString)));
  var txt = "// 【马儿不跑】存档文件\n// 请勿随意更改以下内容，可能导致丢档和无法导入\n\n" + encoded;

  try {
    var blob = new Blob([txt], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '【Save-马儿不跑】_' + getTimestamp() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(url)}, 2000);
    showToast('⚡ 极速存档已下载！');
  } catch(e) {
    alert('下载失败，请尝试使用其他浏览器');
  }
}

// 绑定极速保存按钮
if($('quickSvBtn')) $('quickSvBtn').onclick = quickSave;
function confirmSetHead(id){if(confirm('确定要将这匹马设为首马吗？')){setHead(id);}}

(function () {
  var saved = localStorage.getItem('wd_theme_mode') || 'dark';
  document.documentElement.dataset.theme = saved;
  if (saved === 'light') document.body.classList.add('light-mode');
  setTimeout(function () {
    var btn = $('themeBtn');
    if (btn) btn.textContent = saved === 'light' ? '☀️ 切换白天' : '🌙 切换夜晚';
  }, 100);
})();

loadAllParts()
init();setInterval(tick,1000);
// 🌟 当页面从后台切回前台时，立刻唤醒一次 tick，并刷新界面
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    tick(); // 强制跑一次逻辑，计算离线期间的商店刷新、种马产出、蛋孵化等
    render(); // 强制重绘一次界面，确保 UI 跟上数据
  }
});

// 🌟 下拉框防跳动延迟补丁（零性能负担，全端兼容）
// ==========================================
setTimeout(function() {
  // 筛选栏的下拉框
  var selects = ['sSex', 'sColor', 'sMut', 'arcSex', 'arcColor', 'arcMut'];
  selects.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && !el.dataset.safeDelay) {
      el.dataset.safeDelay = "1";
      var oldChange = el.onchange;
      el.onchange = function(e) {
        if (oldChange) {
          setTimeout(function() { oldChange.call(el, e); }, 50);
        }
      };
    }
  });
}, 1000); // 延迟1秒等DOM加载完毕再挂载