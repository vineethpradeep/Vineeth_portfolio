import { Analytics } from "@vercel/analytics/react";
import Site from "./site/Site";

function App() {
  return (
    <>
      <Site />
      {/* Cookieless visitor and page-view counts, shown in the Vercel project's Analytics tab. */}
      <Analytics />
    </>
  );
}

export default App;
