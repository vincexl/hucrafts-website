---
title: "The Forty-Five-Minute Mate"
series: "CAD × Claude Code"
part: "2B"
date: "2026-08-23"
author: "Vincent (Xiaolei) Hu"
description: "I folded Part 2A's lessons into the recipe and the corrected build came out right, but it took forty-five minutes. Almost all of it was one assembly mate the agent had to build by hand, so I moved the mate connectors upstream into FeatureScript and the same build dropped to ten."
video: "/videos/part2b-take3-instrument-carrier.mp4"
---

In [Part 2A](/blog/cad-claude-code-02a-vise-mounting-plate) I gave Claude a one-page recipe and let it build an aluminum carrier plate for a vendor table vise, end to end in Onshape. It worked on one pass. But the run broke three of my conventions, so I promised to fold those lessons back into the recipe and try again.

I did. The corrected build came out right. It also took forty-five minutes, and I did not expect that. When I looked at where the time went, almost all of it was one step: a single mate that the agent had to build by clicking through the assembly UI. I tried the cheaper fix first and had Claude bind every Onshape command to a keyboard shortcut, which helped the routine steps but not that mate. So I moved the mate work into a channel the agent can script instead, and the same build dropped to ten and a half minutes with no corrections. This post is about that step, why it was slow, and the two changes that fixed it.

## Part 2A's gaps were conventions I never wrote down

Part 2A did not fail on capability. It failed on three conventions that lived only in my head, because the recipe never stated them.

The plate ended up in the wrong document. Claude built the plate and the assembly inside the imported vendor document, which sits in my third-party models folder. My rule is the opposite: vendor models stay pristine in their own library, and my parts live in a separate document.

The holes were drilled, not tapped. The instrument mounting holes came out as Ø11 clearance holes mirroring the vise, with bolts and nuts underneath. On my bench I tap the plate M10 so the vise bolts down with no loose hardware below.

The plate was parametric but not configurable. Every dimension was programmed into the custom feature, but none of the nine parameters were promoted to document variables. The next engineer would have to read FeatureScript to resize it.

None of these were the agent's mistakes. It made defensible choices where the recipe was silent. So for Part 2B I closed the gaps: the recipe now says custom parts go in a separate document, mounting holes are native metric tapped holes, critical dimensions become Variable features in the feature tree, and "mate" means a real Onshape mate on the joined geometry, not a Group. A Group only freezes relative position; it is not a mate.

## Folding the three fixes in produced a correct build that took forty-five minutes

I replayed the whole recipe from a clean start and recorded it. Call this Take 2. Every gap from 2A was closed. The STEP imported into its own vendor document, the plate landed in a separate carrier document, the four holes were native M10×1.5 tapped holes, seven tree variables drove the geometry, and the vise was joined to the plate with a Fastened hole-to-hole mate. Part numbers and a strength check were in place, with a safety factor around 2.0 on internal-thread pull-out in 6 mm aluminum. The output was correct.

The number that surprised me was the clock: 45 minutes and 37 seconds, and about 111,000 tokens. A correct build, but a slow one, and the slowness was not spread evenly across the run. It was concentrated in one place.

<svg viewBox="0 0 640 132" role="img" aria-label="Bar chart: one mate was 52 percent of Take 2's 45 minute 37 second run" style="width:100%;height:auto;background:#fff;border:1px solid #e4e4e7;border-radius:12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <text x="20" y="34" font-size="15" font-weight="700" fill="#18181b">Where Take 2's 45:37 went</text>
  <clipPath id="a2bar"><rect x="20" y="52" width="600" height="46" rx="10"/></clipPath>
  <g clip-path="url(#a2bar)">
    <rect x="20" y="52" width="288" height="46" fill="#e4e4e7"/>
    <rect x="308" y="52" width="312" height="46" fill="#f59e0b"/>
  </g>
  <text x="164" y="80" font-size="12" fill="#52525b" text-anchor="middle">Everything else · 48%</text>
  <text x="464" y="76" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">The mate, 52%</text>
  <text x="464" y="92" font-size="11" fill="#fff7ed" text-anchor="middle">2 corrections, built by clicking</text>
  <text x="20" y="121" font-size="12" fill="#71717a">One assembly mate was more than half the run.</text>
