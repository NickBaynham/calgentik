export const CONTACT_INQUIRY_TYPES = [
  "Request demo",
  "Investor inquiry",
  "Partnership",
  "Technical discussion",
] as const;

export type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number];

export function isContactInquiryType(value: string): value is ContactInquiryType {
  return (CONTACT_INQUIRY_TYPES as readonly string[]).includes(value);
}
