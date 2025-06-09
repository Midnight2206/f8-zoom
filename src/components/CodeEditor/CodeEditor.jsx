import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import styles from "./CodeEditor.module.scss";

const cx = classNames.bind(styles);

function CodeEditor({ getLog, selectedMethod }) {
  const [code, setCode] = useState(selectedMethod?.examples || "// some comment");
  const isFirstRender = useRef(true);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const runCode = (userCode) => {
    const logCollector = [];

    // Hàm custom log nhận thêm dòng log
    function __customLog(...args) {
      const line = args[args.length - 1]; // tham số cuối là dòng
      const value = args.length === 2 ? args[0] : args.slice(0, -1); // nếu 1 tham số thì lấy luôn, nếu nhiều thì thành mảng
      logCollector.push({ value, line });
    }

    // Thay thế console.log thành __customLog và thêm dòng hiện tại
    const wrappedCode = userCode
      .split("\n")
      .map((line, index) => {
        if (line.includes("console.log")) {
          // thay console.log(...) thành __customLog(..., lineNumber)
          return line.replace(/console\.log\((.*)\)/, `__customLog($1, ${index + 1})`);
        }
        return line;
      })
      .join("\n");

    try {
      // Tạo hàm mới truyền __customLog vào và chạy
      new Function("__customLog", wrappedCode)(__customLog);
    } catch (error) {
      logCollector.push({ value: `Error: ${error.message}`, line: null });
    }

    if (getLog) getLog(logCollector);
  };

  useEffect(() => {
    const newCode = selectedMethod?.examples || "// some comment";
    setCode(newCode);
  }, [selectedMethod]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      runCode(code);
      return;
    }

    const timer = setTimeout(() => {
      runCode(code);
    }, 500);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className={cx("code-editor")}>
      <Editor
        height="250px"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}

export default CodeEditor;
