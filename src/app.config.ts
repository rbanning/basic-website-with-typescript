interface IApp {
  name: string;
  version: string;
}

export const appConfig: IApp = {
  name: 'Sample App',
  version: '0.0.1',
} as const;