</svg>

*One assembly mate was 52% of Take 2. That is the beat the rest of this post is about.*

## Half the run was one mate the agent had to build by clicking

To see why, it helps to know how the work splits across tools, because the split is forced, not chosen.

The Onshape MCP server exposes exactly one thing: FeatureScript. It can write and test code that runs inside a Part Studio, so it can make parts, holes, and geometry queries. Everything else lives outside FeatureScript's reach. Imports, documents, versions, tree variables, assembly instances, and metadata go through REST calls from the logged-in browser tab. And mates are assembly features, which FeatureScript cannot create at all, so a mate can only be built by clicking through the assembly UI.

| Task | Channel |
|---|---|
| Write and test FeatureScript, build the plate and its holes | Onshape MCP |
| Import, documents, versions, variables, instances, metadata | Browser REST |
| Mates, Fix, visual checks | Browser UI |

That last row is the expensive one. In Take 2 the hole-to-hole mate ran to 52 percent of the take, and it was slow for reasons that have nothing to do with CAD reasoning:

- The mate had to be built by hand in the assembly. The agent had to hide and show parts, find a bottom view, and pick the right hole edge by pixel, with the two parts overlapping in the same view.
- It cost two corrections on camera. The first mate connector landed on a hole that another body was covering, so it had to be redone. Then the offset sign was backwards: +16 mm sank the vise into the plate, and it took a second attempt at −16 to seat it.
- Click targeting is fragile. Coordinates go stale, one toolbar button is mislabeled under the hood, and open dialogs cover the tree rows you need to click.

So the bottleneck was not the agent thinking about geometry. The agent did that part quickly. The bottleneck was doing an invisible, fiddly UI task by remote control, one click at a time.

## Binding every Onshape shortcut helped the routine steps, but not the expensive one

Before I changed the mate's structure, I tried the cheaper fix. A lot of Take 2's overhead was the agent pointing at the screen. When the recorded window was a different size than the one the skill's coordinates were measured in, every click target had to be re-derived from a fresh screenshot. Unlabeled toolbar icons had to be identified by hovering and reading the tooltip. And a screenshot went out before almost every click just to find the target. A keyboard shortcut sidesteps all three: the key fires the command no matter the window size, it needs no tooltip check, and it needs no screenshot to locate. So I had Claude set up Onshape's shortcuts and rewrite the workflow to press keys before it clicks.

Onshape's shortcut map is per-account and lives on the settings page, so Claude configured it through the browser. It went in two passes: a curated set of 36 mnemonic bindings for the tools this work actually uses, then a full-coverage pass that assigned the remaining commands, reaching every command in all six tabs, 259 in total, with no conflicts.

<video controls preload="metadata" style="width:100%;border-radius:8px" src="/videos/part2b-keyboard-shortcuts.mp4"></video>

*Claude assigning Onshape keyboard shortcuts through the settings page. The map is per-account, so it has to be read and written live.*

In Take 3 the routine steps did get leaner. Group is `shift+g`, the mate dialog opens with `m`, the bottom view is `shift+6`, and expanding an instance to its named connector is `alt+]`, each printed in the terminal first so the otherwise invisible keypress shows up on the recording. The part of the run that was not the mate dropped from a bit over twenty minutes to about nine.

But I cannot hand all of that to the shortcuts, and this is the part I want to be fair about. Two other things changed in the same take: the click coordinates were correct this time, and the agent took far fewer screenshots. The beats log credits those two as the larger share of the routine overhead, so the keys were one contributor among three, not the whole win. And the shortcuts could not touch the mate itself. That beat was slow because of geometric work, picking an obscured hole and getting an offset sign right, and a shortcut only speeds up issuing a command, not deciding where to click. Binding all 259 commands was thorough, but this workflow presses about twenty of them. Full coverage was tidy, not the lever.

The mate needed a different kind of change.

## Moving the mate connectors into FeatureScript turned the forty-five-minute mate into one dialog

