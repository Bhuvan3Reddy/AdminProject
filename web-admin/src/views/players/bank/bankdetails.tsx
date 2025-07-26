import { Card, Label, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DropdownField, { DropdownOption } from 'src/components/ui-elements/dropdown.control';
import FormActions from "src/components/ui-elements/form-actions.control";
import TextInputField from "src/components/ui-elements/textinput.control";
import BreadcrumbComp from "src/layouts/full/shared/breadcrumb/BreadcrumbComp";
import ConfirmModal from "src/components/ui-elements/confirm-modal.controls";
import AppToast from "src/components/ui-elements/toast.control";
import { Switch } from "@headlessui/react";
import { bankDetailsSchema } from "./bank-schema";

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;

const BankDetails = () => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues
  } = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
      email: "",
      bankName: "",
      branchName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      accountType: "",
      currency: "",
      countryCode: "",
      phone: "",
      iban: "",
      swiftCode: "",
      ifscOrBranchCode: "",
      createdBy: "Admin",
      isActive: true,
      modifiedBy: "Admin",
    },
  });

  /**
   * Defining all the use states here
   */
  const [loading, setLoading] = useState(false);
  const [countrycodes, setCountryCodes] = useState<DropdownOption[]>([]);
  const [userDetails, setUserDetails] = useState<DropdownOption[]>([]);
  const [accounttypes, setAccountTypes] = useState<DropdownOption[]>([]);
  const [currency, setCurrency] = useState<DropdownOption[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  /**
   * Reading the Parameter from the Route
   */
  const { bankId } = useParams<{ bankId: string }>();
  const isEdit = Boolean(bankId);

  // Creating object of useNavigate to navigate other pages
  const navigate = useNavigate();

  //Defining Bread Crumb 
  const BCrumb = [{ to: "/", title: "Home" },{ title: isEdit ? "Edit Bank Details" : "Create Bank Details" }];

  /**
   * Loading all the dropdown options on page load here
   */
  useEffect(() => {
    setCountryCodes([
      { label: "Australia (+61)", value: "+61" },
      { label: "Canada (+1)", value: "+1" },
      { label: "France (+33)", value: "+33" },
    ]);
    setAccountTypes([
      { label: "Saving", value: "saving" },
      { label: "Current", value: "current" },
      { label: "Business", value: "business" },
    ]);
    setCurrency([
      { label: "USD", value: "USD" },
      { label: "AUD", value: "AUD" },
      { label: "EUR", value: "EUR" },
      { label: "INR", value: "INR" },
    ]);
    setUserDetails([
      { label: "Tim David", value: "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
      { label: "Max William", value: "3fa85f64-5717-4562-b3fc-2c963f66afa7" },
      { label: "John Doe", value: "3fa85f64-5717-4562-b3fc-2c963f66afa8" },
    ]);
  }, []);

  /**
   * Fetching the Details based on the ID on Edit
   */
  useEffect(() => {
    if (!isEdit || !bankId) return;
    fetchBankDetailsById(bankId);
  }, [isEdit, bankId]);

  const fetchBankDetailsById = async (id: string) => {
    try {
      setLoading(true);
      const filters = JSON.stringify({ id });
      const attributes =
        "userId,email,bankName,branchName,accountNumber,accountType,currency,countryCode,phone,iban,swiftCode,ifscOrBranchCode,createdBy,isActive";
      const url = `http://localhost:4000/bank-details/fetchById?filters=${encodeURIComponent(
        filters
      )}&attributes=${encodeURIComponent(attributes)}`;
      const res = await fetch(url);
      const payload = await res.json();
      const record = payload?.data ?? payload;

      if (!record) {
        setToast({ show: true, message: "No bank details found.", type: "error" });
        return;
      }

      reset({
        userId: record.userId ?? "",
        email: record.email ?? "",
        bankName: record.bankName ?? "",
        branchName: record.branchName ?? "",
        accountNumber: record.accountNumber ?? "",
        confirmAccountNumber: record.accountNumber ?? "",
        accountType: record.accountType ?? "",
        currency: record.currency ?? "",
        countryCode: record.countryCode ?? "",
        phone: record.phone ?? "",
        iban: record.iban ?? "",
        swiftCode: record.swiftCode ?? "",
        ifscOrBranchCode: record.ifscOrBranchCode ?? "",
        createdBy: record.createdBy ?? "Admin",
        isActive: !!record.isActive,
        modifiedBy: "Admin",
      });
    } catch (e) {
      console.error(e);
      setToast({ show: true, message: "Failed to load bank details.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => setConfirmModal();
  const setConfirmModal=()=>{
    console.log('errors',errors)
    setShowConfirmModal(true);
  }

  const processSubmission = async () => {
    setLoading(true);
    try {
      const formData = getValues();
      const { confirmAccountNumber, ...payload } = formData;

      const resp =
        isEdit && bankId
          ? await updateBankDetails(bankId, payload)
          : await createBankDetails(payload);

      if (resp?.status === "success") {
        setToast({
          show: true,
          message: isEdit ? "Bank Details updated successfully!" : "Bank Details created successfully!",
          type: "success",
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/players/banklist");
        }, 1500);
      } else {
        setToast({
          show: true,
          message: resp?.message ?? "Something went wrong",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setToast({ show: true, message: "Submission failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const createBankDetails = async (payload: Omit<BankDetailsFormData, "confirmAccountNumber" | "modifiedBy">) => {
    const filters = JSON.stringify({ userId: payload.userId, accountNumber: payload.accountNumber });
    const queryString = `?filters=${encodeURIComponent(filters)}`;
    const response = await fetch(`http://localhost:4000/bank-details${queryString}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  };

  const updateBankDetails = async (bankId: string, payload: Omit<BankDetailsFormData, "confirmAccountNumber" | "createdBy">) => {
    payload.userId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const response = await fetch(`http://localhost:4000/bank-details/${bankId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.json();
  };

  return (
    <>
      <BreadcrumbComp title="Bank Details" items={BCrumb} />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
        <Card>
          <div className="grid lg:grid-cols-2 gap-6 pb-6">

            <DropdownField
              id="userId"
              label="Select User"
              options={userDetails}
              register={register("userId")}
              error={errors.userId?.message}
              required
            />

            <TextInputField
              id="email"
              label="Email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              placeholder="Enter Email"
              required
            />

            <TextInputField
              id="bankName"
              label="Bank Name"
              register={register("bankName")}
              error={errors.bankName?.message}
              placeholder="Enter Bank Name"
              required
            />

            <TextInputField
              id="branchName"
              label="Branch Name"
              register={register("branchName")}
              error={errors.branchName?.message}
              placeholder="Enter Branch Name"
              required
            />
            <TextInputField
              id="accountNumber"
              type="password"
              label="Account Number"
              register={register("accountNumber")}
              error={errors.accountNumber?.message}
              placeholder="Enter Account Number"
              required
            />
            <TextInputField
              id="confirmAccountNumber"
              type="password"
              label="Confirm Account Number"
              register={register("confirmAccountNumber")}
              error={errors.confirmAccountNumber?.message}
              placeholder="Confirm Account Number"
              required
            />
            <TextInputField
              id="ifscOrBranchCode"
              label="IFSC/Branch Code"
              register={register("ifscOrBranchCode")}
              error={errors.ifscOrBranchCode?.message}
              placeholder="Enter IFSC/Branch Code"
              required
            />
            <DropdownField
              id="countryCode"
              label="Country Code"
              options={countrycodes}
              register={register("countryCode")}
              error={errors.countryCode?.message}
              required
            />
            <TextInputField
              id="phone"
              label="Phone Number"
              type="number"
              register={register("phone")}
              error={errors.phone?.message}
              placeholder="Enter Phone Number"
              required
            />
            <DropdownField
              id="accountType"
              label="Account Type"
              options={accounttypes}
              register={register("accountType")}
              error={errors.accountType?.message}
              required />
            <DropdownField
              id="currency"
              label="Currency"
              options={currency}
              register={register("currency")}
              error={errors.currency?.message}
              required
            />
            <TextInputField
              id="iban"
              label="IBAN"
              register={register("iban")}
              error={errors.iban?.message}
              placeholder="Enter IBAN"
              required
            />
            <TextInputField
              id="swiftCode"
              label="SWIFT Code"
              register={register("swiftCode")}
              error={errors.swiftCode?.message}
              placeholder="Enter Swift Code"
              required
            />
            {/* Active Switch */}
            <div className="col-span-1">
              <div className="mb-2"><Label htmlFor="isActive" value="Active" /></div>
              <Switch
                checked={getValues("isActive")}
                onChange={(val: boolean) => setValue("isActive", val)}
                disabled={!isEdit}
                className={`group inline-flex h-6 w-11 items-center rounded-full transition ${getValues("isActive") ? "bg-primary" : "bg-gray-200"} ${!isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className={`size-4 translate-x-1 rounded-full bg-white transition ${getValues("isActive") ? "translate-x-6" : ""}`} />
              </Switch>
            </div>
            {/* Buttons */}
            <div className="grid grid-cols-12 items-center">
              <FormActions submitLabel={isEdit ? "Update" : "Submit"} cancelPath="/players/banklist" disabled={loading} />
            </div>
          </div>
        </Card>
      </form>

      <ConfirmModal
        show={showConfirmModal}
        onConfirm={() => { setShowConfirmModal(false); processSubmission(); }}
        onCancel={() => setShowConfirmModal(false)}
        title={isEdit ? "Confirm Update" : "Confirm Submission"}
        message={isEdit ? "Are you sure you want to update this Bank Details?" : "Are you sure you want to create this Bank Details?"}
      />

      <AppToast show={toast?.show} message={toast?.message} type={toast?.type} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
};

export default BankDetails;
