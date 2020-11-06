export class SamplicityPermission {

    static Test = class{
        public static readonly No = '00000000';
        public static readonly ExistingPermission = '09CA12B7-F576-4595-96D5-C00D2EE44882';
    };

    static Client = class {
        public static readonly ClientCreateNew = '8E1D6909-F3F0-4BB2-8CBD-5479160CD14F';
        public static readonly ClientListView = 'ACEF93BA-4E44-44CD-A1E0-7F2097B302FC';
        public static readonly ClientDetailView = '09CA12B7-F576-4595-96D5-C00D2EE44882';
        public static readonly ClientDetailEdit = '7C6704C6-6F26-473E-A1DC-D107493219C1';
        public static readonly ClientRefresh = 'C27130C0-6A9F-45F9-8842-19120E887FB5';
        public static readonly ClientDeactivateForDTPModule = '03BB971B-E3CD-41DE-B000-E6D4DF81089A';
        public static readonly ClientDetailEditAdvanced = 'CDF40A79-DF55-44C2-AC8A-9960F84ACB1E';
    };

    static HCP = class{
        public static readonly HCPListView = '9FACB316-9E4A-4D4F-B9F7-CBA7655440F3';
        public static readonly HCPDetailView = '483738B8-9665-4A28-BC65-388654337634';
        public static readonly HCPDetailEditBasic = '87DE71C3-8A5B-4D1D-A142-8B29F8C47951';
        public static readonly HCPDetailEditAdvanced = '94A56FB8-0065-46AE-93CF-DF8260C6AAF9';
    };

    static DNH = class{
        public static readonly DNHCreateNew = '512D44AD-E069-46AD-9FA7-A8016D590852';
        public static readonly DNHListView = '654BA25D-EC47-4BC3-ABCB-EC404B16B2D3';
        public static readonly DNHDelete = '7C956BC9-4B92-40BA-8F8C-1713DCD26BB3';
    };

    static Brand = class  {
        public static readonly BrandCreateNew = '4B63B9B4-08D3-4CD8-AAA7-5D0810539063';
        public static readonly BrandListView = '3FBA12C5-4094-4D4E-9476-2ECE689F6370';
        public static readonly BrandDetailView = '2140F778-38D5-4968-A40F-CC435BEED149';
        public static readonly BrandDetailEdit = 'CA80F4C4-D0E6-4C86-B0C7-8A5E7CDFBCEC';
    };

    static Product = class{
        public static readonly ProductCreateNew = '827B1428-878A-4CB0-BE9A-AD2CB3C47CA2';
        public static readonly ProductListView = 'E76CDB5B-D336-4C12-843D-D57727B167FE';
        public static readonly ProductDetailView = 'B764F93F-1ACD-4DFA-9704-971448702F59';
        public static readonly ProductDetailEdit = '22E25A77-DDC4-4B7D-A8D3-AB7362668213';
        public static readonly ProductRefresh = '67B300D2-0A2E-4DEA-8724-4C86E30978E2';
    };

    // static DoNotHonorExclusions = class{
    //     public static readonly DoNotHonorExclusionsListView = 'CA57AE6D-7889-446A-BD73-DB06608172C6';
    //     public static readonly DoNotHonorExclusionsListCreateNewRecord = 'E93E97BC-F938-44D4-9DA1-0F0AC2D0732E';
    //     public static readonly DoNotHonorExclusionsListDeleteRecord = '53D597C6-A2D7-4A14-9022-553A7AD6E2BB';
    // };

    static Role = class {
        static readonly CreateNewRole = '5CB3994E-E0D5-4F4E-8A24-32B589222CEF';
        static readonly ViewRoleList = '25FA02E8-43F3-4D1C-9874-3881C15BA365';
        static readonly ViewRoleDetail = '05903F52-6555-4A8B-8ED2-DC06D6105291';
        static readonly EditRoleDetail = '29554C6D-24EB-4B02-87C6-7745E6C4D59D';
        static readonly DeleteRole = 'EEF3C4E6-5AE5-4B5F-8B37-C099A6D9AE8A';
    };

    static User = class{
        public static readonly UserCreateNew = '9F439A79-607B-428B-9CFF-C3CAEBD82593';
        public static readonly UserListView = 'A6245899-4E9F-4F73-80C7-B428741BDCB2';
        public static readonly UserDetailView = '1511C693-4BEB-4DFD-9706-F86E3683141F';
        public static readonly UserDetailEdit = 'B07FC4AF-344F-48CC-82EE-7F42E9B1F124';
    };

    static Program = class{
        public static readonly ProgramActivate = '8CA3C923-655B-4F5D-BE5F-75B20F0C9AA2';
        public static readonly ProgramListView = '3D5793A0-A60C-4060-9E41-1FF4A5F1D537';
        public static readonly ProgramDetailView = '595F5B2D-AF88-4652-8760-FFA155EE41BE';
        public static readonly ProgramDetailCreateEdit = 'FCD87067-DAC5-471C-A22A-419B25D9FFE9';
        public static readonly ProgramShutdown = 'FD049839-538C-49B6-8B51-5A3B17220963';
    };

    static Order = class{
        public static readonly OrdersListView = '947CD61B-6F9B-4023-B273-CE7D45E678D9';
        public static readonly OrdersDetailView = '4B9BACB2-EBC1-423C-B887-593E38552C01';
        public static readonly OrdersDetailEdit = 'B649F8D1-4AD2-4D12-B9FC-5DF001EEBB62';
        public static readonly OrdersDetailEditAdvanced = '0827A10F-8D7E-478F-A8CC-866EEDEC65D5';
        public static readonly OrderAdminUnlock = '27EEBE32-E8C3-4054-B041-4A71DB198F06';
        public static readonly OrderUploadFile = '033511ED-9E12-4F0B-B6B7-A380B808523E';
    };

    static MitigationOrder = class {
      public static readonly MitigationOrdersListView = '19682674-B867-4AB9-9646-923CB8ECD73E';
      public static readonly MitigationOrdersDetailView = 'CCFFD249-DC71-4BD7-B5DD-48BCFAB1E537';
      public static readonly MitigationOrdersDetailEdit = 'BAAAB9F2-8FCB-4EC5-A290-7ACCB5D6F40C';
      public static readonly MitigationOrdersDetailAdvancedEdit = '33D97A3C-1D6B-4C07-80F7-9A8842735E17';
    }

    static DataEntryOrder = class {
      public static readonly DataEntryOrderListView = '5CE1DC2F-F395-493B-A625-14F9343379AA';
      public static readonly DataEntryOrderDetailView = '7C7C4BFB-B2CD-4BC7-B0AF-F8F8E5A08ECD';
      public static readonly DataEntryOrderDetailEdit = 'F608276A-955E-49CB-88F1-7613318CC913';
    }

    static Communication = class{
        public static readonly CommunicationListView = '830C78E3-5C31-4476-AAC8-1AF986358886';
        public static readonly CommunicationDetailView = 'B7FB5C59-E358-4E2C-B6B4-09DB5E11DFBF';
        public static readonly CommunicationDetailEdit = '49D5E3D2-7D5A-4819-9F94-CF1D77DF9766';
        public static readonly GenerateDocument = 'DC83B120-9DC2-4F9B-90B4-945A5F4A927B';
        public static readonly SendEmail = '9F4A631B-E538-4EEE-A01A-23154A9A9366';
        public static readonly SendFax = '17433EF3-1174-4BA2-A109-CE9C603B2FB8';
        public static readonly SendMail = '3C8F5544-8AA8-4779-AD0D-A0D5049C136F';
        public static readonly CommunicationDetailInvestigateAOC = 'AEB71484-8556-4FE3-B37E-3510C604C825';
        public static readonly ResendOrderCommunication = '84F5AA0D-BF6D-42EE-9D5C-D9D9C277E0D8';
    };
    static Offer = class{
        public static readonly OfferListView = '05638A08-3754-4336-952F-DC2E0619C82C';
        public static readonly OfferDetailView = 'E9CF2786-63D7-439A-BD6A-1C920D391F9C';
        public static readonly OfferResendSrf = '1250BFCD-30E4-4594-8454-77605645A295';
        public static readonly OfferGenerateData = '0D9A9A20-F69D-4AA7-8F3E-31B66936F57B';
        public static readonly OfferUploadFile = 'D857B53C-8ED5-4B9B-9C29-526E37966155';
    };
    static Dashboard = class{
        public static readonly DashboardView = 'C2E2A87D-5D5D-412F-8BF7-0762F4330EB0';
    };
    static Reporting = class{
        public static readonly ReportsView = '75FBFDDB-ACA4-4657-B093-48D36D2A3C06';
    };

    static NavMapping: Array<any> = [
        { Permission: SamplicityPermission.Dashboard.DashboardView, Route: '/{0}/dashboard/' },
        { Permission: SamplicityPermission.Order.OrdersListView, Route: '/{0}/orders/' },
        { Permission: SamplicityPermission.DataEntryOrder.DataEntryOrderListView, Route: '/{0}/orders/data-entry/' },
        { Permission: SamplicityPermission.MitigationOrder.MitigationOrdersListView, Route: '/{0}/orders/mitigation/' },
        { Permission: SamplicityPermission.Offer.OfferListView, Route: '/{0}/admin/offers/' },
        { Permission: SamplicityPermission.HCP.HCPListView, Route: '/{0}/admin/hcps/' },
        { Permission: SamplicityPermission.Communication.CommunicationListView, Route: '/{0}/communications/' },
        { Permission: SamplicityPermission.User.UserListView, Route: '/{0}/admin/users/' },
        { Permission: SamplicityPermission.Role.ViewRoleList, Route: '/{0}/admin/roles/' },
        { Permission: SamplicityPermission.Client.ClientDetailView, Route: '/{0}/admin/client/' },
        { Permission: SamplicityPermission.Brand.BrandListView, Route: '/{0}/admin/brands/' },
        { Permission: SamplicityPermission.Product.ProductListView, Route: '/{0}/admin/products/existing/' },
        { Permission: SamplicityPermission.DNH.DNHListView, Route: '/{0}/admin/donothonorexclusions/' },
        { Permission: SamplicityPermission.Reporting.ReportsView, Route: '/{0}/reports/' },
    ];
}