The idea for the fix is simple. A Fastened mate needs two mate connectors, one on each part. Take 2 built both of those connectors inside the assembly, by hand, which is where all the hiding, hunting, and offset-solving happened. But a mate connector is just a coordinate frame on a body, and FeatureScript can place one with `opMateConnector`. So I moved both connectors upstream into the Part Studios.

The vise gets its connector from a small feature that calls `opMateConnector` on the base casting at the mounting hole. The plate gets its connector from the same custom feature that already builds the plate, at the same hole, on an identical frame: origin at the hole center, Z up, X along +X. Because both frames are identical, the two parts already coincide the moment they are inserted into the assembly. There is no offset to solve, no flip to check, and no bottom-view hunt. The entire assembly step becomes one Mate dialog plus a Fix.

I recorded that version too. Take 3 is the video at the top of this post.

<svg viewBox="0 0 640 322" role="img" aria-label="Flowchart comparing the Take 2 mate pipeline built in the assembly against the Take 3 pipeline with connectors authored in the Part Studios" style="width:100%;height:auto;background:#fff;border:1px solid #e4e4e7;border-radius:12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <defs><marker id="arw" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto"><path d="M1,1 L8,4.5 L1,8 Z" fill="#a1a1aa"/></marker></defs>
  <text x="16" y="30" font-size="12.5" font-weight="700" fill="#18181b">Take 2 · built in the assembly</text>
  <g fill="#3f3f46" font-size="12">
    <rect x="16" y="44" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="63">Insert both parts</text>
    <rect x="16" y="82" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="101">Hide the instrument</text>
    <rect x="16" y="120" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="139">Hunt for a bottom view</text>
    <rect x="16" y="158" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="177">Pick the hole edge by pixel</text>
    <rect x="16" y="196" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="215">Enter the offset, get the sign right</text>
    <rect x="16" y="234" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="253">Check the flip</text>
    <rect x="16" y="272" width="260" height="30" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="28" y="291">Fasten, then Fix</text>
  </g>
  <g stroke="#d4d4d8" stroke-width="1.5"><line x1="146" y1="74" x2="146" y2="82"/><line x1="146" y1="112" x2="146" y2="120"/><line x1="146" y1="150" x2="146" y2="158"/><line x1="146" y1="188" x2="146" y2="196"/><line x1="146" y1="226" x2="146" y2="234"/><line x1="146" y1="264" x2="146" y2="272"/></g>
  <g font-size="10.5" font-weight="700" fill="#b91c1c"><text x="284" y="177">↺ redo</text><text x="284" y="215">↺ redo</text></g>
  <text x="328" y="30" font-size="12.5" font-weight="700" fill="#18181b">Take 3 · authored upstream</text>
  <rect x="328" y="44" width="296" height="118" rx="10" fill="#fffbeb" stroke="#f59e0b"/>
  <text x="340" y="66" font-size="11" font-weight="600" fill="#b45309">In the Part Studios · FeatureScript</text>
  <rect x="340" y="76" width="272" height="28" rx="6" fill="#ffffff" stroke="#f7cf8f"/><text x="352" y="94" font-size="11.5" fill="#7c2d12">opMateConnector on the vise</text>
  <rect x="340" y="108" width="272" height="28" rx="6" fill="#ffffff" stroke="#f7cf8f"/><text x="352" y="126" font-size="11.5" fill="#7c2d12">opMateConnector in the plate feature</text>
  <text x="340" y="154" font-size="10.5" fill="#92400e">Identical frame, so the parts coincide on insert.</text>
  <line x1="476" y1="162" x2="476" y2="184" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arw)"/>
  <rect x="328" y="188" width="296" height="118" rx="10" fill="#ffffff" stroke="#d4d4d8"/>
  <text x="340" y="209" font-size="11" font-weight="600" fill="#52525b">In the assembly</text>
  <g fill="#3f3f46" font-size="11.5">
    <rect x="340" y="216" width="272" height="26" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="352" y="233">Insert parts, already aligned</text>
    <rect x="340" y="246" width="272" height="26" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="352" y="263">m → Mate, pick two connectors</text>
    <rect x="340" y="276" width="272" height="26" rx="6" fill="#f4f4f5" stroke="#d4d4d8"/><text x="352" y="293">Fix the plate</text>
  </g>
