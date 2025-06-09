import classNames from "classnames/bind";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./Section.module.scss";
import CodeEditor from "../CodeEditor/CodeEditor";

const cx = classNames.bind(styles);

function formatLog(log) {
  try {
    if (typeof log === "object") {
      // Chuyển object thành 1 dòng string, xử lý circular reference
      return JSON.stringify(log, getCircularReplacer());
    }
    return String(log);
  } catch {
    return "[Unserializable log]";
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  };
}

function Section({ title, content, code, codeEditor, getLog, selectedMethod, logs }) {
  return (
    <div className={cx("section")}>
      <div className={cx("header")}>
        <h3 className={cx("title")}>{title}</h3>
      </div>
      <div className={cx("content")}>
        {Array.isArray(content) &&
          content.map((item, i) => <p key={i}># {item}</p>)}

        {code && (
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {code}
          </SyntaxHighlighter>
        )}

        {codeEditor && (
          <CodeEditor getLog={getLog} selectedMethod={selectedMethod} />
        )}

        {logs && logs.length > 0 && (
          <div className={cx("logs")}>
            {logs.map((log, index) => (
              <div key={index} className={cx("logRow")}>
                <pre className={cx("log")}>{formatLog(log.value)}</pre>
                {log.line && <span className={cx("source")}>line {log.line}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Section;
