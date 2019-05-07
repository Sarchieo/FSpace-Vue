//返回值：arg1加上arg2的精确结果
export function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

//返回值：arg1减上arg2的精确结果
export function accSub(arg1,arg2){
    return accAdd(arg1,-arg2);
}

//返回值：arg1乘以arg2的精确结果
export function accMul(arg1,arg2) {
    var num = parseFloat(arg1*arg2) + "";
    console
    var str = [];
    str = num.split(".");
    if (str.length > 1) {
        return str[0] + "." + str[1].substring(0,2);
    }
    return str[0];
}

//返回值：arg1除以arg2的精确结果
export function accDiv(arg1,arg2){
    var num = parseFloat(arg1/arg2)+ "";
    var str = [];
    str = num.split(".");
    // console.log("num=====  " + str.length)
    if (str.length > 1) {
        return str[0] + "." + str[1].substring(0,2);
    }
    return str[0];
}

