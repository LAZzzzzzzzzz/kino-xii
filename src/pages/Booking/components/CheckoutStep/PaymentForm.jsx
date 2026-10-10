import { Button, Input } from '@/components';
import {
  CARD_NUMBER_RULES,
  CVV_RULES,
  EMAIL_RULES,
  EXPIRY_RULES,
  FULL_NAME_RULES,
  MOBILE_NUMBER_RULES,
} from '@/config';

const PaymentForm = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  onExpiryChange,
}) => {
  const expiry = register('expiry', EXPIRY_RULES);

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Buyer and card details"
      className="flex w-180 flex-col gap-6"
    >
      <div className="flex w-full flex-col gap-4.5">
        <Input
          label="Full name"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName', FULL_NAME_RULES)}
        />

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email', EMAIL_RULES)}
        />

        <Input
          label="Mobile number"
          autoComplete="tel-national"
          placeholder="e.g. 555 123 456"
          error={errors.mobileNumber?.message}
          {...register('mobileNumber', MOBILE_NUMBER_RULES)}
        />
      </div>

      <div className="flex w-full flex-col gap-4.5">
        <Input
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          error={errors.cardNumber?.message}
          {...register('cardNumber', CARD_NUMBER_RULES)}
        />

        <div className="flex w-full items-start gap-4.5">
          <Input
            label="Expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            error={errors.expiry?.message}
            {...expiry}
            onChange={onExpiryChange}
          />

          <Input
            label="CVV"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            error={errors.cvv?.message}
            {...register('cvv', CVV_RULES)}
          />
        </div>
      </div>

      {errors.root && (
        <p role="alert" className="text-xs leading-body text-red">
          {errors.root.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Paying' : 'Pay & Complete Order'}
      </Button>
    </form>
  );
};

export default PaymentForm;
