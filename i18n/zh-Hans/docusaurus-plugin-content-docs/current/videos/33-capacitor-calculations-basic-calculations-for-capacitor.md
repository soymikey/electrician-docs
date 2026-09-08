---
id: 33-capacitor-calculations-basic-calculations-for-capacitor
title: "33. 电容串并联计算（Capacitor Calculations）"
sidebar_position: 33
---

# 33. 电容串并联计算（Capacitor Calculations）

- 分类：电子与低压补充
- 对美国电工初学者优先级：了解，后面再学
- 视频时长：16:16
- 原视频：[ucEiEic-kZ4](https://www.youtube.com/watch?v=ucEiEic-kZ4&list=PLWv9VM947MKi_7yJ0_FCfzTBXpQU-Qd3K&index=33)
- 本地字幕（transcript）：已保留在本地学习资料目录，可用于个人复习和按时间戳回看。

> 本页依据本地已拉取的 YouTube 字幕、中文笔记和术语表整理。本地字幕中可回看这些关键词：串联电路（series circuit）、并联电路（parallel circuit）。

## Why：为什么要学这一集
这一集围绕 **电容串并联计算（Capacitor Calculations）** 展开。学习目标是：围绕“这类内容偏电子和低压控制”建立判断框架，能说明它和“重点理解元件在电路中承担的功能，而不是一开始追求半导体物理细节”的关系，并把串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）对应到现场设备、导线、端子、图纸或仪表读数。

它值得学习，不只是因为它是一个单独知识点，而是因为它会影响后面看图、接线、排故、选仪表和判断风险的方式。在《电容串并联计算（Capacitor Calculations）》这一页，先把“这类内容偏电子和低压控制”对应到串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）、导通性（continuity）和现场测量点，再判断正常路径、异常路径和保护装置；适合理解控制板、传感器、低压模块和电子元件，不是住宅布线第一优先；注意电容和电池可能储能，断电后仍可能有危险。

如果只背结论，不理解它为什么成立，到了真实现场就容易把设备外观、导线颜色或单一读数当成答案。课程页的目标是让你即使还没看视频，也能先掌握主线，再回到视频和字幕里补细节。

## How：怎么理解这一集
用固定顺序读这一集：先看它讨论的对象是什么，再看这个对象连接到哪个电源、负载、导体、端子、保护装置或测量动作，最后再判断它和安全边界有什么关系。

复习时可以按三个问题展开：第一，它解决什么现场问题；第二，它依赖哪些基本概念；第三，它错误理解后会造成什么误判。这样读，比把每个 bullet 当成孤立笔记更接近电工现场的思考方式。

英文术语也要同时掌握。本集术语表里的 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）、导通性（continuity） 会在字幕、图纸、铭牌、仪表和规范讨论里反复出现。

## What：本集核心知识点
### 这类内容偏电子和低压控制
这类内容偏电子和低压控制。 这类内容要把控制回路和负载回路分开看。把它和 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance） 对上号，先判断线圈由什么电压驱动，再看触点控制哪一路负载，这样排故时不会把控制问题误判成负载问题。

### 元件功能先于材料细节
重点理解元件在电路中承担的功能，而不是一开始追求半导体物理细节。 这条知识点对应的是实际路径。把它和 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance） 对上号，看图或看设备时，先找电源端、负载端、回流路径和可能的断开点，再判断读数是否合理。

### 二极管的单向导通
二极管控制电流方向，电容储能，晶体管可做开关，电位器可调分压。 这里要解决的是读图语言问题，不是现场导线真的换了功能。把它和 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance） 对上号，看教材、二极管箭头、控制图和电子解释时，先确认作者采用哪一种方向模型，再保持同一种方向分析到底。

### 控制板、传感器、驱动器和低压模块会用到这些知识
控制板、传感器、驱动器和低压模块会用到这些知识。 这类内容要把控制回路和负载回路分开看。把它和 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance） 对上号，先判断线圈由什么电压驱动，再看触点控制哪一路负载，这样排故时不会把控制问题误判成负载问题。

### 交流电的周期变化
住宅电工初期可后置，但 HVAC/工业方向会越来越常见。 这里要解决的是读图语言问题，不是现场导线真的换了功能。把它和 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance） 对上号，看教材、二极管箭头、控制图和电子解释时，先确认作者采用哪一种方向模型，再保持同一种方向分析到底。

## 相关公式
- [电容串并联与储能公式](../formula-reference.md#电容入门)

## 现场怎么用
- 在《电容串并联计算（Capacitor Calculations）》这一页，先把“这类内容偏电子和低压控制”对应到串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）、导通性（continuity）和现场测量点，再判断正常路径、异常路径和保护装置。
- 适合理解控制板、传感器、低压模块和电子元件，不是住宅布线第一优先。
- 注意电容和电池可能储能，断电后仍可能有危险。

## 常见误区
- 只记住“这类内容偏电子和低压控制”，但不能把它放回完整回路、负载和保护装置中解释。
- 把“重点理解元件在电路中承担的功能，而不是一开始追求半导体物理细节”当成孤立定义，忽略现场里还要看铭牌、图纸、导线、端子和仪表读数。
- 只凭导线颜色、设备外观或经验判断，不做断电、验电和回路确认。
- 把视频里的演示直接当成现场操作步骤，忽略 NEC、local code、PPE、许可范围和持证师傅监督。

## 术语速查
| 英文 | 中文 |
|---|---|
| series circuit | 串联电路 |
| voltage drop | 电压降 |
| total resistance | 总电阻 |
| continuity | 导通性 |
| parallel circuit | 并联电路 |
| branch current | 支路电流 |
| equivalent resistance | 等效电阻 |
| node | 节点 |

## 本集自测题
<details>
<summary>1. “这类内容偏电子和低压控制”解决什么判断问题？</summary>

答：它帮助你把“这类内容偏电子和低压控制”放回电源、负载、回路、端子、保护装置和安全边界之间判断，而不是只背一句定义。

</details>

<details>
<summary>2. 为什么不能把“重点理解元件在电路中承担的功能，而不是一开始追求半导体物理细节”当成孤立口诀？</summary>

答：因为现场还要同时看回路是否闭合、负载是否匹配、保护装置是否适用，以及接线和测量条件是否成立。

</details>

<details>
<summary>3. 在现场看到 串联电路（series circuit） 时，先查什么？</summary>

答：在《电容串并联计算（Capacitor Calculations）》这一页，先把“这类内容偏电子和低压控制”对应到串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）、导通性（continuity）和现场测量点，再判断正常路径、异常路径和保护装置。

</details>

<details>
<summary>4. 本页术语至少要会对应哪几组？</summary>

答：串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）、导通性（continuity）

</details>

<details>
<summary>5. 围绕“这类内容偏电子和低压控制”最容易犯什么错？</summary>

答：只记住“这类内容偏电子和低压控制”，但不能把它放回完整回路、负载和保护装置中解释。

</details>

<details>
<summary>6. 真实电路里验证前，安全边界是什么？</summary>

答：先断电并验电；涉及带电测试、配电箱、240V/三相系统或故障排查时，必须确认 PPE、仪表等级、许可范围和持证人员指导。

</details>

## 学习检查清单
- 我能不能用自己的话说出这一集为什么重要？
- 我能不能把核心概念放回电源、负载、回路和保护装置里解释？
- 我能不能认出并解释 串联电路（series circuit）、电压降（voltage drop）、总电阻（total resistance）？
- 我能不能说出它在住宅或商业电工现场对应的设备、导线、端子或测量动作？
- 我能不能指出至少一个新手误区，并说明为什么危险或不可靠？

## 安全提醒
:::warning
本页用于学习视频知识点和电工概念，不能替代 NEC、当地规范、执照培训和现场师傅监督。真实作业前先断电、验电，并确认仪表、PPE 和许可范围；涉及带电测试、配电箱、240V/三相负载和故障排查时，不要独自操作。
:::
