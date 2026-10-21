mapbox-studio-default-fonts
===========================

Copyright information for each font is included in each folder in a file named `LICENSE.txt`/`OFL.txt`/`UFL.txt`/`ofl.markdown`/`Open Font License.markdown`.

## Publishing

Pull Requests merged to `main` with conventional commit prefixes will automatically be published to AWS CodeArtifact (not npmjs) as new major/minor/patch versions (`feat!:`/`feat:`/`fix:` respectively). When using "Squash and merge", ensure your PR title includes the conventional commit prefix; a `BREAKING CHANGE:` footer only counts if it ends up in the squash commit's body. Release notes are generated as [GitHub Releases](https://github.com/mapbox/mapbox-studio-default-fonts/releases).

Examples:
- `fix: corrected a font family name` -> patch
- `feat: added the Inter font family` -> minor
- `feat!: removed the Droid Serif font family` (requires manual migration work) -> major
- `fix: resolved issue

  BREAKING CHANGE: font families are now keyed by a different name` -> major

`package.json`'s `version` may be incremented manually if needed (for example, to skip a minor version), but you shouldn't normally need to touch it; the published registry version, not `package.json`, is the source of truth for what gets released next.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" GitHub Action to generate a "pre-release" build tagged with the short commit sha (e.g. `0.4.1-3180992`) without affecting the `latest` tag or normal releases. Check the action results for the published version.
