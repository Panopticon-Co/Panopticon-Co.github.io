# panopticon-co.github.io

Source for the Panopticon project site: <https://panopticon-co.github.io>.

Plain static HTML, CSS and JavaScript with no build step. GitHub Pages serves the `main` branch root.

- `index.html`: overview
- `architecture.html`: zones, event flow, response actions, lifecycle, Manager API, contracts
- `components.html`: one section per repository, with verification status
- `diagrams.html`: all 22 diagrams from [panopticon-diagrams](https://github.com/Panopticon-Co/panopticon-diagrams)
- `team.html`: contributors and contribution statistics

Diagram PNGs in `assets/diagrams/` are copies of the renders in panopticon-diagrams. When a diagram changes there, copy the new PNG here as well. To preview the site locally, run `python -m http.server` in this folder.
