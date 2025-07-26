import { Button, TextInput } from "flowbite-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import DynamicTable from "src/components/ui-elements/table.control";
import { useNavigate } from "react-router-dom";

const BankList = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'List' }];

  const columns = [
    "ID",
    "Bank Name",
    "Branch Name",
    "Account Type",
    "Is Active",
    "Created By",
    "Action",
  ];

  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();

  // Query parameters
  const page = 1;
  const limit = 10;
  const order = "createdAt:DESC";
  const filters = { isActive: true };
  const attributes = "id,bankId,bankName,branchName,accountType,isActive,createdBy";

  // Fetch bank details
  const fetchBankDetails = async () => {
    try {
      // Build query string like your example
      const query = `filters=${encodeURIComponent(JSON.stringify(filters))}`;
      const attributeQuery = `&attributes=${encodeURIComponent(attributes)}`;
      const paginationQuery = `&page=${page}&limit=${limit}`;
      const orderQuery = order ? `&order=${encodeURIComponent(order)}` : "";

      const url = `http://localhost:4000/bank-details?${query}${attributeQuery}${paginationQuery}${orderQuery}`;

      const response = await fetch(url);
      const result = await response.json();

      const tableData = result?.data?.map((item: any) => ({
        ID: item.id,
        bankId: item.bankId,
        "Bank Name": item.bankName,
        "Branch Name": item.branchName,
        "Account Type": item.accountType,
        "Is Active": item.isActive ? "Yes" : "No",
        "Created By": item.createdBy,
      })) || [];

      setData(tableData);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const handleEdit = (row: any) => {
  const bankId = row.ID;
    console.log('bankId',bankId);
  navigate(`/players/bankdetails/${bankId}`);
};

  return (
    <DynamicTable
  columns={[
    "ID",
    "Bank Name",
    "Branch Name",
    "Account Type",
    "Is Active",
    "Created By",
  ]}
  data={data}
  actionLabel="Edit"
  onActionClick={handleEdit}
  title="Bank Details"
  BCrumb={BCrumb}
  toolbar={
    <>
      <TextInput
        id="dis"
        type="text"
        className="form-control w-full sm:w-64"
        placeholder="Search"
      />
      <Button color="primary" className="sm:w-fit w-full">
        <Link to="/players/bankdetails">Add New</Link>
      </Button>
    </>
  }
/>

  );
};

export default BankList;
