export class UploadedReportFilterCriteria {
    firstName: string;
    lastName: string;
  
    clone(): UploadedReportFilterCriteria {
      const uploadedReportFilterCriteria: UploadedReportFilterCriteria = new UploadedReportFilterCriteria();
      uploadedReportFilterCriteria.firstName = this.firstName;
      uploadedReportFilterCriteria.lastName = this.lastName;
  
      return uploadedReportFilterCriteria;
    }
  }
  