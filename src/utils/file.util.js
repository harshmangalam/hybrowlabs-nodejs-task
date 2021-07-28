/**
 * utility  module for file system operation
 */

const { readFile, writeFile } = require("fs/promises");



const readDataFromFile = async (filePath) => {
  try {
    // read file data in utf8 standared format
    let data = await readFile(filePath, "utf8");

    // parse json string data to javascript object
    data = JSON.parse(data || "[]");

    return data;
  } catch (error) {
    console.log(error);
    if (error.code === "ENONET") {
      throw new Error("file not found");
    } else {
      throw new Error("error while opening file");
    }
  }
};

const addDataToFile = async (filePath, content) => {
  try {
    // read data from path 
    const readFileData = await readDataFromFile(filePath);

    // merge new data from previous data
    const arrayData = [...readFileData, content];

    await writeFile(filePath, JSON.stringify(arrayData), {
      flag: "w",
    });

    return content;
  } catch (error) {
    console.log(error);
    if (error.code === "ENONET") {
      throw new Error("file not found");
    } else {
      throw new Error("error while opening file");
    }
  }
};

module.exports = {
  readDataFromFile,
  addDataToFile,
};
