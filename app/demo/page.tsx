import Results from "@/components/results/Results";

import demoAudit from "./data/demoAudit";

//demo page
export default function DemoPage() {

  return (
    <Results
      data={demoAudit as any}
    />
  );
}