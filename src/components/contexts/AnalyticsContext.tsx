import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHashLocation } from "wouter/use-hash-location";

const GOATCOUNTER_CONFIG = {
  src: "https://gc.zgo.at/count.js",
  endpoint: "https://forest-shuffle-scoring.goatcounter.com/count",
  settings: {
    no_onload: true,
  },
};

const PAGE_TITLES: Record<string, string | undefined> = {
  "/about": "AboutView",
  "/forest": "ForestView",
  "/new": "CreateGameView",
  "/scoring": "ScoringView",
};

interface AnalyticsContextType {
  isReady: boolean;
  trackEvent: (eventId: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  isReady: false,
  trackEvent: () => {},
});

interface AnalyticsContextProviderProps {
  children?: ReactNode;
}

export const AnalyticsContextProvider = ({
  children,
}: AnalyticsContextProviderProps) => {
  const [location] = useHashLocation();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = GOATCOUNTER_CONFIG.src;
    script.dataset.goatcounter = GOATCOUNTER_CONFIG.endpoint;
    script.dataset.goatcounterSettings = JSON.stringify(
      GOATCOUNTER_CONFIG.settings,
    );
    script.addEventListener("load", () => setIsReady(true));
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isReady) {
      window.goatcounter?.count({
        path: location,
        title: PAGE_TITLES[location] ?? location,
      });
    }
  }, [isReady, location]);

  const trackEvent = useCallback((eventId: string) => {
    window.goatcounter?.count({
      path: eventId,
      title: eventId,
      event: true,
    });
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isReady, trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContext;
