import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./Header.module.scss";
import arrMethods from "../../fakeData/arrMethods.json";

const cx = classNames.bind(styles);
function Header({ selectedMethod, setSelectedMethod }) {
  
  return (
    <header className={cx("header")}>
      <h1>CÁC PHƯƠNG THỨC CỦA MẢNG TRONG JAVASCRIPT</h1>
      <div className={cx("menu")}>
        {arrMethods.map((method, index) => (
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
  );
}

export default Header;
