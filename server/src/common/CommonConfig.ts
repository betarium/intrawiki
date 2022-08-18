import path from "path"
import fs from "fs"
import dotenv from 'dotenv'

dotenv.config()

type NODE_ENV_TYPE = "development" | "test" | "staging" | "production" | ""

export default class CommonConfig {
  static get NODE_ENV(): NODE_ENV_TYPE {
    const env = this.getStringOrDefault("NODE_ENV", "") ?? "";
    return env as NODE_ENV_TYPE
  }

  static get HOST(): string {
    return this.getStringOrDefault("HOST", undefined) ?? "127.0.0.1";
  }

  static get PORT(): number {
    const env = this.getStringOrDefault("PORT", undefined) ?? "4000";
    return CommonConfig.normalizePort(env)
  }

  static get SITE_URL(): string {
    return this.getString("SITE_URL");
  }

  private static _rootDir = path.join(__dirname, "../../")

  static get ROOT_DIR(): string {
    return this._rootDir
  }

  static set ROOT_DIR(v: string) {
    this._rootDir = v;
  }

  static get PUBLIC_DIR(): string {
    let dir = this.getStringOrDefault("PUBLIC_DIR");

    let publicPath = dir ?? path.join(this._rootDir, 'public');
    if (this.NODE_ENV !== 'production') {
      const devPath = path.join(this._rootDir, '../front/build');
      if (fs.existsSync(devPath)) {
        publicPath = devPath
      }
    }

    if (!fs.existsSync(publicPath)) {
      const parentPublicPath = path.join(this._rootDir, '../../public');
      if (fs.existsSync(parentPublicPath)) {
        publicPath = parentPublicPath
      }
    }

    if (!publicPath.endsWith("/")) {
      publicPath += "/"
    }

    return publicPath
  }

  static get SESSION_PATH(): string {
    return this.getStringOrDefault("SESSION_PATH") ?? (this._rootDir + "/tmp/session");
  }

  static get SESSION_SECRET(): string {
    return this.getStringOrDefault("SESSION_SECRET") ?? 'secret';
  }

  static get DB_HOST(): string {
    return this.getStringOrDefault("DB_HOST") ?? "127.0.0.1";
  }

  static get DB_NAME(): string {
    return this.getString("DB_NAME")
  }

  static get DB_PASS(): string {
    return this.getString("DB_PASS")
  }

  static getStringOrDefault(key: string, defaultValue?: string): string | undefined {
    const value = process.env[key];
    if (value === undefined) {
      return defaultValue
    }
    return value
  }

  static getString(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error("config not found. key=" + key);
    }
    return value
  }

  static findString(key: string): string | undefined {
    return process.env[key];
  }

  private static normalizePort(val: string): number {
    var port = parseInt(val, 10);

    // if (isNaN(port)) {
    //   // named pipe
    //   return val;
    // }

    if (port >= 0) {
      // port number
      return port;
    }

    throw Error("Invalid port. port=" + val)
  }
}
