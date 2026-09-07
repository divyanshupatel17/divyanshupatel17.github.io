# Issues & Lessons

Reusable bug patterns — one closed, reusable lesson per row. Skip one-off typos.

| # | Date | Pattern | Fix |
|---|---|---|---|
| 1 | 2026-09-07 | A raw `.glb` export can be 40 times larger than needed for the web | Run `npx @gltf-transform/cli optimize <in>.glb <out>.glb --compress draco --texture-compress webp` before adding a model to `public/` |
| 2 | 2026-09-07 | `transform: scaleY()` does not grow the element's layout box, so scaled text gets clipped by an ancestor's `overflow-hidden` even though the box itself fits | Size the clipping container for the scaled height, and cap the font size against that height (`min(22vw, 34vh)`), not the viewport width alone |
| 3 | 2026-09-07 | Fitting a 3D sphere to the canvas width while offsetting it by a fraction of the canvas height makes the visible cap grow as the panel gets squarer, so a narrow viewport shows the whole ball instead of a rising arc | Measure the cap depth off the sphere's own radius, not the panel height, so the arc is identical at every aspect ratio |
