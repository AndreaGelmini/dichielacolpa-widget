import { init, EVENTS } from './main';


export const RCA = { init, events: EVENTS };

// export anche i tipi per chi usa TypeScript
export type { WidgetConfig } from './main';