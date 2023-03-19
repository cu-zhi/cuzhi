import XLSX from "xlsx";
import FileSaver from "file-saver";
/*
id : el-table表格id
title ： 导出的文件名称
*/
export const exportDelCols = (id, title) => {
  let tableDom = document.querySelector("#" + id).cloneNode(true);
  // 表头
  let tableHeader = tableDom.querySelector(".el-table__header-wrapper");
  // 内容主体
  let tableBody = tableDom.querySelector(".el-table__body");
  tableHeader.childNodes[0].append(tableBody.childNodes[1]);
  // 合计
  let tableFooter = tableDom.querySelector(".el-table__footer-wrapper");
  // 判断是否开启合计行
  if (tableFooter) {
    tableHeader.append(tableFooter);
  }
  // 清理掉checkbox 和操作的button
  let tableList =
    tableHeader.childNodes[0].childNodes[2].querySelectorAll("td");
  let headerList =
    tableHeader.childNodes[0].childNodes[1].querySelectorAll("th");
  for (let key = 0; key < tableList.length; key++) {
    if (
      tableList[key].querySelectorAll(".el-checkbox").length > 0 ||
      tableList[key].querySelectorAll(".el-button").length > 0
    ) {
      tableList[key].remove();
      headerList[key].remove();
    }
  }
  // 获取web的节点
  let webBook = XLSX.utils.table_to_book(tableHeader);
  // 把当前的book节点写入XLSX中
  let webOut = XLSX.write(webBook, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([webOut], {
        type: "application/octet-stream",
      }),
      title + ".xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, webOut);
  }
  return webOut;
};
