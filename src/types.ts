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
