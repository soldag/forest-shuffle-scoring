# <img src="public/icons/icon.svg" alt="app icon" style="height: 1em;"> Forest Shuffle Scoring App

This web app simplifies scoring of the card game [Forest Shuffle](https://lookout-spiele.de/en/games/forrestshuffle.html), published by [Lookout Games](https://lookout-spiele.de). After the game ends, players can select the cards they've played in their forest. The app calculates the final scores and determines the winner of the game.

The app is available at https://soldag.github.io/forest-shuffle-scoring.

## Features

- Easy scoring of Forest Shuffle plays
- Support for the [Alpine expansion](https://lookout-spiele.de/en/games/forestshufflealpine.html)
- Multilingual (so far English and German)
- Offline functionality
- Export of plays to [BGStats](https://www.bgstatsapp.com)

### Upcoming

- **Multi-device support**\
  Speed up the scoring process by allowing users to score their forest on their own device simultaneously instead of having just one person that's using the app to score all forests.
- **More detailed scoring**\
  Display score of individual cards or types of cards

If you have more ideas on how to improve this app, hit me up.

## Development

This app is written in React with TypeScript. [Joy UI](https://mui.com/joy-ui/getting-started) is used as React component library.

For developing, clone the repository, install the dependencies and start the development server:

```sh
git clone git@github.com:soldag/forest-shuffle-scoring.git
cd forest-shuffle-scoring
npm install
npm run dev
```

The app is then available at http://localhost:5173/forest-shuffle-scoring.

## Disclaimer

This is an unofficial scoring app developed as a private project and is not affiliated with Lookout Games.

## Credits

This app uses a few images and icons whose creators are attributed in the following:

- BG Stats icon\
  https://www.bgstatsapp.com
- Forest icon created by Freepik - Flaticon\
  https://www.flaticon.com/free-icons/forest
