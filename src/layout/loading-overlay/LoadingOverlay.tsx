import { PropsWithChildren } from "react";
import { createPortal } from 'react-dom';
import { BounceLoader } from 'react-spinners';
import s from './loading-overlay.module.scss';

export default function LoadingOverlay(props: PropsWithChildren<{
  loading: boolean;
}>) {
  const { children, loading } = props;

  return (
    <>
      {children}
      {createPortal(
        <div className={`${s['loadding-overlay-wrapper']}  ${!loading ? s['loaded'] : ''}`}>
          <BounceLoader className={s['bouce-loader-icon']} />
        </div>,
        document.getElementById('portal')!
      )}
    </>
  );
}
