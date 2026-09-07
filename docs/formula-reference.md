---
sidebar_position: 97
---

# 公式速查（Formula Reference）

这页不是为了背公式，而是为了帮你在看视频、做测验和估算负载时快速确认：每个符号代表什么、单位是什么、什么时候能用。

:::danger 安全边界
公式只能帮助理解和估算，不能替代 NEC、当地规范（local code）、设备铭牌、导线载流量表、断路器规格、许可范围或持证师傅判断。
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

## 基础电路

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 欧姆定律：求电压 | `V = I x R` | 已知电流和电阻，求两点之间的电压 |
| 欧姆定律：求电流 | `I = V / R` | 已知电压和电阻，估算电流 |
| 欧姆定律：求电阻 | `R = V / I` | 已知电压和电流，反推电阻 |
| 串联总电阻 | `Rtotal = R1 + R2 + ...` | 电阻首尾相接，电流只有一条路径 |
| 并联总电阻 | `1 / Rtotal = 1 / R1 + 1 / R2 + ...` | 多条支路并在同两点之间 |
| 两个电阻并联 | `Rtotal = (R1 x R2) / (R1 + R2)` | 只有两个并联电阻时更快 |

## 功率与用电量

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 直流或纯阻性负载功率 | `P = V x I` | 已知电压和电流，求瓦数 |
| 用电量 | `kWh = (W / 1000) x hours` | 从设备瓦数和使用时间估算电费 |
| 电费估算 | `cost = kWh x rate` | `rate` 是电价，例如 `$0.20/kWh` |
| 每月用电量 | `monthly kWh = daily kWh x days` | 把每日使用量扩展到月度账单 |

## 交流、单相与三相

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 单相交流实际功率 | `P = V x I x PF` | 有功率因数（power factor）的交流负载 |
| 三相实际功率 | `P = sqrt(3) x VL x IL x PF` | 平衡三相负载的近似功率 |
| 视在功率 | `S = V x I` | 单相系统中估算伏安（VA） |
| 三相视在功率 | `S = sqrt(3) x VL x IL` | 三相系统中估算伏安（VA） |
| 功率因数 | `PF = P / S` | 比较真实做功与系统总负担 |

## 电容入门

| 场景 | 公式 | 什么时候用 |
|---|---|---|
| 并联电容 | `Ctotal = C1 + C2 + ...` | 电容并联，总电容量增加 |
| 串联电容 | `1 / Ctotal = 1 / C1 + 1 / C2 + ...` | 电容串联，总电容量降低 |
| 两个电容串联 | `Ctotal = (C1 x C2) / (C1 + C2)` | 只有两个串联电容时更快 |
| 电容储能 | `E = 1/2 x C x V^2` | 理解为什么断电后的电容仍可能危险 |

## 快速例子

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
- [27. 三相电基础与计算](videos/27-three-phase-electricity-basics-and-calculations-electri.md)
- [33. 电容串并联计算](videos/33-capacitor-calculations-basic-calculations-for-capacitor.md)
