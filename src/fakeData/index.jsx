import mathMethods from './mathMethods.json';
import numMethods from './numMethods.json';
import strMethods from './strMethods.json';
import arrMethods from './arrMethods.json';

const dataMethods =  [
   {
    name: "Array",
    data: arrMethods,
    constructor: Array,
    title: "CÁC PHƯƠNG THỨC CỦA MẢNG TRONG JAVASCRIPT",
    prototype: true,
   },
   {
    name: "String",
    data: strMethods,
    constructor: String,
    title: "CÁC PHƯƠNG THỨC CỦA CHUỖI TRONG JAVASCRIPT",
    prototype: true,
  },
  {
    name: "Number",
    data: numMethods,
    constructor: Number,
    title: "CÁC PHƯƠNG THỨC CỦA SỐ TRONG JAVASCRIPT",
    prototype: true,
  },
  {
    name: "Math",
    data: mathMethods,
    constructor: Math,
    title: "CÁC PHƯƠNG THỨC CỦA ĐỐI TƯỢNG MATH TRONG JAVASCRIPT",
    prototype: false,
  }
]
export default dataMethods;