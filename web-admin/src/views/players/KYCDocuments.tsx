import DynamicTable from "src/components/ui-elements/table.control";

const KYCDocuments = () => {
  const columns = [
    "ID",
    "UserName",
    "Document Name",
    "View Document",
    "Verified",
    "Reason",
    "Uploaded At",
    "Updated At",
    "Action",
  ];

  const data = [
    {
      ID: "001",
      UserName: "john_doe",
      "Document Name": "Passport.pdf",
      "View Document": "https://example.com/documents/passport001.pdf",
      Verified: "Yes",
      Reason: "",
      "Uploaded At": "2025-07-10 10:00 AM",
      "Updated At": "2025-07-15 02:30 PM",
      Action: "Approve / Reject",
    },
    {
      ID: "002",
      UserName: "jane_smith",
      "Document Name": "License.png",
      "View Document": "https://example.com/documents/license002.png",
      Verified: "No",
      Reason: "Blurry image",
      "Uploaded At": "2025-07-11 09:45 AM",
      "Updated At": "2025-07-16 01:20 PM",
      Action: "Approve / Reject",
    },
    {
      ID: "003",
      UserName: "michael_lee",
      "Document Name": "UtilityBill.pdf",
      "View Document": "https://example.com/documents/bill003.pdf",
      Verified: "Pending",
      Reason: "",
      "Uploaded At": "2025-07-12 11:15 AM",
      "Updated At": "2025-07-16 03:40 PM",
      Action: "Approve / Reject",
    },
    {
      ID: "004",
      UserName: "sara_ali",
      "Document Name": "AadhaarCard.jpg",
      "View Document": "https://example.com/documents/aadhaar004.jpg",
      Verified: "Yes",
      Reason: "",
      "Uploaded At": "2025-07-13 12:00 PM",
      "Updated At": "2025-07-17 10:10 AM",
      Action: "Approve / Reject",
    },
    {
      ID: "005",
      UserName: "kumar_v",
      "Document Name": "PANCard.pdf",
      "View Document": "https://example.com/documents/pan005.pdf",
      Verified: "No",
      Reason: "Invalid format",
      "Uploaded At": "2025-07-14 02:25 PM",
      "Updated At": "2025-07-18 11:45 AM",
      Action: "Approve / Reject",
    },
  ];

  const handleEdit = (row: any) => {
    console.log("Edit clicked:", row);
  };

  return (
    <div>
      {/* Dynamic table */}
      <DynamicTable
        columns={columns}
        data={data}
        actionLabel="Edit"
        title="KYC Documents List"
        onActionClick={handleEdit}
      />
    </div>
  );
};

export default KYCDocuments;
