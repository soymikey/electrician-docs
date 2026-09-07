import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const videosDir = path.join(rootDir, 'docs', 'videos');

const priorityLessons = new Map([
  [
    1,
    {
      what: [
        '这一集是在建立“电路为什么会工作”的底层图像：电不是单独从某一根线里冒出来的东西，而是电源、导体、负载和回路一起形成的能量转换过程。电源提供电压，电压让电荷有移动趋势；导线提供路径；负载把电能转换成光、热、运动或控制信号；回路闭合后，电流才有连续路径。',
        '对新手来说，最重要的是把“有电压”和“有电流”分开。一个点可以相对另一个点有电压，但如果没有完整回路，电流不会按预期流动；反过来，一旦形成低阻抗路径，电流可能突然变得很大。很多现场故障，例如开路、短路、过载、接地故障，本质上都是回路路径或阻抗状态发生了变化。',
        '学这集不要急着背公式，先练习画路径：电从哪里来，经过哪个负载，从哪里回去，保护装置在什么位置。当你能把每个设备都放回完整路径里，后面的插座、开关、断路器、GFCI、240V 负载和测量动作才会变得清楚。',
      ],
      concepts: [
        ['电源、负载与闭合回路', '电源不是“把电用掉”的地方，而是建立电势差的地方；负载也不是简单的终点，而是能量转换的位置。闭合回路意味着从电源出发，经负载，再回到电源的路径完整。任何一处断开都会让正常工作电流停止。'],
        ['电压、电流、电阻', '电压可以理解为推动电荷移动的差值，电流是电荷通过导体或负载的速率，电阻限制电流。三者不是孤立概念：同一个负载上电压越高，通常电流越大；阻抗越大，电流越受限制。'],
        ['故障状态', '开路是不该断的地方断了；短路是不该连的地方以很低阻抗连上了；过载是正常路径上电流超过导线或设备能力；接地故障是带电导体接触到设备外壳、接地导体或其他接地部件。'],
      ],
      field: [
        '在美国住宅现场，你会反复看到 hot、neutral、ground、load、breaker 这些词。hot 通常把电压带到负载，neutral 是正常回流路径，ground 是故障保护路径。看任何插座或开关盒时，先问“正常工作电流走哪条路”，再问“故障时保护装置怎么动作”。',
        '在商业现场，这个思路同样适用于照明支路、控制变压器、马达控制回路和配电盘。区别只是电压等级、相数、保护装置和规范要求更复杂，底层仍是路径、负载、阻抗和保护协调。',
      ],
      mistakes: [
        '把电线想成“电从一根线流到空气里”，忘记必须有回路。',
        '以为断开开关就代表所有导体都安全，忽略同一盒内可能还有其他回路。',
        '只看颜色判断导线功能，而不验电、不追踪回路。',
        '把 ground 当作正常工作回流线使用。',
      ],
      quiz: [
        ['一个灯不亮时，为什么不能只说“没有电”？', '因为可能是没有电压、回路开路、负载损坏、开关断开、neutral 问题或保护装置跳闸。要沿完整回路判断。'],
        ['电压和电流哪个更像“推动条件”？', '电压。电流是否流动以及流多大，还取决于回路是否闭合和总阻抗。'],
        ['短路为什么危险？', '短路提供低阻抗路径，会让电流迅速增大，可能造成电弧、发热、设备损坏和火灾风险。'],
      ],
    },
  ],
  [
    2,
    {
      what: [
        '这一集把电流、AC/DC、保险丝、断路器、万用表和 GFCI 放在同一张安全地图里。电流是实际穿过导体、负载或人体的量，保护装置也是围绕“电流是否异常”来设计的。但不同保护装置看的异常不同：断路器主要看过电流，GFCI 看 hot 和 neutral 之间是否有电流差。',
        'AC 和 DC 的区别不只是“方向变不变”。美国住宅支路多为 60Hz AC，电压和电流周期性变化；汽车电池、电子电路和部分控制系统常见 DC。测量前必须知道自己测的是 AC 还是 DC，因为仪表档位、读数含义和风险判断都不同。',
        '这集最适合训练一个习惯：看到保护装置时，先问它保护什么、靠什么条件动作、不能保护什么。保险丝和断路器不是万能护身符，GFCI 也不等于允许你带电乱试。',
      ],
      concepts: [
        ['电流与安培', '电流表示单位时间通过某一点的电荷量，单位是 ampere。导线、开关、插座、断路器都有额定电流，超过额定值会带来发热和失效风险。'],
        ['保险丝与断路器', '保险丝通过熔断切断过电流，断路器通过热磁或电子机构脱扣。它们主要保护导线和设备免受过载或短路损害，而不是专门保护人体免受小电流触电。'],
        ['GFCI 的差流保护', 'GFCI 比较 hot 出去的电流和 neutral 回来的电流。如果两者差值超过阈值，说明电流可能经人体或其他路径泄漏，它会快速断开。'],
        ['万用表边界', '万用表能帮助判断电压、连续性、电阻和有时电流，但必须选对档位、插孔和 CAT 等级。测电流时错误并联可能直接造成短路。'],
      ],
      field: [
        '住宅里，厨房、浴室、车库、室外等位置常见 GFCI 要求，因为人和潮湿接地环境更容易形成危险漏电路径。商业现场则常见更多专用回路、设备断路器和控制保护，需要按设备铭牌和图纸判断。',
        '现场排查时，不要只看 breaker 是否没跳。你还要确认 GFCI 是否脱扣、负载是否过载、neutral 是否完整、仪表是否适合这个位置的故障能量。带电测量必须在许可范围内完成。',
      ],
      mistakes: [
        '以为断路器没跳就代表回路安全。',
        '测 AC 时放在 DC 档，或没有确认表笔插孔。',
        '把 GFCI 当成过载保护，忽略它主要检测差流。',
        '用普通小表去测高故障能量配电盘，忽略 CAT 等级。',
      ],
      quiz: [
        ['断路器主要保护人还是保护导线和设备？', '主要保护导线和设备免受过电流损害。人身触电保护通常依赖 GFCI/RCD 等装置和正确工作流程。'],
        ['GFCI 为什么能发现漏电？', '它比较 hot 与 neutral 的电流是否平衡；不平衡说明有电流走了其他路径。'],
        ['测量前最少要确认哪三件事？', '确认电路状态、仪表 CAT/量程、档位和表笔插孔。'],
      ],
    },
  ],
  [
    4,
    {
      what: [
        '这一集讲欧姆定律：电压 V、电流 I、电阻 R 之间的关系。公式 V = I x R 不是考试用符号游戏，而是现场判断负载、电压降、过载和发热的基础语言。你看到一个负载，真正要问的是：它两端电压是多少，内部阻抗多大，因此会拉多少电流。',
        '欧姆定律还帮你理解为什么短路危险。正常负载有一定电阻或阻抗，限制电流并把电能转换成有用输出；短路路径阻抗很低，于是在同样电压下电流会暴增，保护装置必须尽快动作。相反，如果连接松动或导线太长，额外电阻会造成压降和发热。',
        '学习这集时，把公式和现场铭牌联系起来。设备标注 volts、amps、watts，不只是说明书信息，而是告诉你这个设备需要什么供电、会占用多少回路容量，以及导线和断路器能否匹配。',
      ],
      concepts: [
        ['V = I x R', '电压等于电流乘以电阻。知道其中两个量，就能估算第三个量。现场不一定总是纯电阻负载，但这个关系仍是判断基础。比如同一台电热设备接在额定电压下才会按预期取用电流；电压、阻抗或接线状态变了，读数和发热也会跟着变。'],
        ['功率与发热', '功率表示能量转换速率。P = V x I，电流越大，导线和连接点发热风险越高；松动连接会增加接触电阻，形成局部热点。很多烧焦端子、变色插座和断路器发热，不是因为公式复杂，而是因为电流经过了不该有的高阻连接。'],
        ['电压降', '导线本身也有电阻。长距离、大电流或线径不足时，负载端电压会低于电源端，设备可能启动困难、效率下降或过热。现场听到 voltage drop，不要只想到数字，要想到导线长度、线径、负载电流、接头质量和允许范围。'],
      ],
      field: [
        '住宅里，欧姆定律会出现在空间加热器、微波炉、空调、干衣机等高功率负载上。一个 1500W 的 120V 负载大约需要 12.5A，这会直接影响 15A 或 20A 支路的容量判断。',
        '商业现场里，照明回路、马达、变压器和长距离馈线都要考虑电流和压降。即使详细计算由规范和设计文件决定，学徒也需要能看懂为什么师傅会关注线径、距离、负载电流和端子温升。',
      ],
      mistakes: [
        '只背公式，不知道每个字母对应现场哪个测量量。',
        '把 watts 和 amps 混用，忘记电压不同会改变电流。',
        '忽略松动连接产生的额外电阻和热点。',
        '用欧姆档测带电电路，这是危险且会损坏仪表的操作。',
      ],
      quiz: [
        ['120V、1500W 负载电流约多少？', 'I = P / V = 1500 / 120，约 12.5A。'],
        ['为什么连接松动会发热？', '松动会增加接触电阻，电流通过时在连接点产生额外功率损耗和热量。'],
        ['测电阻前为什么要断电？', '欧姆档会由仪表内部供电测量，带电电路会造成错误读数并可能损坏仪表或伤人。'],
      ],
    },
  ],
  [
    19,
    {
      what: [
        '这一集讲 kWh，也就是千瓦时。它不是功率单位，而是能量单位：功率乘以时间。一个 1kW 的负载运行 1 小时，用电量就是 1kWh；一个 100W 的灯运行 10 小时，同样是 1kWh。',
        'kWh 是电费账单的核心语言。电力公司不是按某一瞬间的 watts 收费，而是按一段时间累计消耗的能量收费。理解这一点后，你就能把设备铭牌、运行时间和账单金额连起来，估算某个负载到底花多少钱。',
        '对电工学习来说，kWh 还能帮你区分“容量”和“消耗”。断路器和导线更关心 amps 和瞬时负载能力，电费更关心 watts 持续了多久。一个高功率设备短时间运行，和一个低功率设备长时间运行，账单影响可能接近。',
      ],
      concepts: [
        ['kW 与 kWh', 'kW 是功率，表示此刻消耗或输出能量的速度；kWh 是能量，表示一段时间累计消耗多少。不要把两者混为一谈。一个设备功率高，不一定账单最高；真正的账单影响还要看它每天运行多久、是否频繁启动、是否长期待机。'],
        ['电费估算', '用电量 kWh = 功率 kW x 时间 h。再乘以电价，就能估算费用。实际账单还可能包含需求费、基本费、税费和分时电价。住宅初学阶段先会算简单用电量，商业阶段再逐步理解 demand charge 和负载管理。'],
        ['铭牌读数', '设备铭牌常写 volts、amps、watts。用 P = V x I 可以估算功率，再结合使用时间估算用电量。铭牌也能提醒你这个设备应该接什么电压、需要多大回路容量，以及是否属于连续负载或专用回路讨论范围。'],
      ],
      field: [
        '住宅里，电热水器、干衣机、空调、电暖器和 EV 充电器通常是账单大户，因为它们功率高或运行时间长。向客户解释用电量时，kWh 比单说 amps 更容易让人理解费用。',
        '商业场景还可能涉及 demand charge，也就是某段时间内的最大需求功率。基础阶段先把 kW/kWh 分清，后面再理解功率因数、需量和能源管理。',
      ],
      mistakes: [
        '把 kW 当成 kWh，以为功率就是电费。',
        '忽略运行时间，只看设备瓦数。',
        '用电费逻辑判断断路器容量，忘记断路器看的是电流和保护要求。',
        '忘记 240V 负载可能功率很大，即使电流看起来不夸张。',
      ],
      quiz: [
        ['500W 设备运行 4 小时是多少 kWh？', '0.5kW x 4h = 2kWh。'],
        ['为什么 100W 灯泡也可能用掉很多电？', '如果运行时间很长，累计 kWh 会增加。'],
        ['断路器容量用 kWh 判断吗？', '不用。断路器和导线主要按电流、负载类型、连续负载规则和规范要求判断。'],
      ],
    },
  ],
  [
    24,
    {
      what: [
        '这一集讲美国住宅最核心的供电结构：120/240V split-phase。住宅变压器副边有中心抽头，中心抽头接出 neutral，两端是两个 hot leg。任一 hot 到 neutral 约 120V，两个 hot 之间约 240V。',
        '这套系统的关键不是“家里有两种电压”这么简单，而是两个 hot leg 相对 neutral 的关系。普通插座和照明多用 120V；电炉、干衣机、空调、热水器、EV 充电等大负载常用 240V。某些设备还同时需要 240V 给加热或马达，120V 给控制、灯或电子部分。',
        '学习时要特别注意 neutral 和 equipment grounding conductor 的不同职责。neutral 是正常工作电流路径的一部分；ground 不是正常回流线，而是故障保护路径。分相系统理解错，后面看双极断路器、多线支路和 4 线电器插座都会混乱。',
      ],
      concepts: [
        ['中心抽头变压器', '变压器副边中点作为 neutral，两端作为两个 hot leg。中点到任一端约 120V，端到端约 240V。'],
        ['单极与双极断路器', '120V 支路通常由单极断路器保护一个 hot；240V 负载通常用双极断路器同时断开两个 hot leg。'],
        ['中性线电流', '120V 负载的正常回流经过 neutral。纯 240V 负载通常不需要 neutral；同时需要 120V 控制的设备则可能需要 neutral。'],
      ],
      field: [
        '在住宅配电盘里，左右或上下相邻位置通常落在不同 leg 上，双极断路器跨两个 leg 得到 240V。看干衣机、range、water heater、HVAC disconnect 时，要先确认它是纯 240V 还是 120/240V 组合负载。',
        '商业现场也会有不同供电系统，例如 120/208V 三相或 277/480V。不要把住宅 split-phase 的经验硬套到所有面板上；先读 panel schedule、铭牌和测量点。',
      ],
      mistakes: [
        '以为两个 120V 简单相加，忽略它们是相对中心抽头的两端。',
        '把 neutral 和 ground 接法混为一谈。',
        '用单极断路器处理需要同时断开两条 hot 的负载。',
        '看到 240V 就以为一定没有 neutral，忽略 4 线设备。'
      ],
      quiz: [
        ['hot 到 neutral 通常是多少电压？', '约 120V，具体读数会随系统和现场条件略有变化。'],
        ['两个 hot leg 之间通常是多少？', '约 240V。'],
        ['为什么 4 线干衣机插座可能有 neutral？', '因为设备可能用 240V 给加热元件，同时用 120V 给控制、灯或马达辅助部分。'],
      ],
    },
  ],
  [
    25,
    {
      what: [
        '这一集专门区分 hot、neutral、ground、grounding 和 bonding。hot 是带电导体，给负载提供相对 neutral 或 ground 的电压；neutral 是正常工作电流回到电源的路径；grounding conductor 通常不承载正常工作电流，而是在故障时提供低阻抗路径。',
        'grounding 和 bonding 是安全系统的一部分。grounding 把系统和大地参考、接地电极等联系起来；bonding 把可触及金属部件连接到一起，让它们保持接近同一电位，并在故障时帮助保护装置动作。它们不是为了让设备“更有电”，而是为了控制故障时的危险电压。',
        '这页是美国电工学习的高优先级内容，因为很多危险接法都来自把 neutral 和 ground 混用。新手必须形成一个硬规则：正常工作电流应该走 neutral，不应该走设备外壳、金属管、裸地线或其他可触及金属路径。',
      ],
      concepts: [
        ['hot wire', 'hot 是未接地导体，正常情况下相对 neutral 或 ground 有电压。接触 hot 并形成回路可能触电。'],
        ['neutral wire', 'neutral 是 grounded conductor，是正常工作电流回流路径。它和 ground 在系统特定位置有连接关系，但不能因此在任意位置混接。'],
        ['ground wire', 'equipment grounding conductor 连接设备外壳和金属部件，目标是在故障时提供低阻抗路径，使保护装置动作，并降低触电风险。'],
        ['bonding', 'bonding 把金属盒、管道、设备外壳等连接起来，避免故障时不同金属部件之间出现危险电位差。'],
      ],
      field: [
        '住宅里，你会在插座盒、金属盒、设备外壳、主配电盘和子配电盘看到这些概念。尤其要理解主服务设备和 subpanel 中 neutral/ground 处理方式不同，具体接法必须按 NEC 和当地规范执行。',
        '商业现场中，金属导管、设备接地导体、机柜 bonding jumper、变压器二次侧接地等会更复杂。学习阶段先把职责分清，再去看图纸和规范条文。',
      ],
      mistakes: [
        '把 bare/green ground 当作 neutral 替代品。',
        '以为 neutral 永远安全可触摸，忽略它可能承载电流或因故障带电。',
        '在不该 bonding 的位置把 neutral 和 ground 连在一起。',
        '只凭颜色判断导线，不验电、不确认回路来源。',
      ],
      quiz: [
        ['正常工作电流应该走 ground 吗？', '不应该。正常工作电流通常走 hot 和 neutral；ground 用于故障保护。'],
        ['bonding 的目的是什么？', '让可触及金属部件保持接近同一电位，并帮助故障电流回到电源使保护装置动作。'],
        ['neutral 可以随便和 ground 接在一起吗？', '不可以。连接位置和方式受规范严格限制，错误混接会制造危险。'],
      ],
    },
  ],
  [
    38,
    {
      what: [
        '这一集纠正一个危险误解：普通 circuit breaker 不是人身触电保护装置。断路器主要保护导线和设备免受过载、短路等过电流损害；人体受到致命风险所需的电流，可能远低于让普通断路器快速跳闸的电流。',
        '换句话说，一个人触电时，回路中可能只有几十毫安到几百毫安，而 15A 或 20A 断路器并不会因为这么小的电流立刻动作。断路器看到的是总电流是否超过它的脱扣条件，不是“有没有人正在被电击”。',
        '真正的人身漏电保护通常依赖 GFCI/RCD 这类差流保护，以及断电、验电、PPE、许可范围和正确工作方法。学习这集以后，看到 breaker 没跳，不能把它解释成“所以没有危险”。',
      ],
      concepts: [
        ['过电流保护', '普通断路器按电流大小和持续时间动作，目标是保护导线绝缘、设备和建筑免受过热或短路损害。它关心的是回路总电流是否达到脱扣条件，而不是判断电流是不是穿过了人体。'],
        ['人体触电电流', '人体危险电流可能远小于支路断路器额定电流。电流路径经过胸部时风险尤其高，潮湿环境会进一步降低人体阻抗。也就是说，一个足以伤人的电流，对 15A 或 20A 断路器来说可能仍然“太小”。'],
        ['GFCI/RCD', 'GFCI/RCD 不等电流大到过载，而是检测出去和回来的电流差，因此更适合发现漏到人体或地的电流。它弥补的是普通过电流保护的盲区，但仍要依赖正确安装、测试和适用场景。'],
        ['脱扣曲线', '断路器不是超过额定值就瞬间跳闸。不同倍数的过电流对应不同动作时间，这就是为什么保护装置不能被简化成一个魔法开关。理解脱扣曲线能帮助你解释为什么短路会快速跳闸，而轻微过载可能延时动作。'],
      ],
      field: [
        '住宅里，浴室、厨房、室外、车库、地下室等位置强调 GFCI，就是因为普通 breaker 不足以覆盖这些触电场景。商业现场里，临时电源、手持工具、潮湿区域和维护作业也会特别强调漏电保护和作业程序。',
        '排查时要把“设备保护”和“人员保护”分开说。breaker、fuse、GFCI、AFCI、grounding、bonding 各有职责，任何一个单独存在都不等于可以忽略验电和锁定挂牌流程。',
      ],
      mistakes: [
        '以为 15A breaker 会在人触电时自动保护人。',
        '以为 breaker 没跳就证明设备外壳安全。',
        '把 GFCI、ground 和 breaker 的职责混在一起。',
        '模仿视频里的触电或故障演示。'
      ],
      quiz: [
        ['普通断路器主要检测什么？', '检测过电流条件，也就是电流大小和持续时间是否达到脱扣要求。'],
        ['为什么人体触电可能不让 breaker 跳闸？', '因为危险人体电流可能远小于 15A 或 20A 断路器快速脱扣所需电流。'],
        ['人员漏电保护通常看什么？', '看 hot 和 neutral 的电流差，也就是是否有电流走了异常路径。'],
      ],
    },
  ],
  [
    40,
    {
      what: [
        '这一集讲钳形表的实用测量逻辑。钳形表通过导体周围的磁场测电流，好处是不需要把电路断开再把仪表串进去。它很适合读负载电流、启动电流、支路电流和某些不平衡问题。',
        '关键操作原则是：测某一根导体的电流，就只夹那一根导体。如果同时夹住 hot 和 neutral，两个方向相反的电流产生的磁场通常会互相抵消，读数接近 0。这不是没有负载，而是测量方法把结果抵消了。',
        '钳形表让测量更方便，但不降低电气风险。打开面板、靠近带电导体、选择量程、使用表笔测电压或电阻，都要遵守仪表 CAT 等级、PPE、验电和许可范围。',
      ],
      concepts: [
        ['电流钳原理', '电流经过导体会产生磁场。钳形表感应这个磁场并换算成电流读数，所以它测的是被夹导体中的电流。这也解释了为什么夹的位置比按哪个按钮更重要：夹错对象，读数就回答不了你的问题。'],
        ['单根导体', '只夹 hot、只夹 neutral 或只夹某一相，才能看到该导体电流。同时夹住去程和回程导体时，磁场相互抵消。很多新手看到 0A 会误判为没负载，其实只是把完整电缆一起夹住了。'],
        ['启动电流', '马达、压缩机、变压器等设备启动瞬间电流可能高于稳定运行电流。带 inrush 功能的钳表能捕捉这个短暂峰值。这个读数常用于判断设备启动是否异常、断路器是否误跳、线路是否有压降问题。'],
        ['CAT 等级', 'CAT 等级反映仪表能承受的瞬态过电压环境。配电盘、服务入口和设备端子的风险不同，不能只看最大电压数字。一个写着能测 600V 的表，如果 CAT 等级不适合现场，也不应该拿去硬测高能量位置。'],
      ],
      field: [
        '住宅里，钳表常用于判断空调、干衣机、热水器、EV 充电器或某个支路是否接近额定负载。商业现场中，它常用于三相马达相电流比较、面板负载调查、控制柜排查和设备维护记录。',
        '实际使用时，先决定要回答的问题：是测单个负载电流、整条支路电流，还是查漏电/不平衡。问题不同，夹的位置就不同。不要为了“有读数”而随便夹一束线。',
      ],
      mistakes: [
        '把整根电缆一起夹住，然后误以为没有电流。',
        '在狭窄带电面板里为了夹线冒险移动导体。',
        '忽略钳表 AC/DC 能力，有些表不能测 DC 电流。',
        '把非接触测电当成最终验电证明。',
      ],
      quiz: [
        ['为什么同时夹 hot 和 neutral 常常读 0？', '两根导体电流大小相近、方向相反，磁场互相抵消。'],
        ['测单个 120V 负载电流应夹哪里？', '夹该负载回路的一根导体，通常夹 hot 或 neutral 的单根导体。'],
        ['钳表能替代安全流程吗？', '不能。它只是测量工具，仍要确认 CAT 等级、PPE、验电和作业许可。'],
      ],
    },
  ],
  [
    43,
    {
      what: [
        '这一集的核心是：某个单一装置、单一接法或单一读数，看起来像安全，但不能自动等于完整安全。电气安全要同时看电压、人体接触路径、故障电流路径、保护装置动作条件、接地和等电位连接。',
        '新手最容易被“表面正常”骗到。例如设备能工作，不代表接地正确；breaker 没跳，不代表不会触电；非接触测电没响，不代表已经完成可靠验电；有 ground，不代表 GFCI 或正确 bonding 可以省略。',
        '这页应该作为安全复盘页来读：每当你想说“这样应该安全吧”，就把它拆成可验证条件。电源是否断开？是否用合适仪表验过？是否可能有反送电？保护装置是否适合这个风险？接线是否符合 NEC 和 local code？',
      ],
      concepts: [
        ['单一保护的边界', '断路器、GFCI、接地、bonding、绝缘、外壳、标识都只覆盖一部分风险。真正安全来自多个条件同时成立。'],
        ['接触电压', '人能接触到的两个点之间如果存在电位差，就可能形成危险电流路径。金属外壳、潮湿地面、管道和梯子都可能改变接触路径。'],
        ['故障路径', '保护装置动作需要故障电流能回到电源。路径阻抗太高、连接错误或 bonding 缺失，都可能让危险电压停留在可触及金属上。'],
        ['验电习惯', '验电不是随便碰一下测试器，而是用合适仪表、正确档位和已知电源验证仪表可用，再确认待测点状态。'],
      ],
      field: [
        '住宅场景中，老房子、改造线路、错误 bootleg ground、共享 neutral、反接插座和失效 GFCI 都可能制造“看起来能用但不安全”的状态。商业场景中，临时电源、发电机、UPS、马达控制柜和多电源设备还会增加反送电风险。',
        '现场判断不要停在“以前一直这样用”。电工要把安全变成可验证流程：识别电源、隔离、锁定挂牌、验电、确认保护装置、按图纸和规范恢复。学习视频能帮你理解为什么，但不能替代现场授权。',
      ],
      mistakes: [
        '把“没跳闸”“能工作”“测试灯亮”当作安全证明。',
        '相信单一工具读数，不做交叉验证。',
        '忽略同一设备可能有多个电源或控制电源。',
        '看到 ground 线就以为 bonding、GFCI 和断路器都没问题。',
      ],
      quiz: [
        ['为什么一个保护装置不能代表完整安全？', '因为每种装置只针对特定故障条件，其他触电、反送电、错误接线或高阻抗故障仍可能存在。'],
        ['“看起来没电”和“验电确认无电”有什么区别？', '前者是主观观察，后者是用合适仪表和流程验证后的结论。'],
        ['遇到不确定接线时第一步是什么？', '停止操作，隔离风险，查图纸/规范，并请持证人员确认。'],
      ],
    },
  ],
]);

function extractSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(`## ${escaped}\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match ? match[1].trim() : '';
}

function listItems(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

function termsFromTable(section) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes('---') && !line.includes('英文'))
    .map((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean))
    .filter((cells) => cells.length >= 2)
    .slice(0, 6);
}

function getTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '本集';
}

function getPosition(content) {
  const match = content.match(/^sidebar_position:\s*(\d+)/m);
  return match ? Number(match[1]) : 0;
}

function cleanSentence(text) {
  return text.replace(/[。.!！]+$/u, '').trim();
}

function truncateHeading(text, maxLength = 26) {
  const clean = cleanSentence(text)
    .replace(/^理解/u, '')
    .replace(/^掌握/u, '')
    .replace(/^注意/u, '')
    .trim();
  if (clean.length <= maxLength) {
    return clean;
  }

  const firstClause = clean.split(/[，、：:；;]/u)[0].trim();
  if (firstClause && firstClause.length <= maxLength) {
    return firstClause;
  }

  return '本节核心判断';
}

function conceptHeading(item) {
  const rules = [
    [/传统电流.*电子/u, '传统电流与电子流方向'],
    [/电路图.*传统电流/u, '电路图默认使用传统电流'],
    [/两种说法|不同分析场景/u, '两种方向模型不冲突'],
    [/固定.*分析习惯|方向混乱/u, '固定一种分析方向'],
    [/现场读图/u, '现场读图先看回路'],
    [/重点理解元件在电路中承担的功能/u, '元件功能先于材料细节'],
    [/串联/u, '串联回路的电流路径'],
    [/并联/u, '并联支路的电压与电流'],
    [/二极管|diode/u, '二极管的单向导通'],
    [/电感|inductor/u, '电感与磁场储能'],
    [/电池|battery/u, '电池的化学能转换'],
    [/电机|motor/u, '电机的电磁转矩'],
    [/继电器|relay/u, '继电器的线圈与触点'],
    [/变压器.*磁耦合/u, '磁耦合传递交流能量'],
    [/匝数比/u, '匝数比决定电压变化'],
    [/一次侧.*二次侧|隔离/u, '一次侧与二次侧隔离'],
    [/住宅.*商业.*变压器|供电电压转换/u, '现场供电电压转换'],
    [/容量.*接线方式.*接地/u, '容量、接线与保护'],
    [/common.*traveler|多位置控制灯具/u, 'Common 与 Traveler 路径'],
    [/开关|switch/u, '开关控制回路路径'],
    [/交流|AC/u, '交流电的周期变化'],
    [/设备通过.*火线.*零线|hot.*neutral/u, 'Hot 与 Neutral 供电路径'],
    [/地线.*故障保护|ground.*故障保护/u, 'Ground 只用于故障保护'],
    [/插座|receptacle|outlet/u, '插座端子与回路路径'],
    [/功率因数|power factor/u, '功率因数与有效功率'],
    [/供电、计量到配电盘/u, '从供电到配电盘的路径'],
    [/电表.*meter|energy meter/u, '电表记录用电量'],
    [/line conductor|零线|grounding conductor/u, 'Line、Neutral 与 Ground'],
    [/120\/240V split-phase/u, '连接分相系统的前置知识'],
    [/单相/u, '单相供电的回路关系'],
    [/三相/u, '三相供电的相位关系'],
    [/火线.*地线.*故障电流路径|hot.*ground/u, '火线碰地会形成故障路径'],
    [/故障电流大小/u, '故障电流取决于回路阻抗'],
    [/断路器可能跳闸|电弧风险|火花/u, '跳闸前仍有电弧风险'],
    [/设备接地导体/u, '设备接地导体帮助清除故障'],
    [/现实中模仿|不要.*模仿/u, '故障演示不能现场模仿'],
    [/VFD|变频器/u, '变频器调速逻辑'],
    [/星三角|star delta/u, '星三角启动降低启动电流'],
    [/整流|rectifier/u, '整流把交流变成直流'],
    [/光耦|optocoupler/u, '光耦的电气隔离'],
    [/电容|capacitor/u, '电容储能与充放电'],
    [/发电机|generator|alternator/u, '发电机的电磁感应'],
    [/LED/u, 'LED 的正向导通与限流'],
    [/电位器|potentiometer/u, '电位器的可变分压'],
    [/Edison effect|热灯丝/u, 'Edison Effect 与电子管'],
    [/电子史|半导体|晶体管/u, '从电子管到半导体'],
    [/接地故障|ground fault/u, '接地故障路径'],
    [/保护装置|断路器|GFCI/u, '保护装置的动作边界'],
    [/理解概念比背结论/u, '理解因果关系而不是背结论'],
    [/安全|断电|验电|规范/u, '现场安全前置条件'],
  ];

  for (const [pattern, heading] of rules) {
    if (pattern.test(item)) {
      return heading;
    }
  }

  return truncateHeading(item);
}

function explainConcept(item, terms) {
  const relatedTerms = terms
    .slice(0, 3)
    .map(([en, zh]) => `${zh}（${en}）`)
    .join('、');
  const termBridge = relatedTerms ? `把它和 ${relatedTerms} 对上号，` : '';

  if (/传统电流|电子流|方向|正到负|负到正/u.test(item)) {
    return `${item} 这里要解决的是读图语言问题，不是现场导线真的换了功能。${termBridge}看教材、二极管箭头、控制图和电子解释时，先确认作者采用哪一种方向模型，再保持同一种方向分析到底。`;
  }
  if (/变压器|绕组|匝数比|一次侧|二次侧|磁耦合/u.test(item)) {
    return `${item} 重点是能量通过磁场从一个绕组传到另一个绕组，而不是两边导线直接相连。${termBridge}现场读铭牌和端子时，要确认一次侧电压、二次侧电压、容量、接地方式和过流保护。`;
  }
  if (/容量|接线方式|接地|过流保护/u.test(item)) {
    return `${item} 这些条件决定设备能不能安全接入系统。${termBridge}现场要同时看铭牌、图纸、导线规格、保护装置和接地/等电位连接，不能只看电压数字。`;
  }
  if (/二极管|LED|整流/u.test(item)) {
    return `${item} 这类元件有方向性，接反、少限流或误判极性都会改变结果。${termBridge}看电路图时先找阳极、阴极、负载和限流路径，再判断电流能不能通过。`;
  }
  if (/继电器|线圈|触点|控制/u.test(item)) {
    return `${item} 这类内容要把控制回路和负载回路分开看。${termBridge}先判断线圈由什么电压驱动，再看触点控制哪一路负载，这样排故时不会把控制问题误判成负载问题。`;
  }
  if (/电机|马达|启动|转矩|旋转/u.test(item)) {
    return `${item} 电机问题通常同时涉及电源、磁场、机械负载和启动电流。${termBridge}现场要看铭牌电压、电流、相数、启动方式和保护装置，而不是只看它转不转。`;
  }
  if (/三相|相位|星三角|VFD|变频器/u.test(item)) {
    return `${item} 三相和驱动内容的关键是相之间的关系。${termBridge}现场要关注相序、线电压、相电流、负载平衡、断开装置和设备铭牌要求。`;
  }
  if (/电容|电感|磁场|充放电|储能/u.test(item)) {
    return `${item} 这里讲的是元件如何暂时储存并释放能量。${termBridge}现场或实验中要注意断电后仍可能残留能量，测量前需要确认放电和隔离状态。`;
  }
  if (/wiring diagram|读图|图纸|电源、计量|负载路径/u.test(item)) {
    return `${item} 读图时要先顺路径，不要先猜结论。${termBridge}从电源或变压器出发，找到保护装置、开关或控制点、负载和回流路径，再把现场导线与图纸符号对应起来。`;
  }
  if (/地线|ground|接地|bonding|故障路径|故障电流路径/u.test(item)) {
    return `${item} 这类内容的重点是故障时电流能不能沿低阻抗路径回到电源，让保护装置动作。${termBridge}不要把接地导体当作正常工作回流线，也不要只看有没有绿色或裸铜线。`;
  }
  if (/短路|故障电流|电弧|火花|故障排查/u.test(item)) {
    return `${item} 这是排故和安全判断的核心。${termBridge}先判断正常电流路径和异常故障路径分别在哪里，再看保护装置是否有条件及时动作。`;
  }
  if (/安全|断电|验电|规范|PPE|带电|模仿|演示|实验/u.test(item)) {
    return `${item} 这是一条作业边界，不只是学习提醒。${termBridge}现场要先确认电源是否隔离、仪表是否合适、自己是否有许可范围，再决定能不能继续。`;
  }
  if (/保护|断路器|GFCI|保险丝|故障/u.test(item)) {
    return `${item} 学习时要分清它对应的风险边界：过电流、漏电差流、接地故障路径或设备失效并不是同一种问题。${termBridge}不要把一个保护装置理解成能覆盖所有风险。`;
  }
  if (/电压|电流|电阻|功率|压降|kWh|功率因数/u.test(item)) {
    return `${item} 这类概念最好和测量量一起学：哪里量电压、哪里看电流、负载消耗多少功率、导线和端子会不会发热。${termBridge}能把数字和现场部件连起来，才算真正掌握。`;
  }
  if (/线|端子|绕组|触点|负载|回路|导体|开关|插座/u.test(item)) {
    return `${item} 这条知识点对应的是实际路径。${termBridge}看图或看设备时，先找电源端、负载端、回流路径和可能的断开点，再判断读数是否合理。`;
  }

  return `${item} 复习时不要停在定义层面。${termBridge}试着用一句话说明它为什么成立、影响哪个部件、现场读图或测量时会改变什么判断。`;
}

function genericLesson(content) {
  const title = getTitle(content);
  const goal = extractSection(content, '学习目标');
  const concepts = listItems(extractSection(content, '核心知识点'));
  const field = listItems(extractSection(content, '美国电工学习重点'));
  const terms = termsFromTable(extractSection(content, '术语速查'));
  const firstConcept = concepts[0] ?? '先把这一集放回完整电路、负载和保护装置的关系中理解。';
  const secondConcept = concepts[1] ?? '理解概念之间的因果关系，比只记住单句结论更重要。';
  const primaryTerms = terms
    .slice(0, 4)
    .map(([en, zh]) => `${zh}（${en}）`)
    .join('、') || '本集关键词';
  const fieldText = field.join(' ') || '学习时把概念和现场设备、导线、保护装置、测量动作联系起来。';

  return {
    what: [
      `这一集围绕 ${title.replace(/^\d+\.\s*/, '')} 展开。学习目标是：${goal} 读的时候先抓主线，不急着记每个细节，先弄清这个概念在电源、负载、回路和保护装置之间的位置。`,
      `本集最值得抓住的三件事是：${concepts.slice(0, 3).join(' ')} 它们共同回答一个现场问题：当你看到一个设备、端子、导线颜色或仪表读数时，怎样判断它是否处在正确的工作状态。`,
      `英文术语也要一起记。${primaryTerms} 会在视频、工具说明、设备铭牌、panel schedule 和规范讨论里反复出现。把英文、中文和现场实物连起来，以后读图和听师傅说明会轻松很多。`,
    ],
    concepts: concepts.slice(0, 5).map((item) => [conceptHeading(item), explainConcept(item, terms)]),
    field: [
      `${fieldText} 在住宅现场，这通常会落到插座、开关盒、照明回路、小家电回路、GFCI、断路器和配电盘标签上。先识别 circuit、load、hot、neutral、ground，再决定下一步观察或测量。`,
      '在商业或轻工业现场，同一概念会进入更大的系统：多相供电、马达、控制柜、变压器、断开开关和较高故障能量环境。你不需要一开始就处理所有复杂度，但必须养成按图纸、铭牌、仪表和规范交叉确认的习惯。',
    ],
    mistakes: [
      `只背“${firstConcept}”，却不能说明它在回路里的原因和后果。`,
      `把“${secondConcept}”当成绝对口诀，忽略负载类型、接线方式和保护装置边界。`,
      '只凭导线颜色、设备外观或经验判断，不做断电、验电和回路确认。',
      '把视频演示当作可直接模仿的现场操作，忽略 NEC、local code、PPE 和持证监督。',
    ],
    quiz: [
      ['这一集的核心目标是什么？', goal],
      ['复习本集时应该把概念放回哪三个东西里？', '放回完整回路、现场设备和保护装置边界里理解。'],
      ['遇到真实电路想验证现象时，第一步是什么？', '先停止冒进，断电并验电；带电测试只能在许可范围、合适 PPE 和合适仪表条件下进行。'],
    ],
  };
}

function renderLesson(lesson) {
  return `## 这集讲什么
${lesson.what.join('\n\n')}

## 核心概念详解
${lesson.concepts.map(([name, body]) => `### ${name}\n${body}`).join('\n\n')}

## 现场怎么理解
${lesson.field.join('\n\n')}

## 常见误区
${lesson.mistakes.map((item) => `- ${item}`).join('\n')}`;
}

function renderQuiz(lesson) {
  return `## 练习题 / 小测
${lesson.quiz
  .map(
    ([question, answer], index) => `<details>
<summary>${index + 1}. ${question}</summary>

答：${answer}

</details>`,
  )
  .join('\n\n')}`;
}

function stripOldLesson(content) {
  return content
    .replace(/\n## 练习题 \/ 小测[\s\S]*?(?=\n## 本集 5 个问答|\n## 安全提醒|$)/, '')
    .replace(/\n## 这集讲什么[\s\S]*?(?=\n## 本集 5 个问答)/, '')
    .replace(/\n## 核心概念详解[\s\S]*?(?=\n## 本集 5 个问答)/, '')
    .replace(/\n## 现场怎么理解[\s\S]*?(?=\n## 本集 5 个问答)/, '')
    .replace(/\n## 常见误区[\s\S]*?(?=\n## 本集 5 个问答)/, '');
}

function normalizeHeadings(content) {
  return content.replace('\n## 复习问题', '\n## 学习检查清单');
}

function renderOptimizedElectricityPage(content) {
  const introMatch = content.match(/^---[\s\S]*?^- 本地字幕（transcript）：[^\n]+\n/m);
  if (!introMatch) {
    throw new Error('01 video page does not contain the expected metadata block');
  }

  return `${introMatch[0]}
> 本页依据本地已拉取的 YouTube 字幕、中文笔记和术语表整理。完整字幕保留在本地学习资料目录，可用于个人复习和按时间戳回看。

## Why：为什么要学这一集
这一集是整个电工学习的地基。后面你会学插座、开关、断路器、GFCI、120/240V、三相、马达和仪表测量，但这些内容最后都会回到同一个问题：**电流有没有正确路径，负载有没有正常工作，故障电流会不会走到危险位置**。

如果不懂这一集，新手很容易犯三类错误：看到有电压就以为设备一定正常；把 ground 当成普通回流线；看到 breaker 没跳就以为没有危险。真实现场里，这些误判会影响排故、安全判断和接线理解。

学这一集的目的，不是为了背“电是什么”，而是为了建立一个能反复使用的判断框架。你要能看着一个简单回路说清楚：电源在哪里，负载在哪里，正常电流怎么回去，故障时保护装置为什么可能动作。

## How：怎么理解这一集
用一个固定顺序理解：**找电源 → 找负载 → 找正常回流路径 → 找可能的故障路径 → 看保护装置**。这个顺序比死记 hot、neutral、ground 的定义更可靠，因为它逼你把每根导线和每个设备放回完整电路。

第一步先找电源。电源的作用是建立 voltage，也就是两点之间的电势差。第二步找负载，负载把电能转换成光、热、运动或控制信号。第三步找回流路径，住宅 120V 支路里通常是 neutral 承担正常回流。第四步再看 ground，它不是正常回流线，而是故障保护路径。

最后用故障反推理解：open circuit 是正常路径断了；short circuit 是电流绕过负载走了低阻路径；overload 是正常路径上电流太大；ground fault 是 hot 接触到不该载流的金属外壳、金属盒或 grounding path。

## What：本集核心知识点
### 电路必须有完整路径
电路不是一根线，也不是一个单独设备，而是一条闭合路径。电源、导体、负载、回流路径缺一不可。开关断开、导线断开、neutral 丢失、负载内部断路，都会让正常工作电流无法持续流动。

### 电源建立电压，负载转换能量
电源的作用是维持两点之间的电势差，也就是 voltage。负载不是“电的终点”，而是能量转换的位置：灯把电能变成光和热，马达把电能变成运动，加热器把电能变成热。现场看负载时，要问它需要什么电压、会拉多少电流、由哪个保护装置保护。

### 电压和电流不是一回事
电压是两点之间的差值，是推动条件；电流是电荷沿路径流动的结果。你可能在开关两端量到电压，但因为回路没闭合，灯并不会亮。也可能因为短路形成低阻抗路径，电流突然变得很大，导致断路器动作或产生电弧风险。

### 电阻限制电流，故障会改变路径
电阻或阻抗决定电流有多容易通过。正常负载会限制电流并完成能量转换；短路则绕过负载形成低阻抗路径；过载是在正常路径上拉了太多电流；接地故障是 hot 接触到不该载流的金属外壳、金属盒或 grounding path。

### Ground 不是正常回流线
在美国住宅 120V 支路里，hot 通常把电压送到负载，neutral 承担正常工作电流的回流。ground 的职责是故障保护，正常情况下不应该承载工作电流。把 ground 当 neutral 用，是新手必须避免的危险错误。

## 现场怎么用
看一个插座、开关盒或灯具时，先不要只看颜色。更可靠的思路是按路径问问题：line 从哪里来，load 接到哪里，hot 是否被开关控制，neutral 是否完整，ground 是否只用于故障保护，breaker 或 GFCI 在什么条件下会动作。

住宅现场里，很多问题都能用这一集的模型解释。灯不亮，可能是开关没闭合、hot 没到、neutral 断了、负载坏了或 breaker/GFCI 跳了；取暖器让断路器跳闸，可能是回路过载；hot 碰到金属盒，则可能形成 ground fault。

商业现场更复杂，会出现多相供电、控制变压器、马达控制回路、配电盘和更高故障能量。但入门判断顺序仍然一样：先找电源、负载、正常回流路径、故障路径和保护装置，再决定能不能测量或操作。

## 常见误区
- 以为电从一根线流出去就“用完了”，忘记必须有完整回路。
- 看到有电压就以为负载一定能正常工作，忽略回流路径和连接质量。
- 以为开关关掉就代表盒内所有导体都安全。
- 只凭颜色判断 hot、neutral、ground，不验电、不查图、不追踪路径。
- 把 ground 当作 neutral 使用。
- 把 breaker 没跳当成“没有触电风险”的证明。

## 术语速查
| 英文 | 中文 |
|---|---|
| electricity | 电/电现象 |
| electron | 电子 |
| conductor | 导体 |
| insulator | 绝缘体 |
| circuit | 电路 |
| load | 负载 |
| power source | 电源 |
| closed loop | 闭合回路 |
| voltage | 电压 |
| current | 电流 |
| resistance | 电阻 |
| ground fault | 接地故障 |

## 本集自测题
<details>
<summary>1. 一个简单电路至少需要哪几部分？</summary>

答：需要电源、导体、负载和完整回流路径。缺少任何一部分，正常工作电流都不能持续流动。

</details>

<details>
<summary>2. 为什么“有电压”不等于“负载一定工作”？</summary>

答：电压只是两点之间的差值。负载要工作，还需要完整回路、正确连接、合适负载和足够的电流路径。

</details>

<details>
<summary>3. 短路和正常负载有什么区别？</summary>

答：正常负载会限制电流并转换能量；短路通常绕过负载形成低阻抗路径，让电流快速增大，带来发热、电弧和保护装置动作风险。

</details>

<details>
<summary>4. ground 为什么不能当 neutral 用？</summary>

答：neutral 是正常工作电流回流路径；ground 是故障保护路径。让 ground 承载正常工作电流会让设备外壳、金属盒或接地系统产生危险。

</details>

<details>
<summary>5. 灯不亮时，应该怎样按路径思考？</summary>

答：先看 breaker/GFCI 是否动作，再看开关是否送出 hot，灯具处 hot-to-neutral 是否有电压，neutral 是否完整，最后判断灯泡或灯具本身是否损坏。

</details>

<details>
<summary>6. 真实电路中想验证这一集现象，第一步是什么？</summary>

答：先断电并验电。涉及带电测试、配电箱、240V/三相系统或故障排查时，必须遵守 NEC、local code、PPE 要求和持证人员指导。

</details>

## 学习检查清单
- 我能不能画出一个从 hot 到 load 再回 neutral 的完整路径？
- 我能不能解释 voltage 和 current 的区别？
- 我能不能说出 load 在电路里的作用？
- 我能不能区分 open circuit、short circuit、overload、ground fault？
- 我能不能说明 ground 为什么不是正常回流线？

## 安全提醒
:::warning
本页用于学习电路概念，不能替代 NEC、当地规范、执照培训和现场师傅监督。真实作业前先断电、验电，并确认仪表、PPE 和许可范围。
:::
`;
}

const sourceRoot = path.resolve(rootDir, '..', 'Electrical_Engineering_Basics_学习资料');

function frontMatterAndMeta(content) {
  const introMatch = content.match(/^---[\s\S]*?^- 本地字幕（transcript）：[^\n]+\n/m);
  if (!introMatch) {
    throw new Error('video page does not contain the expected metadata block');
  }
  return introMatch[0].trimEnd();
}

function rawSection(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(`\\n## ${escaped}\\n([\\s\\S]*?)(?=\\n## |$)`));
  return match ? match[1].trim() : '';
}

