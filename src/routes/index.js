import Login from "../pages/Login";
import Register from "../pages/Register";
import Calendar from "../pages/Personal/Calendar";
import Source from "../pages/Personal/Source";
import Home from "../pages/Personal/Home";
import Board from "../pages/Personal/Board";
import List from "../pages/Workspace/List";
import WorkspaceBoard from "../pages/Workspace/Board";
import WorkspaceLayout from "../layouts/WorkspaceLayout";
import MainLayout from "../layouts/MainLayout";
import CommonLayout from "../layouts/CommonLayout";
import Dashboard from "../pages/Personal/Dashboard";
import Gantt from "../pages/Workspace/Gantt";


export const router = [
  { path: "/login", name: "Login", exact: true, element: Login },
  { path: "/register", name: "Register", exact: true, element: Register },
  { path: "/*", name: "main", exact: true, element: CommonLayout },
];
export const mainRouter = [
  { path: "/*", name: "main", exact: true, element: MainLayout},
  { path: "/workspace/:id/*", name: "workspace", exact: true, element: WorkspaceLayout}
]
export const personalRouter = [
  {
    path: "/*",
    name: "Home",
    exact: true,
    element: Home,
  },
  {
    path: "calendar",
    name: "Calendar",
    exact: true,
    element: Calendar,
    scroll: true,
  },
  {
    path: "/board",
    name: "Board",
    exact: true,
    element: Board,
  },
  {
    path: "/source",
    name: "Source",
    exact: true,
    element: Source,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    element: Dashboard
  }
];

export const workspaceRouter = [
  {
    path: "",
    name: "List",
    element: List,
    exact: true,
  },
  {
    path: "board",
    name: "Board",
    exact: true,
    element: WorkspaceBoard,
  },
  {
    path: "gantt",
    name: "Gantt",
    element: Gantt,
  }
];
