// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// ตรวจสอบว่าค่าไม่ว่างเปล่า
export const required = (
  value: any,
  fieldName: string,
): ValidationError | null => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return {
      field: fieldName,
      message: `${fieldName} ห้ามเว้นว่าง`,
    };
  }
  return null;
};

// ตรวจสอบค่าตัวเลขที่มากกว่า 0
export const positiveNumber = (
  value: number,
  fieldName: string,
): ValidationError | null => {
  if (isNaN(value) || value <= 0) {
    return {
      field: fieldName,
      message: `${fieldName} ต้องมากกว่า 0`,
    };
  }
  return null;
};

// ตรวจสอบค่าตัวเลขที่มากกว่าหรือเท่ากับ 0
export const nonNegativeNumber = (
  value: number,
  fieldName: string,
): ValidationError | null => {
  if (isNaN(value) || value < 0) {
    return {
      field: fieldName,
      message: `${fieldName} ต้องมากกว่าหรือเท่ากับ 0`,
    };
  }
  return null;
};

// ตรวจสอบความยาวข้อความขั้นต่ำ
export const minLength = (
  value: string,
  min: number,
  fieldName: string,
): ValidationError | null => {
  if (value.length < min) {
    return {
      field: fieldName,
      message: `${fieldName} ต้องมีความยาวอย่างน้อย ${min} ตัวอักษร`,
    };
  }
  return null;
};

// ตรวจสอบความยาวข้อความสูงสุด
export const maxLength = (
  value: string,
  max: number,
  fieldName: string,
): ValidationError | null => {
  if (value.length > max) {
    return {
      field: fieldName,
      message: `${fieldName} ต้องมีความยาวไม่เกิน ${max} ตัวอักษร`,
    };
  }
  return null;
};
