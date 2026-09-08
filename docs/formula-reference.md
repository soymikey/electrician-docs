---
sidebar_position: 97
sidebar_label: 电工速查表
---

# 电工速查表（Cheatsheet）

这页不是为了背公式，而是为了帮你在看视频、做测验、估算负载或复习美国住宅电路时快速确认：符号代表什么、公式什么时候能用、常见电路概念怎么区分。

:::danger 安全边界
速查表只能帮助理解和估算，不能替代 NEC、当地规范（local code）、设备铭牌、导线载流量表、断路器规格、许可范围或持证师傅判断。
:::

## 符号与单位

| 符号 | 含义 | 常用单位 |
|---|---|---|
| `V` | 电压（voltage） | 伏特（V） |
| `I` | 电流（current） | 安培（A） |
| `R` | 电阻（resistance） | 欧姆（ohm / Ω） |
| `P` | 功率（power） | 瓦特（W）或千瓦（kW） |
| `E` | 能量（energy） | 千瓦时（kWh） |
| `t` | 时间（time） | 小时（h） |
| `PF` | 功率因数（power factor） | 0 到 1 |
| `VL` | 线电压（line voltage） | 伏特（V） |
| `IL` | 线电流（line current） | 安培（A） |
| `C` | 电容（capacitance） | 法拉（F） |

## 常用公式

### 基础电路

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 欧姆定律：求电压 | `V = I x R` | 已知电流和电阻，求两点之间的电压 |
| 欧姆定律：求电流 | `I = V / R` | 已知电压和电阻，估算电流 |
| 欧姆定律：求电阻 | `R = V / I` | 已知电压和电流，反推电阻 |
| 串联总电阻 | `Rtotal = R1 + R2 + ...` | 电阻首尾相接，电流只有一条路径 |
| 并联总电阻 | `1 / Rtotal = 1 / R1 + 1 / R2 + ...` | 多条支路并在同两点之间 |
| 两个电阻并联 | `Rtotal = (R1 x R2) / (R1 + R2)` | 只有两个并联电阻时更快 |

### 功率与用电量

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 直流或纯阻性负载功率 | `P = V x I` | 已知电压和电流，求瓦数 |
| 用电量 | `kWh = (W / 1000) x hours` | 从设备瓦数和使用时间估算电费 |
| 电费估算 | `cost = kWh x rate` | `rate` 是电价，例如 `$0.20/kWh` |
| 每月用电量 | `monthly kWh = daily kWh x days` | 把每日使用量扩展到月度账单 |

### 交流、单相与三相

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 单相交流实际功率 | `P = V x I x PF` | 有功率因数（power factor）的交流负载 |
| 三相实际功率 | `P = sqrt(3) x VL x IL x PF` | 平衡三相负载的近似功率 |
| 视在功率 | `S = V x I` | 单相系统中估算伏安（VA） |
| 三相视在功率 | `S = sqrt(3) x VL x IL` | 三相系统中估算伏安（VA） |
| 功率因数 | `PF = P / S` | 比较真实做功与系统总负担 |

### 电容入门

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 并联电容 | `Ctotal = C1 + C2 + ...` | 电容并联，总电容量增加 |
| 串联电容 | `1 / Ctotal = 1 / C1 + 1 / C2 + ...` | 电容串联，总电容量降低 |
| 两个电容串联 | `Ctotal = (C1 x C2) / (C1 + C2)` | 只有两个串联电容时更快 |
| 电容储能 | `E = 1/2 x C x V^2` | 理解为什么断电后的电容仍可能危险 |

## 美国住宅电路速查

