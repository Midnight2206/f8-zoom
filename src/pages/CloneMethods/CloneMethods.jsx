import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";

import styles from "./CloneMethods.module.scss";
import Section from "../../components/Section/index.jsx";
import SelectTag from "../../components/SelectTag/SelectTag.jsx";
// Import dữ liệu mẫu cho các phương thức
import dataMethods from "../../fakeData/index.jsx";
const cx = classNames.bind(styles);
function CloneMethods() {
  const [type, setType] = useState(dataMethods[0]);
  const [selectedMethod, setSelectedMethod] = useState(type.data[0]);
  const [logCollector, setLogCollector] = useState([]);
  const prevMethodRef = useRef(null);
  useEffect(() => {
    if (prevMethodRef.current) {
      !!type.prototype
        ? delete constructor.prototype[prevMethodRef.current.name]
        : delete constructor[prevMethodRef.current.name];
    }
    const runCode = () => {
      const methodCode = selectedMethod.code;
      try {
        new Function(methodCode)();
        prevMethodRef.current = selectedMethod;
      } catch (err) {
        console.log(err);
      }
    };
    runCode();
  }, [selectedMethod]);
  console.log(type)
  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <div className={cx("nav")}>
          <h1 className={cx("title")}>{type.title}</h1>
          <SelectTag
            title="Chọn loại phương thức"
            data={dataMethods}
            onChange={(item) => {
              setType(item);
              setSelectedMethod(item.data[0]);
            }}
          />
        </div>
        <div className={cx("menu")}>
          {type.data.map((method, index) => (
            <button
              key={index}
              className={cx("menu-item", {
                active: selectedMethod.name === method.name,
              })}
              type="button"
              onClick={() => setSelectedMethod(method)}
            >
              {method.name.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <div className={cx("body")}>
        <Section title="Lý thuyết" content={selectedMethod.theory} />
        <Section
          title={`Clone code: Phương thức ${selectedMethod.name}`}
          code={selectedMethod.code}
        />
        <Section
          title={`Hãy sử dụng phương thức ${selectedMethod.name} và trải nghiệm kết quả thu được`}
          codeEditor={true}
          getLog={setLogCollector}
          selectedMethod={selectedMethod}
        />
        <Section title="Kết quả" logs={logCollector.flat()} />
      </div>
    </div>
  );
}

export default CloneMethods;
