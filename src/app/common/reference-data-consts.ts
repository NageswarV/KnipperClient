export class ReferenceData {

  static ContactMethodType = class {
    static readonly Phone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase();
    static readonly Fax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase();
    static readonly Email = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase();
  };

  static ReferenceType = class {
      static readonly productType = 'productType';
      static readonly prodyctStatus = 'productStatus';
      static readonly productDistributionUom = 'productDistributionUom';
  };

  static DNH = class {
      static readonly AocNonCompliant = '6b78b1fe-8373-4848-b2d5-8f9bc2d4644f'.toLowerCase();
      static readonly ClientRequestBrandExclusion = 'D18D104A-8430-497D-BFAE-11529DA1689A'.toLowerCase();
      static readonly HCPClientLevelOptOut = '3BD6F7DF-3F11-41E0-8E21-2118F2DAE9BA'.toLowerCase();
      static readonly ClientRequest = 'C1B9A488-64FD-4F87-8D9D-36D605EAD995'.toLowerCase();
      static readonly HCPProgramOutboundOptOut = '68BC93DB-389D-4900-A919-74DD702D9DE3'.toLowerCase();
      static readonly HCPProgramLevelOptOut = 'CA571610-A071-4502-AD4B-D76C3C6A4A0D'.toLowerCase();
      static readonly ClientRequestProductExclusion = '52982007-8B39-49AF-8C3B-EFC2047A969F'.toLowerCase();
  };

  static HCP = class {
    static readonly HcpContactMethodEmail = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase();
    static readonly HcpContactMethodPhone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase();
    static readonly HcpContactMethodFax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase();
  };

  static Program = class {
    static readonly ProgramTypeDtp = '8E2DAF22-7F31-47AE-A4FD-4A13B8D3D266'.toLowerCase();
    static readonly ProgramContactMethodEmail = '2E78F134-131C-4653-96BE-D743A5B31F1D'.toLowerCase();
    static readonly ProgramContactMethodPhone = '34AF76DE-AEC0-4529-8FC9-824250AA56F9'.toLowerCase();
    static readonly ProgramContactMethodFax = 'E411201D-170C-49C8-B0E2-9BEE1535EB23'.toLowerCase();
    static readonly ProgramContactRoleProgramManager = 'C7F1CD96-75CA-4441-9209-41F8F34FA9DC'.toLowerCase();
    static readonly ProgramContactRoleProgramCoordinator = 'D0E9873C-2F24-4066-A9CA-8571A45349FF'.toLowerCase();
    static readonly ProgramContactRoleSeniorProgramCoordinator = 'FA5259D1-EA7F-4C89-A949-865114B64707'.toLowerCase();
    static readonly ProgramContactRoleAccountManager = '8C2184DB-B0CB-4610-B3CA-BED8E533D6C7'.toLowerCase();
  };

  static OrderSourceType = class {
    static readonly Paper = '4AEA4C82-8795-4296-95A0-B79EBD00C0D8'.toLowerCase();
    static readonly Sfa = '10AD1893-F679-41AC-BCCB-3DF51C5892A3'.toLowerCase();
  };

  static OrderStatus = class {
    static readonly Cancelled = 'B7B01D07-2FF1-47AD-91DA-E4EFA86268A3'.toLowerCase();
    static readonly Exception = 'B3E0B97F-C336-4F43-9499-2E794569D2C0'.toLowerCase();
    static readonly LostInTransit = '4D0E4AB9-A707-4251-BE10-606CC25A4432'.toLowerCase();
    static readonly LostInTransitPartial = 'BFF860BA-7038-4B8C-B2F4-F75F634B5F15'.toLowerCase();
    static readonly OnHold = 'CD29278D-4B8C-49FC-A568-463010B30A6F'.toLowerCase();
    static readonly PotentialLostInTransit = '94A14FC4-B265-438A-81C9-76788C5ADEF0'.toLowerCase();
    static readonly Rejection = '5D3887CE-FB5E-45D6-8FD3-87899ABC1E66'.toLowerCase();
    static readonly Split = 'FBD6C36F-B126-4791-9F66-4FEDE997E77B'.toLowerCase();
    static readonly BackOrdered = '4E5C1345-EF82-4B41-8041-D07E3B9CCF98'.toLowerCase();
    static readonly Returned = 'E41C563A-F191-43FB-B257-A38316269243'.toLowerCase();
    static readonly ExceptionExpired = '28DEA73E-3425-4F23-89AA-05804163509B'.toLowerCase();
    static readonly New = '78DE603D-BBD0-4999-BF74-7529287EBAF0'.toLowerCase();
    static readonly QueuedForWms = 'DB7DF97C-2FB6-4154-9DA0-E9FF16E176D6'.toLowerCase();
    static readonly ReadyForShipment = '628699DC-1977-4CAE-9239-C8F1D842D0D4'.toLowerCase();
    static readonly Delivered = 'BF033991-1376-4335-8969-A568AAA833CC'.toLowerCase();
    static readonly Shipped = 'E0C20C6C-7428-4463-A2E3-93A4A5690353'.toLowerCase();
    static readonly InProcess = '91A6F01C-B3AF-4664-963B-9097C62A26A2'.toLowerCase();
    static readonly SelectDayVerification = 'CEB7D055-0401-46CA-83C8-82341B3DDCC7'.toLowerCase();
    static readonly Received = '33BCAF59-B556-4617-B09C-61CCFDA2B48B'.toLowerCase();
    static readonly PassedValidation = '5E7FA112-05CF-4C16-B6B4-599CEE8316CE'.toLowerCase();
    static readonly AocReceived = '7E4198B5-EE3C-456A-9C16-48736B71C7A6'.toLowerCase();
    //static readonly DataEntryAudit = '8AA61532-9CDE-453C-A6DA-3222AD6D1067'.toLowerCase();
    static readonly PendingDataEntry = '897C191E-3C61-4908-A413-C51C648E258A'.toLowerCase();
    static readonly CopiedToExceptionOrder = '125DEF93-199D-4DDC-B8CE-1CCC6230B057'.toLowerCase();
  };

  static CommunicationTypes = class {
    static readonly ORDER_REQUEST_SVL = 'C423D9A6-BCD5-41E1-ABCC-08EA63EE7229'.toLowerCase();
    static readonly ORDER_SHIPPED_NOTIFICATION = '43C13526-987A-4F40-9EF3-1022E1F5B141'.toLowerCase();
    static readonly BlankSRF = 'EB561C78-84AB-48BE-8C64-231A4F4D3287'.toLowerCase();
    static readonly BLACKOUT_HOLD_NOTIFICATION = '879C68F5-BD98-4546-995F-274249BA45CB'.toLowerCase();
    static readonly EAOC = '7C7F6194-A0A2-4B1D-9D84-3D44C228E573'.toLowerCase();
    static readonly SRF = 'DB3F7CD0-0E82-4D76-83AF-8FDA771CDA81'.toLowerCase();
    static readonly AOC_SVL = 'D0D39742-EB1A-4B83-92C5-9DA8E8D8BDD1'.toLowerCase();
    static readonly EXCEPTION_LETTER = 'CB2EB10D-A667-4E45-84E6-CB9918CA2C27'.toLowerCase();
    static readonly AOC_PACKING_SLIP = 'C9F8CE17-DCDA-4C50-A90C-D476577B4E52'.toLowerCase();
    static readonly REJECTION_LETTER = 'ECAE7779-BB45-4E7E-A2C3-EABF179DDDC8'.toLowerCase();
    static readonly AOC_FOLLOWUP_LETTER_FIRST_SECOND = '34D07263-B01D-4F6F-BB2D-D6C94526A017'.toLowerCase();
    static readonly AOC_FOLLOWUP_LETTER_FINAL = '6A8ED428-BCCD-4849-A14C-F5E5D9228835'.toLowerCase();
  };

  static OrderStatusReasonType = class {
    static readonly SLN_ERROR = 'C799886D-A350-40DB-92DF-269C48BE0A9E'.toLowerCase();
    static readonly CANCELED_IN_WMS = 'DE325D1E-85FC-4693-9DA0-31156479C565'.toLowerCase();
    static readonly SECONDARY_AUTHORIZATION_NUMBER_ERROR = 'BC4664AB-5018-4B9B-B58B-3BDF32F5EB07'.toLowerCase();
    static readonly MISSING_KID = 'DD119E52-7506-4651-9C8B-5232B615BF25'.toLowerCase();
    static readonly MANUAL_ADDRESS_FIX_REQUIRED = '7046DD2A-8C23-4231-BDBA-82B6F8DE5457'.toLowerCase();
    static readonly INVENTORY_SHORTAGE = 'ACE2CA47-2BD7-4303-B29E-8D4010DC0DD5'.toLowerCase();
    static readonly RESTRICTIVE_CONDITION_ERROR = '7BA76D7C-7F43-4716-8289-9BBA6501DA7D'.toLowerCase();
    static readonly DEA_NARCOTIC_NUMBER_ERROR = '2A89B2AE-8C63-4DDC-8A24-9E9DABCC51E6'.toLowerCase();
    static readonly MANUAL_CANCELATION = '0003B653-566E-465C-BAC4-A7D8BBD63ECB'.toLowerCase();
    static readonly AOC_LIMIT_EXCEEDED = 'E5ADB694-CE31-49C1-B0C3-C06EE394358E'.toLowerCase();
    static readonly BLACKOUT_HOLD = '41BABB45-A350-43A1-98DC-E50B238AEE63'.toLowerCase();
    static readonly MISSING_VALUE_ON_ORDER = '34AD138B-FCE7-4115-A11B-EE6CCA729B4D'.toLowerCase();
    static readonly CREATED = '578E59C1-0AC2-4C62-922D-3F26DD112708'.toLowerCase();
    static readonly INACTIVE_HCP = 'B6E567A6-FF97-4A87-8696-BED9CA8E9F9C'.toLowerCase();
    static readonly PENDING_HCP_REACTIVATION = 'b50a4740-029a-4645-9602-fd7d99f07b1f'.toLowerCase();
  };

  static LetterTemplateType = class {
    static readonly SRF = '8BE4BEC3-EEC2-403C-BB57-F993C44BC8DD'.toLowerCase();
    static readonly ExceptionLetter = '6F2F0DF6-F2D5-44B1-8D3D-3221C6B688E0'.toLowerCase();
    static readonly RejectionLetter = 'F82792AF-C437-4C7B-BD4D-EAF8BD8A0DE1'.toLowerCase();
    static readonly AOCFollowUpLetterFirstSecond = '0B3149D3-4F6E-4087-9973-F38EED51E732'.toLowerCase();
    static readonly AOCFollowUpLetterFinal = 'FCE4DA5C-0338-4B84-93D7-798DB44A8E15'.toLowerCase();
    static readonly OrderRequestSVLPaper = '4B093F0A-9188-4520-951F-42BD76205137'.toLowerCase();
    static readonly OrderRequestSVLElectronic = 'E55341D7-5C19-4F62-B14D-BEF6E5AA2EEA'.toLowerCase();
    static readonly OrderRequestSVLMsc = 'AC39C4EC-21A3-4756-94D0-A32267E15E52'.toLowerCase();
    static readonly AOCSVLPaper = 'DBFF6317-2D5C-4506-8E59-0C3216AC9FDF'.toLowerCase();
    static readonly AOCSVLElectronic = 'BF984899-1F2C-42D2-B745-A577A4A22BD6'.toLowerCase();
  };
}
