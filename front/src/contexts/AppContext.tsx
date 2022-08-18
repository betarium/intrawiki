import { createContext } from "react";
import { AuthInfoResponse } from "../models/AuthInfoResponse";

export interface AppContext {
  get initialized(): boolean
  initialize(): Promise<void>
  updatePage(): void

  setAuthInfo(authInfo: AuthInfoResponse | undefined): void
  get authInfo(): AuthInfoResponse | undefined
}

class AppContextDummyImpl implements AppContext {
  updatePage(): void {
    throw new Error("Method not implemented.");
  }
  get initialized(): boolean {
    throw new Error("Method not implemented.");
  }
  initialize(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setAuthInfo(authInfo: AuthInfoResponse | undefined): void {
    throw new Error("Method not implemented.");
  }
  get authInfo(): AuthInfoResponse | undefined {
    throw new Error("Method not implemented.");
  }
}

export class AppContextImpl implements AppContext {

  private _initializing: boolean = false

  private _initialized: boolean = false;

  public get initialized(): boolean {
    return this._initialized;
  }

  async initialize() {
    if (this._initializing || this._initialized) {
      return
    }

    console.warn("App ctx initialize...")

    this._initializing = true
    this._initialized = true
    this.updatePage()
  }

  private onUpdate: () => void = () => { }

  updatePage() {
    this.onUpdate()
    console.warn("update app...")
  }

  setUpdate(onUpdate: () => void) {
    this.onUpdate = onUpdate
  }

  private _authInfo?: AuthInfoResponse;

  get authInfo(): AuthInfoResponse | undefined {
    return this._authInfo
  }

  setAuthInfo(authInfo: AuthInfoResponse | undefined) {
    this._authInfo = authInfo
  }
}

// export class AppContextHolder {
//   context: AppContextImpl
//   constructor(ctx: AppContextImpl) {
//     this.context = ctx
//   }
// }

const appContextDummy = new AppContextDummyImpl()
export const AppContextDef = createContext<AppContext>(appContextDummy)
