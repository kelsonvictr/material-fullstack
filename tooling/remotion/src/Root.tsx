import React from "react";
import { Composition } from "remotion";
import { FetchJourney } from "./FetchJourney";
import { ClickToDom } from "./ClickToDom";
import { WhatIsApi } from "./WhatIsApi";
import { JsonAnatomy } from "./JsonAnatomy";
import { ArrowFunction } from "./ArrowFunction";
import { ComponentJourney } from "./ComponentJourney";
import { MapAssemblyLine } from "./MapAssemblyLine";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ComponentJourney"
      component={ComponentJourney}
      durationInFrames={330}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="MapAssemblyLine"
      component={MapAssemblyLine}
      durationInFrames={320}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="ArrowFunction"
      component={ArrowFunction}
      durationInFrames={340}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="WhatIsApi"
      component={WhatIsApi}
      durationInFrames={270}
      fps={30}
      width={1280}
      height={720}
    />
    <Composition
      id="JsonAnatomy"
      component={JsonAnatomy}
      durationInFrames={280}
      fps={30}
      width={1280}
      height={720}
    />
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
