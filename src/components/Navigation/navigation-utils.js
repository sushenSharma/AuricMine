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
      iconLabel: <HomeIcon style={{ color: "#60c4a2" }} />,
      path: "/ledgers",
      title: homeLabel,
    },
    {
      key: "riskManagement",
      label: riskManagementLabel,
      iconLabel: <RiskManagementIcon style={{ color: "#60c4a2" }} />,
      path: "/risk-management",
      title: riskManagementLabel,
    },
    {
      key: "watchlist",
      label: watchListLabel,
      iconLabel: <WatchlistIcon style={{ color: "#60c4a2" }} />,
      path: "/watch-list",
      title: watchListLabel,
    },
    {
      key: "analytics",
      label: analyticsLabel,
      iconLabel: <ComingSoonIcon style={{ color: "#60c4a2" }} />,
      path: "/analytics",
      title: analyticsLabel,
    },
    {
      key: "blogs",
      label: blogsLabel,
      iconLabel: <BlogIcon style={{ color: "#60c4a2" }} />,
      path: "/blogs",
      title: blogsLabel,
    },
  ];
};
