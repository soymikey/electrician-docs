---
title: "Group E · Air handling and CHWP pumps"
slug: /field-trip/government-building/group-e
mdx:
  format: md
---

# Group E · Air handling and CHWP pumps

[Back to the visit overview](./index.md)

**Field group E · 4 photos**

## About this group

Locate the AHU air/water interface, then identify filters and coil, circulating pumps and drives. Keep airflow, water flow and heat transfer separate. These pump-to-AHU connections are not yet confirmed.

The field grouping follows your folders. General internal structures are explicitly distinguished from visible parts; typical operating principles do not establish site wiring or piping.

## Meet the equipment first

For each photo, learn its identity, components and visible features before its individual mechanism. The whole-group operating explanation is at the bottom. This is a study route, not a startup procedure.

| Step | Photo | Learning focus |
|---|---|---|
| 1 | [IMG_9440](#photo-9440) | Locate the air/water interface |
| 2 | [IMG_9441](#photo-9441) | Identify filtration and coil heat transfer |
| 3 | [IMG_9442](#photo-9442) | Understand pump-driven circulation |
| 4 | [IMG_9443](#photo-9443) | Understand variable-speed motor control |

## 1. IMG_9440 · AHU piping and controls {#photo-9440}

[![AHU piping and controls · IMG_9440](/img/field-trip/government-building/IMG_9440.webp)](/img/field-trip/government-building/IMG_9440.webp)

**What it is**

An air handler is shown with insulated water-side piping, instruments and an orange actuator.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| AHU casing | Visible | Houses air-handling components. |
| Insulated piping and instruments | Visible external water-side equipment | Carry fluid and indicate measured conditions. |
| Orange actuator | Visible; driven component unconfirmed | Converts a control signal into movement, possibly for a water valve. |
| Coil | Inside unit; not fully shown here | Transfers heat across tubes and fins; actual medium remains unconfirmed. |

**What to look for**

RETURN AIR labels the air path; it does not label the adjacent water pipe as return water.

**How it works**

In a typical water coil, water flows inside tubes while air passes outside the fins; heat crosses the tube wall. A controller may vary a water valve opening to change heat transfer. The orange actuator may operate such a valve, but its actual connection needs tracing.

Principle references: [Trane commercial air handlers](https://www.trane.com/commercial/north-america/canada/en/products-systems/airside-equipment/performance-air-handlers.html).

**Still to confirm**

Confirm coil service, fluid and actuator function, and whether the Group E pumps serve this unit.

## 2. IMG_9441 · Filters and coil {#photo-9441}

[![Filters and coil · IMG_9441](/img/field-trip/government-building/IMG_9441.webp)](/img/field-trip/government-building/IMG_9441.webp)

**What it is**

Pleated filter material and a finned coil perform separate filtering and heat-transfer tasks.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Pleated filter media | Visible toward the front | Capture particles; pleats increase area. |
| Fins and coil | Visible behind filter material | Increase heat-transfer area between air and the internal medium. |
| Sensor and wiring | Partly visible; type unconfirmed | Transmit a detected signal; location alone does not establish what is measured. |

**What to look for**

Distinguish the filter material from metal coil fins and observe the visible sensor wiring.

**How it works**

Filter media capture particles, while pleats increase area. Coil tubes and fins provide heat-transfer area. During cooling, heat moves from warmer air toward a colder medium; moisture can condense if the surface is below the air dew point. During heating, heat transfer reverses.

Principle references: [Trane commercial air handlers](https://www.trane.com/commercial/north-america/canada/en/products-systems/airside-equipment/performance-air-handlers.html).

**Still to confirm**

Confirm airflow direction, filter rating, sensor type and coil medium.

## 3. IMG_9442 · Taco pumping assembly {#photo-9442}

[![Taco pumping assembly · IMG_9442](/img/field-trip/government-building/IMG_9442.webp)](/img/field-trip/government-building/IMG_9442.webp)

**What it is**

Multiple pumps, insulated piping, gauges and local drives show the mechanical side of water circulation.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Pumps and motors | External parts visible; impellers hidden | Drive water circulation. |
| Local drives and controls | Visible | Provide pump operating control. |
| Insulated piping and pressure gauges | Visible external equipment | Carry fluid and indicate pressure; one gauge reading is not pump differential pressure. |

**What to look for**

Locate pump bodies, piping, gauges and local controls, then compare IMG_9443 and IMG_9445.

**How it works**

A pump supplies pressure difference to move fluid through a circuit. The fluid gains or releases heat in heat-transfer equipment and returns. The circulation pump mainly transports fluid rather than creating the system’s cooling capacity.

Principle references: [KSB centrifugal-pump reference](https://configurator.ksbindia.co.in/GeneralUtilities/KSBDocumentation/MISC/Centrifugal_design.pdf).

Further reading: [IMG_9413 explanation](./group-a.md#photo-9413).

**Still to confirm**

Confirm how pumps are combined and whether they directly serve the photographed AHU.

## 4. IMG_9443 · CHWP-3 / CHWP-4 pump controls {#photo-9443}

[![CHWP-3 / CHWP-4 pump controls · IMG_9443](/img/field-trip/government-building/IMG_9443.webp)](/img/field-trip/government-building/IMG_9443.webp)

**What it is**

Taco and Danfoss markings appear on pump-control equipment labeled CHWP-3 and CHWP-4; CHWP commonly means chilled-water pump.

**Main components**

| Component | Location / evidence | Function |
|---|---|---|
| Drive and keypad | Visible Taco and Danfoss markings | Provide drive information and operating interfaces. |
| Rectifier, DC link and inverter | Typical VFD internal functions; not visible | Convert input electrical power into controlled output; the exact layout is unconfirmed. |
| Pump and motor | Associated mechanical equipment partly visible | Convert electrical output into mechanical energy for moving water. |

**What to look for**

Distinguish pump IDs, equipment brand and drive display information.

**How it works**

A variable-frequency drive changes the frequency, with coordinated voltage control, supplied to an AC motor to vary its speed. Pump speed affects flow, pressure and power. A controller can match operation to demand; changing speed does not itself produce cooling.

Principle references: [BPA variable-frequency drives](https://www.bpa.gov/energy-and-services/conservation/agricultural/variable-frequency-drives).

**Still to confirm**

Confirm the building’s CHWP abbreviation, feedback signal and setpoints.

## Putting it together: how the group operates

Review the equipment and components above before following these general paths. This is not a verified site schematic or an operating procedure.

### Simplified operating paths

**Air side — general principle:** A fan moves air through the unit; filters capture particles and coils exchange heat. Confirm airflow before assigning actual component order.

**Water side — typical chilled-water loop:** A cooling source cools circulating water → a pump moves water through a coil → water absorbs heat from air and returns to the cooling source. Actual equipment and pump positions depend on the design.

**Control side — general principle:** Temperature, differential pressure or other demand signals lead a controller to adjust valves or pump speed. The photos do not confirm that these CHWP pumps serve this AHU; the cooling source is not shown in this group.
