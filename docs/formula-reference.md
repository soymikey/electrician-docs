---
sidebar_position: 97
sidebar_label: Cheatsheet
---

# Electrician Cheatsheet

Use this page when you need a fast reminder while watching lessons, taking quizzes, estimating loads, or reviewing US residential circuit concepts.

:::danger Safety boundary
This cheatsheet supports learning and estimation only. It does not replace the NEC, local code, equipment nameplates, ampacity tables, breaker ratings, licensing limits, or qualified judgment.
:::

## Symbols and units

| Symbol | Meaning | Common unit |
|---|---|---|
| `V` | voltage | volt (V) |
| `I` | current | ampere (A) |
| `R` | resistance | ohm (ohm) |
| `P` | power | watt (W) or kilowatt (kW) |
| `E` | energy | kilowatt-hour (kWh) |
| `t` | time | hour (h) |
| `PF` | power factor | 0 to 1 |
| `VL` | line voltage | volt (V) |
| `IL` | line current | ampere (A) |
| `C` | capacitance | farad (F) |

## Common formulas

| Use case | Formula | When to use it |
|---|---|---|
| Ohm's Law, voltage | `V = I x R` | Current and resistance are known |
| Ohm's Law, current | `I = V / R` | Voltage and resistance are known |
| Ohm's Law, resistance | `R = V / I` | Voltage and current are known |
| DC or resistive power | `P = V x I` | Estimating watts from volts and amps |
| Energy use | `kWh = (W / 1000) x hours` | Estimating an energy bill |
| Single-phase real power | `P = V x I x PF` | AC loads with power factor |
| Three-phase real power | `P = sqrt(3) x VL x IL x PF` | Balanced three-phase loads |
| Apparent power | `S = V x I` | Estimating VA in single-phase systems |
| Three-phase apparent power | `S = sqrt(3) x VL x IL` | Estimating VA in three-phase systems |

## US residential reminders

| Concept | Quick check | Common mistake |
|---|---|---|
| Hot / line | Energized conductor supplying voltage relative to neutral or ground | Trusting color alone |
| Neutral | Normal return path bonded at the system grounding point | Treating neutral as harmless |
| Equipment ground | Fault-current path that helps protective devices operate | Using ground as a normal return |
| 120V | Typical hot-to-neutral branch-circuit voltage | Assuming 120V is low risk |
| 240V | Hot-to-hot voltage from opposite legs | Assuming every 240V load needs neutral |
| Split phase | Common US residential service arrangement | Confusing it with three-phase power |

## Protection reminders

| Device | Main job | Do not assume |
|---|---|---|
| Circuit breaker | Protects conductors from overloads and short circuits | That it protects people from every shock hazard |
| Fuse | Opens under overcurrent | That a larger fuse is safer |
| GFCI | Detects imbalance between outgoing and returning current | That it replaces overcurrent protection |
| AFCI | Detects arc-fault patterns | That it is the same as GFCI |
| Equipment grounding conductor | Provides a low-impedance fault path | That it should carry normal load current |

## Fast example

A 1500W heater runs 3 hours per day:

```txt
kWh = (1500 / 1000) x 3
kWh = 4.5 kWh/day
```

At $0.20/kWh:

```txt
cost = 4.5 x 0.20
cost = $0.90/day
```
