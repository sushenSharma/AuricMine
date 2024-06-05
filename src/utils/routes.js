import { lazy } from "react";

const AuthWrapper = lazy(() => import("../containers/AuthWrapper"));
const Ledger = lazy(() => import("../containers/Main/Ledgers"));
const RiskManagement = lazy(() => import("../containers/Main/RiskManagement"));
const Analytics = lazy(() => import("../containers/Main/Analytics"));
const WatchList = lazy(() => import("../containers/Main/WatchList"));
const BlogPosts = lazy(() => import("../containers/Main/BlogPosts"));
const LandingPage = lazy(() => import("../components/landing_Page"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Services = lazy(() => import("../pages/Services"));

export const appRoutes = [
  {
    key: "main",
    path: "/",
    component: AuthWrapper,
    nestedRoutes: [
      {
        key: "home",
        path: "/",
        component: Ledger,
      },
      {
        key: "riskManagement",
        path: "/risk-management",
        component: RiskManagement,
      },
      {
        key: "watchlist",
        path: "/watch-list",
        component: WatchList,
      },
      {
        key: "analytics",
        path: "/analytics",
        component: Analytics,
      },
      {
        key: "blogs",
        path: "/blogs",
        component: BlogPosts,
      },
    ],
  },
  {
    key: "home",
    path: "/home",
    component: LandingPage,
  },
  {
    key: "aboutus",
    path: "/about-us",
    component: AboutUs,
  },
  {
    key: "services",
    path: "/services",
    component: Services,
  },
];
