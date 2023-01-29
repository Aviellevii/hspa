export interface IPropertyBase {
    Id: number;
    SellRent: number;
    Name: string;
    PType: string;
    FType: string;
    Price: number;
    BHK: number;
    BuiltArea: number;
    City: string;
    RTM: boolean;
    Image?: string;
    estPossessionOn?: Date | string;
  }