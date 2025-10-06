type DialogOptions = {
  title?: string;
  desc?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

type DialogContextValue = {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
};

export type { DialogContextValue, DialogOptions };
