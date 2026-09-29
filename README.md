# VB-MAPP iFrame Demo - GitHub Pages

Static GitHub Pages demo for reviewing the VB-MAPP iframe screens used by Motivity.

## What the reviewer does

1. Open the GitHub Pages URL.
2. Paste a temporary DataMTD `signinToken`.
3. Choose an iframe screen to review.

The token is stored in browser `sessionStorage` only. It is not committed to this repository and is cleared when the browser session ends.

## Demo configuration

Edit `config.js` to change the sandbox/test IDs used by the iframe examples:

```js
window.DataMTDConfig = {
  environment: "sandbox",
  userAgent: "Motivity",
  acceptLanguage: "en",
  learnerId: 101753,
  learnerCode: 101753,
  assessmentId: 59031
};
```

**Do not put DataMTD API bearer credentials, production PHI, or production patient identifiers in this repository.** GitHub Pages is a static site and the browser can download any published JavaScript/configuration file.

## Publish with GitHub Pages

1. Create a repository and add the files from this folder to the repository root.
2. Push to the branch you want to publish, normally `main`.
3. Open **Settings -> Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. Open the generated Pages URL.

No Node, build step, VS Code extension, local server, or PowerShell is required.

## Files

- `index.html` - token entry and demo menu.
- `config.js` - non-secret sandbox demo identifiers.
- `common.js` - loads the DataMTD iframe support script and reads the temporary token from `sessionStorage`.
- `iframe_learner_overview.html` - learner overview example.
- `iframe_learner_list.html` - learner list example.
- `iframe_assessment_latest.html` - latest assessment example.
- `iframe_assessment_view.html` - specific assessment example.
- `styles.css` - shared styling.

## Getting a token

Generate a temporary `signinToken` using DataMTD `/1/signin` outside this site, then paste only the returned `signinToken` into the demo page. Do not paste or store the long-lived API bearer credential in the repository.
