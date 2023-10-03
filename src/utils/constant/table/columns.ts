import { OrderModel } from 'models/Order.model';
import { ProductModel } from 'models/Product.model';
import { ActionElementModel, HeadTableModel } from 'models/Table.model';
import { getVNDTotalAmount, getVNDUnit } from 'utils/helpers/order';
import { DataDisplayType } from '../dataDisplayType';
import { UserModel } from 'models/User.model';
import { userRoles } from '../role';
import { Button } from '@mui/material';
import { render } from 'react-dom';
import { createElement } from 'react';

export const orderColumns: HeadTableModel<OrderModel>[] = [
  {
    fieldNames: ['_id'],
    align: 'left',
    disablePadding: false,
    label: 'Tracking No.'
  },
  {
    fieldNames: ['createdAt'],
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    renderResult(item) {
      return new Date(item.createdAt).toLocaleString();
    },
    sortAble: true,
  },
  {
    fieldNames: ['user', 'fullName'],
    align: 'left',
    disablePadding: false,
    label: 'User Name',
    sortAble: true,
  },
  {
    fieldNames: ['user', 'phone'],
    align: 'left',
    disablePadding: false,
    label: 'Phone',
  },
  {
    fieldNames: ['user', 'address'],
    align: 'left',
    disablePadding: false,
    label: 'Address',
  },
  {
    fieldNames: ['total'],
    align: 'left',
    disablePadding: false,
    label: 'Total Amount',
    renderResult(item) {
      return getVNDTotalAmount(item);
    },
  }
];

export const getProductColumns = (actionElements: ActionElementModel<ProductModel>[] = []): HeadTableModel<ProductModel>[] => {
  return [
    {
      fieldNames: ['_id'],
      align: 'left',
      disablePadding: false,
      label: 'Id No.'
    },
    {
      fieldNames: ['title'],
      align: 'left',
      disablePadding: false,
      label: 'Product Name'
    },
    {
      fieldNames: ['price'],
      align: 'right',
      disablePadding: false,
      label: 'Price',
      renderResult(item) {
        return getVNDUnit(item.price);
      },
    },
    {
      fieldNames: [''],
      align: 'center',
      disablePadding: false,
      label: 'Image',
      dataDisplayType: DataDisplayType.ImageFileId,
      renderResult(item) {
        const fileId = item.fileIds[0];
        return fileId;
      }
    },
    {
      fieldNames: ['category'],
      align: 'left',
      disablePadding: false,
      label: 'Category'
    },
    {
      fieldNames: [],
      label: 'Action',
      align: 'center',
      disablePadding: false,
      dataDisplayType: DataDisplayType.Navigation,
      actionElements,
    }
  ];
};

export const userColumns: HeadTableModel<UserModel>[] = [
  {
    fieldNames: ['_id'],
    align: 'left',
    disablePadding: false,
    label: 'Id No.'
  },
  {
    fieldNames: ['email'],
    align: 'left',
    disablePadding: false,
    label: 'Email'
  },
  {
    fieldNames: ['fullName'],
    align: 'left',
    disablePadding: false,
    label: 'Full Name'
  },
  {
    fieldNames: ['phone'],
    align: 'left',
    disablePadding: false,
    label: 'Phone'
  },
  {
    fieldNames: ['role'],
    align: 'left',
    disablePadding: false,
    label: 'Role',
    renderResult(item) {
      const label = userRoles.find(r => r.value === item.role).label;
      return label;
    },
  },
];