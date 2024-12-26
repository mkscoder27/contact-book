import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/Dialog';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface ContactFormDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (data: ContactForm) => void;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  phone: string;
}

const ContactSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format") // E.164 standard
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
});

export function ContactFormDialog({ isOpen, onCancel, onConfirm }: ContactFormDialogProps) {
  const {
    register: contactForm,
    handleSubmit: submitContact,
    formState: { errors: contactError },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create new contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitContact(onConfirm)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <Input id="firstName" type="text" {...contactForm("firstName")} error={contactError.firstName?.message} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <Input id="lastName" type="text" {...contactForm("lastName")} error={contactError.lastName?.message} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Input id="phone" type="text" {...contactForm("phone")} error={contactError.phone?.message} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}