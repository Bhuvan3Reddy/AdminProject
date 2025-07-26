import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Card, Tabs, Label } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ConfirmModal from 'src/components/ui-elements/confirm-modal.controls';
import AppToast from 'src/components/ui-elements/toast.control';
import DropdownField, { DropdownOption } from 'src/components/ui-elements/dropdown.control';
import TextInputField from 'src/components/ui-elements/textinput.control';
import TextareaField from 'src/components/ui-elements/textarea.control';
import FormActions from 'src/components/ui-elements/form-actions.control';
import { Switch } from '@headlessui/react';
import { playerSchema } from './playerschema';
type PlayerFormData = z.infer<typeof playerSchema>;

const CreatePlayerForm: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const isEdit = Boolean(userId);
  const navigate = useNavigate();

  const BCrumb = [{ to: '/', title: 'Home' }, { title: isEdit ? 'Edit Player' : 'Create Player' }];

  const [countryCodes, setCountryCodes] = useState<DropdownOption[]>([]);
  const [timezones, setTimezones] = useState<DropdownOption[]>([]);
  const [languageCodes, setLanguageCodes] = useState<DropdownOption[]>([]);
  const [vipLevels, setVIPLevels] = useState<DropdownOption[]>([]);
  const [currencies, setCurrencies] = useState<DropdownOption[]>([]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      countryCode: '',
      languangeCode: '',
      timeZone: '',
      birthDate: '',
      currency: '',
      vipLevel: '',
      nationalId: '',
      address: '',
      isActive: true,
      modifiedBy: 'Admin',
    },
  });

  // Dropdown Initialization
  useEffect(() => {
    setCountryCodes([
      { label: 'Australia (+61)', value: '+61' },
      { label: 'Canada (+1)', value: '+1' },
      { label: 'France (+33)', value: '+33' },
    ]);

    setTimezones([
      { label: 'UTC', value: 'UTC' },
      { label: 'Asia/Kolkata', value: 'Asia/Kolkata' },
      { label: 'Europe/London', value: 'Europe/London' },
    ]);

    setLanguageCodes([
      { label: 'EN', value: 'EN' },
      { label: 'FR', value: 'FR' },
      { label: 'ES', value: 'ES' },
    ]);

    setVIPLevels([
      { label: 'Silver', value: 'Silver' },
      { label: 'Gold', value: 'Gold' },
      { label: 'Diamond', value: 'Diamond' },
      { label: 'Platinum', value: 'Platinum' },
    ]);

    setCurrencies([
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'INR', value: 'INR' },
    ]);
  }, []);

  // Fetch data in edit mode
  useEffect(() => {
    if (!isEdit || !userId) return;
    fetchPlayerDetailsById(userId);
  }, [isEdit, userId]);

  const fetchPlayerDetailsById = async (id: string) => {
    try {
      setLoading(true);
      const filters = JSON.stringify({ id });
      const url = `http://localhost:4000/player-details/fetchById?filters=${encodeURIComponent(filters)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data) return;

      reset({ ...data, confirmPassword: data.password, isActive: !!data.isActive });
      setActive(!!data.isActive);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>(
    { show: false, message: '', type: 'success' }
  );

  const onSubmit = () => {
    setShowConfirmModal(true);
  };

  const createPlayer = async (payload: any) => {
    const filters = JSON.stringify({ email: payload.email, phone: payload.phone });
    const queryString = `?filters=${encodeURIComponent(filters)}`;
    return await fetch(`http://localhost:4000/player-details${queryString}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const updatePlayer = async (payload: any) => {
    return await fetch(`http://localhost:4000/player-details/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  };

  const processSubmission = async () => {
    const data = getValues();
    setLoading(true);
    try {
      const payload = { ...data, isActive: active, modifiedBy: 'Admin' };
      const response = isEdit
        ? await updatePlayer(payload)
        : await createPlayer(payload);

      const result = await response.json();
      if (result?.status === 'success') {
        setToast({ show: true, message: isEdit ? 'Player updated!' : 'Player created!', type: 'success' });
        setTimeout(() => navigate('/players/all'), 1500);
      } else {
        setToast({ show: true, message: result?.message || 'Error occurred', type: 'error' });
      }
    } catch (error) {
      setToast({ show: true, message: 'Submission failed', type: 'error' });
    } finally {
      setShowConfirmModal(false);
      setLoading(false);
    }
  };


  return (
    <>
      <BreadcrumbComp title="Create Player" items={BCrumb} />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Card>
          <Tabs aria-label="Full width tabs" className="gap-[1.25rem]">
            <Tabs.Item active title={<span className="text-black dark:text-white">Personal Info</span>}>
              <div className="grid lg:grid-cols-2 gap-6 pb-6">
                <TextInputField id="firstName" label="First Name" required register={register('firstName')} error={errors.firstName?.message} placeholder="Enter first name" />
                <TextInputField id="lastName" label="Last Name" required register={register('lastName')} error={errors.lastName?.message} placeholder="Enter last name" />
                <DropdownField id="countryCode" label="Country Code" options={countryCodes} required register={register('countryCode')} error={errors.countryCode?.message} />
                <TextInputField id="phone" label="Phone Number" type="number" required register={register('phone')} error={errors.phone?.message} placeholder="Enter phone" />
                <DropdownField id="languangeCode" label="Language" options={languageCodes} required register={register('languangeCode')} error={errors.languangeCode?.message} />
                <DropdownField id="timeZone" label="Timezone" options={timezones} required register={register('timeZone')} error={errors.timeZone?.message} />
                <TextInputField id="birthDate" label="Birth Date" type="date" required register={register('birthDate')} error={errors.birthDate?.message} />
                <DropdownField id="currency" label="Currency" options={currencies} required register={register('currency')} error={errors.currency?.message} />
                <DropdownField id="vipLevel" label="VIP Level" options={vipLevels} required register={register('vipLevel')} error={errors.vipLevel?.message} />
                <TextInputField id="nationalId" label="National ID" required register={register('nationalId')} error={errors.nationalId?.message} placeholder="Enter National ID" />
                <TextareaField id="address" label="Address" required register={register('address')} error={errors.address?.message} placeholder="Enter Address" />
                <div className="col-span-1">
                  <div className="col-span-1">
                    <div className="mb-2">
                      <Label htmlFor="isActive" value="Active" />
                    </div>
                    <Switch
                      checked={active}
                      onChange={setActive}
                      disabled={!isEdit}
                      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary">
                      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                    </Switch>
                  </div>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title={<span className="text-black dark:text-white">Security</span>}>
              <div className="grid lg:grid-cols-2 gap-6 pb-6">
                <TextInputField id="email" label="Email" type="email" required register={register('email')} error={errors.email?.message} placeholder="Enter email" />
                <TextInputField id="password" label="Password" type="password" required register={register('password')} error={errors.password?.message} placeholder="Enter password" />
                <TextInputField id="confirmPassword" label="Confirm Password" type="password" required register={register('confirmPassword')} error={errors.confirmPassword?.message} placeholder="Confirm password" />
              </div>
            </Tabs.Item>
          </Tabs>
          <div className="grid grid-cols-12 items-center">
            <FormActions submitLabel={isEdit ? 'Update' : 'Submit'} cancelPath="/players/all" disabled={loading} />
          </div>
        </Card>
      </form>
      <ConfirmModal show={showConfirmModal} onConfirm={processSubmission} onCancel={() => setShowConfirmModal(false)} title={isEdit ? 'Confirm Update' : 'Confirm Submission'} message={isEdit ? 'Are you sure you want to update this player?' : 'Are you sure you want to create this player?'} />
      <AppToast show={toast?.show} message={toast?.message} type={toast?.type} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
      {loading && <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center"><Spinner size="xl" /></div>}
    </>
  );
};

export default CreatePlayerForm;
