export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    items: [
      {
        heading: 'Dashboards',
        children: [
          {
            name: 'Dashboard1',
            icon: 'solar:atom-line-duotone',
            id: uniqueId(),
            url: '/',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Players',
    items: [
      {
        heading: 'Players',
        children: [
          {
            name: 'All Players',
            icon: 'solar:settings-minimalistic-line-duotone',
            id: uniqueId(),
            url: '/players/all',
          },
          {
            name: 'Commissions',
            icon: 'solar:question-circle-line-duotone',
            id: uniqueId(),
            url: '/players/commissions',
          },
          {
            name: 'KYC Documents',
            icon: 'solar:documents-linear',
            id: uniqueId(),
            url: '/players/kycdocuments',
          },

          {
            name: 'Bank Details',
            icon: 'mdi:bank',
            id: uniqueId(),
            url: '/players/banklist',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'Frauds & Risks',
    items: [
      {
        heading: 'Frauds & Risks',
        children: [
          {
            id: uniqueId(),
            name: 'BlackList',
            icon: 'mynaui:ban',
            url: '',
          },
          {
            id: uniqueId(),
            name: 'Performance Tracker',
            icon: 'streamline-ultimate:performance-increase',
            url: '',
          },
          {
            id: uniqueId(),
            name: 'Performance Details',
            icon: 'streamline-ultimate:performance-tablet-increase',
            url: '',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'Sub Admins',
    items: [
      {
        heading: 'Sub Admins',
        children: [
          {
            name: 'Sub Admins',
            icon: 'dashicons:admin-users',
            id: uniqueId(),
            url: '',
          },
        ],
      },
    ],
  },

  {
    id: 5,
    name: 'Agents',
    items: [
      {
        heading: 'Agents',
        children: [
          {
            name: 'List',
            icon: 'material-symbols:list',
            id: uniqueId(),
            url: '/agents/list',
          },
          {
            name: 'Create',
            icon: 'gridicons:create',
            id: uniqueId(),
            url: '/agents/create',
          },
        ],
      },
    ],
  },

  {
    id: 6,
    name: 'Transactions',
    items: [
      {
        heading: 'Transactions',
        children: [
          {
            id: uniqueId(),
            name: 'List',
            icon: 'material-symbols:list',
            url: '',
          },
          {
            id: uniqueId(),
            name: 'Sports Transaction',
            icon: 'arcticons:cbs-sports',
            url: '',
          },
        ],
      },
    ],
  },

  {
    id: 7,
    name: 'Payments',
    items: [
      {
        heading: 'Payments',
        children: [
          {
            id: uniqueId(),
            name: 'Deposit Request',
            icon: 'ph:hand-deposit',
            url: '',
          },
          {
            id: uniqueId(),
            name: 'Withdrawals',
            icon: 'ph:hand-withdraw',
            url: '/shadcn-ui/buttons',
          },
        ],
      },
    ],
  },

  {
    id: 8,
    name: 'Reports',
    items: [
      {
        heading: 'Reports',
        children: [
          {
            name: 'Agent Revenue',
            icon: 'qlementine-icons:money-16',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Player Revenue',
            icon: 'qlementine-icons:money-16',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Game Transaction',
            icon: 'solar:smartphone-update-line-duotone',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Player',
            icon: 'solar:airbuds-case-charge-line-duotone',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Unified Transaction',
            icon: 'solar:clapperboard-text-linear',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Player Financial',
            icon: 'solar:round-transfer-horizontal-line-duotone',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Player Bonus',
            icon: 'solar:round-transfer-horizontal-line-duotone',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Bet',
            icon: 'solar:round-transfer-horizontal-line-duotone',
            id: uniqueId(),
            url: '',
          },
          {
            name: 'Sport Book',
            icon: 'solar:round-transfer-horizontal-line-duotone',
            id: uniqueId(),
            url: '',
          },
        ],
      },
    ],
  },

  {
    id: 9,
    name: 'Game Management',
    items: [
      {
        heading: 'Game Management',
        children: [
          {
            name: 'Casino',
            icon: 'mdi:casino-chip',
            id: uniqueId(),
            url: '',
          },
        ],
      },
    ],
  },

  {
    id: 10,
    name: 'Bonus System',
    items: [
      {
        heading: 'Bonus System',
        children: [
          {
            id: uniqueId(),
            url: '',
            name: 'Deposit',
            icon: 'solar:check-circle-bold',
            color: 'text-primary',
          },
          {
            id: uniqueId(),
            url: '',
            name: 'Cashback',
            icon: 'solar:check-circle-bold',
            color: 'text-secondary',
          },
          {
            id: uniqueId(),
            url: '',
            name: 'Joining',
            icon: 'solar:check-circle-bold',
            color: 'text-info',
          },
          {
            id: uniqueId(),
            url: '',
            name: 'Promo Code',
            icon: 'solar:check-circle-bold',
            color: 'text-warning',
          },
        ],
      },
    ],
  },
  {
    id: 11,
    name: 'Configurations',
    items: [
      {
        heading: 'Configurations',
        children: [
          {
            id: uniqueId(),
            url: '/players/master-configuration-page',
            name: 'Master Data',
            icon: 'solar-settings-minimalistic-outline',
            color: 'text-primary',
          },
          {
            id: uniqueId(),
            url: '/roles',
            name: 'Roles',
            icon: 'solar-settings-minimalistic-outline',
            color: 'text-primary',
          },
        ],
      },
    ],
  },
];

export default SidebarContent;
