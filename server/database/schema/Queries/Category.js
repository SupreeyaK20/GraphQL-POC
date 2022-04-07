const graphql = require("graphql");
const { CategoryType } = require("../TypeDefs/Category");
const { GraphQLList } = graphql;
const { AuthenticationError } = require("apollo-server");
const { Category } = require("../../models");
const path = require("path");
const excelJS = require("exceljs");
const fs = require("fs");
const admzip = require("adm-zip");

const GET_ALL_CATEGORIES = {
  type: new GraphQLList(CategoryType),
  async resolve(_, args, { user }) {
    try {
      if (!user) throw new AuthenticationError("Unauthenticated");

      const cat = await Category.findAll();
      return cat;
    } catch (error) {
      throw error;
    }
  },
};

const EXPORT_EXCEL = {
  type: CategoryType,
  async resolve(_, args) {
    try {
      const pathName = path.join(__dirname, `../../../public`);
      const fileName = "categorylists.xlsx";
      const rootPath = "C:/Users/SupriyaK4/Downloads";
      let fetchCategory = await Category.findAll();
      const workbook = new excelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("Categories"); // New Worksheet
      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "ID", key: "id", width: 10 },
        { header: "Name", key: "name", width: 50 },
      ];
      // Looping through Category data
      let counter = 1;
      fetchCategory.forEach((cat) => {
        cat.s_no = counter;
        worksheet.addRow(cat); // Add data in worksheet
        counter++;
      });
      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      const data = await workbook.xlsx.writeFile(
        `${pathName}/files/${fileName}`
      );

      var zip = new admzip();
      var zipFileName = Date.now() + "output.zip";

      zip.addLocalFile(`${pathName}/files/${fileName}`);

      // save file zip in root directory
      const zipBuffData = zip.toBuffer();
      zip.writeZip(`${rootPath}/${zipFileName}`, data);

      return zipBuffData;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { GET_ALL_CATEGORIES, EXPORT_EXCEL };
