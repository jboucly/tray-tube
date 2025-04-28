# Changelog

# 1.0.0 (2025-04-28)

### Bug Fixes

- add build step ([ef0d759](https://github.com/jboucly/yt-tray-app/commit/ef0d75964092d9f705ea0e90889227468e01669e))
- add missing environment variable declaration for GH_TOKEN in build and release jobs ([4866856](https://github.com/jboucly/yt-tray-app/commit/4866856ef2d87ace931128766d850988dbf922fd))
- correct order of properties in release-it configuration ([9b94f17](https://github.com/jboucly/yt-tray-app/commit/9b94f1729542b946feecfa63a4b4f949229f9909))
- correct secret reference for GitHub token in build workflow ([5e77ccf](https://github.com/jboucly/yt-tray-app/commit/5e77ccf3bdbbdb9fa93c5f2d5a97a6a65d6e55b2))
- refactor artifact compression steps for clarity and OS-specific handling ([ddcc3e2](https://github.com/jboucly/yt-tray-app/commit/ddcc3e230c720cfd17af95390bac7947a15e7b0e))
- remove artifactName from build configuration in package.json ([85ae287](https://github.com/jboucly/yt-tray-app/commit/85ae287cf637c4ecadf218118739aa1623d3da88))
- remove redundant environment variable declaration for GH_TOKEN in release job ([86f3be9](https://github.com/jboucly/yt-tray-app/commit/86f3be9077ce481e01e931b96b52504f4eb44a34))
- remove unnecessary dependency on quality job in build workflow ([305ad90](https://github.com/jboucly/yt-tray-app/commit/305ad90846dccba54d55a125c61f7631a09bfbdd))
- rename build step for clarity and update macOS build configuration ([04c280f](https://github.com/jboucly/yt-tray-app/commit/04c280f25886996ec586fe5b35766e36b772ec14))
- specify file types for uploaded installers in build workflow ([28af126](https://github.com/jboucly/yt-tray-app/commit/28af12676c36d17f145f1ffa75c467245400cdba))
- update artifact upload path and comment out compression steps for clarity ([dd7515a](https://github.com/jboucly/yt-tray-app/commit/dd7515ac47b1a7642b987f376f36e5b646572f6b))
- update dist script to prevent automatic publishing during build ([d5f0965](https://github.com/jboucly/yt-tray-app/commit/d5f096506d6a25b7d9a6a933f65050a65b50a63f))
- update file paths for loading UI and add index.html for application interface ([0be066c](https://github.com/jboucly/yt-tray-app/commit/0be066c04eee36df258a7a1e7da66d2fcd796e77))
- update installer upload path to use compressed artifacts ([eecf8df](https://github.com/jboucly/yt-tray-app/commit/eecf8df5755f2aaf30c94d6fc683aa20d3ca9da4))
- update release hook to stage changes after formatting ([1825a76](https://github.com/jboucly/yt-tray-app/commit/1825a76e5a2a4fc1d8261b96d77429d2dd8fbc0e))

### Features

- add .nvmrc file and update README with project details, features, prerequisites, installation, and licensing information ([bc29a5f](https://github.com/jboucly/yt-tray-app/commit/bc29a5fabdc5060c4338f7994b61bf8d29055003))
- add download progress indicator and success message in home view ([e2bb5c8](https://github.com/jboucly/yt-tray-app/commit/e2bb5c8a6ab2fc8c80cb42b5f7631698d4c1b78f))
- add ffmpeg location argument for audio extraction ([3184ee7](https://github.com/jboucly/yt-tray-app/commit/3184ee733b4f23cf6a533fbc8227cb046275d07c))
- add internationalization support with language selector and translations ([56a9cff](https://github.com/jboucly/yt-tray-app/commit/56a9cff63ab7b13de424100ae1244257bb6c31cc))
- add log trace and import ffmpeg to merge audio and video ([5121d2c](https://github.com/jboucly/yt-tray-app/commit/5121d2cc1c467e5e78602edb20d52c78f61ed5b2))
- add progress bar and notification ([#8](https://github.com/jboucly/yt-tray-app/issues/8)) ([cd24b44](https://github.com/jboucly/yt-tray-app/commit/cd24b44e817a5360c0ccba0d10aa1cba90a5f113))
- add release-it for versioning and changelog generation ([faaf75a](https://github.com/jboucly/yt-tray-app/commit/faaf75a588fea8b0b29c8d0b86cb54658dd846b5))
- Add script to copy executable binaries to dist/executables directory ([24d4967](https://github.com/jboucly/yt-tray-app/commit/24d496774e93ad1af2a1b176788bc63b7e20d714))
- enhance UI layout with Naive UI components and add settings view ([1c1059b](https://github.com/jboucly/yt-tray-app/commit/1c1059b7a2fe38f199f6fef99238421e22cdb7b0))
- Implement YouTube video downloader with tray interface ([9f5d53d](https://github.com/jboucly/yt-tray-app/commit/9f5d53d2c9c829a88f044b9324d58ef838d2760d))
- initialize Yt-Tray application with Electron and Vue ([d3fd208](https://github.com/jboucly/yt-tray-app/commit/d3fd20869a0881754a36c16ab0fcbe4a077288c3))
- integrate vue-router and create home view for navigation ([596a791](https://github.com/jboucly/yt-tray-app/commit/596a791503322313464077f2e7b6bdc611428cd3))
- refactor IPC communication and enhance download functionality with progress updates ([c18a1ca](https://github.com/jboucly/yt-tray-app/commit/c18a1ca9c1f7179e0fb91178472ae4f90bc79a8f))
- update download progress handling and enhance home view UI ([694d627](https://github.com/jboucly/yt-tray-app/commit/694d627a1f51fef6ae9bec14c0ee8a20c4736623))
