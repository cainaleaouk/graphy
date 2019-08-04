export default class Redis {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static cache: Record<string, any> = {};

  public static clear = () => {
    Redis.cache = {};
  };

  public list = () => {
    return Redis.cache;
  };

  public get = (key: string) => {
    return Promise.resolve(Redis.cache[key]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set = (key: string, value: any) => {
    Redis.cache[key] = value;
    return Promise.resolve();
  };
}
