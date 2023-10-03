import { confirmDialog } from 'primereact/confirmdialog';

export async function confirm() {
  return new Promise<boolean>((res, rej) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        res(true);
      },
    });
  });
} 