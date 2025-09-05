import BlogIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import ComingSoonIcon from "@mui/icons-material/InsertChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WatchlistIcon from "@mui/icons-material/Visibility";
import FeedbackIcon from '@mui/icons-material/Feedback';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';

export const navigationMenus = (navigationLabels) => {
  const {
    homeLabel,
    fullDashboardLabel,
    watchListLabel,
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
      key: "fullDashboard",
      label: "Full Dashboard",
      iconLabel: (
        <DashboardIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
      ),
      path: "/full-dashboard",
      title: "Full Dashboard",
    },
    // {
    //   key: "watchlist",
    //   label: watchListLabel,
    //   iconLabel: (
    //     <WatchlistIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
    //   ),
    //   path: "/watch-list",
    //   title: watchListLabel,
    // },
    // {
    //   key: "feedback",
    //   label: feedbackLabel,
    //   iconLabel: (
    //     <FeedbackIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
    //   ),
    //   path: "/feedback",
    //   title: feedbackLabel,
    // },
    // {
    //   key: "mockInvestors",
    //   label: "Mock Investors",
    //   iconLabel: (
    //     <AdminIcon style={{ fontSize: "36px", color: "#60c4a2" }} />
    //   ),
    //   path: "/admin/mock-investors",
    //   title: "Mock Investors Admin",
    // },
  ];
};
