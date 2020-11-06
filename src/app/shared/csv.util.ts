export class CSVUtil {

  public static downloadcsv(data: any, header: any, exportFileName: string) {
    var csvData = this.convertToCSV(data, header);

    var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, this.createFileName(exportFileName))
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", this.createFileName(exportFileName));
        //link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  private static setExportCSVItem(value: string): string {
    let replace = /\,/gi;
    return value != null ? value.replace(replace," ") : "";
  }

  public static setExportCSVLine(values: string[]): string {
    let line = '';
    values.forEach(x => {
      line += this.setExportCSVItem(x) + ",";
    })
    return line.slice(0, -1);
  }


  private static convertToCSV(dataList, headerList): string {   
    var str = '';
    var header = '';
    var row = '';

    for (var index in headerList) { 
      header += headerList[index] + ',';
    }
    header = header.slice(0, -1);    
    str += header + '\r\n';

    for (var index in dataList) { 
      row += dataList[index] + '\r\n';
    }    
    str += row;    
    return str;    
  }

  private static createFileName(exportFileName: string): string {
    var date = new Date();
    return (exportFileName +
      date.toLocaleDateString() + "_" +
      date.toLocaleTimeString()
      + '.csv')
  }
}
