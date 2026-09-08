---
id: 24-120v-240v-electricity-explained-split-phase-3-wire-elec
title: "24. 美国 120V/240V 分相供电（Split Phase）"
sidebar_position: 24
---

# 24. 美国 120V/240V 分相供电（Split Phase）

- 分类：美国住宅电路核心
- 对美国电工初学者优先级：必须掌握
- 视频时长：12:24
- 原视频：[fJeRabV5hNU](https://www.youtube.com/watch?v=fJeRabV5hNU&list=PLWv9VM947MKi_7yJ0_FCfzTBXpQU-Qd3K&index=24)
- 本地字幕（transcript）：已保留在本地学习资料目录，可用于个人复习和按时间戳回看。

> 本页依据本地已拉取的 YouTube 字幕、中文笔记和术语表整理。本地字幕中可回看这些关键词：电（electricity）、电路（circuit）、负载（load）。

## Why：为什么要学这一集
这一集讲美国住宅最核心的供电结构：120/240V split-phase。住宅变压器副边有中心抽头，中心抽头接出 neutral，两端是两个 hot leg。任一 hot 到 neutral 约 120V，两个 hot 之间约 240V。

这套系统的关键不是“家里有两种电压”这么简单，而是两个 hot leg 相对 neutral 的关系。普通插座和照明多用 120V；电炉、干衣机、空调、热水器、EV 充电等大负载常用 240V。某些设备还同时需要 240V 给加热或马达，120V 给控制、灯或电子部分。

学习时要特别注意 neutral 和 equipment grounding conductor 的不同职责。neutral 是正常工作电流路径的一部分；ground 不是正常回流线，而是故障保护路径。分相系统理解错，后面看双极断路器、多线支路和 4 线电器插座都会混乱。

## How：怎么理解这一集
用固定顺序读这一集：先看它讨论的对象是什么，再看这个对象连接到哪个电源、负载、导体、端子、保护装置或测量动作，最后再判断它和安全边界有什么关系。

复习时可以按三个问题展开：第一，它解决什么现场问题；第二，它依赖哪些基本概念；第三，它错误理解后会造成什么误判。这样读，比把每个 bullet 当成孤立笔记更接近电工现场的思考方式。

英文术语也要同时掌握。本集术语表里的 电（electricity）、电路（circuit）、负载（load）、导体（conductor） 会在字幕、图纸、铭牌、仪表和规范讨论里反复出现。

## What：本集核心知识点
### 中心抽头变压器
变压器副边中点作为 neutral，两端作为两个 hot leg。中点到任一端约 120V，端到端约 240V。

### 单极与双极断路器
120V 支路通常由单极断路器保护一个 hot；240V 负载通常用双极断路器同时断开两个 hot leg。

### 中性线电流
120V 负载的正常回流经过 neutral。纯 240V 负载通常不需要 neutral；同时需要 120V 控制的设备则可能需要 neutral。

## 现场怎么用
在住宅配电盘里，左右或上下相邻位置通常落在不同 leg 上，双极断路器跨两个 leg 得到 240V。看干衣机、range、water heater、HVAC disconnect 时，要先确认它是纯 240V 还是 120/240V 组合负载。

商业现场也会有不同供电系统，例如 120/208V 三相或 277/480V。不要把住宅 split-phase 的经验硬套到所有面板上；先读 panel schedule、铭牌和测量点。

## 常见误区
- 以为两个 120V 简单相加，忽略它们是相对中心抽头的两端。
- 把 neutral 和 ground 接法混为一谈。
- 用单极断路器处理需要同时断开两条 hot 的负载。
- 看到 240V 就以为一定没有 neutral，忽略 4 线设备。

## 术语速查
| 英文 | 中文 |
|---|---|
| electricity | 电 |
| circuit | 电路 |
| load | 负载 |
| conductor | 导体 |
| insulator | 绝缘体 |

## 本集自测题
<details>
<summary>1. hot 到 neutral 通常是多少电压？</summary>

答：约 120V，具体读数会随系统和现场条件略有变化。

</details>

<details>
<summary>2. 两个 hot leg 之间通常是多少？</summary>

答：约 240V。

</details>

<details>
<summary>3. 为什么 4 线干衣机插座可能有 neutral？</summary>

答：因为设备可能用 240V 给加热元件，同时用 120V 给控制、灯或马达辅助部分。

</details>

<details>
<summary>4. 请用一句话说出这页训练的现场判断。</summary>

答：围绕“美国住宅常见系统围绕 hot、neutral、ground 和 120/240V 关系展开”建立判断框架，能说明它和“hot-to-neutral 通常约 120V，hot-to-hot 通常约 240V”的关系，并把电（electricity）、电路（circuit）、负载（load）对应到现场设备、导线、端子、图纸或仪表读数。

</details>

<details>
<summary>5. 哪一个误区最需要避免？</summary>

答：以为两个 120V 简单相加，忽略它们是相对中心抽头的两端。

</details>

<details>
<summary>6. 真实验证相关现象前，安全边界是什么？</summary>

答：先断电并验电；涉及带电测试、配电箱、240V/三相系统或故障排查时，必须确认 PPE、仪表等级、许可范围和持证人员指导。

</details>

## 学习检查清单
- 我能不能用自己的话说出这一集为什么重要？
- 我能不能把核心概念放回电源、负载、回路和保护装置里解释？
- 我能不能认出并解释 电（electricity）、电路（circuit）、负载（load）？
- 我能不能说出它在住宅或商业电工现场对应的设备、导线、端子或测量动作？
- 我能不能指出至少一个新手误区，并说明为什么危险或不可靠？

## 安全提醒
:::warning
本页用于学习视频知识点和电工概念，不能替代 NEC、当地规范、执照培训和现场师傅监督。真实作业前先断电、验电，并确认仪表、PPE 和许可范围；涉及带电测试、配电箱、240V/三相负载和故障排查时，不要独自操作。
:::