| 概念 | 快速判断 | 常见误区 |
|---|---|---|
| Hot / Line | 带电导线，提供相对 neutral 或 ground 的电压 | 颜色可以辅助判断，但不能只靠颜色下结论 |
| Neutral | 正常回流路径，和系统接地点绑定 | neutral 不是“安全线”，工作时可能有电流 |
| Ground / EGC | 故障电流路径，用来帮助保护装置动作 | ground 不是正常工作回路 |
| 120V | hot 到 neutral 的典型住宅支路电压 | 不能因为是 120V 就低估触电风险 |
| 240V | 两条相反相位 hot 之间的电压 | 240V 负载不一定需要 neutral |
| Split phase | 美国住宅常见的中心抽头变压器供电方式 | 它不是三相电 |
| Series | 元件首尾相接，电流只有一条路径 | 家用插座通常不是串联供电 |
| Parallel | 多个支路接在同两点之间 | 住宅负载通常并联，所以设备可独立工作 |

## 保护装置速查

| 装置 | 主要保护什么 | 不要误以为 |
|---|---|---|
| Circuit breaker | 过载和短路，重点是保护导线不过热 | 普通断路器不等于人体触电保护 |
| Fuse | 过流时熔断，切断回路 | 换更大额定值不会更安全 |
| GFCI | 检测 hot 与 neutral 电流差，降低接地故障触电风险 | GFCI 不负责防止所有过载或短路 |
| AFCI | 检测可能引发火灾的电弧故障 | AFCI 和 GFCI 保护目标不同 |
| Equipment ground | 提供低阻抗故障路径，帮助 breaker 跳闸 | 没有良好接地时，故障外壳可能保持危险电压 |

## 测量工具速查

| 工具 / 档位 | 用来做什么 | 安全提醒 |
|---|---|---|
| Multimeter voltage | 测两点之间的电压差 | 先确认表笔插孔、档位和量程适合电压测量 |
| Multimeter continuity | 断电后检查导通 | 带电回路不要用 continuity 档 |
| Multimeter resistance | 断电后测电阻 | 回路中其他元件会影响读数 |
| Clamp meter | 不断开导线测电流 | 一次只夹一根载流导线，夹整条电缆常会读到接近 0 |
| Non-contact tester | 快速提示可能有电 | 只能当初筛，不能替代正式验电 |

## 常见判断口诀

- 电压是两点之间的差，不是某根线“自带”的属性。
- 电流必须有完整回路才会持续流动。
- 功率是负载实际消耗能量的速度，单位通常是 W 或 kW。
- kWh 是能量，不是功率；电费通常按 kWh 计。
- 普通 breaker 主要保护导线，不主要保护人。
- GFCI 看 hot 和 neutral 是否“流出去多少、回来多少”。
- 住宅里的 120V/240V split phase 不是三相电。
- 真实施工先看规范、铭牌、导线规格和断路器额定值，再谈估算。

## 快速计算例子

一个 1500W 的电暖器每天用 3 小时：

```txt
kWh = (1500 / 1000) x 3
kWh = 4.5 kWh/day
```

如果电价是 `$0.20/kWh`：

```txt
cost = 4.5 x 0.20
cost = $0.90/day
```

## 相关视频

- [04. 欧姆定律与基础电路理论](videos/04-ohms-law-explained-the-basics-circuit-theory.md)
- [06. 直流串联电路基础](videos/06-dc-series-circuits-explained-the-basics-working-princip.md)
- [07. 直流并联电路基础](videos/07-dc-parallel-circuits-explained-the-basics-how-parallel-.md)
- [19. 千瓦时与电费计算](videos/19-what-is-a-kwh-kilowatt-hour-calculations-energy-bill.md)
- [22. 功率因数基础](videos/22-power-factor-explained-the-basics-what-is-power-factor-.md)
- [24. 120V/240V 与 split phase](videos/24-120v-240v-electricity-explained-split-phase-3-wire-elec.md)
- [25. Hot、Neutral 与 Ground](videos/25-ground-neutral-and-hot-wires-explained-electrical-engin.md)
- [27. 三相电基础与计算](videos/27-three-phase-electricity-basics-and-calculations-electri.md)
- [33. 电容串并联计算](videos/33-capacitor-calculations-basic-calculations-for-capacitor.md)
- [38. 为什么普通断路器不主要保护人](videos/38-why-circuit-breakers-don-t-protect-people-electric-shoc.md)
- [40. 钳形表使用技巧](videos/40-clamp-meter-skills-that-make-you-look-like-a-pro.md)
