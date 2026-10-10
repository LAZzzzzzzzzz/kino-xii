import OrderSummary from './OrderSummary';
import PaymentForm from './PaymentForm';
import useCheckoutStep from './useCheckoutStep';

const CheckoutStep = ({
  hold,
  holdId,
  onExpire,
  onContested,
  onForbidden,
  onPaid,
}) => {
  const { register, errors, isSubmitting, onSubmit, onExpiryChange } =
    useCheckoutStep({ holdId, onExpire, onContested, onForbidden, onPaid });

  return (
    <div className="flex w-full gap-5">
      <PaymentForm
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onExpiryChange={onExpiryChange}
      />

      <span
        aria-hidden="true"
        className="w-px shrink-0 self-stretch rounded-full bg-card"
      />

      <OrderSummary seats={hold?.seats ?? []} subtotal={hold?.subtotal ?? 0} />
    </div>
  );
};

export default CheckoutStep;
