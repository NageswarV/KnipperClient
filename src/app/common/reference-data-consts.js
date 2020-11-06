var ReferenceData = /** @class */ (function () {
    function ReferenceData() {
    }
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    ReferenceData.ContactMethodType = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.Phone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase(),
        _a.Fax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase(),
        _a.Email = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase(),
        _a);
    ReferenceData.ReferenceType = (_b = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _b.productType = 'productType',
        _b.prodyctStatus = 'productStatus',
        _b.productDistributionUom = 'productDistributionUom',
        _b);
    ReferenceData.DNH = (_c = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _c.AocNonCompliant = '6b78b1fe-8373-4848-b2d5-8f9bc2d4644f'.toLowerCase(),
        _c.ClientRequestBrandExclusion = 'D18D104A-8430-497D-BFAE-11529DA1689A'.toLowerCase(),
        _c.HCPClientLevelOptOut = '3BD6F7DF-3F11-41E0-8E21-2118F2DAE9BA'.toLowerCase(),
        _c.ClientRequest = 'C1B9A488-64FD-4F87-8D9D-36D605EAD995'.toLowerCase(),
        _c.HCPProgramOutboundOptOut = '68BC93DB-389D-4900-A919-74DD702D9DE3'.toLowerCase(),
        _c.HCPProgramLevelOptOut = 'CA571610-A071-4502-AD4B-D76C3C6A4A0D'.toLowerCase(),
        _c.ClientRequestProductExclusion = '52982007-8B39-49AF-8C3B-EFC2047A969F'.toLowerCase(),
        _c);
    ReferenceData.HCP = (_d = /** @class */ (function () {
            function class_4() {
            }
            return class_4;
        }()),
        _d.HcpContactMethodEmail = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase(),
        _d.HcpContactMethodPhone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase(),
        _d.HcpContactMethodFax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase(),
        _d);
    ReferenceData.Program = (_e = /** @class */ (function () {
            function class_5() {
            }
            return class_5;
        }()),
        _e.ProgramTypeDtp = '8E2DAF22-7F31-47AE-A4FD-4A13B8D3D266'.toLowerCase(),
        _e.ProgramContactMethodEmail = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase(),
        _e.ProgramContactMethodPhone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase(),
        _e.ProgramContactMethodFax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase(),
        _e.ProgramContactRoleProgramManager = 'C7F1CD96-75CA-4441-9209-41F8F34FA9DC'.toLowerCase(),
        _e.ProgramContactRoleProgramCoordinator = 'D0E9873C-2F24-4066-A9CA-8571A45349FF'.toLowerCase(),
        _e.ProgramContactRoleSeniorProgramCoordinator = 'FA5259D1-EA7F-4C89-A949-865114B64707'.toLowerCase(),
        _e.ProgramContactRoleAccountManager = '8C2184DB-B0CB-4610-B3CA-BED8E533D6C7'.toLowerCase(),
        _e);
    ReferenceData.OrderSourceType = (_f = /** @class */ (function () {
            function class_6() {
            }
            return class_6;
        }()),
        _f.Paper = '4AEA4C82-8795-4296-95A0-B79EBD00C0D8'.toLowerCase(),
        _f.Sfa = '10AD1893-F679-41AC-BCCB-3DF51C5892A3'.toLowerCase(),
        _f);
    ReferenceData.OrderStatus = (_g = /** @class */ (function () {
            function class_7() {
            }
            return class_7;
        }()),
        _g.Cancelled = 'B7B01D07-2FF1-47AD-91DA-E4EFA86268A3'.toLowerCase(),
        _g.Exception = 'B3E0B97F-C336-4F43-9499-2E794569D2C0'.toLowerCase(),
        _g.LostInTransit = '4D0E4AB9-A707-4251-BE10-606CC25A4432'.toLowerCase(),
        _g.LostInTransitPartial = 'BFF860BA-7038-4B8C-B2F4-F75F634B5F15'.toLowerCase(),
        _g.OnHold = 'CD29278D-4B8C-49FC-A568-463010B30A6F'.toLowerCase(),
        _g.PotentialLostInTransit = '94A14FC4-B265-438A-81C9-76788C5ADEF0'.toLowerCase(),
        _g.Rejection = '5D3887CE-FB5E-45D6-8FD3-87899ABC1E66'.toLowerCase(),
        _g.Split = 'FBD6C36F-B126-4791-9F66-4FEDE997E77B'.toLowerCase(),
        _g.BackOrdered = '4E5C1345-EF82-4B41-8041-D07E3B9CCF98'.toLowerCase(),
        _g.Returned = 'E41C563A-F191-43FB-B257-A38316269243'.toLowerCase(),
        _g.ExceptionExpired = '28DEA73E-3425-4F23-89AA-05804163509B'.toLowerCase(),
        _g.New = '78DE603D-BBD0-4999-BF74-7529287EBAF0'.toLowerCase(),
        _g.QueuedForWms = 'DB7DF97C-2FB6-4154-9DA0-E9FF16E176D6'.toLowerCase(),
        _g.ReadyForShipment = '628699DC-1977-4CAE-9239-C8F1D842D0D4'.toLowerCase(),
        _g.Delivered = 'BF033991-1376-4335-8969-A568AAA833CC'.toLowerCase(),
        _g.Shipped = 'E0C20C6C-7428-4463-A2E3-93A4A5690353'.toLowerCase(),
        _g.InProcess = '91A6F01C-B3AF-4664-963B-9097C62A26A2'.toLowerCase(),
        _g.SelectDayVerification = 'CEB7D055-0401-46CA-83C8-82341B3DDCC7'.toLowerCase(),
        _g.Received = '33BCAF59-B556-4617-B09C-61CCFDA2B48B'.toLowerCase(),
        _g.PassedValidation = '5E7FA112-05CF-4C16-B6B4-599CEE8316CE'.toLowerCase(),
        _g.AocReceived = '7E4198B5-EE3C-456A-9C16-48736B71C7A6'.toLowerCase(),
        //static readonly DataEntryAudit = '8AA61532-9CDE-453C-A6DA-3222AD6D1067'.toLowerCase();
        _g.PendingDataEntry = '897C191E-3C61-4908-A413-C51C648E258A'.toLowerCase(),
        _g.CopiedToExceptionOrder = '125DEF93-199D-4DDC-B8CE-1CCC6230B057'.toLowerCase(),
        _g);
    ReferenceData.CommunicationTypes = (_h = /** @class */ (function () {
            function class_8() {
            }
            return class_8;
        }()),
        _h.ORDER_REQUEST_SVL = 'C423D9A6-BCD5-41E1-ABCC-08EA63EE7229'.toLowerCase(),
        _h.ORDER_SHIPPED_NOTIFICATION = '43C13526-987A-4F40-9EF3-1022E1F5B141'.toLowerCase(),
        _h.BlankSRF = 'EB561C78-84AB-48BE-8C64-231A4F4D3287'.toLowerCase(),
        _h.BLACKOUT_HOLD_NOTIFICATION = '879C68F5-BD98-4546-995F-274249BA45CB'.toLowerCase(),
        _h.EAOC = '7C7F6194-A0A2-4B1D-9D84-3D44C228E573'.toLowerCase(),
        _h.SRF = 'DB3F7CD0-0E82-4D76-83AF-8FDA771CDA81'.toLowerCase(),
        _h.AOC_SVL = 'D0D39742-EB1A-4B83-92C5-9DA8E8D8BDD1'.toLowerCase(),
        _h.EXCEPTION_LETTER = 'CB2EB10D-A667-4E45-84E6-CB9918CA2C27'.toLowerCase(),
        _h.AOC_PACKING_SLIP = 'C9F8CE17-DCDA-4C50-A90C-D476577B4E52'.toLowerCase(),
        _h.REJECTION_LETTER = 'ECAE7779-BB45-4E7E-A2C3-EABF179DDDC8'.toLowerCase(),
        _h.AOC_FOLLOWUP_LETTER_FIRST_SECOND = '34D07263-B01D-4F6F-BB2D-D6C94526A017'.toLowerCase(),
        _h.AOC_FOLLOWUP_LETTER_FINAL = '6A8ED428-BCCD-4849-A14C-F5E5D9228835'.toLowerCase(),
        _h);
    ReferenceData.OrderStatusReasonType = (_j = /** @class */ (function () {
            function class_9() {
            }
            return class_9;
        }()),
        _j.SLN_ERROR = 'C799886D-A350-40DB-92DF-269C48BE0A9E'.toLowerCase(),
        _j.CANCELED_IN_WMS = 'DE325D1E-85FC-4693-9DA0-31156479C565'.toLowerCase(),
        _j.SECONDARY_AUTHORIZATION_NUMBER_ERROR = 'BC4664AB-5018-4B9B-B58B-3BDF32F5EB07'.toLowerCase(),
        _j.MISSING_KID = 'DD119E52-7506-4651-9C8B-5232B615BF25'.toLowerCase(),
        _j.MANUAL_ADDRESS_FIX_REQUIRED = '7046DD2A-8C23-4231-BDBA-82B6F8DE5457'.toLowerCase(),
        _j.INVENTORY_SHORTAGE = 'ACE2CA47-2BD7-4303-B29E-8D4010DC0DD5'.toLowerCase(),
        _j.RESTRICTIVE_CONDITION_ERROR = '7BA76D7C-7F43-4716-8289-9BBA6501DA7D'.toLowerCase(),
        _j.DEA_NARCOTIC_NUMBER_ERROR = '2A89B2AE-8C63-4DDC-8A24-9E9DABCC51E6'.toLowerCase(),
        _j.MANUAL_CANCELATION = '0003B653-566E-465C-BAC4-A7D8BBD63ECB'.toLowerCase(),
        _j.AOC_LIMIT_EXCEEDED = 'E5ADB694-CE31-49C1-B0C3-C06EE394358E'.toLowerCase(),
        _j.BLACKOUT_HOLD = '41BABB45-A350-43A1-98DC-E50B238AEE63'.toLowerCase(),
        _j.MISSING_VALUE_ON_ORDER = '34AD138B-FCE7-4115-A11B-EE6CCA729B4D'.toLowerCase(),
        _j.CREATED = '578E59C1-0AC2-4C62-922D-3F26DD112708'.toLowerCase(),
        _j.INACTIVE_HCP = 'B6E567A6-FF97-4A87-8696-BED9CA8E9F9C'.toLowerCase(),
        _j.PENDING_HCP_REACTIVATION = 'b50a4740-029a-4645-9602-fd7d99f07b1f'.toLowerCase(),
        _j);
    ReferenceData.LetterTemplateType = (_k = /** @class */ (function () {
            function class_10() {
            }
            return class_10;
        }()),
        _k.SRF = '8BE4BEC3-EEC2-403C-BB57-F993C44BC8DD'.toLowerCase(),
        _k.ExceptionLetter = '6F2F0DF6-F2D5-44B1-8D3D-3221C6B688E0'.toLowerCase(),
        _k.RejectionLetter = 'F82792AF-C437-4C7B-BD4D-EAF8BD8A0DE1'.toLowerCase(),
        _k.AOCFollowUpLetterFirstSecond = '0B3149D3-4F6E-4087-9973-F38EED51E732'.toLowerCase(),
        _k.AOCFollowUpLetterFinal = 'FCE4DA5C-0338-4B84-93D7-798DB44A8E15'.toLowerCase(),
        _k.OrderRequestSVLPaper = '4B093F0A-9188-4520-951F-42BD76205137'.toLowerCase(),
        _k.OrderRequestSVLElectronic = 'E55341D7-5C19-4F62-B14D-BEF6E5AA2EEA'.toLowerCase(),
        _k.OrderRequestSVLMsc = 'AC39C4EC-21A3-4756-94D0-A32267E15E52'.toLowerCase(),
        _k.AOCSVLPaper = 'DBFF6317-2D5C-4506-8E59-0C3216AC9FDF'.toLowerCase(),
        _k.AOCSVLElectronic = 'BF984899-1F2C-42D2-B745-A577A4A22BD6'.toLowerCase(),
        _k);
    return ReferenceData;
}());
export { ReferenceData };
//# sourceMappingURL=reference-data-consts.js.map