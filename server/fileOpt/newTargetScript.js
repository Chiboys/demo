/**
*  使用 Exceljs 创建一个xlxs表格
**/
const Excel    = require('exceljs');

function initTranslate () {
  const workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: './fileName.xlsx' // 文件目录名称
  });
  const worksheet = workbook.addWorksheet('Sheet');
  // 不要在对columns赋值后，还修改数组中的内容
  worksheet.columns = [
    { header: '用户id', key: 'user', width: 15},
    { header: '手机号', key: 'mobile', width: 15},
  ];
  return {
    addRow: data => worksheet.addRow(data).commit(),
    end: async () => {
      worksheet.commit();
      return workbook.commit();
    }
  };
}

async function run (xls = initTranslate()) {
  xls.add({user: "这里是值1", mobile: "这里是值1"})；
  xls.add({user: "这里是值2", mobile: "这里是值2"})；
  await xls.end();
}

run()
.then(() => console.log("end") || process.exit(0))
.catch(err => console.log(err.stack || err) || process.exit(1));