</svg>

*Take 2 does all the connector work in the assembly, with two redos. Take 3 authors both connectors in the Part Studios on one shared frame, so the assembly shrinks to insert, mate, fix.*

The assembly stops being the place where a hard geometric decision gets made. Whatever the parts need to line up gets decided in FeatureScript, where it can be tested before it ships, and the assembly just consumes the result. The mate's UI surface shrinks from "build two connectors and solve the offsets" down to "pick two named connectors," and the only assembly-UI actions left are Group, Fix, and one Mate.

One honest caveat: creating the mate itself through REST is still untested. The likely shape is a `BTMMate-64` feature with a `mateConnectorsQuery` over the two connectors, and if it works the mate leaves the UI entirely. Until I have tried it on a scratch assembly, Mate and Fix stay as the one remaining UI step.

I also hit one real bug while wiring the connector feature through REST. Inserting a custom feature with an empty `parameters` array does not apply the feature's default values, so the length preconditions fail and the feature lands in an error state with no message. The fix is to pass every parameter explicitly in the insert. It cost one failed insert before I found it, and it is now written down in the skill.

## The fix was structural, not a smarter agent

Here are the three runs side by side. Part 2A was never instrumented for time or tokens, so those cells are honest blanks; 2A measured human interventions, not minutes.

| Metric | Part 2A | Take 2 (2B) | Take 3 (2B) |
|---|---|---|---|
| Human interventions after the STEP handoff | 0 | 0 | 0 |
| Wall clock, recorded | not instrumented | 45:37 | **10:32** |
| Tokens | not instrumented | ~111 K | **~64 K** |
| Mate share of the take | n/a | 52 % | **9 %** |
| On-camera mate corrections | n/a | 2 | **0** |
| Custom design document | inside vendor doc | separate doc | separate doc |
| Instrument mounting holes | Ø11 drilled | native M10 tapped | native M10 tapped |
| Configurability | 9 params, no variables | 7 tree variables | 7 tree variables |
| Joint | assembly mate, at the origin | Fastened, hole-to-hole (UI-built connectors) | Fastened, hole-to-hole (**FeatureScript connectors**) |
| Assembly-UI actions | n/a | Group, Fix, connectors, offset, sign, flip, Fasten | **Group, Fix, one Mate** |

Going from 2A to 2B closed the correctness gaps the recipe was missing: the right document, tapped holes, real variables, a real mate. Going from Take 2 to Take 3 closed the efficiency gap, and that one was not a smarter agent solving the mate faster. It deleted the expensive step by moving it.

## Tuning Claude for CAD is a local optimization: send each step to its strongest channel

Neither change made the model smarter. Both took the slowest step in the run and moved it to the channel where Claude Code is strongest. That is the whole tuning loop: record the run, find the step that dominates it, ask which channel suits that step, move it there, and measure again. Local optimization, one bottleneck at a time.

The rule that falls out of it is a short decision tree.

