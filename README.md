# Fact Learner — Birds and Kapitelord 1–4

A separate, dependency-free static web app inspired by Interval's single-page structure and browser-local storage. Bird photos and Spanish vocabulary illustrations are bundled locally. It does not read or modify Interval data.

## Run

From this folder, serve static files with any local HTTP server, for example `npx serve .` then open the URL shown. Node 20 is sufficient; no package install or build step is required. Opening `index.html` directly also works in modern browsers. Data is stored in this browser's `localStorage` under `fact-learner-v1`; it persists across reloads on the same origin and browser profile. That key is distinct from Interval's, including when both apps share a GitHub Pages origin. There is no cross-device sync or backup yet; two devices do not share practice or match progress.

Confirmed use: both people can study the same bundled packs on their own devices, then play a spoken Match together on one device. Each browser keeps its own Practice progress and Match state, now separately for each topic. Existing bird progress from the first version is retained. Editable player names are labels, not accounts. All app assets use relative paths, so the static build is compatible with a GitHub Pages project subpath. Live app: https://mealexma.github.io/fact-learner/ . Source repository: https://github.com/mealexma/fact-learner .

## Flow

The Topics home screen lists Birds and Kapitelord 1–4. Open a topic first, then choose Learn, Practice, or Match. Practice fills the screen and keeps answers hidden until Reveal. Birds supports picture-only and language prompts; Spanish uses Spanish or Swedish written prompts because several words share contextual illustrations. Again/Got it persists separately by topic. Match keeps answers verbal: Birds shows a photo and scores up to three language points per round; Spanish shows a Swedish prompt and scores one spoken Spanish answer. Points go to the speaker, including partner bonuses. Next turn or Pass advances the item and alternates naming turns; Undo restores the previous score, turn, and item. End match shows totals. Players judge correctness and repeats verbally.

## Source inspection and estimate

Interval repository: `https://github.com/mealexma/Interval`, local project path `/home/claude/.paperclip/instances/default/projects/1b1a83a2-a4aa-4753-beab-f405a35f0d27/521ca805-82d8-4d56-b41f-9e5e114ddc9e/Interval`. It is plain HTML, CSS, and JavaScript with no dependency or build step. Interval's data is JSON in browser `localStorage`, not a separate database file. Its README documents serving with `python -m http.server 8000` on localhost; Node's `npx serve .` is equivalent here. Its existing GitHub Actions workflow uploads the repository root to GitHub Pages, and Interval's relative assets support a project subpath. This slice lives only in this separate `fact-learner` folder with a distinct storage key; it does not use Interval's deployment workflow. The original 2–5 focused build day estimate was conservative for this stack: a five-bird slice is about 0.5–1 focused build day plus content checks; expanding to 50 verified photos/names is a separate content task.

## Content

See [credits.html](credits.html) for all 25 bird photo sources, reusable licenses, and species-name records. Scientific names are stable bird IDs. Mandarin appears as Chinese characters with tone-marked pinyin. Great tit uses the species-specific Mandarin name for *Parus major*; Eurasian magpie uses the species-specific name for *Pica pica*. The Spanish pack follows the 11 user-supplied word pairs for homework on 1 October; *también* and affirmative *sí* use standard accent marks. Four original generated illustrations are reused as context for related words, so they are not one-to-one picture answers.
