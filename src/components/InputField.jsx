import React from "react";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  iconClass,
  required = true,
  pattern,
  helperText,
  invalidFeedback,
  children,
  isInvalid = false,
}) => {
  return (
    <div className="col-12 mb-3 pb-3 border-bottom border-light-subtle">
      <label
        htmlFor={id}
        className="form-label h6"
        style={{ color: "#1F2937" }}
      >
        {label}
      </label>

      {helperText && <div className="form-text mb-2">{helperText}</div>}

      {/* 輸入框與Icon容器 (水平排列) */}
      <div className="d-flex align-items-center mt-2 position-relative">
        {/* 左側圖示 */}
        {iconClass && (
          <i
            className={`${iconClass} fs-4 me-2`}
            style={{ color: "#1F2937" }}
          ></i>
        )}

        {/* 輸入框 */}
        <input
          type={type}
          className={`form-control bg-light border-0 ${isInvalid ? "is-invalid" : ""}`}
          id={id}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          value={value}
          onChange={onChange}
        />

        {/* 如果有額外的按鈕 (如: 驗證碼按鈕)，會放在這裡 */}
        {children && children.type === "button" ? children : null}
      </div>

      {/* --- 錯誤訊息顯示區--- */}
      <div
        className="invalid-feedback"
        style={{
          display: isInvalid ? "block" : "none",
          marginLeft: iconClass ? "2.5rem" : "0",
          color: "#dc3545",
          marginTop: "0.25rem",
        }}
      >
        {invalidFeedback}
      </div>

      {/* 額外的區塊 (如: 顯示密碼 checkbox) */}
      {children && children.type !== "button" ? children : null}
    </div>
  );
};

export default InputField;
