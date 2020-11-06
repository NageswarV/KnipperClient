var ClassificationValues = /** @class */ (function () {
    function ClassificationValues() {
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17;
    ClassificationValues.LogType = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.LOG_IN = '5A810E06-5140-454F-847B-F6BD615A7489'.toLowerCase(),
        _a.LOG_OUT = 'B278BDBF-E412-4177-9420-AB3B89947BA7'.toLowerCase(),
        _a.SESSION_TIME_OUT = 'E7734AEC-43BD-4AA4-B5F0-469E5EACE992'.toLowerCase(),
        _a);
    // Tenant module types
    ClassificationValues.TENANT_MODULE_TYPE_DTP = '92961C8F-9811-4DD3-8AD8-8B978D84BDAD'.toLowerCase();
    ClassificationValues.TENANT_MODULE_TYPE_REPCENTER = '5FAB170A-7887-4AF8-B355-CF50B2093C4F'.toLowerCase();
    ClassificationValues.TENANT_MODULE_TYPE_FGPORTAL = 'DB28A63A-30CA-422A-A8B3-92838DDA7B71'.toLowerCase();
    // Tenant module statuses
    ClassificationValues.TENANT_MODULE_STATUS_ACTIVE = 'F06E83A4-5CA3-4CB0-AF87-8787509D61D2'.toLowerCase();
    ClassificationValues.TENANT_MODULE_STATUS_INACTIVE = '1D80CAA8-0C51-48A0-8066-DAABBF4903A7'.toLowerCase();
    ClassificationValues.TENANT_MODULE_STATUS_NEW = '3EAAF273-FC40-4F5B-A8AD-E06E58EF7088'.toLowerCase();
    // SLN Validation Source
    ClassificationValues.VALIDATION_SOURCE_CLIENT = '708DEE1C-40C1-4693-B0E7-10E7331D37FB'.toLowerCase();
    ClassificationValues.VALIDATION_SOURCE_ASSURE = 'B47529C5-D7A9-4AB3-BE28-6544C416361C'.toLowerCase();
    // Tenant Attachment Type
    ClassificationValues.TENANT_ATTACHMENT_TYPE_LOGO_IMAGE = 'E961143A-E027-4DE5-B38E-76415F6BFCC9'.toLowerCase();
    ClassificationValues.PRODUCT_GROUP_KNIPPER_STOCK = 'FA5C304B-1AF8-4EC2-BE74-F92592E95989'.toLowerCase();
    // Product Types
    ClassificationValues.PRODUCT_TYPE_LITERATURE = '4210467C-4B99-4EE3-8B28-7C9692D9132F'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_CONTROLLED_RX_DRUG = '3A896803-C36A-47BD-B358-72B72270CA23'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_OTC = '372E6BFD-28D1-4DE9-8040-76D785AEE2B4'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_NON_CONTROLLED_DRUG = '3E9434E3-614C-496E-9B0A-FF4CB1920755'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_MEDICAL_DEVICE = '8C2F7BFD-CB2D-4F8F-904B-63A64EDFFD86'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_OTHER = '612BE672-90B4-4B23-BE25-69AA1E94D10D'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_CO_PAY_CARD = '77B09834-739B-4094-A46A-C86A54344215'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_MEDICAL_FOOD = '6BA49E66-113A-4B9A-8CAA-7A1E5506ABB1'.toLowerCase();
    ClassificationValues.PRODUCT_TYPE_NON_MEDICAL_FOOD = '0608E53A-DF00-4A57-B7AF-DB9BA7228D71'.toLowerCase();
    // Do Not Honor Sources
    ClassificationValues.DNH_SOURCE_PHONE = 'FD158FBA-6DF8-4619-9E7A-B8CF7AEAAFAF'.toLowerCase();
    ClassificationValues.DNH_SOURCE_MAIL = 'BE2CB89A-D095-4C1B-BCDD-8CA6713DCFBE'.toLowerCase();
    ClassificationValues.DNH_SOURCE_EMAIL = '1E9F2057-A53D-497E-9F8D-6722217D39C8'.toLowerCase();
    ClassificationValues.DNH_SOURCE_FILE = 'CA5A5C46-218C-428A-BAB8-B03C4E21DF3B'.toLowerCase();
    ClassificationValues.DNH_SOURCE_FAX = '0CAB688D-E8B2-4D72-9CB7-BF6C20BF3EAF'.toLowerCase();
    // Unit of Measure Type Id
    ClassificationValues.PRODUCT_UNIT_OF_MEASURE_TYPE = '5ADDDFF2-1D67-4936-B142-C97C7E81FAA4'.toLowerCase();
    // Follow-Up Letter Count Type
    ClassificationValues.FOLLOW_UP_LETTER_COUNT_TYPE = 'CA1813FD-E274-4193-93C9-A177549FECD4'.toLowerCase();
    // Follow-Up Letter Type
    ClassificationValues.FOLLOW_UP_LETTER_TYPE = '04A6761B-E5F1-42A2-A515-67B069E1672E'.toLowerCase();
    // Client Priority Type
    ClassificationValues.CLIENT_PRIORITY_TYPE = '2999B1FC-718A-412E-9BCC-012FFA7E157B'.toLowerCase();
    // Communication Statuses
    ClassificationValues.SENT = '641AA164-FEB6-4D1B-A396-337742A7A89F'.toLowerCase();
    ClassificationValues.PENDING = '3B88987F-4802-4435-84F5-4CD825B6A78C'.toLowerCase();
    ClassificationValues.ERROR = '6437D2FE-B922-43E5-8062-DCFB411D3118'.toLowerCase();
    ClassificationValues.CORRESPONDENCE_FAILED = 'A5C6E4D8-AC98-4714-BA7E-158545F1259E'.toLowerCase();
    ClassificationValues.NON_DELIVERED = 'EF0290C3-CD57-42AE-ADDD-9B98F03C5BE5'.toLowerCase();
    ClassificationValues.RECEIVED = '254C88E2-B2AE-469C-89B9-08E69ADBA1BB'.toLowerCase();
    ClassificationValues.OfferActivityType = (_b = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _b.NON_DELIVERED = '0E05DBD5-BAD5-4222-BC40-EABD57A8C707',
        _b);
    ClassificationValues.HcpStatus = (_c = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _c.Active = '5BDA2F06-580D-4669-870C-5128DFE6A607'.toLowerCase(),
        _c.Inactive = 'A48F76BF-D2B9-4194-80DF-1DAD3209467A'.toLowerCase(),
        _c);
    ClassificationValues.DocumentStatus = (_d = /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        _d.Created = '45C50DF3-24FB-4E66-842A-0E08BA2B8CAE'.toLowerCase(),
        _d.Error = '676BB75E-402A-4613-AD51-59923F6EE066'.toLowerCase(),
        _d.In_Process = 'AC1D51BF-0202-496A-93A0-6CB432F58DDA'.toLowerCase(),
        _d.Under_Investigation = '59E91174-B47F-47D4-B076-431BB9554C75'.toLowerCase(),
        _d.Valid_AOC = '4D77EF2D-BBA7-415A-AA90-7AED805DA970'.toLowerCase(),
        _d.Invalid_AOC = '994CA882-1CF3-4F5B-A0ED-4C374C3CA6B2'.toLowerCase(),
        _d.Inconclusive_SVL = '3CA81238-A8F8-433C-BE65-16700BFE2A03'.toLowerCase(),
        _d.Positive_SVL = '172C0C36-5326-4C70-B035-DB720C71B5DD'.toLowerCase(),
        _d.Negative_SVL = '72E9F3C1-46E4-4BB7-AAC4-21B901454B97'.toLowerCase(),
        _d.Valid = '1D3C7487-3EEE-4CCE-9D21-0BD2F20D20CA'.toLowerCase(),
        _d);
    // Offer Statuses
    ClassificationValues.OFFER_STATUS = (_e = /** @class */ (function () {
            function class_5() {
            }
            return class_5;
        }()),
        _e.NEW = '205F13EF-B04F-4D4B-98FB-96A4D54DBED6'.toLowerCase(),
        _e.IN_PROCESS = '747AD3A9-2EBE-4C91-BB50-5BA2BF03B0ED'.toLowerCase(),
        _e.PENDING = '83AAE70E-4534-4E2B-B839-DDD82BDFF184'.toLowerCase(),
        _e.SRF_RECEIVED = 'E88FE4F8-6B2E-4D3C-9F5E-EF89455071C6'.toLowerCase(),
        _e.SPLIT = '9D78CDA9-AD0E-46DB-AEA1-DAC83D3CC400'.toLowerCase(),
        _e.SRF_GENERATION_ERROR = '8CB9AE85-659E-4DDD-8CCC-C2587A8AA60F'.toLowerCase(),
        _e.CORRESPONDENCE_FAILED = '70EABE90-9571-43CD-932A-6529A4F6DDC3'.toLowerCase(),
        _e.NONDELIVERED = '15ED07EF-8623-44D9-9B0E-F2D79C60703C'.toLowerCase(),
        _e.BAD_ADDRESS = 'CE65CCF3-98E3-4F63-B74D-1B35CFA921ED'.toLowerCase(),
        _e);
    ClassificationValues.CommunicationActivity = (_f = /** @class */ (function () {
            function class_6() {
            }
            return class_6;
        }()),
        _f.COMMENT = 'E9ECD694-D142-4ED6-8B91-C215FCD4CDCF'.toLowerCase(),
        _f.ORDER_CREATED_SRF = 'A5E1D4A3-71F2-4890-9510-47A4A8D6EB2D'.toLowerCase(),
        _f.NEW_QUEUED_VIA_EMAIL = 'BFB582F6-7555-4B0D-89D6-31A2AC6511AE'.toLowerCase(),
        _f.NEW_QUEUED_VIA_FAX = '734A209D-0AA6-4663-AB09-4DF405F2C85D'.toLowerCase(),
        _f.RESEND_VIA_FAX = '4251E939-F601-45C2-AE5D-4EFE58397A42'.toLowerCase(),
        _f.NEW_QUEUED_RESEND_EMAIL = 'B40965FD-8F28-473E-B706-624432C7F244'.toLowerCase(),
        _f.RESEND_VIA_EMAIL = 'F125F3EC-F447-40E5-83ED-82D032F9E8E5'.toLowerCase(),
        _f.OUTBOUND_RESEND_VIA_EMAIL = 'F077B878-8986-4ADE-A3F2-A5D4F232A594'.toLowerCase(),
        _f.RETURNED_NON_DELIVERED = '9C1C9841-F922-4AB7-91F4-FAB59A97FDEF'.toLowerCase(),
        _f.AOC_DOR_DOCUMENT_GENERATED = '182E2271-8F39-4BB0-A969-CDDC8ED40D37'.toLowerCase(),
        _f);
    ClassificationValues.Direction = (_g = /** @class */ (function () {
            function class_7() {
            }
            return class_7;
        }()),
        _g.INBOUND = '020673EC-7674-4CA1-AB79-6B94EAC34859'.toLowerCase(),
        _g.OUTBOUND = 'CE6C0494-DF3B-47EC-BC56-E55DD9397B2B'.toLowerCase(),
        _g);
    ClassificationValues.ProgramStatus = (_h = /** @class */ (function () {
            function class_8() {
            }
            return class_8;
        }()),
        _h.ACTIVE = '2AC28740-75BC-4E56-BD50-D2605AEC170F'.toLowerCase(),
        _h.INACTIVE = 'EE427847-D371-41AF-B798-992F3DDB7218'.toLowerCase(),
        _h.CANCELLED = '60A8FADC-D1CD-4FB1-BF96-FF7628E93B31'.toLowerCase(),
        _h.INSETUP = '1C013797-397B-4294-896C-56F71E22C84C'.toLowerCase(),
        _h.SHUTTINGDOWN = 'CC20A14C-916E-4AA8-B980-9C7BA164ADA4'.toLowerCase(),
        _h);
    ClassificationValues.ProgramConfigurationStatus = (_j = /** @class */ (function () {
            function class_9() {
            }
            return class_9;
        }()),
        _j.DRAFT = '8FEA265A-27A1-4742-85A6-B2744C555B94'.toLowerCase(),
        _j.DELETED = '42C45433-DCF0-4CD3-8C99-EE82835DBE75'.toLowerCase(),
        _j.LIVE = '1568EFB2-34AA-42FF-B33B-AF5F60C08F63'.toLowerCase(),
        _j.RETIRED = '4447B214-378A-4809-B24D-A7B300785A55'.toLowerCase(),
        _j);
    ClassificationValues.ProgramSlnValidationSource = (_k = /** @class */ (function () {
            function class_10() {
            }
            return class_10;
        }()),
        _k.KNIPPER = '880E3A6F-F047-4721-9DDA-EEBC444C6F2F'.toLowerCase(),
        _k.CLIENT = '41980412-C680-4CDA-A430-754E1A99312E'.toLowerCase(),
        _k);
    ClassificationValues.ProgramSrfGenerator = (_l = /** @class */ (function () {
            function class_11() {
            }
            return class_11;
        }()),
        _l.KNIPPER = '300C5399-0A73-4D84-BEDA-6034D634E3A1'.toLowerCase(),
        _l.CLIENT3RDPARTY = 'C971D189-3959-4F59-A6C4-C21993E8EE0D'.toLowerCase(),
        _l);
    ClassificationValues.ProgramSrfSource = (_m = /** @class */ (function () {
            function class_12() {
            }
            return class_12;
        }()),
        _m.OFFER = '9B23AEDC-D4B7-4523-9E30-73C82DFF11DD'.toLowerCase(),
        _m.TARGET = '9EC1F2EE-BEF9-4B96-B5B3-6E0E536CF9E4'.toLowerCase(),
        _m);
    ClassificationValues.ProgramSrfType = (_o = /** @class */ (function () {
            function class_13() {
            }
            return class_13;
        }()),
        _o.BLANK = 'AAFA352C-A324-4AF4-A12A-77337B2707CD'.toLowerCase(),
        _o.PREFILLED = '91F059D5-B87A-456F-9629-F058AEBCF465'.toLowerCase(),
        _o);
    ClassificationValues.ProgramOfferType = (_p = /** @class */ (function () {
            function class_14() {
            }
            return class_14;
        }()),
        _p.STATIC = 'F1703A6F-BDF1-4D09-812B-670A707121EF'.toLowerCase(),
        _p.DECILE = '27675D0A-0CAE-408E-862F-22A4D45E0DCD'.toLowerCase(),
        _p);
    ClassificationValues.ProgramDecile = (_q = /** @class */ (function () {
            function class_15() {
            }
            return class_15;
        }()),
        _q.DECILE_1 = '0F4DC041-F28B-4048-AB84-2C78A02986A8'.toLowerCase(),
        _q.DECILE_2 = 'D07AADA2-BB8E-4874-9912-397D16DE5212'.toLowerCase(),
        _q.DECILE_3 = 'EDB43D65-A830-4035-A944-66F005B2CEE1'.toLowerCase(),
        _q.DECILE_4 = 'D9CD02B7-3AAA-42C5-9CD8-1EA722E5A6E1'.toLowerCase(),
        _q.DECILE_5 = '43A74DCF-E7A9-4B40-8104-B00597DFDA9A'.toLowerCase(),
        _q.DECILE_6 = '3117A4E3-93BE-4FA4-BCD1-F81BC886FA54'.toLowerCase(),
        _q.DECILE_7 = 'DF105A62-9515-4A5B-95DE-515E162862C5'.toLowerCase(),
        _q.DECILE_8 = 'A27ECB66-8BB1-4DCC-864F-B5658FD3A8F9'.toLowerCase(),
        _q.DECILE_9 = 'D5DFA9E2-F7B4-4D6C-AD0C-AF7B96584289'.toLowerCase(),
        _q.DECILE_10 = '1BE577C0-39C3-45D0-A655-1807B35FECB4'.toLowerCase(),
        _q.DECILE_NT = 'B1CDB69F-94D8-492F-815F-F6595B53F571'.toLowerCase(),
        _q);
    ClassificationValues.ProgramDateRange = (_r = /** @class */ (function () {
            function class_16() {
            }
            return class_16;
        }()),
        _r.NOTAPPLICABLE = 'B51D2723-8339-494E-8B37-B88D307A38D7'.toLowerCase(),
        _r.SPECIFICDATERANGE = '3CF5E3E2-F9F7-4253-B052-A49F7910003B'.toLowerCase(),
        _r.SEASONALDATERANGE = '4D3DA900-27AA-4BA7-B8D7-A33E5EAEA9BA'.toLowerCase(),
        _r);
    ClassificationValues.ProgramQuantityRange = (_s = /** @class */ (function () {
            function class_17() {
            }
            return class_17;
        }()),
        _s.QUANTITYPERORDER = 'F5F9E3CC-319A-4AED-B45C-7FB9290ADC81'.toLowerCase(),
        _s.QUANTITYRANGE = '8B0A5DB8-E59F-4F7A-9801-50A18B9CE74E'.toLowerCase(),
        _s.QUANTITYRATIO = 'DE98A2C8-563F-4455-A61B-53E2AF7C5B44'.toLowerCase(),
        _s);
    ClassificationValues.ProgramInsufficientInventoryAction = (_t = /** @class */ (function () {
            function class_18() {
            }
            return class_18;
        }()),
        _t.FillAndKill = 'E9AE4B9A-0B7E-4D11-8F08-083B9597D1A6'.toLowerCase(),
        _t.CancelOrder = '52A9A851-B383-4EAE-B0D3-300D5DCE1B3D'.toLowerCase(),
        _t.BackOrder = 'CCBE323D-9A88-4030-B96F-7A5643D83FAA'.toLowerCase(),
        _t);
    ClassificationValues.UnlockReason = (_u = /** @class */ (function () {
            function class_19() {
            }
            return class_19;
        }()),
        _u.USER_UNLOCK = '5160f96a-d843-4929-8db1-d1d12892de65'.toLowerCase(),
        _u.ADMIN_UNLOCK = '9e2f3da3-0141-4a33-a0f2-1a4e450165ff'.toLowerCase(),
        _u.EXPIRATION = '1d08cc4a-de7b-4c10-8b63-a32e61399410'.toLowerCase(),
        _u);
    ClassificationValues.FollowUpLetterCount = (_v = /** @class */ (function () {
            function class_20() {
            }
            return class_20;
        }()),
        _v.One = '231D6765-FB57-4A92-84E6-B2CA769B72B6'.toLowerCase(),
        _v.Two = '140D6561-EA5C-488C-AD87-DF5F06B99E6B'.toLowerCase(),
        _v.Three = '9AA83793-E03A-4493-9D98-8BAEB655FEB0'.toLowerCase(),
        _v);
    ClassificationValues.ClientPriorityTier = (_w = /** @class */ (function () {
            function class_21() {
            }
            return class_21;
        }()),
        _w.NoPriority = '6DF94E49-9CCA-4F03-8DF2-37E42D6D40A4'.toLowerCase(),
        _w);
    ClassificationValues.ExpirationGracePeriodType = (_x = /** @class */ (function () {
            function class_22() {
            }
            return class_22;
        }()),
        _x.PriorToExpiration = '76FBE47A-EEDD-4CE1-9F84-78D87D6FEDEF'.toLowerCase(),
        _x.BeyondExpiration = '1BB64AE9-70AB-48DA-9CB0-42E7AA5BE371'.toLowerCase(),
        _x);
    ClassificationValues.AocLimitScope = (_y = /** @class */ (function () {
            function class_23() {
            }
            return class_23;
        }()),
        _y.Program = 'F4F49408-CEB6-46F7-A753-B701795E2F0C'.toLowerCase(),
        _y.Client = '3674A2AE-7CE1-4970-8727-A42239DA7265'.toLowerCase(),
        _y);
    ClassificationValues.SrfFormField = (_z = /** @class */ (function () {
            function class_24() {
            }
            return class_24;
        }()),
        _z.RequestorFirstName = '9025240D-CE38-4D21-8512-3AAB49F757C6'.toLowerCase(),
        _z.RequestorMiddleName = 'C8AFC499-E297-4A93-8EB8-A2D187067C18'.toLowerCase(),
        _z.RequestorLastName = 'D337D491-4171-4F10-8B3D-4A8774EA05F1'.toLowerCase(),
        _z.RequestorStateLicenseNumber = '813A8713-706F-4FF3-A16C-6403958D610D'.toLowerCase(),
        _z.RequestorDeaLicenseNumber = '378D7CB1-20ED-448B-AB3B-D03A0CD3B376'.toLowerCase(),
        _z.RequestorProfessionalDesignation = 'E7D4F7E4-BEAB-448F-BE04-5620FA2875D7'.toLowerCase(),
        _z.RequestorSpecialty = '64FD8F35-60CD-4BD5-B7B7-3BE0E41D7279'.toLowerCase(),
        _z.RequestorCompany = '515B26A3-582B-435A-A46D-2BAF2C4F4AA4'.toLowerCase(),
        _z.RequestorAddressLine1or2 = 'E73AC53C-D618-476F-9CEA-8109DDDD78E5'.toLowerCase(),
        _z.RequestorCity = 'A542CE68-DF53-45AD-9B17-3713BC4D225B'.toLowerCase(),
        _z.RequestorState = 'BF7480DC-6C95-46D7-9139-D3663DA2A90C'.toLowerCase(),
        _z.RequestorZip = 'F2FA18C1-0CDA-4852-8A5A-99551DB0883E'.toLowerCase(),
        _z.RecipientFirstName = '7E33459A-DD7A-41A4-B72B-D906317FAA5D'.toLowerCase(),
        _z.RecipientMiddleName = 'CD18084B-F7AF-40D1-B2CC-E5413A612D1D'.toLowerCase(),
        _z.RecipientLastName = '10B2BE33-97F9-439B-B341-951696F21DC6'.toLowerCase(),
        _z.RecipientStateLicenseNumber = 'AD8F0797-D6BD-4209-89CF-92C89345878D'.toLowerCase(),
        _z.RecipientDeaLicenseNumber = '4FBB4DE0-D563-4E0C-B525-5DAB041315AC'.toLowerCase(),
        _z.RecipientCompany = '0ED71986-99EC-47FB-9A08-88F2C8CA0A47'.toLowerCase(),
        _z.RecipientAddressLine1and2 = 'BA563BF8-6820-4B98-9159-719EB148907D'.toLowerCase(),
        _z.RecipientCity = '6C83F5AB-2723-4FAF-9CC9-D286F626F4DB'.toLowerCase(),
        _z.RecipientState = '55FF1768-FF90-4EB0-B654-B3E787643D3C'.toLowerCase(),
        _z.RecipientZip = '07E7D15D-3E50-4F6C-B27F-1C7261352F8E'.toLowerCase(),
        _z.Product = 'BB28B509-E9A8-4793-8FD0-08C66BE50600'.toLowerCase(),
        _z.Quantity = '73A9033C-7029-41E2-802F-4DC2CCE8FE3E'.toLowerCase(),
        _z.Signature = 'E32B07D1-B425-473B-9780-96C08326A735'.toLowerCase(),
        _z.SignedDate = '17894056-74EC-436D-A233-DB0F1A2D3A96'.toLowerCase(),
        _z);
    ClassificationValues.TimePeriodType = (_0 = /** @class */ (function () {
            function class_25() {
            }
            return class_25;
        }()),
        _0.Calendar = 'EE31C2B5-226E-469F-9BEC-4FE8A3B6F84A'.toLowerCase(),
        _0.Rolling = '0DBEE333-A55F-4202-B7E4-84DF3771E2C7'.toLowerCase(),
        _0);
    ClassificationValues.TimePeriodUnit = (_1 = /** @class */ (function () {
            function class_26() {
            }
            return class_26;
        }()),
        _1.Days = '37ED5952-A7C7-4096-975D-8CA241ECCA86'.toLowerCase(),
        _1.Months = '2E06D4FD-172B-43F5-A6D8-948FF53D3467'.toLowerCase(),
        _1.Years = '060B72AD-4DAD-441A-B18F-1993EF65E263'.toLowerCase(),
        _1);
    ClassificationValues.DocumentTemplateType = (_2 = /** @class */ (function () {
            function class_27() {
            }
            return class_27;
        }()),
        _2.BlankSrfInstitution = '61888DEB-5209-4641-8DDD-D010CF065B59'.toLowerCase(),
        _2.BlankSrfNonInstitution = 'DD1F13E7-F1E3-4703-ABBB-9B5162E980B4'.toLowerCase(),
        _2.SrfInstitution = '1D7C3170-7506-4F52-8703-CEB0CE1F8875'.toLowerCase(),
        _2.SrfNonInstitution = 'C1FE218D-A05B-4718-A051-943110CBEF6C'.toLowerCase(),
        _2.ExceptionLetter = '4EE714C7-CFEC-494D-BA37-1B561A126103'.toLowerCase(),
        _2.RejectionLetter = 'D521835D-D2A5-4C71-AD24-BF45B846B6FA'.toLowerCase(),
        _2.BlackoutHoldNotification = '73DB5E44-06AD-4FE1-A9DC-E650FB6771D7'.toLowerCase(),
        _2.OrderShippedNotification = '93189754-4C04-4F8F-B374-EB6FB6F02116'.toLowerCase(),
        _2.AOCPackingSlip = '6B6E2C4F-7DE2-4BD8-9325-0A8591FE5F0C'.toLowerCase(),
        _2.EAOC = '9D5C1820-F950-4E40-B00F-656BB94F8FC3'.toLowerCase(),
        _2.FirstSecondAocFollowUpLetter = '6B12B475-A991-4258-8F6B-583884C085AD'.toLowerCase(),
        _2.FinalAocFollowUpLetter = '6BC339F8-5626-411A-92C7-17A7DC233E80'.toLowerCase(),
        _2.OrderDor = '40810829-9A1A-46E6-ADC1-FF495D674C8E'.toLowerCase(),
        _2.OrderRequestSvlElectronic = 'F4DC489D-FA53-439D-847B-0745B6B8D939'.toLowerCase(),
        _2.OrderRequestSvlPaper = 'E718CB65-61EE-49A2-893D-BEF6D761F8D0'.toLowerCase(),
        _2.OrderRequestSvlMsc = '3EA22409-E374-4D4B-941F-95AD460A8054'.toLowerCase(),
        _2.AocSvlElectronic = '2CAF28BD-16C7-4E8E-9A94-23B87DE9B484'.toLowerCase(),
        _2.AocSvlPaper = 'D2293B08-76FB-45FC-8B47-8EE33324A3B9'.toLowerCase(),
        _2);
    ClassificationValues.OrderAttachmentType = (_3 = /** @class */ (function () {
            function class_28() {
            }
            return class_28;
        }()),
        _3.Mitigation = 'F5B04399-D7AB-44F0-A369-DAF3E01ED219'.toLowerCase(),
        _3.Srf = 'B8AFCCE5-1C7F-4FD7-9F3B-BAED69562266'.toLowerCase(),
        _3.Dor = 'B3600251-7EBC-4B07-B3EA-FB62421E0280'.toLowerCase(),
        _3);
    ClassificationValues.RuleFailureType = (_4 = /** @class */ (function () {
            function class_29() {
            }
            return class_29;
        }()),
        _4.Error = 'C9BAC0DE-7B80-48DF-A966-1C4ED20319DB'.toLowerCase(),
        _4.RelatedRule = '1CB75648-BD05-4F14-9CA2-8CDA81A604A5'.toLowerCase(),
        _4);
    ClassificationValues.InvestigationResolution = (_5 = /** @class */ (function () {
            function class_30() {
            }
            return class_30;
        }()),
        _5.Pass = '6DC15CFC-6D1A-4206-AD1D-380A49623497'.toLowerCase(),
        _5.Fail = '23F8154A-215A-444B-BF24-61D4D8485A67'.toLowerCase(),
        _5);
    ClassificationValues.BlackoutHoldReleaseReason = (_6 = /** @class */ (function () {
            function class_31() {
            }
            return class_31;
        }()),
        _6.ClientRequest = 'F734E75A-BEB3-4A59-A681-30F6264696E4'.toLowerCase(),
        _6.AreaNoLongerOnHold = 'D7C8EAFE-210D-4E7D-BB22-A9F4A726589C'.toLowerCase(),
        _6.HcpRequest = 'E4963C15-6DDA-4B30-9A7B-465AD3D5512E'.toLowerCase(),
        _6.Other = '28B1BE50-BF29-4A94-AEB0-403C039C4732'.toLowerCase(),
        _6);
    ClassificationValues.DeliveryStatus = (_7 = /** @class */ (function () {
            function class_32() {
            }
            return class_32;
        }()),
        _7.Shipped = '6A824A1B-72FC-40BF-B995-A1EA1B475D0B'.toLowerCase(),
        _7.Delivered = '26339619-2FA4-40FB-A98A-4E5B2A861EA5'.toLowerCase(),
        _7.PotentialLostInTransit = 'E3BE6AB3-7579-49BB-AB3F-E623E1C8CC84'.toLowerCase(),
        _7.LostInTransit = '830A2F0D-7249-4C86-A51B-08C3D1370409'.toLowerCase(),
        _7.Returned = '64D14123-CD55-4937-A1AF-3487E976EF1F'.toLowerCase(),
        _7);
    ClassificationValues.AocInvestigationReason = (_8 = /** @class */ (function () {
            function class_33() {
            }
            return class_33;
        }()),
        _8.HandwrittenNotes = '7FAE4A6C-AF10-45DE-B89C-05686EEB04DE'.toLowerCase(),
        _8.MissingShipment = 'F465A052-E15A-488D-9BE9-023F8C07AE1F'.toLowerCase(),
        _8.MismatchQuantity = 'D02F43DF-5FA1-4BAC-80BF-0ABF2ACEA44F'.toLowerCase(),
        _8);
    ClassificationValues.ProgramLogoAttachmentSource = (_9 = /** @class */ (function () {
            function class_34() {
            }
            return class_34;
        }()),
        _9.BrandDetail = '6A33D12B-2531-49DF-B3A4-735146A3CF1F'.toLowerCase(),
        _9.ConfigurationProfile = 'FC09A8E0-15D5-43EA-B952-9F8AF6F98829'.toLowerCase(),
        _9.ClientDetail = 'C755D4F6-C9E6-4980-8C77-6A3EC5F5C755'.toLowerCase(),
        _9);
    ClassificationValues.CommunicationMethod = (_10 = /** @class */ (function () {
            function class_35() {
            }
            return class_35;
        }()),
        _10.Electronic = '818EBC18-4E3C-4267-B321-47F9A1367E43'.toLowerCase(),
        _10.Fax = '4CCEE22F-1A97-47F5-8C4F-962D89990C81'.toLowerCase(),
        _10.Mail = '6D972F55-D7B7-41C6-928D-A6CB37829BF0'.toLowerCase(),
        _10.Email = '2298E99E-E09F-422A-AD4D-C8281F1F9439'.toLowerCase(),
        _10.Unknown = 'CD9F9E6A-F054-4C47-BCD1-2ECFCA553355'.toLowerCase(),
        _10);
    ClassificationValues.SvlInvestigationReason = (_11 = /** @class */ (function () {
            function class_36() {
            }
            return class_36;
        }()),
        _11.MultipleSelections = '4976A2DD-5DD0-4BF3-BB1C-19442CFE9E22'.toLowerCase(),
        _11.MissingName = '9E8D3916-FD44-4C6B-8306-B55683D7BB22'.toLowerCase(),
        _11.IllegibleName = 'E4E235DB-4273-4AC0-8E00-EE2AC77C622F'.toLowerCase(),
        _11.TitleMissing = '9181CEB8-2699-4AB4-8BC6-E9DF907C5FEC'.toLowerCase(),
        _11.IllegibleTitle = '5AD5DEC0-1387-46D1-870F-232CA76F60CA'.toLowerCase(),
        _11.MissingSignature = 'FDED6E9C-C4B4-440B-AB24-873685AD37BD'.toLowerCase(),
        _11.StampedSignature = '35AB6B3D-046F-4EE3-8715-4D95D402E7D7'.toLowerCase(),
        _11.SignatureMismatch = 'E69C7A4E-4EAE-4617-83A3-F5957EEE7587'.toLowerCase(),
        _11.MissingDate = 'C0FFA4F1-6788-4793-B9C8-068739A46B4F'.toLowerCase(),
        _11.HandwrittenNotes = '572C558F-8F72-453C-9E40-553F359B2D2B'.toLowerCase(),
        _11);
    ClassificationValues.SvlType = (_12 = /** @class */ (function () {
            function class_37() {
            }
            return class_37;
        }()),
        _12.OrderSvl = 'A59A90BC-707E-4E06-B1D9-58FBF63F24CF'.toLowerCase(),
        _12.AocSvl = '998982BE-9A2E-44F1-A80D-62DD3B7E996C'.toLowerCase(),
        _12);
    ClassificationValues.MitigationTierType = (_13 = /** @class */ (function () {
            function class_38() {
            }
            return class_38;
        }()),
        _13.Lookup = '247958BE-7B31-44DD-965E-CE31BC19E7FA'.toLowerCase(),
        _13.Processing = '54BD0562-4066-4072-A046-5984AF211014'.toLowerCase(),
        _13);
    ClassificationValues.PlitInvestigationResult = (_14 = /** @class */ (function () {
            function class_39() {
            }
            return class_39;
        }()),
        _14.Delivered = '71FE671C-F9CA-4B5F-B1FE-8272BFF919DD'.toLowerCase(),
        _14.Lost = 'CADFC91F-B0CF-42F7-9B40-276C7BDA3218'.toLowerCase(),
        _14);
    ClassificationValues.RecipientSender = (_15 = /** @class */ (function () {
            function class_40() {
            }
            return class_40;
        }()),
        _15.SalesRep = '9ABD42BC-55B1-4EF7-A2E0-4672BB7471B8'.toLowerCase(),
        _15.OrderRequestor = 'C3CCF95D-97DD-46C4-9944-D93B034F4082'.toLowerCase(),
        _15.OrderRecipient = 'E4CA5A40-67CB-4727-8B94-B25EF4F8CB05'.toLowerCase(),
        _15);
    ClassificationValues.AllocationItemScope = (_16 = /** @class */ (function () {
            function class_41() {
            }
            return class_41;
        }()),
        _16.Brand = '06A605E5-7E4B-4045-85E0-B71CD06974B4'.toLowerCase(),
        _16.Product = '75B9F3CA-364C-44C6-8E3D-75C37B46C4C1'.toLowerCase(),
        _16);
    ClassificationValues.AllocationType = (_17 = /** @class */ (function () {
            function class_42() {
            }
            return class_42;
        }()),
        _17.Rep = '19846872-BE20-4100-B9D9-779DC54406A3'.toLowerCase(),
        _17.Practitioner = '5E7380D7-B6A6-4879-A7B4-82E52F5E7993'.toLowerCase(),
        _17.Territory = 'F613794F-FCD4-4286-B321-5F9C31E692F3'.toLowerCase(),
        _17);
    return ClassificationValues;
}());
export { ClassificationValues };
//# sourceMappingURL=classification-value.js.map