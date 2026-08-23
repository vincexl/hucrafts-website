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

I did. The corrected build came out right. It also took forty-five minutes, and I did not expect that. When I looked at where the time went, almost all of it was one step: a single mate that the agent had to build by clicking through the assembly UI. So I moved that work into a channel the agent can script, and the same build dropped to ten and a half minutes with no corrections. This post is about that step, why it was slow, and the structural change that fixed it.

## Part 2A's gaps were conventions I never wrote down

Part 2A did not fail on capability. It failed on three conventions that lived only in my head, because the recipe never stated them.

The plate ended up in the wrong document. Claude built the plate and the assembly inside the imported vendor document, which sits in my third-party models folder. My rule is the opposite: vendor models stay pristine in their own library, and my parts live in a separate document.

The holes were drilled, not tapped. The instrument mounting holes came out as Ø11 clearance holes mirroring the vise, with bolts and nuts underneath. On my bench I tap the plate M10 so the vise bolts down with no loose hardware below.

The plate was parametric but not configurable. Every dimension was programmed into the custom feature, but none of the nine parameters were promoted to document variables. The next engineer would have to read FeatureScript to resize it.

None of these were the agent's mistakes. It made defensible choices where the recipe was silent. So for Part 2B I closed the gaps: the recipe now says custom parts go in a separate document, mounting holes are native metric tapped holes, critical dimensions become Variable features in the feature tree, and "mate" means a real Onshape mate on the joined geometry, not a Group. A Group only freezes relative position; it is not a mate.

## Folding the three fixes in produced a correct build that took forty-five minutes

I replayed the whole recipe from a clean start and recorded it. Call this Take 2. Every gap from 2A was closed. The STEP imported into its own vendor document, the plate landed in a separate carrier document, the four holes were native M10×1.5 tapped holes, seven tree variables drove the geometry, and the vise was joined to the plate with a Fastened hole-to-hole mate. Part numbers and a strength check were in place, with a safety factor around 2.0 on internal-thread pull-out in 6 mm aluminum. The output was correct.

The number that surprised me was the clock: 45 minutes and 37 seconds, and about 111,000 tokens. A correct build, but a slow one, and the slowness was not spread evenly across the run. It was concentrated in one place.

![Take 2: the table vise fastened to its carrier plate. Correct, but the mate that seats it took most of the run.](/images/blog/part2b-final-assembly-take2.jpg)

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

## Moving the mate connectors into FeatureScript turned the forty-five-minute mate into one dialog

The idea for the fix is simple. A Fastened mate needs two mate connectors, one on each part. Take 2 built both of those connectors inside the assembly, by hand, which is where all the hiding, hunting, and offset-solving happened. But a mate connector is just a coordinate frame on a body, and FeatureScript can place one with `opMateConnector`. So I moved both connectors upstream into the Part Studios.

The vise gets its connector from a small feature that calls `opMateConnector` on the base casting at the mounting hole. The plate gets its connector from the same custom feature that already builds the plate, at the same hole, on an identical frame: origin at the hole center, Z up, X along +X. Because both frames are identical, the two parts already coincide the moment they are inserted into the assembly. There is no offset to solve, no flip to check, and no bottom-view hunt. The entire assembly step becomes one Mate dialog plus a Fix.

I recorded that version too. Take 3 is the video at the top of this post.

![Take 3: same assembly, same result. With both connectors built in FeatureScript on a shared frame, the mate is one dialog.](/images/blog/part2b-final-assembly-take3.jpg)

The improvement came in three places, and it is worth separating them.

The skills. The proven REST payloads, the FeatureScript-connector pattern, and a keyboard-first rule (`shift+g` for Group, `m` for Mate, printed in the terminal so a keypress is visible on the recording) now live in a reusable `onshape-cad-workflow` skill instead of only in the recipe. A second `demo-recording` skill handles pacing and keeps a beats log. This is the thesis of the series again: the durable value is the codified principle, and now the principles live in skills, not just in one document.

The workflow. The connectors move upstream into the Part Studios. The assembly stops being the place where a hard geometric decision gets made. Whatever the parts need to line up gets decided in FeatureScript, where it can be tested before it ships, and the assembly just consumes the result.

The tool split. The mate's UI surface shrinks from "build two connectors and solve the offsets" down to "pick two named connectors." The only assembly-UI actions left are Group, Fix, and one Mate.

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

The table has two halves. Going from 2A to 2B closed the correctness gaps that the recipe was missing: right document, tapped holes, real variables, real mate. Going from Take 2 to Take 3 closed the efficiency gap, and that one was not a smarter agent solving the mate faster. It was a structural move that deleted the expensive step. The connectors went upstream, the parts arrived already aligned, and the four-minute clicking sequence collapsed into one dialog.

## When an agent is slow at a GUI, move the work into a channel it can script

The lesson I am taking from Take 3 is about where to put the work, not how to make the agent click faster. When an agent is slow and error-prone at a graphical task, the reflex is to teach it to drive the UI better: steadier clicks, better view control, a smarter picking routine. That is optimizing the wrong thing. The mate was slow because it was a hand operation in a channel with no test loop and no undo worth trusting. Moving the decision into FeatureScript, where geometry is authored and tested instead of clicked, is what removed the cost.

The principle that did the work here was "author the geometry, not the gestures," and it turned a forty-five-minute mate into a one-minute one. Going forward, the open experiment is to build the mate itself through REST and get the last manual step out of the loop. If that lands, the whole assembly is scripted, and the UI is only there to watch.

---

*Table vise CAD model: [Precision Bench Vise Assembly](https://grabcad.com/library/precision-bench-vise-assembly-1) via the GrabCAD Community Library.*
