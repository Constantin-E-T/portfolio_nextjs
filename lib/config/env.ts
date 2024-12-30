// lib/config/env.ts
export type Environment = 'development' | 'test' | 'production';

class EnvironmentConfig {
  private env: Environment;

  constructor() {
    this.env = this.getCurrentEnvironment();
  }

  private getCurrentEnvironment(): Environment {
    if (process.env.NODE_ENV === 'test') {
      return 'test';
    }
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      return 'development';
    }
    return 'production';
  }

  get isDevelopment(): boolean {
    return this.env === 'development';
  }

  get isProduction(): boolean {
    return this.env === 'production';
  }

  get isTest(): boolean {
    return this.env === 'test';
  }

  get current(): Environment {
    return this.env;
  }
}

export const env = new EnvironmentConfig();
