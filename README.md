mapbox-studio-default-fonts
===========================

Copyright information for each font is included in each folder in a file named `LICENSE.txt`/`OFL.txt`/`UFL.txt`/`ofl.markdown`/`Open Font License.markdown`.

## Publishing

Pull Requests to `main` automatically publish a new version based on the PR's title prefix (`major:`, `minor:` or `patch:`) to the npmjs registry.

The published version in the registry is the source of truth for the package version, but you can manually increment the `package.json`'s `version`.

### Pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" GitHub Action to generate a "pre-release" build tagged with the short commit sha (e.g. `0.4.1-3180992`) without affecting the `latest` tag or normal releases. Check the action results for the published version.
