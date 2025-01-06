import BlogIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import ComingSoonIcon from "@mui/icons-material/InsertChart";
import RiskManagementIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WatchlistIcon from "@mui/icons-material/Visibility";
import FeedbackIcon from '@mui/icons-material/Feedback';

export const navigationMenus = (navigationLabels) => {
  const {
    homeLabel,
    riskManagementLabel,
    watchListLabel,
    analyticsLabel,
    KanbanLabel,
	feedbackLabel
  } = navigationLabels;

  return [
    {
      key: "home",
      label: homeLabel,
      iconLabel: <HomeIcon style={{ fontSize: "36px", color: "#60c4a2" }} />,
      path: "/ledgers",
      title: homeLabel,
    },
    {
      key: "riskManagement",
      label: riskManagementLabel,
      iconLabel: (
        <RiskManagementIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
      ),
      path: "/risk-management",
      title: riskManagementLabel,
    },
    {
      key: "watchlist",
      label: watchListLabel,
      iconLabel: (
        <WatchlistIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
      ),
      path: "/watch-list",
      title: watchListLabel,
    },
    {
      key: "analytics",
      label: analyticsLabel,
      iconLabel: (
        <ComingSoonIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
      ),
      path: "/analytics",
      title: analyticsLabel,
    },
    {
      key: "Kanban",
      label: KanbanLabel,
      iconLabel: <BlogIcon style={{ fontSize: "36px", color: "#60c4a2" }} />,
      path: "/Kanban",
      title: KanbanLabel,
    },
    {
      key: "feedback",
      label: feedbackLabel,
      iconLabel: (
        <FeedbackIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
      ),
      path: "/feedback",
      title: feedbackLabel,
    },
  ];
};
