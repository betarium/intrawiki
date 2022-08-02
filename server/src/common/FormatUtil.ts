export default class FormatUtil {
  static paddingZero(num: number, digit: number): string {
    let result = num.toString()
    while (result.length < digit) {
      result = "0" + result
    }
    return result
  }

  /**
   * yyyy: year. ex: 2001
   * MM: month. ex: 12
   * dd: day of month. ex: 31
   * HH: hour. ex. 24
   * mm: minute. ex. 59
   * ss: second. ex. 59
   */
  static formatDateTime(date: Date | undefined, format: string = "yyyy-MM-dd HH:mm"): string | undefined {
    if (date === undefined || isNaN(date.getFullYear())) {
      return undefined
    }

    let result = format
    result = result.replace("yyyy", FormatUtil.paddingZero(date.getFullYear(), 4))
    result = result.replace("MM", FormatUtil.paddingZero(date.getMonth() + 1, 2))
    result = result.replace("dd", FormatUtil.paddingZero(date.getDate(), 2))
    result = result.replace("HH", FormatUtil.paddingZero(date.getHours(), 2))
    result = result.replace("mm", FormatUtil.paddingZero(date.getMinutes(), 2))
    result = result.replace("ss", FormatUtil.paddingZero(date.getSeconds(), 2))
    return result
  }


  /**
   * yyyy: year. ex: 2001
   * MM: month. ex: 12
   * dd: day of month. ex: 31
   * HH: hour. ex. 24
   * mm: minute. ex. 59
   * ss: second. ex. 59
   */
  static formatDate(date: Date | undefined, format: string = "yyyy-MM-dd"): string | undefined {
    if (date === undefined || isNaN(date.getFullYear())) {
      return undefined
    }

    let result = format
    result = result.replace("yyyy", FormatUtil.paddingZero(date.getFullYear(), 4))
    result = result.replace("MM", FormatUtil.paddingZero(date.getMonth() + 1, 2))
    result = result.replace("dd", FormatUtil.paddingZero(date.getDate(), 2))
    return result
  }

  static formatTime(date: Date | undefined, format: string = "HH:mm:ss"): string | undefined {
    if (date === undefined || isNaN(date.getFullYear())) {
      return undefined
    }

    let result = format
    result = result.replace("HH", FormatUtil.paddingZero(date.getHours(), 2))
    result = result.replace("mm", FormatUtil.paddingZero(date.getMinutes(), 2))
    result = result.replace("ss", FormatUtil.paddingZero(date.getSeconds(), 2))
    return result
  }
}
