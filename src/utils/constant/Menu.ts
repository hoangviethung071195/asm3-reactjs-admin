import { MenuModel } from '../../models/Menu.model';
import { DashboardOutlined, ShopOutlined, UserOutlined, CustomerServiceOutlined, FileAddOutlined } from '@ant-design/icons';

export const MENU: MenuModel[] = [
  {
    menuName: 'Dashboard',
    href: '/',
    iconEl: DashboardOutlined
  },
  {
    menuName: 'Products',
    href: '/products',
    iconEl: ShopOutlined
  },
  {
    menuName: 'Add Product',
    href: 'product/new',
    iconEl: FileAddOutlined
  },
  {
    menuName: 'Users',
    href: '/users',
    iconEl: UserOutlined
  },
  {
    menuName: 'Customer',
    href: '/customer',
    iconEl: CustomerServiceOutlined
  },
];