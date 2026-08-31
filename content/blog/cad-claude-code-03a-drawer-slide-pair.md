---
title: "A Stop Is a Pair of Faces, Never a Bounding Box"
series: "CAD × Claude Code"
part: "3A"
date: "2026-08-31"
author: "Vincent (Xiaolei) Hu"
description: "A vendor STEP file of a drawer slide arrives as fifteen frozen bodies. Claude rebuilt it into a working pair — five members, four Sliders, eight end-stop mates — and the take that worked was half the length of the take that didn't, because every failure from the first take had become a written rule."
video: "/videos/part3a-drawer-slide-pair.mp4"
---

A drawer slide is a mechanism: five pieces that move against each other and stop where the metal says stop. Every STEP file I have ever downloaded forgets that part. What arrives is fifteen bodies, frozen at full extension, named `Mirror3` and `Boss-Extrude9`, with no idea which of them belong together.

This chapter turns one such file — a McMaster-Carr 15765A28 full-extension slide — into a left-and-right pair that opens, closes, and knows its own travel, entirely through Claude Code. It took two recorded takes. The first ran 38 minutes and was rejected in my review: the model looked right and was wrong by five millimetres per stage. The second, replayed after every failure had been written into the workflow files, ran 16 minutes 26 seconds with zero feature errors, zero mate errors, and two Onshape MCP API calls where the first take needed 33. The video above is the second take.

The rule that separates the two takes fits in one sentence, and it is the title of this article.

## Everything used in this run

