---
title: "Group C · Electrical room and power monitoring"
slug: /field-trip/government-building/group-c
mdx:
  format: md
---

# Group C · Electrical room and power monitoring

[Back to the visit overview](./index.md)

**Field group C · 6 photos**

## About this group

Study distribution first, then the transformer exterior and plate, and finally metering. This is a learning order; the actual cabinet, transformer and meter connections require a single-line diagram.

The field grouping follows your folders. General internal structures are explicitly distinguished from visible parts; typical operating principles do not establish site wiring or piping.

## Meet the equipment first

For each photo, learn its identity, components and visible features before its individual mechanism. The whole-group operating explanation is at the bottom. This is a study route, not a startup procedure.

| Step | Photo | Learning focus |
|---|---|---|
| 1 | [IMG_9427](#photo-9427) | See the distribution lineup |
| 2 | [IMG_9429](#photo-9429) | Identify branch-circuit sections |
| 3 | [IMG_9431](#photo-9431) | Recognize the transformer enclosure |
| 4 | [IMG_9430](#photo-9430) | Read transformer ratings |
| 5 | [IMG_9432](#photo-9432) | Read phase-to-neutral voltage |
| 6 | [IMG_9433](#photo-9433) | Distinguish ratings, power and energy |

## 1. IMG_9427 · Electrical distribution lineup {#photo-9427}

[![Electrical distribution lineup · IMG_9427](/img/field-trip/government-building/IMG_9427.webp)](/img/field-trip/government-building/IMG_9427.webp)

**What it is**

A row of electrical enclosures distributes power and houses switching and protective equipment.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Lineup enclosures | Visible | House distribution sections. |
| Switching handles | Visible on cabinet fronts | Provide operating interfaces; equipment types need confirmation. |
| Busbars and conductors | Typical distribution internals; not visible | Carry power to circuits. |
| Breaker protection mechanisms | General internal structure; not visible | Detect applicable abnormal conditions and open contacts; actual functions depend on the model. |

**What to look for**

Identify the lineup, branch operating positions and displays before reading close-up labels.

**How it works**

Conductors or busbars carry power to branch circuits. Circuit breakers open when their applicable protection conditions are met; switching devices connect or disconnect circuits. Protection type and rating depend on the installed equipment.

**Still to confirm**

Confirm the distribution hierarchy and individual cabinet duties from a single-line diagram.

## 2. IMG_9429 · Distribution breaker sections {#photo-9429}

[![Distribution breaker sections · IMG_9429](/img/field-trip/government-building/IMG_9429.webp)](/img/field-trip/government-building/IMG_9429.webp)

**What it is**

A close-up shows branch operating handles and circuit labels.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Handles and circuit labels | Visible | Identify circuits and their operating positions. |
| Contacts | General switching internals; not visible | Connect or interrupt a circuit. |
| Trip mechanism | General circuit-breaker internals; not visible | Opens contacts when protection conditions are met; thermal-magnetic versus electronic operation is unconfirmed. |

**What to look for**

Distinguish handle position, equipment rating and measured current; these are different kinds of information.

**How it works**

A common circuit breaker detects overload or short-circuit conditions and releases a mechanism that opens contacts. Detection may be thermal-magnetic or electronic. Normal operating current is determined by the connected load.

Further reading: [IMG_9427 explanation](./group-c.md#photo-9427).

**Still to confirm**

The circuit labels, ratings and actual protection mechanisms need verification.

## 3. IMG_9431 · Dry-type transformer enclosure {#photo-9431}

[![Dry-type transformer enclosure · IMG_9431](/img/field-trip/government-building/IMG_9431.webp)](/img/field-trip/government-building/IMG_9431.webp)

**What it is**

A ventilated enclosure provides an exterior view to accompany the transformer nameplate.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Ventilated enclosure | Visible | Protects internal parts and allows airflow for cooling. |
| Magnetic core | General transformer internal part; not visible | Provides a path for alternating magnetic flux. |
| Windings | General transformer internal parts; not visible | Transfer electrical energy through linked magnetic flux. |
| Conduits and terminals | External conduits visible; terminals hidden | Connect supply and load circuits. |

**What to look for**

Locate the ventilation openings and conduit entries. Core, windings and internal terminals are not visible.

**How it works**

Core and winding losses generate heat. A dry-type transformer does not immerse its windings in insulating liquid. Ventilation permits heat removal by air, but this photograph does not establish whether internal fans are fitted.

Further reading: [IMG_9430 explanation](./group-c.md#photo-9430).

## 4. IMG_9430 · Dry-type transformer nameplate {#photo-9430}

[![Dry-type transformer nameplate · IMG_9430](/img/field-trip/government-building/IMG_9430.webp)](/img/field-trip/government-building/IMG_9430.webp)

**What it is**

The Jefferson Electric plate identifies a 500 kVA, three-phase, 60 Hz dry-type transformer, with Low Voltage: 208 Delta and High Voltage: 480Y/277.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Ratings | Visible on nameplate | Identify capacity, phase count, frequency and voltage information. |
| Diagram and terminal markings | Visible on plate | Describe winding connections; the actual terminals are not shown. |
| Core and windings | Internal equipment; not photographed | Physical transformer components; a nameplate diagram is not a photograph of them. |

**What to look for**

Read kVA as rated apparent power and distinguish winding connection markings from actual site wiring.

**How it works**

Alternating current in one winding creates changing magnetic flux linked with another winding, inducing voltage there. Ideally, the voltage ratio follows the turns ratio. A transformer changes AC voltage level without multiplying energy or independently changing frequency.

Principle references: [Schneider transformer fundamentals](https://www.se.com/us/en/work/featured-articles/what-is-a-transformer/).

**Still to confirm**

Confirm actual energization direction, connections and loads from drawings rather than inferring a site circuit from the plate.

## 5. IMG_9432 · Siemens power meter {#photo-9432}

[![Siemens power meter · IMG_9432](/img/field-trip/government-building/IMG_9432.webp)](/img/field-trip/government-building/IMG_9432.webp)

**What it is**

A Siemens SENTRON PAC3200 measures and displays electrical parameters.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Display and keys | Visible | Select measurement pages and show readings. |
| Voltage sensing and processing circuits | Typical internal electronics; not visible | Acquire signals and calculate displayed quantities. |
| Current transformers | Common external metering accessories; not shown | Supply scaled current signals; they are not components inside the door-mounted display. |

**What to look for**

Read the page heading and units before interpreting values. The meter measures voltage; it does not transform the supply to that value.

**How it works**

The meter samples voltage and typically receives current signals through current transformers, then calculates power and accumulated energy. Vph-n means phase-to-neutral voltage. Approximately 118 V on L1, L2 and L3 is not a line-to-line voltage reading.

Principle references: [Siemens power-meter reference](https://support.industry.siemens.com/cs/attachments/39848442/70373b_76.pdf).

**Still to confirm**

Confirm the metered circuit and any connection to the photographed transformer from drawings.

## 6. IMG_9433 · Schneider metering enclosure {#photo-9433}

[![Schneider metering enclosure · IMG_9433](/img/field-trip/government-building/IMG_9433.webp)](/img/field-trip/government-building/IMG_9433.webp)

**What it is**

A Schneider PowerLogic instrument displays electrical measurements in a dedicated enclosure.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Metering enclosure | Visible | Houses metering equipment and connections. |
| PowerLogic meter | Visible on door | Displays electrical parameters. |
| Measurement wiring and transformers | Typical supporting equipment; interior not photographed | Provide signals; actual configuration requires drawings. |

**What to look for**

The enclosure label reads 208V / 3PH / 4000A and FIFTH AVENUE ARMORY - NYC. The 4000A marking is not the actual current at the moment of the photograph.

**How it works**

Voltage describes electrical potential difference; current describes charge flow; kW describes active power; kWh describes accumulated energy. The meter derives displayed quantities from measurement signals. Equipment ratings must be distinguished from live readings.

Further reading: [IMG_9432 explanation](./group-c.md#photo-9432).

**Still to confirm**

Confirm the official site name and actual metering connections.

## Putting it together: how the group operates

Review the equipment and components above before following these general paths. This is not a verified site schematic or an operating procedure.

### Simplified operating paths

**Distribution concept:** Supply → switching and protection → branch circuits → loads. A circuit may include a transformer where a different voltage level is needed.

**Measurement concept:** Meters receive voltage and current signals → calculate and display power and energy. A meter is not necessarily the next series device through which all load current flows.

The photo sequence does not establish the site’s actual direction of electrical supply.
