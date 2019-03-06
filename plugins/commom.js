export default class utils {
  // 数字转java long型
  static num2jlong(num) {
    let MAX_INT = Math.pow(2, 53);
    if(num > MAX_INT || num < -MAX_INT) throw new Error("Can't convert number to long: out of bounds");
    let low = num >>> 0;
    let high = ((num - low) / 0x100000000) >>> 0;
    return new Ice.Long(high, low);
  }
  // java long型转数字 最大支持16位
  static jlong2num (value) {
    console.log(value);
    let num = new Ice.Long(value.high, value.low);
    return num.toNumber()
  }
  // 文本类型转 java long
  static str2jlong(string){
    return num2jlong(Number(string))
  }
}