async function localSourceFor(position) {
  const prefix = `${String(position).padStart(2, '0')}_`;
  const entries = await readdir(sourceRoot, {withFileTypes: true});
  const sourceDir = entries.find((entry) => entry.isDirectory() && entry.name.startsWith(prefix));

  if (!sourceDir) {
    throw new Error(`Missing local YouTube source folder for video ${position}`);
  }

  const dir = path.join(sourceRoot, sourceDir.name);
  const [metadataRaw, notes, vocabulary, transcript] = await Promise.all([
    readFile(path.join(dir, 'metadata.json'), 'utf8'),
    readFile(path.join(dir, 'notes_zh.md'), 'utf8'),
    readFile(path.join(dir, 'vocabulary.md'), 'utf8'),
    readFile(path.join(dir, 'transcript_en_plain.txt'), 'utf8'),
  ]);

  if (transcript.trim().length < 200) {
    throw new Error(`Local transcript for video ${position} is missing or too short`);
  }

  return {
    dir,
    metadata: JSON.parse(metadataRaw),
    notes,
    vocabulary,
    transcript,
  };
}

function termsFromAnyTable(markdown) {
  return markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !line.includes('---') && !/English|英文/u.test(line))
    .map((line) => line.split('|').map((cell) => cell.trim()).filter(Boolean))
    .filter((cells) => cells.length >= 2)
    .map(([english, chinese]) => [english, chinese])
    .slice(0, 8);
}

