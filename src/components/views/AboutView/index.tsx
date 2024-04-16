import { ReactNode, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { List, ListItem, Typography } from "@mui/joy";

import ExternalLink from "@/components/common/ExternalLink";
import View from "@/components/common/View";
import LocaleContext from "@/components/contexts/LocaleContext";
import CommonMessages from "@/translations/messages/Common";
import { Locale } from "@/types";

import Footer from "./components/Footer";
import Header from "./components/Header";

const GAME_URLS: { [key in Locale]: string } = {
  de: "https://lookout-spiele.de/de/games/mischwald.html",
  en: "https://lookout-spiele.de/en/games/forrestshuffle.html",
};
const PUBLISHER_URL = "https://lookout-spiele.de";
const GITHUB_URL = "https://github.com/soldag/forest-shuffle-scoring";

const CONTRIBUTIONS = [
  { title: "BG Stats icon", url: "https://www.bgstatsapp.com" },
];

interface HeadlineProps {
  children: ReactNode;
}

const Headline: React.FC<HeadlineProps> = ({ children }) => (
  <Typography
    level="title-md"
    sx={{
      ":not(:first-child)": {
        mt: 3,
      },
      "mb": 0.5,
    }}
  >
    {children}
  </Typography>
);

const AboutView: React.FC = () => {
  const intl = useIntl();
  const { locale } = useContext(LocaleContext);

  const gameUrl = GAME_URLS[locale];
  const gameName = intl.formatMessage(CommonMessages.gameName);

  return (
    <View header={<Header />} footer={<Footer />}>
      <Headline>
        <FormattedMessage
          id="AboutView.about.headline"
          defaultMessage="About this app"
        />
      </Headline>
      <Typography sx={{ mb: 1 }}>
        <FormattedMessage
          id="AboutView.about.text"
          defaultMessage="This app simplifies scoring of the card game {gameName}, published by <publisherLink>Lookout Games</publisherLink>. After the game ends, players can select the cards they've played in their forest. The app calculates the final scores and determines the winner of the game."
          values={{
            gameName: <ExternalLink href={gameUrl}>{gameName}</ExternalLink>,
            publisherLink: (chunks) => (
              <ExternalLink href={PUBLISHER_URL}>{chunks}</ExternalLink>
            ),
          }}
        />
      </Typography>
      <Typography>
        <FormattedMessage
          id="AboutView.about.disclaimer"
          defaultMessage="This is an unofficial scoring app developed as a private project and is not affiliated with Lookout Games."
        />
      </Typography>

      <Headline>
        <FormattedMessage
          id="AboutView.privacy.headline"
          defaultMessage="Privacy"
        />
      </Headline>
      <Typography>
        <FormattedMessage
          id="AboutView.privacy.text"
          defaultMessage="This app does not collect any personal data from its users. It does not gather, store, or process any information that could be used to identify you personally."
        />
      </Typography>

      <Headline>
        <FormattedMessage
          id="AboutView.sourceCode.headline"
          defaultMessage="Source Code"
        />
      </Headline>
      <Typography sx={{ mb: 1 }}>
        <FormattedMessage
          id="AboutView.sourceCode.text"
          defaultMessage="This app is open source. If you're a developer, feel free to check out the <githubLink>repository on GitHub</githubLink>. Pull requests are highly appreciated, particularly for bug fixes and language support."
          values={{
            githubLink: (chunks) => (
              <ExternalLink href={GITHUB_URL}>{chunks}</ExternalLink>
            ),
          }}
        />
      </Typography>

      <Headline>
        <FormattedMessage
          id="AboutView.credits.headline"
          defaultMessage="Credits"
        />
      </Headline>
      <Typography>
        <FormattedMessage
          id="AboutView.credits.text"
          defaultMessage="This app uses a few images and icons whose creators are attributed in the following:"
        />
      </Typography>
      <List marker="disc">
        {CONTRIBUTIONS.map(({ title, url }) => (
          <ListItem>
            <Typography>{title}</Typography>
            <ExternalLink href={url}>{url}</ExternalLink>
          </ListItem>
        ))}
      </List>
    </View>
  );
};

export default AboutView;