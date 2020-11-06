var SamplicityPermission = /** @class */ (function () {
    function SamplicityPermission() {
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    SamplicityPermission.Test = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.No = '00000000',
        _a.ExistingPermission = '09CA12B7-F576-4595-96D5-C00D2EE44882',
        _a);
    SamplicityPermission.Client = (_b = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _b.ClientCreateNew = '8E1D6909-F3F0-4BB2-8CBD-5479160CD14F',
        _b.ClientListView = 'ACEF93BA-4E44-44CD-A1E0-7F2097B302FC',
        _b.ClientDetailView = '09CA12B7-F576-4595-96D5-C00D2EE44882',
        _b.ClientDetailEdit = '7C6704C6-6F26-473E-A1DC-D107493219C1',
        _b.ClientRefresh = 'C27130C0-6A9F-45F9-8842-19120E887FB5',
        _b.ClientDeactivateForDTPModule = '03BB971B-E3CD-41DE-B000-E6D4DF81089A',
        _b.ClientDetailEditAdvanced = 'CDF40A79-DF55-44C2-AC8A-9960F84ACB1E',
        _b);
    SamplicityPermission.HCP = (_c = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _c.HCPListView = '9FACB316-9E4A-4D4F-B9F7-CBA7655440F3',
        _c.HCPDetailView = '483738B8-9665-4A28-BC65-388654337634',
        _c.HCPDetailEditBasic = '87DE71C3-8A5B-4D1D-A142-8B29F8C47951',
        _c.HCPDetailEditAdvanced = '94A56FB8-0065-46AE-93CF-DF8260C6AAF9',
        _c);
    SamplicityPermission.DNH = (_d = /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        _d.DNHCreateNew = '512D44AD-E069-46AD-9FA7-A8016D590852',
        _d.DNHListView = '654BA25D-EC47-4BC3-ABCB-EC404B16B2D3',
        _d.DNHDelete = '7C956BC9-4B92-40BA-8F8C-1713DCD26BB3',
        _d);
    SamplicityPermission.Brand = (_e = /** @class */ (function () {
            function class_5() {
            }
            return class_5;
        }()),
        _e.BrandCreateNew = '4B63B9B4-08D3-4CD8-AAA7-5D0810539063',
        _e.BrandListView = '3FBA12C5-4094-4D4E-9476-2ECE689F6370',
        _e.BrandDetailView = '2140F778-38D5-4968-A40F-CC435BEED149',
        _e.BrandDetailEdit = 'CA80F4C4-D0E6-4C86-B0C7-8A5E7CDFBCEC',
        _e);
    SamplicityPermission.Product = (_f = /** @class */ (function () {
            function class_6() {
            }
            return class_6;
        }()),
        _f.ProductCreateNew = '827B1428-878A-4CB0-BE9A-AD2CB3C47CA2',
        _f.ProductListView = 'E76CDB5B-D336-4C12-843D-D57727B167FE',
        _f.ProductDetailView = 'B764F93F-1ACD-4DFA-9704-971448702F59',
        _f.ProductDetailEdit = '22E25A77-DDC4-4B7D-A8D3-AB7362668213',
        _f.ProductRefresh = '67B300D2-0A2E-4DEA-8724-4C86E30978E2',
        _f);
    // static DoNotHonorExclusions = class{
    //     public static readonly DoNotHonorExclusionsListView = 'CA57AE6D-7889-446A-BD73-DB06608172C6';
    //     public static readonly DoNotHonorExclusionsListCreateNewRecord = 'E93E97BC-F938-44D4-9DA1-0F0AC2D0732E';
    //     public static readonly DoNotHonorExclusionsListDeleteRecord = '53D597C6-A2D7-4A14-9022-553A7AD6E2BB';
    // };
    SamplicityPermission.Role = (_g = /** @class */ (function () {
            function class_7() {
            }
            return class_7;
        }()),
        _g.CreateNewRole = '5CB3994E-E0D5-4F4E-8A24-32B589222CEF',
        _g.ViewRoleList = '25FA02E8-43F3-4D1C-9874-3881C15BA365',
        _g.ViewRoleDetail = '05903F52-6555-4A8B-8ED2-DC06D6105291',
        _g.EditRoleDetail = '29554C6D-24EB-4B02-87C6-7745E6C4D59D',
        _g.DeleteRole = 'EEF3C4E6-5AE5-4B5F-8B37-C099A6D9AE8A',
        _g);
    SamplicityPermission.User = (_h = /** @class */ (function () {
            function class_8() {
            }
            return class_8;
        }()),
        _h.UserCreateNew = '9F439A79-607B-428B-9CFF-C3CAEBD82593',
        _h.UserListView = 'A6245899-4E9F-4F73-80C7-B428741BDCB2',
        _h.UserDetailView = '1511C693-4BEB-4DFD-9706-F86E3683141F',
        _h.UserDetailEdit = 'B07FC4AF-344F-48CC-82EE-7F42E9B1F124',
        _h);
    SamplicityPermission.Program = (_j = /** @class */ (function () {
            function class_9() {
            }
            return class_9;
        }()),
        _j.ProgramActivate = '8CA3C923-655B-4F5D-BE5F-75B20F0C9AA2',
        _j.ProgramListView = '3D5793A0-A60C-4060-9E41-1FF4A5F1D537',
        _j.ProgramDetailView = '595F5B2D-AF88-4652-8760-FFA155EE41BE',
        _j.ProgramDetailCreateEdit = 'FCD87067-DAC5-471C-A22A-419B25D9FFE9',
        _j.ProgramShutdown = 'FD049839-538C-49B6-8B51-5A3B17220963',
        _j);
    SamplicityPermission.Order = (_k = /** @class */ (function () {
            function class_10() {
            }
            return class_10;
        }()),
        _k.OrdersListView = '947CD61B-6F9B-4023-B273-CE7D45E678D9',
        _k.OrdersDetailView = '4B9BACB2-EBC1-423C-B887-593E38552C01',
        _k.OrdersDetailEdit = 'B649F8D1-4AD2-4D12-B9FC-5DF001EEBB62',
        _k.OrdersDetailEditAdvanced = '0827A10F-8D7E-478F-A8CC-866EEDEC65D5',
        _k.OrderAdminUnlock = '27EEBE32-E8C3-4054-B041-4A71DB198F06',
        _k.OrderUploadFile = '033511ED-9E12-4F0B-B6B7-A380B808523E',
        _k);
    SamplicityPermission.MitigationOrder = (_l = /** @class */ (function () {
            function class_11() {
            }
            return class_11;
        }()),
        _l.MitigationOrdersListView = '19682674-B867-4AB9-9646-923CB8ECD73E',
        _l.MitigationOrdersDetailView = 'CCFFD249-DC71-4BD7-B5DD-48BCFAB1E537',
        _l.MitigationOrdersDetailEdit = 'BAAAB9F2-8FCB-4EC5-A290-7ACCB5D6F40C',
        _l.MitigationOrdersDetailAdvancedEdit = '33D97A3C-1D6B-4C07-80F7-9A8842735E17',
        _l);
    SamplicityPermission.DataEntryOrder = (_m = /** @class */ (function () {
            function class_12() {
            }
            return class_12;
        }()),
        _m.DataEntryOrderListView = '5CE1DC2F-F395-493B-A625-14F9343379AA',
        _m.DataEntryOrderDetailView = '7C7C4BFB-B2CD-4BC7-B0AF-F8F8E5A08ECD',
        _m.DataEntryOrderDetailEdit = 'F608276A-955E-49CB-88F1-7613318CC913',
        _m);
    SamplicityPermission.Communication = (_o = /** @class */ (function () {
            function class_13() {
            }
            return class_13;
        }()),
        _o.CommunicationListView = '830C78E3-5C31-4476-AAC8-1AF986358886',
        _o.CommunicationDetailView = 'B7FB5C59-E358-4E2C-B6B4-09DB5E11DFBF',
        _o.CommunicationDetailEdit = '49D5E3D2-7D5A-4819-9F94-CF1D77DF9766',
        _o.GenerateDocument = 'DC83B120-9DC2-4F9B-90B4-945A5F4A927B',
        _o.SendEmail = '9F4A631B-E538-4EEE-A01A-23154A9A9366',
        _o.SendFax = '17433EF3-1174-4BA2-A109-CE9C603B2FB8',
        _o.SendMail = '3C8F5544-8AA8-4779-AD0D-A0D5049C136F',
        _o.CommunicationDetailInvestigateAOC = 'AEB71484-8556-4FE3-B37E-3510C604C825',
        _o.ResendOrderCommunication = '84F5AA0D-BF6D-42EE-9D5C-D9D9C277E0D8',
        _o);
    SamplicityPermission.Offer = (_p = /** @class */ (function () {
            function class_14() {
            }
            return class_14;
        }()),
        _p.OfferListView = '05638A08-3754-4336-952F-DC2E0619C82C',
        _p.OfferDetailView = 'E9CF2786-63D7-439A-BD6A-1C920D391F9C',
        _p.OfferResendSrf = '1250BFCD-30E4-4594-8454-77605645A295',
        _p.OfferGenerateData = '0D9A9A20-F69D-4AA7-8F3E-31B66936F57B',
        _p.OfferUploadFile = 'D857B53C-8ED5-4B9B-9C29-526E37966155',
        _p);
    SamplicityPermission.Dashboard = (_q = /** @class */ (function () {
            function class_15() {
            }
            return class_15;
        }()),
        _q.DashboardView = 'C2E2A87D-5D5D-412F-8BF7-0762F4330EB0',
        _q);
    SamplicityPermission.Reporting = (_r = /** @class */ (function () {
            function class_16() {
            }
            return class_16;
        }()),
        _r.ReportsView = '75FBFDDB-ACA4-4657-B093-48D36D2A3C06',
        _r);
    SamplicityPermission.NavMapping = [
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
    return SamplicityPermission;
}());
export { SamplicityPermission };
//# sourceMappingURL=permissions.js.map