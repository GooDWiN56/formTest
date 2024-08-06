export interface IPersonData {
    address: string;
    home: string
    lastName: string;
    loanAmount: number;
    loanTerm: number;
    name: string;
    phone: string;
    gender: "Мужской" | "Женский";
    work: string;
}

export interface IDataPages {
    personalData: IPersonData;
    setPersonalData: (prop?: any) => void
}

export interface IDialogSuccess{
    open: boolean;
    setOpen: (prop?: any) => void
    text: string;
}