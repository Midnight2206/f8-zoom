import classNames from "classnames/bind";
import { useState, useEffect, useRef } from "react";

import styles from "./ArrayMethods.module.scss";
import Section from "../../components/Section";
import Header from "../../components/Header/Header";
import arrMethods from "../../fakeData/arrMethods.json";
const cx = classNames.bind(styles);

function ArrayMethods() {
  const [selectedMethod, setSelectedMethod] = useState(arrMethods[0]);
  const [logCollector, setLogCollector] = useState([]);
  const prevMethodRef = useRef(null);
  useEffect(() => {
    if (prevMethodRef.current) {
      delete Array.prototype[prevMethodRef.current.name];
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
  return (
    <div className={cx("container")}>
      <Header
        selectedMethod={selectedMethod}
        setSelectedMethod={setSelectedMethod}
      />
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

export default ArrayMethods;
