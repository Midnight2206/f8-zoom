import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./SelectTag.module.scss";

const cx = classNames.bind(styles);

function SelectTag({ title, data, onSelect, onChange }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(data?.[0] || { name: "" });
    const wrapperRef = useRef(null);

    const toggleDropdown = () => setOpen(prev => !prev);

    const handleSelect = (item) => {
        setSelectedItem(item);
        onSelect?.(item);
        onChange?.(item);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef} className={cx("select-tag")}>
            <div className={cx("select-tag-header")} onClick={toggleDropdown}>
                {title && <h3 className={cx("select-tag-title")}>{title}</h3>}
                <i
                    className={cx("fa-solid", "fa-chevron-down", "dropdown-icon", { open })}
                ></i>
            </div>

            {open && (
                <div className={cx("select-tag-list")}>
                    {data?.map(item => (
                        <div
                            key={item.name}
                            className={cx("select-tag-item", {
                                selected: selectedItem.name === item.name,
                            })}
                            onClick={() => handleSelect(item)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SelectTag;
