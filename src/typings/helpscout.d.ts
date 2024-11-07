export type HelpScoutBeaconInterface =
  | ((action: 'open', beaconId: string) => void)
  | ((action: 'close' | 'open' | 'toggle' | 'destroy') => void)
  | ((action: 'config', options: Record<string, unknown>) => void);
