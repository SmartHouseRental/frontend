import { z } from 'zod';

export const createAgreementFormSchema = z
  .object({
    propertyId: z.string().min(1, 'Select a property'),
    renterId: z.string().min(1, 'Select a renter'),
    appointmentId: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    monthlyRent: z.coerce.number().positive().optional(),
    currency: z.string().optional(),
    ownerMessage: z.string().max(2000).optional(),
    offerExpiresAt: z.string().min(1, 'Offer expiry is required'),
    send: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    { message: 'End date must be after start date', path: ['endDate'] }
  )
  .refine(
    (data) => {
      if (!data.offerExpiresAt) return true;
      return new Date(data.offerExpiresAt) > new Date();
    },
    { message: 'Offer expiry must be in the future', path: ['offerExpiresAt'] }
  );

export const updateDraftAgreementFormSchema = z
  .object({
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    monthlyRent: z.coerce.number().positive().optional(),
    currency: z.string().optional(),
    ownerMessage: z.string().max(2000).optional(),
    offerExpiresAt: z.string().min(1, 'Offer expiry is required'),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    { message: 'End date must be after start date', path: ['endDate'] }
  )
  .refine(
    (data) => {
      if (!data.offerExpiresAt) return true;
      return new Date(data.offerExpiresAt) > new Date();
    },
    { message: 'Offer expiry must be in the future', path: ['offerExpiresAt'] }
  );