function transcriptKeywords(terms, transcript) {
  const lowerTranscript = transcript.toLowerCase();
  return terms
    .filter(([english]) => lowerTranscript.includes(english.toLowerCase()))
    .slice(0, 5)
    .map(([english, chinese]) => `${chinese}（${english}）`);
}

function sentencesFromItems(items, fallback) {
  if (items.length === 0) {
    return fallback;
  }
  return items.map((item) => cleanSentence(item)).join('；') + '。';
}

function renderGoldenTerms(terms) {
  if (terms.length === 0) {
    return '| 英文 | 中文 |\n|---|---|\n| circuit | 电路 |\n| load | 负载 |\n| safety | 安全 |';
  }

  return ['| 英文 | 中文 |', '|---|---|', ...terms.map(([english, chinese]) => `| ${english} | ${chinese} |`)].join('\n');
}

function commonMistakes(concepts) {
  const first = concepts[0] ?? '本集核心概念';
  const second = concepts[1] ?? '相关术语';
  return [
    `只记住“${cleanSentence(first)}”，但不能把它放回完整回路、负载和保护装置中解释。`,
    `把“${cleanSentence(second)}”当成孤立定义，忽略现场里还要看铭牌、图纸、导线、端子和仪表读数。`,
    '只凭导线颜色、设备外观或经验判断，不做断电、验电和回路确认。',
    '把视频里的演示直接当成现场操作步骤，忽略 NEC、local code、PPE、许可范围和持证师傅监督。',
  ];
}

