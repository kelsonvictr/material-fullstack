import React from "react";
import { Composition } from "remotion";
import { FetchJourney } from "./FetchJourney";
import { ClickToDom } from "./ClickToDom";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="FetchJourney"
      component={FetchJourney}
      durationInFrames={260}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="ClickToDom"
      component={ClickToDom}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
    />
  </>
);
