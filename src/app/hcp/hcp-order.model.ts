export class HcpOrderFilterCriteria {
  firstName: string;
  lastName: string;
  stateCode: string;
  startDate: Date;
  endDate: Date;

  clone(): HcpOrderFilterCriteria {
    const hcpOrderFilterCriteria: HcpOrderFilterCriteria = new HcpOrderFilterCriteria();
    hcpOrderFilterCriteria.firstName = this.firstName;
    hcpOrderFilterCriteria.lastName = this.lastName;
    hcpOrderFilterCriteria.stateCode = this.stateCode;
    hcpOrderFilterCriteria.startDate = this.startDate;
    hcpOrderFilterCriteria.endDate = this.endDate;

    return hcpOrderFilterCriteria;
  }
}
