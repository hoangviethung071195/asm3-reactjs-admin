import { DataDisplayType } from 'utils/constant/dataDisplayType';
import { BaseType } from './General';
import { MouseEventHandler } from 'react';

export interface HeadTableModel<T> {
  label: string;
  fieldNames: (keyof T | string)[],
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify',
  disablePadding?: boolean,
  dataDisplayType?: DataDisplayType;
  renderResult?: (item: T) => BaseType;
  actionElements?: ActionElementModel<T>[];
  sortAble?: boolean
}

export interface CellTableModel {
  [fieldName: string]: string | number | boolean | Object;
}

export interface ActionElementModel<T> {
  label: string;
  onclick: (item: T) => void;
}

export type Sort = 'asc' | 'desc';