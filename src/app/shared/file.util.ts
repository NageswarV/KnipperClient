import { Injectable } from '@angular/core';

@Injectable()
export class FileUtil {

    constructor() {}

    isCSVFile(file) {
        return file.name.endsWith(".csv");
    }

    getHeaderArray(csvRecordsArr) {        
        let headers = csvRecordsArr[0].split(",");
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    getHeaderArrayWithSplitter(csvRecordsArr,splitter) {
      let headers = csvRecordsArr[0].split(splitter);
      let headerArray = [];
      for (let j = 0; j < headers.length; j++) {
        headerArray.push(headers[j]);
      }
      return headerArray;
    }

    validateHeaders(origHeaders, fileHeaaders) {
        if (origHeaders.length != fileHeaaders.length) {
            return false;
        }

        var fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] != fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength) {
        var dataArr = []

        for (let i = 0; i < csvRecordsArray.length - 1; i++) {
            let data = csvRecordsArray[i].split(",");
            
            if(data.length != headerLength){
                if(data==""){
                    alert("Extra blank line is present at line number "+i+", please remove it.");
                    return null;
                }else{
                    alert("Record at line number "+i+" contain "+data.length+" tokens, and is not matching with header length of :"+headerLength);
                    return null;
                }
            }

            let col = [];
            for (let j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }   
        return dataArr;
    }

    commaReplacer(datastring) {
      var matches = datastring.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
      for (var n = 0; n < matches.length; ++n) {
        matches[n] = matches[n].trim();
        if (matches[n] == ',') matches[n] = '';
      }
      return matches;
    }

    getDataRecordsArrayFromCSVFileWithSplitter(csvRecordsArray, headerLength, splitter) {
      var dataArr = [];
      var dataSplitter = splitter;
      for (let i = 0; i < csvRecordsArray.length - 1; i++) {
        if (splitter == ',') {
          var dataString = this.commaReplacer(csvRecordsArray[i]);
          csvRecordsArray[i] = dataString.join('|');
          csvRecordsArray[i] = csvRecordsArray[i].replace(/["']/g, "");
          dataSplitter = '|';
        }
        
        let data = csvRecordsArray[i].split(dataSplitter);

        if (data.length != headerLength) {
          if (data == "") {
            alert("Extra blank line is present at line number " + i + ", please remove it.");
            return null;
          } else {
            alert("Record at line number " + i + " contain " + data.length + " tokens, and is not matching with header length of :" + headerLength);
            return null;
          }
        }

        let col = [];
        for (let j = 0; j < data.length; j++) {
          col.push(data[j]);
        }
        dataArr.push(col);
      }
      return dataArr;
    }
}
