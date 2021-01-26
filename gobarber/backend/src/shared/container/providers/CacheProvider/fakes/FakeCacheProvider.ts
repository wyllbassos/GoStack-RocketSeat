import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: any;
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = value;
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parseData = data as T;
    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache);

    keys.forEach(key => {
      if (key.startsWith(`${prefix}:`)) delete this.cache[key];
    });
  }
}

export default FakeCacheProvider;
