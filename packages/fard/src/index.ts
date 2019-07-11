import React from 'react';
import createPageConfig from "./createPageConfig";

// @ts-ignore
export const render = (App: React.ComponentType<any>) => Page(createPageConfig(App));

let bridgeType = 'template';

// FIXME: will be removed later
export const unstable_setBridgreType = (newBridgeType) => {
  bridgeType = newBridgeType
};
