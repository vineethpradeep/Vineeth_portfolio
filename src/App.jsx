import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import Site from "./site/Site";

// Private visitor dashboard, loaded only on /dashboard so the portfolio bundle stays small.
const Dashboard = lazy(() => import("./site/Dashboard"));
const isDashboard = window.location.pathname.replace(/\/+$/, "") === "/dashboard";

function App() {
  if (isDashboard) {
    return (
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    );
  }
  return (
    <>
      <Site />
      {/* Cookieless visitor and page-view counts, shown in the Vercel project's Analytics tab. */}
      <Analytics />
    </>
  );
}

export default App;
