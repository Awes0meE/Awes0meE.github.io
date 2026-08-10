# Trial 02: Seamly2D Packaging Was Part Of The Program

Turn the material below into a bilingual portfolio learning note. The useful thread is the packaging work, not a week-by-week internship report. Provide content-specific headings and MDX-ready body copy.

## Confirmed material

- I worked with Seamly2D, Qt, and C++ during a Nanjing internship in 2025.
- The application ran in Qt Creator before the release folder could run independently.
- On Windows, compiler-version conflicts forced me to revisit the relationship among MSVC, CMake, Ninja, Qt package discovery, and the selected Kit.
- `windeployqt` collected Qt dependencies, but the command had to come from the Qt installation matching the build. A convenient executable with the wrong environment could produce a folder that looked packaged and still failed on another machine.
- Missing DLLs turned deployment into a repeatable check rather than a final button click.
- I studied Windows signing, created a self-signed certificate, and used Inno Setup to turn the release directory into an installer.
- On macOS, Homebrew Qt and the official Qt installer used different paths and could involve different architecture assumptions.
- `macdeployqt` produced an `.app`, and a self-signed certificate could be created.
- Formal Apple distribution signing and notarization were not completed.
- I later wrote shell scripts to connect building, packaging, dependency collection, and signature checks as far as the available environment allowed.

## Tone and boundaries

- It is fair to show mild frustration or amusement at a package that worked on the development machine but not elsewhere.
- Do not claim the release was publicly distributed or formally signed by Apple.
- Do not turn the note into a generic Qt deployment tutorial or a three-week chronology.
- Use placeholders for source-log and script links.
