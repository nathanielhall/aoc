#!/usr/bin/env node

const fs = require("fs");
const V = require("./validation");

fs.readFile(__dirname + "/input.txt", (error, data) => {
  if (error) {
    throw error;
  }

  // parse passports from incoming text file
  const passports = readPassports(data);

  // generate validation schema for passports
  const schema = validationSchema();

  // Validate each passports
  const results = passports.map((passport) => {
    const result = V.validate(schema, passport);

    return {
      ...passport,
      isValid: result.isFail === false,
      errors: result.isFail ? result.x : "",
    };
  });

  // Display Results
  const invalid = results.filter((x) => x.isValid === false)?.length || 0;
  const valid = passports.length - invalid;

  console.log("");
  console.log(`TOTAL: ${passports.length} VALID: ${valid} INVALID: ${invalid}`);
});

const readPassports = (data) => {
  const objects = data.toString().split(/\n\s*\n/);

  return objects.map((obj) => {
    const properties = obj.split(/\s+|\n/);
    const x = properties
      .filter((x) => x.indexOf(":") > -1) // must be property
      .map((p) => {
        const [key, value] = p.split(":");
        return {
          [key]: value,
        };
      });
    return Object.assign({}, ...x);
  });
};

const validationSchema = () => {
  const { isRequired, isOptional, numberLength, numberRange, customValidator } =
    V;

  const heightValidator = customValidator((x) => {
    if (!x) return false;

    const getNum = (m) => Number(x.replace(m, ""));

    if (x.endsWith("cm")) {
      const num = getNum("cm");
      return num >= 150 && num <= 193;
    }

    if (x.endsWith("in")) {
      const num = getNum("in");
      return num >= 59 && num <= 76;
    }

    return false;
  });

  const hclValidator = customValidator((x) => {
    return /^#[a-f0-9]{6}/.test(x);
  });

  const eclValidator = customValidator((x) => {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(x);
  });

  return {
    byr: isRequired.concat(numberLength(4)).concat(numberRange(1920, 2002)),
    iyr: isRequired.concat(numberLength(4)).concat(numberRange(2010, 2020)),
    eyr: isRequired.concat(numberLength(4)).concat(numberRange(2020, 2030)),
    hgt: isRequired.concat(heightValidator),
    hcl: isRequired.concat(hclValidator),
    ecl: isRequired.concat(eclValidator),
    pid: isRequired.concat(numberLength(9)),
    cid: isOptional,
  };
};