| Component | What it is |
|---|---|
| [Claude Code](https://claude.com/claude-code) | The agent driving everything; terminal on the right half of the recording |
| [Claude in Chrome](https://claude.com/chrome) | Browser extension: Onshape REST calls from my logged-in session, plus the few UI-only steps |
| [Onshape](https://www.onshape.com/) (Student) | The CAD system; one document per vendor item |
| [Onshape FeatureScript MCP](https://labs.onshape.com/) | PTC's labs app: author, sandbox-test, and ship FeatureScript. Nothing else — no imports, assemblies, or metadata |
| Vendor model | [McMaster-Carr 15765A28](https://www.mcmaster.com/15765A28/) hold-closed base-mount slide, 660 mm, STEP |
| Workflow recipe | [`sliding_drawer_cabinet_workflow.md`](/files/sliding_drawer_cabinet_workflow.md): the use-case rules and step order this run replayed |
| Skill | `onshape-cad-workflow`: the REST payloads, FeatureScript patterns, and UI pitfalls every run inherits |
| Feature code | `part_3/features/orient-import.fs`, `slide-members.fs`, `slide-connectors.fs`, `slide-stop-connectors.fs` |

The interface-selection rule from [Part 2B](/blog/cad-claude-code-02b-instrument-carrier) still governs: Part Studio geometry goes to FeatureScript through the MCP, document and assembly plumbing goes to REST, and the interface is reserved for what neither can do. In this take that split was four custom features by MCP, everything else by REST, and exactly three UI actions: the Import dialog, Fix, and the Mirror dialog.

## A translated STEP forgets that a slide is a mechanism

The import lands as fifteen loose solids in the vendor's modelling frame, lying on their side, carrying the history of someone else's feature tree as names. Nothing in the file says "these three bodies are the cabinet rail" or "the drawer stops here." That knowledge is geometry, and it has to be recovered from geometry.

Four custom features, written and compile-tested before the recording and delivered as one Feature Studio in a single MCP call, put the mechanism back:

![Orient Import: rotations and a datum translation move the vendor frame onto the working frame](/images/blog/part3a-code-1-orient-import.png)

*Orient Import rotates the model to Z-up with X along the travel and puts the cabinet rail's front mounting slot at the origin. Every number downstream is measured in this frame, which is what makes the rest of the code reusable.*

![Slide Members: seeds, overlap merging, and smallest-containing-box assignment](/images/blog/part3a-code-2-slide-members.png)

*Slide Members turns fifteen anonymous bodies into five closed composite parts using geometry only: long bodies seed members, seeds that overlap 90 percent in X merge (a rail's shell and its liner), and every short body joins the smallest member box that contains it. The members are named by their order across the stack: cabinet rail, cage A, intermediate rail, cage B, drawer rail.*

![Slide Connectors: the axis, mount, and mirror connectors with probe-point owners](/images/blog/part3a-code-3-slide-connectors.png)

*Slide Connectors places eleven mate connectors: six on the sliding axes for the Slider mates, four on the mounting slot rows, one for the pair's mirror plane. Owners are found by a bounding-box probe, never by name — an owner query that resolves to nothing produces a connector that silently cannot be mated.*

The fourth feature is the reason this chapter exists.

## A stop is a pair of touching faces, never a bounding box

My first version of the stop connectors did the obvious thing: it put a connector at each end of every member's bounding box, on the box centre line. It compiled, it ran, the mates solved, and the model was wrong. The drawer over-travelled every stage by about five millimetres, and one stop needed a limit of "−1.41 mm" to solve at all — which should have been the tell, because in this pattern every limit is supposed to be zero.

The review verdict was blunt: the travel limit mates were still wrong, and I should read the reference more carefully. I had built that reference by hand — fourteen mate connectors placed one face at a time, eight Parallel mates — and the connectors do not sit on any bounding box. They sit on the faces that touch: the outer faces of each ball cage's end-stop blocks, the lips on the rails those blocks run into, the stop tab at the front of the drawer rail, the tab at the front of the cabinet rail, the stop body at the back. Some of those faces are five millimetres inside the member's box. The box is not evidence of where the metal meets.

![The hand-built reference pair with its fourteen connectors and eight Parallel stops](/images/blog/part3a-reference-pair.jpg)

*The reference model, built by hand after Take 4. Every connector sits at the centre of a physical stop face. Claude's job was to reproduce this set from geometry — and its first attempt on bounding boxes missed every face by millimetres.*

The corrected feature finds the faces instead of assuming them:

![Stop Connectors: the nearest opposing-face search and the stop schedule](/images/blog/part3a-code-4-stop-connectors.png)

*Stop Connectors. For each pair of members that stop against each other, `bestStop` looks for a face pointing +X on one and a face pointing −X on the other, overlapping in Y and Z, and keeps the nearest pair. That pair is a physical stop. One connector goes on each face centre, owned by the composite; two stops that share a face share a connector. Its fourteen connectors match my hand-placed set to a hundredth of a millimetre.*

The check that this is right is built into the geometry: the STEP is modelled at full extension, so the four extension stops must read exactly zero the moment the mates exist — the cages are physically against their lips. In Take 6 they did: 0, 0, 0, 0. The four closing stops read 373.1, 359.8, 735.0 and 361.2 millimetres, which is how far each member has left to travel. A stop that seems to need any other number has a connector on the wrong face.

<svg viewBox="0 0 640 214" role="img" aria-label="Diagram comparing a connector on a bounding box corner, which over-travels, with a connector on the stop face, which stops where the metal meets" style="width:100%;height:auto;background:#fff;border:1px solid #e4e4e7;border-radius:12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <text x="20" y="30" font-size="14" font-weight="700" fill="#18181b">Where the connector sits decides where the drawer stops</text>
  <text x="20" y="62" font-size="12" font-weight="600" fill="#b91c1c">Take 5 — bounding-box end</text>
  <rect x="230" y="50" width="240" height="26" fill="#f4f4f5" stroke="#d4d4d8"/>
  <rect x="238" y="56" width="10" height="14" fill="#a1a1aa"/>
  <circle cx="230" cy="63" r="5" fill="none" stroke="#b91c1c" stroke-width="2"/>
  <line x1="230" y1="84" x2="248" y2="84" stroke="#b91c1c" stroke-width="1.5"/>
  <text x="252" y="88" font-size="10.5" fill="#b91c1c">box corner is ~5 mm past the stop tab → over-travel</text>
  <text x="20" y="132" font-size="12" font-weight="600" fill="#15803d">Take 6 — stop face</text>
  <rect x="230" y="120" width="240" height="26" fill="#f4f4f5" stroke="#d4d4d8"/>
  <rect x="238" y="126" width="10" height="14" fill="#71717a"/>
  <circle cx="248" cy="133" r="5" fill="none" stroke="#15803d" stroke-width="2"/>
  <line x1="248" y1="154" x2="266" y2="154" stroke="#15803d" stroke-width="1.5"/>
  <text x="270" y="158" font-size="10.5" fill="#15803d">connector on the tab's face → the mate reads 0 when the metal meets</text>
  <text x="20" y="196" font-size="11.5" fill="#71717a">The tab sits inside the member's bounding box. The box end is geometry; the face is the mechanism.</text>
</svg>

*The five-millimetre error in one picture: the drawer rail's stop tab sits inside its bounding box, so a connector on the box corner lets the model travel past the point where the real hardware has already stopped.*

## The travel lives in eight one-sided mates, and every limit is zero

With the connectors on the right faces, the mate structure is almost boring, which is the point. The four Slider mates are pure axes — their own limits stay off. The travel comes from eight Parallel mates, each joining two stop-face connectors with a single one-sided limit: Z minimum, zero. Each one reads as a sentence about the hardware. Cage A front against the cabinet rail. Drawer rail closes against cage B. The number is always zero; the geometry supplies the distances.

| Stop | Value at full extension |
|---|---|
| Cage A front against the cabinet rail | **0** (engaged) |
| Cage B front against the intermediate rail | **0** (engaged) |
| Cage A back against the intermediate rail | **0** (engaged) |
| Cage B back against the drawer rail | **0** (engaged) |
| Intermediate rail closes against the cabinet rail | 373.1 mm to go |
| Drawer rail closes against the intermediate rail | 359.8 mm to go |
| Drawer rail closes against the cabinet rail | 735.0 mm to go |
| Drawer rail closes against cage B | 361.2 mm to go |

Creating these by REST hides one trap that cost the first take dearly: Onshape returns an open limit side as `isNull: false` with a `nullValue` of "No minimum" — and if you POST that same shape back, the open side becomes a closed zero. All six axes pin, and each stop fails with "Mate overdefines the assembly." All twelve mates went red in Take 5 before the diagnosis; the fix is to send every open side as `isNull: true`, on creation and on every later edit, because a suppress or unsuppress round-trips the JSON and re-pins the mate. In Take 6 the stops went in first, then the Sliders, all twelve solved on the first pass, and the pose did not move.

## The proof came from the API refusing a hundredth of a millimetre

Plan A for demonstrating the travel was the interface: right-click a stop, Apply limit position, minimum Z. It had worked the day before. On camera, the submenu refused every click, and the keyboard arrow landed in the viewport and rotated the model instead. Four attempts, then Claude followed the rule it was given — after a few misses, change the approach rather than keep clicking.

Plan B turned out to be the better demonstration. Claude moved the members through the occurrence-transform API in the order the stops allow: intermediate rail, cage B and drawer together by 373.05 mm until the intermediate met the cabinet's back stop, then cage B and drawer by 359.5 mm until the drawer's tab sat 0.3 mm off the intermediate's front end. Two refusals along the way carried the proof. Moving the drawer alone: refused, because a single mated part cannot be moved by itself. Moving the set 359.79 mm against a stop reading 359.79: refused with an error, because it would overshoot the limit by a hundredth of a millimetre. The pair closed at 732.6 mm of drawer travel, a fraction short of the tab — exactly where the physical slide stops — and the same two moves reversed brought back full extension with the same eight stop values.

The pair became a pair in the last minutes: one assembly Mirror feature with the plane picked from the `MC mirror` connector that Slide Connectors had placed at half the pair spacing, so the spacing is a Part Studio parameter rather than a measurement. Onshape derived the mirrored members automatically; a ball cage is symmetric, so it is simply transformed. Metadata and a version closed the take — the McMaster part number, the vendor, the BOM flag that makes a parent assembly count this as one item instead of fifteen bodies, and V1, which is the handle the cabinet chapter will hold.

![The finished pair at full extension with its mirrored twin](/images/blog/part3a-pair-extended.jpg)

*End state of the take: the seed pair and its mirrored twin, 21 connectors visible, twelve mates solved, V1 cut. The cabinet in the video's opening shot is where these go next.*

## The second take was twice as fast because the first take's failures became rules

The honest ledger: Take 5 spent seventeen of its thirty-eight minutes inside two debugging holes. Nine minutes went to a feature that errored through four blind code variants while the same loop ran fine in the evaluator and the sandbox — the actual message, `getProperty: Cannot get properties during feature regeneration`, was sitting in the Feature Studio's notices panel the whole time. Eight more minutes went to the twelve overdefined mates. Both fixes, and the stop-face rule itself, went into the workflow recipe and the skill files the same evening.

Take 6 inherited those files and had nothing left to discover.

| | Take 5 | Take 6 |
|---|---|---|
| On camera | ≈ 38 min | **16 min 26 s** |
| Feature errors | 1, through 4 code variants | 0 |
| Mate errors | 12 | 0 |
| Stop connectors | 10, on box extremes — rejected | **14, on stop faces**, matching the reference to 0.01 mm |
| Onshape MCP API calls | 33 | **2** |
| Corrections on camera | 5 | 1 (a menu, not the model) |

<svg viewBox="0 0 640 168" role="img" aria-label="Bar chart comparing Take 5 at 38 minutes, 17 of them debugging, with Take 6 at 16.5 minutes with no debugging" style="width:100%;height:auto;background:#fff;border:1px solid #e4e4e7;border-radius:12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <text x="20" y="32" font-size="15" font-weight="700" fill="#18181b">Two takes of the same build</text>
  <text x="20" y="66" font-size="12" fill="#3f3f46">Take 5</text>
  <g>
    <rect x="80" y="52" width="295" height="22" fill="#e4e4e7"/>
    <rect x="375" y="52" width="240" height="22" fill="#fca5a5"/>
    <text x="225" y="67" font-size="10.5" fill="#52525b" text-anchor="middle">building · 21 min</text>
    <text x="495" y="67" font-size="10.5" fill="#7f1d1d" text-anchor="middle">debugging what became the rules · 17 min</text>
  </g>
  <text x="20" y="110" font-size="12" fill="#3f3f46">Take 6</text>
  <rect x="80" y="96" width="232" height="22" fill="#f59e0b"/>
  <text x="196" y="111" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">16 min 26 s, one correction</text>
  <text x="20" y="150" font-size="11.5" fill="#71717a">Same STEP file, same goal. The difference is the recipe and skill files Take 6 started from.</text>
</svg>

*Where the 38 minutes went, and what was left of them once the failures had been converted into written rules.*

The comparison is fair in one direction and generous in the other: Take 6 also benefited from code that had already been written, and its one visible failure — the dead submenu — cost two minutes and produced a better proof. But the two debugging holes that dominated Take 5 were not going to be dodged by luck; they were dodged by five sentences now sitting in the skill: read the notices panel before changing code, send open limit sides as `isNull: true` on every write, put stop connectors on faces and never on boxes, create the stops before the Sliders, and read the pose from the assembly definition instead of inferring it.

## The rule survives the run

The thesis of this series is that the durable value of an agentic workflow is the principle it leaves behind, written where the next run inherits it. This chapter's principle is the article's title: a stop is a pair of faces that touch, never a bounding box. It lives in `slide-stop-connectors.fs`, in the recipe's import section, and in the `onshape-cad-workflow` skill's mechanism pattern, alongside the smaller rules the two takes paid for. The next vendor mechanism through this pipeline — a rail, a hinge, a gas strut — inherits all of it without anyone rediscovering the five millimetres.

Part 3B puts three of these pairs into the cabinet the video opens with: an 80/20 frame with equal-height sliding tiers and a 3D printer riding the top drawer.

---

*Drawer slide: [McMaster-Carr 15765A28](https://www.mcmaster.com/15765A28/), hold-closed base-mount, 28". The reference pair used to verify the generated connectors was hand-built in Onshape.*
