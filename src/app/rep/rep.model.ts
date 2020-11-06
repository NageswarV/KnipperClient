export class SalesFilterCriteria {
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;

  clone(): SalesFilterCriteria {
    const salesFilterCriteria: SalesFilterCriteria = new SalesFilterCriteria();
    salesFilterCriteria.firstName = this.firstName;
    salesFilterCriteria.lastName = this.lastName;
    salesFilterCriteria.startDate = this.startDate;
    salesFilterCriteria.endDate = this.endDate;

    return salesFilterCriteria;
  }
}
