import { Table } from "flowbite-react";
import CardBox from "src/components/shared/CardBox";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";

interface DynamicTableProps {
  title?: string;
  columns: string[];
  data: Array<Record<string, React.ReactNode>>;
  actionLabel?: string;
  BCrumb?: any;
  onActionClick?: (row: Record<string, any>) => void;
  toolbar?: React.ReactNode; // <-- Added toolbar prop
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  title = "Table",
  columns,
  data,
  actionLabel = "Edit",
  onActionClick,
  BCrumb,
  toolbar,
}) => {
  return (
    <>
      <BreadcrumbComp title={title} items={BCrumb} />
      <CardBox>
        {toolbar && (
          <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
            {toolbar}
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              {columns.map((col) => (
                <Table.HeadCell key={col}>{col}</Table.HeadCell>
              ))}
              {onActionClick && (
                <Table.HeadCell>
                  <span className="sr-only">{actionLabel}</span>
                </Table.HeadCell>
              )}
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((row, idx) => (
                <Table.Row
                  key={idx}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {columns.map((col) => (
                    <Table.Cell
                      key={col}
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      {row[col]}
                    </Table.Cell>
                  ))}
                  {onActionClick && (
                    <Table.Cell>
                      <button
                        onClick={() => onActionClick(row)}
                        className="font-medium text-primary hover:underline dark:text-primary"
                      >
                        {actionLabel}
                      </button>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </CardBox>
    </>
  );
};

export default DynamicTable;
