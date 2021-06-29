<p align="center"><img width="250px" src="./assets/header.png"></p>

---

<p align="center">
<i>The Web's Missing Package Manager</i>
</p>

If you're reading this, then you've stumbled across Hop, a CLI tool for installing web apps as native desktop applications! While tools like [nativefier](https://github.com/nativefier/nativefier) and [WebCatalog](https://webcatalog.app/) exist, they're either too complicated or too limiting for the average user to use. You shouldn't need to type a long command to generate a desktop version of your favorite web app, and you _especially_ shouldn't have to pay for it!

With Hop, installing a beautiful, pre-made version of your favorite app is as simple as:

![Hop](./assets/hop.gif)

## How It Works

Similar to Homebrew, all of the apps supported by Hop are stored in this repository, under the `apps` folder. Each app has a manifest and an optional icon.

Under the hood, Hop will pass the app manifest as a series of configuration options to [nativefier](https://github.com/nativefier/nativefier), which will build your app into a temporary directory, then automatically copy it to your system's applications.

## Contributing

A contribution framework is still being ironed out. For now, if you want to add your own web application or a manifest for an existing web app, just open a PR! If you have a design sense and would like to help contribute to icon development, all of the Hop app icons live [in this Figma file](https://www.figma.com/file/QQOdNUBnwGGimz8vXxDiVJ/Hop-App-Icons?node-id=0%3A1), which can be forked and added to an issue (seeing code changes are required to open PRs).

## The Name

The name Hop was chosen to stick with the beer-themed naming of Homebrew (brew, taps, cask, etc.). [Hops](https://en.wikipedia.org/wiki/Hops) are a flower used in the brewing of beer. Alternatively, you can think of HOP as a backronym: Homebrew On PWA (progressive web apps).

## Limitations

This codebase is in its infancy, and currently has only been confirmed to work on macOS. Additional code will need to be added to add support for Windows and Linux.
