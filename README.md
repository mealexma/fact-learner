# Fact Learner — five-bird slice

A separate, dependency-free static web app inspired by Interval's single-page structure, dark mobile layout, and versioned browser-local storage. Bird photos are bundled locally. It does not read or modify Interval data.

## Run

From this folder, serve static files with any local HTTP server, for example `npx serve .` then open the URL shown. Node 20 is sufficient; no package install or build step is required. Opening `index.html` directly also works in modern browsers. Data is stored in this browser's `localStorage` under `fact-learner-v1`; it persists across reloads on the same origin and browser profile. That key is distinct from Interval's, including when both apps share a GitHub Pages origin. There is no cross-device sync or backup yet; two devices do not share practice or match progress.

Confirmed use: both people can study the same bundled bird pack on their own devices, then play the spoken Match together on one device. Each browser keeps its own Practice progress and Match state. Editable player names are labels, not accounts. All app assets use relative paths, so the static build is compatible with a GitHub Pages project subpath. No publication or deployment has been made for this slice.

## Flow

Learn lists five species and credits. Practice lets you choose picture-only or an English, Swedish, or pinyin prompt, reveal all names, then mark Again or Got it. Match is a spoken two-player game. Choose the bird being scored, give each language point to its speaker, then use Next turn or Pass. Undo restores the preceding score, turn, or bird selection. End match shows totals. Players decide valid answers and repeats verbally. Match round scoring resets when the bird or turn changes; a language scores once within that round. The species selector is an optional reference and score tracker, not a photo prompt.

## Source inspection and estimate

Interval repository: `https://github.com/mealexma/Interval`, local project path `/home/claude/.paperclip/instances/default/projects/1b1a83a2-a4aa-4753-beab-f405a35f0d27/521ca805-82d8-4d56-b41f-9e5e114ddc9e/Interval`. It is plain HTML, CSS, and JavaScript with no dependency or build step. Interval's data is JSON in browser `localStorage`, not a separate database file. Its README documents serving with `python -m http.server 8000` on localhost; Node's `npx serve .` is equivalent here. Its existing GitHub Actions workflow uploads the repository root to GitHub Pages, and Interval's relative assets support a project subpath. This slice lives only in this separate `fact-learner` folder with a distinct storage key; it does not use Interval's deployment workflow. The original 2–5 focused build day estimate was conservative for this stack: a five-bird slice is about 0.5–1 focused build day plus content checks; expanding to 50 verified photos/names is a separate content task.

## Content

See [credits.html](credits.html) for photo sources and license links. Scientific names are stable internal IDs. Pinyin has tone marks, with no Han characters shown in the app. Great tit uses the species-specific Mandarin name for *Parus major*; Eurasian magpie uses the species-specific name for *Pica pica* because the broader magpie label can include another species.