function renderSelfTest({goal, concepts, field, terms}) {
  const termAnswer = terms.length
    ? terms.slice(0, 4).map(([english, chinese]) => `${chinese}（${english}）`).join('、')
    : '先回到术语速查表，把英文、中文和现场实物对应起来。';
  const qa = [
    ['这一集最核心的学习目标是什么？', goal || '理解本集主题在电工基础和现场安全中的位置，并能用关键词识别相关设备或图纸。'],
    ['复习本集时，应该先抓哪条主线？', concepts[0] ?? '先抓电源、负载、完整路径、保护装置和安全边界之间的关系。'],
    ['这个概念在美国住宅或商业现场会落到哪里？', field[0] ?? '会落到导线、端子、负载、保护装置、仪表测量和现场安全流程上。'],
    ['本集至少要会认哪些英文术语？', termAnswer],
    ['新手最容易犯的一个错误是什么？', commonMistakes(concepts)[0]],
    ['如果想在真实电路里验证相关现象，第一步是什么？', '先断电并验电；涉及带电测试、配电箱、240V/三相系统或故障排查时，必须确认 PPE、仪表等级、许可范围和持证人员指导。'],
  ];

  return qa
    .map(
      ([question, answer], index) => `<details>
<summary>${index + 1}. ${question}</summary>

答：${answer}

</details>`,
    )
    .join('\n\n');
}

