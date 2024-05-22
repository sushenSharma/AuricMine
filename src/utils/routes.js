import { lazy } from "react";

import BlogIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import ComingSoonIcon from "@mui/icons-material/InsertChart";
import RiskManagementIcon from "@mui/icons-material/NotificationsActiveOutlined";
import WatchlistIcon from "@mui/icons-material/Visibility";

const AuthWrapper = lazy(() => import("../containers/AuthWrapper"));
const Ledger = lazy(() => import("../containers/Main/Ledgers"));
const RiskManagement = lazy(() => import("../containers/Main/RiskManagement"));
const Analytics = lazy(() => import("../containers/Main/Analytics"));
const WatchList = lazy(() => import("../containers/Main/WatchList"));
const BlogPosts = lazy(() => import("../containers/Main/BlogPosts"));
const LandingPage = lazy(() => import("../components/landing_Page"));

export const appRoutes = [
  {
    key: "main",
    path: "/",
    component: AuthWrapper,
    nestedRoutes: [
      {
        key: "home",
        path: "/",
        icon: <HomeIcon />,
        component: Ledger,
      },
      {
        key: "riskManagement",
        path: "/risk-management",
        icon: <RiskManagementIcon />,
        component: RiskManagement,
      },
      {
        key: "watchlist",
        path: "/watch-list",
        icon: <WatchlistIcon />,
        component: WatchList,
      },
      {
        key: "analytics",
        path: "/analytics",
        icon: <ComingSoonIcon />,
        component: Analytics,
      },
      {
        key: "blogs",
        path: "/blogs",
        icon: <BlogIcon />,
        component: BlogPosts,
      },
    ],
  },
  {
    key: "home",
    path: "/home",
    component: LandingPage,
  },
];
