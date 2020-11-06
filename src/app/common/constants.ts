export class CommonConstants {
    static readonly domesticCountry: string = "US";
    static readonly defaultDomain: string = "knipper.com";
    static readonly lastModificationTime: string = "ModifiedTime";
    static readonly id: string = "Id";
    static readonly creationTime: string = "CreatedDate";
    static readonly createdBy: string = "CreatedBy";
    static readonly modifiedBy: string = "ModifiedBy";
    static readonly defaultGuid: string = '00000000-0000-0000-0000-000000000000';
    static readonly hcpAddressType: string = '4979729C-922E-485D-9399-04F3570F66DF';

    static EsignatureProductTypes = class {
        static readonly NonControlledRxDrug = '18659c8b-c6da-44d1-8802-167977383d5f';
        static readonly ControlledRxDrug = 'e06d31ec-82d1-448e-a1c7-c5904c1e2d51';
    }

    static UserGroup = class {
        static readonly ClientAdminUserGroupId = 'dbe41460-f60e-4356-a1dc-3ab0b78ea006';
        static readonly HcpUserGroupId = 'c80d036d-cd65-4377-bfae-67f130be9e10';
    }
}
