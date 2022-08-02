import { randomInt } from "crypto"
import FormatUtil from "./FormatUtil"

export default class CommonUtil {
  static generateErrorTimeStamp(): string {
    const now = new Date()
    const timestamp = FormatUtil.formatDateTime(now, "yyyyMMddTHHmm")
    const len = 8
    let serial = FormatUtil.paddingZero(randomInt(1 << 20), len)
    if (serial.length > len) {
      serial = serial.substring(len - serial.length)
    }
    const errorTimestamp = "ERRTS-D" + timestamp + "-S" + serial
    return errorTimestamp
  }
}
