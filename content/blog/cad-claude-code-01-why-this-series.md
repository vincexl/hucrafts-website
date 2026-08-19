---
title: "Why I'm Pointing Claude Code at My CAD Workflow"
series: "CAD × Claude Code"
part: 1
date: "2026-08-18"
author: "Vincent (Xiaolei) Hu"
description: "Scripting carried me through years of CAD and PLM work — VBA for batch Pack and Go, Jupyter for a 2,000-file PLM migration. AI-native CAD is the next step in that arc, and this series documents it."
# When the video is up on YouTube, add its ID below (the part after watch?v=)
# and remove the leading "# ":
# youtube: "VIDEO_ID_HERE"
---

Ask a mechanical engineer where the design time actually goes, and the answer usually isn't "modeling." Mine went three places: working out tolerance stackups on complex systems, building reusable designs with configurations, and entering part and assembly metadata so PLM could stream the data to a number of buckets — item categorization, numbering scheme, revision levels, BOM management, and vendor management. The geometry was often the quick part. The slow part was the less visible one: feeding the product lifecycle management system, where engineering, quality, procurement, and external partners all draw on the same source of data.

That's why I take AI-native CAD seriously. The time it stands to shrink isn't the fun, creative modeling time — it's exactly that other pile: the stackup analysis, the configuration plumbing, the metadata entry. And I've spent enough years attacking that pile with scripts to recognize what a coding agent changes. This series documents my real workflows pairing **Claude Code** with the mechanical engineering stack: SolidWorks, Onshape, Arena PLM, and everything that glues them together.

## I "moved mountains" with scripting

Two stories shaped how I work.

**The SolidWorks-to-Onshape migration.** Moving a department-wide CAD library between platforms means every assembly has to travel with its references intact — parts, subassemblies, drawings — or it arrives orphaned. Doing that by hand, one Pack and Go at a time, was never going to happen. So I wrote VBA macros to batch the whole thing: walk the folders, run Pack and Go on each assembly, collect the complete reference set, stage it for import. That batch pipeline migrated over 10 years' worth of CAD data from SolidWorks to Onshape within a year, while I worked concurrently as a Mechanical Engineer and Automation Engineer.

**The Arena PLM migration.** Later I had to bring 2,000+ BOM line items, with their metadata, into Arena PLM. The files carried years of inconsistent naming and half-filled properties. I ended up in a Jupyter notebook with a machine-learning model, sorting hundreds of .csv BOMs and extracting metadata into two spreadsheets (Master Part List and BOM List) clean enough to import — then built the workflows and trained the users on the PLM side.

The pattern held both times: where the manual path was measured in weeks, a script cut it to days. Scripting became the biggest lever in both my CAD work and my admin roles across MCAD and PLM. But writing those scripts was its own skill with its own cost — unlike electro-mechanical products that operates for years, data migration scripting is contingent.

## What a coding agent changes

Claude Code explores the folder structure, finds the naming inconsistencies twenty revisions deep, writes the batch job, runs it, and shows me what didn't fit the pattern. "I should script this" turns from a weekend project into a conversation of communicating requirements. The guiding principles stay mine — numbering schemes, stackup assumptions, what metadata matters, naming conventions— and the administrative efforts move to the machine, which is the right division of labor.

In this framework, one-off scripting becomes a defined and reusable human-in-the-loop workflow. "I should script this procedure" evolves into "I should design an AI native workflow."

## What's coming in the series

That last sentence is why this series exists. Nobody knows yet what an AI-native CAD workflow should look like — not the CAD vendors, not the AI labs, and not me. So I'm going to find out the way engineers do: by experiment. This blog series is my lab notebook. Each entry designs one AI-assisted CAD workflow, runs it against real design work, and reports what held up and what didn't.

Each part is a written walkthrough of one experimental workflow, end to end, with an accompanying video (this intro's video is on the way). At the beginning of each session, I will explain the guiding principles for every critical design choice:

1. **This intro** — where the design time really goes, and the arc from hand-written one-off scripting to an agent.
2. **AI-assisted MCAD modeling: fundamentals** — modeling in Onshape with an agent in the loop, built on the core features: sketches, part studios, assemblies, and mates.
3. **AI-assisted MCAD modeling: advanced** — direct editing, surfacing, frames, sheet metal, and mold making.
4. **GD&T practices with AI** — datum schemes, feature control frames, and tolerance callouts, with AI as the drafting partner.
5. **Versioning** — versions, branches, and release discipline that keep a design history you can trust.
6. **Part and assembly metadata** — the properties that feed everything downstream: item categorization, numbering, revision levels, and BOMs.

The list will evolve as I go. If there's a workflow you want to see automated, [tell me which one](/#contact).

See you in Part 2.
