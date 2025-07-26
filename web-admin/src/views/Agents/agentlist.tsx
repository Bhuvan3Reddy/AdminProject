import { Button, Card, Table, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom'; // Use react-router-dom here, not 'react-router'
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

import { useState, useEffect } from 'react';
import AppToast from 'src/components/ui-elements/toast.control';

const BCrumb = [{ to: '/', title: 'Home' }, { title: 'List' }];

const AgentList = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>(
    {
      show: false,
      message: '',
      type: 'success',
    },
  );

  useEffect(() => {
    const params = new URLSearchParams({
      order: 'id:ASC',
      filters: JSON.stringify({ isActive: true }),
      attributes: 'id,firstName,lastName,phone,agentType,agentId',
    });
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/agents?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        const agentValues = data?.data || [];
        if (agentValues?.length > 0) {
          setAgents(agentValues);
        }
      } catch (error) {
        setToast({
          show: true,
          message: 'Something went wrong. Please try again.',
          type: 'error',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BreadcrumbComp title="Agents" items={BCrumb} />
      <Card>
        <div className="overflow-x-auto">
          <div className="sm:flex justify-between my-6">
            <div>
              <TextInput id="dis" type="text" className="form-control" placeholder="Search" />
            </div>
            <Button color="primary" className="sm:w-fit w-full sm:mt-0 mt-4">
              <Link to="/agents/create">New Agent</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4"></Table.HeadCell>
                <Table.HeadCell>ID</Table.HeadCell>
                <Table.HeadCell>NAME</Table.HeadCell>
                <Table.HeadCell>PHONE NUMBER</Table.HeadCell>
                <Table.HeadCell>TYPE</Table.HeadCell>
                <Table.HeadCell className="text-center">ACTION</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {agents.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={7} className="text-center">
                      No agents found.
                    </Table.Cell>
                  </Table.Row>
                )}

                {agents.map((agent) => (
                  <Table.Row key={agent.id} className="hover:bg-gray-100">
                    <Table.Cell className="p-4">
                      {/* You can add a checkbox or icon here */}
                    </Table.Cell>
                    <Table.Cell>{agent.id}</Table.Cell>
                    <Table.Cell>
                      {agent.firstName} {agent.lastName}
                    </Table.Cell>
                    <Table.Cell>{agent.phone}</Table.Cell>
                    <Table.Cell>{agent.agentType}</Table.Cell>
                    <Table.Cell className="text-center">
                      <Link
                        to={`/agents/edit/${btoa(agent.agentId)}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </Card>
      <AppToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default AgentList;
