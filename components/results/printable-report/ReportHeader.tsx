export default function ReportHeader() {

  return (

    <div className="border-b pb-8">

      {/* label */}
      <p className="text-sm text-gray-500 mb-3">
        StackAudit Report
      </p>

      {/* title */}
      <h1 className="text-5xl font-black">
        AI Optimization Audit
      </h1>

      {/* date */}
      <p className="text-gray-500 mt-4">
        Generated on{" "}
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </p>

    </div>
  );
}