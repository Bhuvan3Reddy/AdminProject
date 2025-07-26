//  Profile Data
interface MiniiconsType {
  id: number;
  icon: string;
  tooltip: string;
}

const Miniicons: MiniiconsType[] = [
  {
    id: 1,
    icon: 'solar:layers-line-duotone',
    tooltip: 'Dashboards',
  },
  {
    id: 2,
    icon: 'game-icons:tabletop-players',
    tooltip: 'Players',
  },
  {
    id: 3,
    icon: 'fluent:warning-12-filled',
    tooltip: 'Frauds & Risks',
  },
  {
    id: 4,
    icon: 'dashicons:admin-users',
    tooltip: 'Sub Admins',
  },
  {
    id: 5,
    icon: 'fa6-solid:user-secret',
    tooltip: 'Agents',
  },
  {
    id: 6,
    icon: 'hugeicons:transaction-history',
    tooltip: 'Transactions',
  },

  {
    id: 7,
    icon: 'material-symbols-light:payments-outline-rounded',
    tooltip: 'Payments',
  },
  {
    id: 8,
    icon: 'oui:nav-reports',
    tooltip: 'Reports',
  },

  {
    id: 9,
    icon: 'mingcute:game-2-fill',
    tooltip: 'Game Management',
  },
  {
    id: 10,
    icon: 'arcticons:bahnbonus',
    tooltip: 'Bonus System',
  },
  {
    id: 11,
    icon: 'solar:mirror-left-line-duotone',
    tooltip: 'Configuration',
  },
];

export default Miniicons;
