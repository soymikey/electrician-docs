---
sidebar_position: 1
---

# 低压与电子元件入门（Low Voltage & Electronics Primer）

这部分像 npm 包里的进阶示例（advanced recipes）。它对理解控制板、传感器、智能家居、HVAC 控制模块很有用，但不应该抢在住宅电路安全基础之前。

## 元件角色

| 元件 | 主要作用 |
|---|---|
| 二极管（diode） | 控制电流方向 |
| 整流器（rectifier） | 把交流电（AC）整流成脉动直流电（DC） |
| 电容（capacitor） | 储能、滤波、相位辅助 |
| 发光二极管（LED） | 发光指示，需要限流 |
| 晶体管（transistor） | 电子开关或放大 |
| 光耦（optocoupler） | 光电隔离 |
| 电位器（potentiometer） | 可变电阻或分压 |

:::warning 储能元件
电池和电容都可能在断电后仍有能量。不要把低压等同于无风险。
:::