<svg viewBox="0 0 640 288" role="img" aria-label="Decision tree: if a step can be a part feature, author it in FeatureScript through the MCP; else if an API endpoint exists use REST; else it is an assembly feature, so drive the UI by keyboard shortcut" style="width:100%;height:auto;background:#fff;border:1px solid #e4e4e7;border-radius:12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <defs><marker id="dtarw" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M1,1 L7,4 L1,7 Z" fill="#a1a1aa"/></marker></defs>
  <rect x="16" y="30" width="250" height="52" rx="8" fill="#ffffff" stroke="#a1a1aa"/>
  <text x="30" y="54" font-size="12.5" font-weight="600" fill="#18181b">Can the step be a part feature?</text>
  <text x="30" y="71" font-size="11" fill="#71717a">geometry that lives in a Part Studio</text>
  <rect x="330" y="28" width="294" height="56" rx="8" fill="#fffbeb" stroke="#f59e0b"/>
  <text x="344" y="50" font-size="12.5" font-weight="700" fill="#b45309">FeatureScript, through the MCP</text>
  <text x="344" y="68" font-size="11" fill="#7c2d12">Write it, test it in a sandbox, then ship it.</text>
  <line x1="266" y1="55" x2="326" y2="55" stroke="#a1a1aa" stroke-width="2" marker-end="url(#dtarw)"/>
  <text x="288" y="48" font-size="10" font-weight="700" fill="#16a34a">yes</text>
  <line x1="141" y1="82" x2="141" y2="120" stroke="#a1a1aa" stroke-width="2" marker-end="url(#dtarw)"/>
  <text x="148" y="105" font-size="10" font-weight="700" fill="#b91c1c">no</text>
  <rect x="16" y="122" width="250" height="52" rx="8" fill="#ffffff" stroke="#a1a1aa"/>
  <text x="30" y="146" font-size="12.5" font-weight="600" fill="#18181b">Is there an API endpoint for it?</text>
  <text x="30" y="163" font-size="11" fill="#71717a">documents, versions, variables, metadata</text>
  <rect x="330" y="124" width="294" height="48" rx="8" fill="#f4f4f5" stroke="#d4d4d8"/>
  <text x="344" y="145" font-size="12" font-weight="600" fill="#3f3f46">REST, from the browser tab</text>
  <text x="344" y="162" font-size="10.5" fill="#71717a">no FeatureScript for these, but an API exists</text>
  <line x1="266" y1="148" x2="326" y2="148" stroke="#a1a1aa" stroke-width="2" marker-end="url(#dtarw)"/>
  <text x="288" y="141" font-size="10" font-weight="700" fill="#16a34a">yes</text>
  <line x1="141" y1="174" x2="141" y2="212" stroke="#a1a1aa" stroke-width="2" marker-end="url(#dtarw)"/>
  <text x="148" y="197" font-size="10" font-weight="700" fill="#b91c1c">no</text>
  <rect x="16" y="214" width="608" height="60" rx="10" fill="#fffbeb" stroke="#f59e0b"/>
  <text x="32" y="238" font-size="12.5" font-weight="700" fill="#b45309">Assembly feature, like a mate: drive the UI</text>
  <text x="32" y="258" font-size="11.5" fill="#7c2d12">Press the keyboard shortcut. Do not read the screen and click like a human.</text>
</svg>

*Where each step goes: part geometry to FeatureScript, documents to REST, and the assembly features that are left to the keyboard rather than the mouse.*

Part features are Claude Code's best game. Geometry that can live in a Part Studio, the plate, the tapped holes, both mate connectors, gets authored in FeatureScript through the MCP, where the agent writes the code, tests it in a sandbox, and only then ships it. Documents, versions, variables, and metadata have no FeatureScript, so they go through REST calls from the browser tab. What is left is the assembly features, and a mate is the clearest case: FeatureScript cannot create one, so the agent has to drive the UI. The move there is not to make it click more like a human. It is to press the key. A shortcut fires the command no matter the window size and needs no screenshot to locate, so the agent stops reading the screen the way a person does and just issues the command.

Both moves are now written into the two files the next carrier starts from, so the tuning carries forward instead of living in one good run:

| In the workflow | Before (Take 2) | After (Take 3) |
|---|---|---|
| Mate connectors | picked on holes in the assembly | `opMateConnector` in the Part Studios (recipe §3.1.5, §3.4.2) |
| The mate | hide/show, bottom-view hunt, offset sign, flip | `alt+]`, `m → Mate`, two named connectors (§3.5.2) |
| UI steps in the skill | click coordinates for a fixed window | keyboard shortcuts first, a verified click only as fallback |
| Finding a hidden tool | search-tools route (`alt+c`) | the direct shortcut |

The one step still in the UI is the mate itself. The open experiment is to build it through REST, over the connectors' deterministic IDs, and get it out of the UI too. If that lands, the assembly is fully scripted and the UI is only there to watch.

---

*Table vise CAD model: [Precision Bench Vise Assembly](https://grabcad.com/library/precision-bench-vise-assembly-1) via the GrabCAD Community Library.*
