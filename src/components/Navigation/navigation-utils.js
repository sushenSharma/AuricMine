import BlogIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import ComingSoonIcon from "@mui/icons-material/InsertChart";
import RiskManagementIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WatchlistIcon from "@mui/icons-material/Visibility";

export const navigationMenus = (navigationLabels) => {
  const {
    homeLabel,
    riskManagementLabel,
    watchListLabel,
    analyticsLabel,
    blogsLabel,
  } = navigationLabels;

  return [
    {
      key: "home",
      label: homeLabel,
      iconLabel: <HomeIcon />,
      path: "/ledgers",
      title: homeLabel,
    },
    {
      key: "riskManagement",
      label: riskManagementLabel,
      iconLabel: <RiskManagementIcon />,
      path: "/risk-management",
      title: riskManagementLabel,
    },
    {
      key: "watchlist",
      label: watchListLabel,
      iconLabel: <WatchlistIcon />,
      path: "/watch-list",
      title: watchListLabel,
    },
    {
      key: "analytics",
      label: analyticsLabel,
      iconLabel: <ComingSoonIcon />,
      path: "/analytics",
      title: analyticsLabel,
    },
    {
      key: "blogs",
      label: blogsLabel,
      iconLabel: <BlogIcon />,
      path: "/blogs",
      title: blogsLabel,
    },
  ];
};
