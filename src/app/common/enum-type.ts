export class TableExtendType {
  public static Bracket = 0;
  public static Count = 1;
  public static NextLine = 2;
  public static AddValue = 3;
  public static LeadingZero = 4;
  public static CommaSeparated = 5;
}

export class ValidationState {
  public static Pristine = 'Pristine';
  public static Valid = 'Valid';
  public static Error = 'Error';
  public static Warning = 'Warning';
}

export class LostInTransitEvent {
  public static AODReceived = 'AOD Received';
  public static NonDeliveredReturnReceived = 'Non-Delivered Return Received';
  public static ValidAOCReceived = 'Valid AOC Received';
  public static HCPReturnReceived = 'HCP Return Received';
}