function renderDetails(qa) {
  return qa
    .slice(0, 6)
    .map(
      ([question, answer], index) => `<details>
<summary>${index + 1}. ${question}</summary>

答：${answer}

</details>`,
    )
    .join('\n\n');
}

function renderChecklist(terms) {
  const termNames = terms.slice(0, 3).map(([english, chinese]) => `${chinese}（${english}）`).join('、') || '本集关键词';
  return [
    '- 我能不能用自己的话说出这一集为什么重要？',
    '- 我能不能把核心概念放回电源、负载、回路和保护装置里解释？',
    `- 我能不能认出并解释 ${termNames}？`,
    '- 我能不能说出它在住宅或商业电工现场对应的设备、导线、端子或测量动作？',
    '- 我能不能指出至少一个新手误区，并说明为什么危险或不可靠？',
  ].join('\n');
}

async function renderGoldenCirclePage(content) {
  const position = getPosition(content);

  if (position === 1) {
    await localSourceFor(position);
    return renderOptimizedElectricityPage(content);
  }

  const source = await localSourceFor(position);
  const goal = extractSection(source.notes, '学习目标');
  const concepts = listItems(extractSection(source.notes, '核心知识点')).slice(0, 6);
  const field = listItems(extractSection(source.notes, '美国电工学习重点'));
  const terms = termsFromAnyTable(source.vocabulary).length
    ? termsFromAnyTable(source.vocabulary)
    : termsFromTable(extractSection(source.notes, '术语速查'));
  const title = getTitle(content).replace(/^\d+\.\s*/, '');
  const keywords = transcriptKeywords(terms, source.transcript);
  const relatedFormula = rawSection(content, '相关公式');
  const priorityLesson = priorityLessons.get(position);

  const keywordLine = keywords.length
    ? `本地字幕中可回看这些关键词：${keywords.join('、')}。`
    : '本页已读取本地字幕；术语以本地术语表和中文笔记为准。';
  const conceptParagraphs = priorityLesson
    ? priorityLesson.concepts.map(([name, body]) => `### ${name}\n${body}`).join('\n\n')
    : concepts.length
      ? concepts.map((item) => `### ${conceptHeading(item)}\n${explainConcept(item, terms)}`).join('\n\n')
      : `### 本集核心判断\n${explainConcept(goal || title, terms)}`;
  const fieldText = priorityLesson
    ? priorityLesson.field.join('\n\n')
    : field.length
      ? field.map((item) => `- ${item}`).join('\n')
      : '- 把本集概念和 hot、neutral、ground、breaker、load、meter、图纸和仪表测量联系起来。';
  const formulasBlock = relatedFormula
    ? `\n\n## 相关公式\n${relatedFormula}`
    : '';
  const whyBody = priorityLesson
    ? priorityLesson.what.join('\n\n')
    : `这一集围绕 **${title}** 展开。学习目标是：${goal || '理解本集主题在电工基础、美国住宅电路、现场安全或控制系统中的位置，并能用英文关键词识别相关设备和图纸。'}

它值得学习，不只是因为它是一个单独知识点，而是因为它会影响后面看图、接线、排故、选仪表和判断风险的方式。${sentencesFromItems(field, '在美国电工学习里，它需要和 hot、neutral、ground、breaker、load、meter 等现场对象联系起来。')}

如果只背结论，不理解它为什么成立，到了真实现场就容易把设备外观、导线颜色或单一读数当成答案。课程页的目标是让你即使还没看视频，也能先掌握主线，再回到视频和字幕里补细节。`;
  const mistakes = priorityLesson ? priorityLesson.mistakes : commonMistakes(concepts);
  const selfTest = priorityLesson
    ? renderDetails([
        ...priorityLesson.quiz,
        ['这一集最核心的学习目标是什么？', goal || priorityLesson.what[0]],
        ['这个概念在美国住宅或商业现场会落到哪里？', priorityLesson.field[0]],
        ['如果想在真实电路里验证相关现象，第一步是什么？', '先断电并验电；涉及带电测试、配电箱、240V/三相系统或故障排查时，必须确认 PPE、仪表等级、许可范围和持证人员指导。'],
      ])
    : renderSelfTest({goal, concepts, field, terms});

  return `${frontMatterAndMeta(content)}

> 本页依据本地已拉取的 YouTube 字幕、中文笔记和术语表整理。${keywordLine}

## Why：为什么要学这一集
${whyBody}

## How：怎么理解这一集
用固定顺序读这一集：先看它讨论的对象是什么，再看这个对象连接到哪个电源、负载、导体、端子、保护装置或测量动作，最后再判断它和安全边界有什么关系。

复习时可以按三个问题展开：第一，它解决什么现场问题；第二，它依赖哪些基本概念；第三，它错误理解后会造成什么误判。这样读，比把每个 bullet 当成孤立笔记更接近电工现场的思考方式。

英文术语也要同时掌握。${terms.length ? `本集术语表里的 ${terms.slice(0, 4).map(([english, chinese]) => `${chinese}（${english}）`).join('、')} 会在字幕、图纸、铭牌、仪表和规范讨论里反复出现。` : '把英文、中文和现场实物对应起来，是后续读图和排故的基础。'}

## What：本集核心知识点
${conceptParagraphs}${formulasBlock}

## 现场怎么用
${fieldText}

在住宅现场，先把概念落到插座、开关盒、灯具、GFCI、断路器、配电盘、设备铭牌和仪表测量点上。不要只问“这个词是什么意思”，还要问“它在这个盒子、这个面板或这个负载里对应哪一根线、哪一个端子、哪一个保护动作”。

在商业或轻工业现场，同一知识点通常会进入更大的系统，例如多相供电、马达、控制柜、变压器、断开开关和更高故障能量环境。入门阶段不需要一次吃下所有复杂度，但要养成按图纸、铭牌、仪表和规范交叉确认的习惯。

## 常见误区
${mistakes.map((item) => `- ${item}`).join('\n')}

## 术语速查
${renderGoldenTerms(terms)}

## 本集自测题
${selfTest}

## 学习检查清单
${renderChecklist(terms)}

## 安全提醒
:::warning
本页用于学习视频知识点和电工概念，不能替代 NEC、当地规范、执照培训和现场师傅监督。真实作业前先断电、验电，并确认仪表、PPE 和许可范围；涉及带电测试、配电箱、240V/三相负载和故障排查时，不要独自操作。
:::
`;
}

const files = (await readdir(videosDir)).filter((file) => file.endsWith('.md')).sort();

for (const file of files) {
  const fullPath = path.join(videosDir, file);
  const original = await readFile(fullPath, 'utf8');
  await writeFile(fullPath, await renderGoldenCirclePage(original), 'utf8');
}
