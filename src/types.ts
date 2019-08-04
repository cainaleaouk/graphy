export enum PriceTypes {
  OPEN = 'open',
  HIGH = 'high',
  LOW = 'low',
  CLOSE = 'close',
}

export class Query {
  [key: string]: string;
  public symbol!: string;
  public since!: string;
  public until!: string;

  public price: PriceTypes = PriceTypes.CLOSE;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetcherFunction = (query: Query) => Promise<any>;
