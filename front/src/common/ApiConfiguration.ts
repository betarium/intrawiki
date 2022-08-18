import { Configuration, ConfigurationParameters } from "api";

export default class ApiConfiguration extends Configuration {
  private static readonly apiConfigParam: ConfigurationParameters = { basePath: "/intrawiki-manage/api" };

  constructor() {
    super(ApiConfiguration.apiConfigParam)
  }
}
