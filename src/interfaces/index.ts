// объект формы
export interface IPersonData {
  address: string;
  home: string;
  lastName: string;
  loanAmount?: number;
  loanTerm?: number;
  name: string;
  phone: string;
  gender: "Мужской" | "Женский";
  work: string;
}
// оформление формы
export interface IWrapperForm {
  children: React.ReactNode;
  finishStep?: () => void;
  nextStep?: () => void;
  prevStep?: () => void;
  stepIndex: 0 | 1 | 2;
  title?: string;
  dialogOpen?: boolean;
  dialogSetOpen?: (prop?: any) => void;
  dialogText?: string;
}
// форма
export interface IDataPages {
  personalData: IPersonData;
  setPersonalData: (prop?: any) => void;
}
//диалог
export interface IDialogSuccess {
  open: boolean;
  setOpen: (prop?: any) => void;
  text: string;
}
