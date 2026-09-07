---
sidebar_position: 1
---

# Low Voltage & Electronics Primer

这部分像 npm 包里的 advanced recipes。它对理解控制板、传感器、智能家居、HVAC 控制模块很有用，但不应该抢在住宅电路安全基础之前。

## 元件角色

| 元件 | 主要作用 |
|---|---|
| diode | 控制电流方向 |
| rectifier | 把 AC 整流成脉动 DC |
| capacitor | 储能、滤波、相位辅助 |
| LED | 发光指示，需要限流 |
| transistor | 电子开关或放大 |
| optocoupler | 光电隔离 |
| potentiometer | 可变电阻或分压 |

:::warning 储能元件
电池和电容都可能在断电后仍有能量。不要把低压等同于无风险。
:::
