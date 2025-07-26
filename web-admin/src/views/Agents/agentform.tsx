import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Card } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ConfirmModal from 'src/components/ui-elements/confirm-modal.controls';
import AppToast from 'src/components/ui-elements/toast.control';
import DropdownField, { DropdownOption } from 'src/components/ui-elements/dropdown.control';
import FileInputField from 'src/components/ui-elements/file-upload.control';
import FormActions from 'src/components/ui-elements/form-actions.control';
import TextInputField from 'src/components/ui-elements/textinput.control';
import { getAgentSchema } from './agents-schema';

const AgentForm: React.FC = () => {
  const { id: encodedId } = useParams<{ id: string }>();
  const decryptedId = encodedId ? atob(encodedId) : null;
  const isEdit = Boolean(decryptedId);
  const navigate = useNavigate();
  const agentSchema = getAgentSchema(isEdit);
  type AgentFormData = z.infer<typeof agentSchema>;

  const BCrumb = [{ to: '/', title: 'Home' }, { title: isEdit ? 'Edit Agent' : 'Create Agent' }];

  const [agentTypes, setAgentTypes] = useState<DropdownOption[]>([]);
  const [permissionRoles, setPermissionRoles] = useState<DropdownOption[]>([]);
  const [currencies, setCurrencies] = useState<DropdownOption[]>([]);
  const [timezones, setTimezones] = useState<DropdownOption[]>([]);
  const [agentActions, setAgentActions] = useState<DropdownOption[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      agentName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      agentType: '',
      permissionRoles: '',
      currency: '',
      timezone: '',
      agentAction: '',
      agentPin: '',
      accountHolderName: '',
      ifscCode: '',
      accountNumber: '',
      confirmAccountNumber: '',
      documents: [],
      isActive: true,
    },
  });

  // Initialize dropdown options
  useEffect(() => {
    setAgentTypes([
      { label: 'Agent Type A', value: 'A' },
      { label: 'Agent Type B', value: 'B' },
      { label: 'Agent Type C', value: 'C' },
    ]);

    setPermissionRoles([
      { label: 'Administrator', value: 'Admin' },
      { label: 'Regular User', value: 'User' },
      { label: 'Viewer Only', value: 'Viewer' },
    ]);

    setCurrencies([
      { label: 'US Dollar (USD)', value: 'USD' },
      { label: 'Euro (EUR)', value: 'EUR' },
      { label: 'Emirati Dirham (AED)', value: 'AED' },
    ]);

    setTimezones([
      { label: 'Coordinated Universal Time (UTC)', value: 'UTC' },
      { label: 'Gulf Standard Time (GMT+4)', value: 'GMT+4' },
      { label: 'Eastern Standard Time (EST)', value: 'EST' },
    ]);

    setAgentActions([
      { label: 'Create', value: 'Create' },
      { label: 'Update', value: 'Update' },
      { label: 'Delete', value: 'Delete' },
    ]);
  }, []);
  const [loading, setLoading] = useState(false);

  // Load existing agent data if editing
  useEffect(() => {
    if (isEdit && decryptedId) {
      setLoading(true);
      const filters = {
        agentId: decryptedId,
      };
      const query = `filters=${encodeURIComponent(JSON.stringify(filters))}`;
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:4000/agents?${query}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          const agentValues = data?.data || [];
          if (agentValues?.length > 0) {
            reset({
              ...agentValues[0],
              documents: [],
              confirmAccountNumber: agentValues[0].accountNumber,
              confirmPassword: '',
              password: '',
            });
            setLoading(false);
          } else {
            setToast({
              show: true,
              message: 'Something went wrong. Please try again.',
              type: 'error',
            });
            setTimeout(() => {
              navigate('/agents/list');
              setLoading(false);
            }, 1500);
          }
        } catch (error) {
          setToast({
            show: true,
            message: 'Something went wrong. Please try again.',
            type: 'error',
          });
          setTimeout(() => {
            navigate('/agents/list');
            setLoading(false);
          }, 1500);
        }
      };

      // Call the async function
      fetchData();
    }
  }, [decryptedId, isEdit, reset]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>(
    {
      show: false,
      message: '',
      type: 'success',
    },
  );

  // File input change handler updates RHF state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setValue('documents', files, { shouldValidate: true });
  };

  const onSubmit = () => {
    setShowConfirmModal(true);
  };

  const processSubmission = async () => {
    const data = getValues();
    setLoading(true);

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.confirmPassword,
      agentName: data.agentName,
      phone: data.phone,
      agentType: data.agentType,
      permissionRoles: data.permissionRoles,
      currency: data.currency,
      timezone: data.timezone,
      agentAction: data.agentAction,
      agentPin: data.agentPin,
      accountNumber: data.confirmAccountNumber,
      accountHolderName: data.accountHolderName,
      ifscCode: data.ifscCode,
      createdBy: 'admin',
      updatedBy: 'admin',
      isActive: data.isActive,
    };

    const filters = { phone: data.phone };
    const query = `filters=${encodeURIComponent(JSON.stringify(filters))}`;

    try {
      if (isEdit && decryptedId) {
        const id = data.id;
        if (!id) {
          setToast({
            show: true,
            message: 'Agent not found.',
            type: 'error',
          });
          return;
        }

        const response = await fetch(`http://localhost:4000/agents/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result?.status?.toLowerCase() === 'success') {
          setToast({
            show: true,
            message: 'Agent updated successfully.',
            type: 'success',
          });
          setTimeout(() => {
            navigate('/agents/list');
            setLoading(false);
          }, 1500);
        } else {
          setToast({
            show: true,
            message: 'Failed to update agent.',
            type: 'error',
          });
          setLoading(false);
        }
      } else {
        const response = await fetch(`http://localhost:4000/agents?${query}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result?.status?.toLowerCase() === 'success') {
          setToast({
            show: true,
            message: 'Agent created successfully.',
            type: 'success',
          });
          setTimeout(() => {
            navigate('/agents/list');
            setLoading(false);
          }, 1500);
        } else if (
          result?.status?.toLowerCase() === 'error' &&
          result?.message?.toLowerCase() === 'record already exists'
        ) {
          setToast({
            show: true,
            message: 'Agent with this phone number already exists.',
            type: 'error',
          });
          setLoading(false);
        } else {
          setToast({
            show: true,
            message: 'Failed to create agent.',
            type: 'error',
          });
          setLoading(false);
        }
      }
    } catch (error) {
      setToast({
        show: true,
        message: 'An error occurred. Please try again.',
        type: 'error',
      });
      setShowConfirmModal(false);
      setLoading(false);
    } finally {
      setShowConfirmModal(false);
    }
  };

  return (
    <>
      <BreadcrumbComp title="Agents" items={BCrumb} />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Card>
          <div className="col-span-12 pb-6">
            <h6 className="text-lg font-semibold">Agent Details</h6>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 pb-6">
            <TextInputField
              id="firstName"
              label="First Name"
              required
              register={register('firstName')}
              error={errors.firstName?.message}
              placeholder="Enter First Name"
            />
            <TextInputField
              id="lastName"
              label="Last Name"
              required
              register={register('lastName')}
              error={errors.lastName?.message}
              placeholder="Enter Last Name"
            />
            <TextInputField
              id="agentName"
              label="Agent Name"
              required
              register={register('agentName')}
              error={errors.agentName?.message}
              placeholder="Enter Agent Name"
            />
            <TextInputField
              id="email"
              label="Email"
              type="email"
              required
              register={register('email')}
              error={errors.email?.message}
              placeholder="Enter Email"
            />
            <TextInputField
              id="password"
              label="Password"
              type="password"
              required
              register={register('password')}
              error={errors.password?.message}
              placeholder="Enter Password"
            />
            <TextInputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              register={register('confirmPassword')}
              error={errors.confirmPassword?.message}
              placeholder="Enter Confirm Password"
            />
            <TextInputField
              id="phone"
              label="Phone Number"
              required
              register={register('phone')}
              error={errors.phone?.message}
              placeholder="Enter Phone Number"
            />
            <DropdownField
              id="agentType"
              label="Agent Type"
              options={agentTypes}
              required
              register={register('agentType')}
              error={errors.agentType?.message}
            />
            <DropdownField
              id="permissionRoles"
              label="Permission Roles"
              options={permissionRoles}
              required
              register={register('permissionRoles')}
              error={errors.permissionRoles?.message}
            />
            <DropdownField
              id="currency"
              label="Currency"
              options={currencies}
              required
              register={register('currency')}
              error={errors.currency?.message}
            />
            <DropdownField
              id="timezone"
              label="Timezone"
              options={timezones}
              required
              register={register('timezone')}
              error={errors.timezone?.message}
            />
            <DropdownField
              id="agentAction"
              label="Agent Action"
              options={agentActions}
              required
              register={register('agentAction')}
              error={errors.agentAction?.message}
            />
            <TextInputField
              id="agentPin"
              label="Pin"
              type="number"
              required
              register={register('agentPin')}
              error={errors.agentPin?.message}
              placeholder="Enter Agent Pin"
            />
          </div>

          <div className="col-span-12 pb-6 border-t border-border pt-5 dark:border-darkborder">
            <h6 className="text-lg font-semibold">Bank Account Details</h6>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 pb-6">
            <TextInputField
              id="accountHolderName"
              label="Account Holder Name"
              required
              register={register('accountHolderName')}
              error={errors.accountHolderName?.message}
              placeholder="Enter Account Holder Name"
            />
            <TextInputField
              id="ifscCode"
              label="IFSC Code"
              required
              register={register('ifscCode')}
              error={errors.ifscCode?.message}
              placeholder="Enter IFSC Code"
            />
            <TextInputField
              id="accountNumber"
              label="Account Number"
              required
              register={register('accountNumber')}
              error={errors.accountNumber?.message}
              placeholder="Account Number"
            />
            <TextInputField
              id="confirmAccountNumber"
              label="Confirm Account Number"
              required
              register={register('confirmAccountNumber')}
              error={errors.confirmAccountNumber?.message}
              placeholder="Enter Confirm Account Number"
            />

            <FileInputField
              id="documents"
              label="Documents"
              required
              multiple
              onChange={handleFileChange}
              error={errors.documents?.message}
            />
            <div className="col-span-1"></div>

            <div className="grid grid-cols-12 items-center">
              <FormActions
                submitLabel={isEdit ? 'Update' : 'Submit'}
                cancelPath="/agents/list"
                disabled={loading}
              />
            </div>
          </div>
        </Card>
      </form>

      <ConfirmModal
        show={showConfirmModal}
        onConfirm={processSubmission}
        onCancel={() => setShowConfirmModal(false)}
        title={isEdit ? 'Confirm Update' : 'Confirm Submission'}
        message={
          isEdit
            ? 'Are you sure you want to update this agent?'
            : 'Are you sure you want to create this agent?'
        }
      />

      <AppToast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
};

export default AgentForm;
