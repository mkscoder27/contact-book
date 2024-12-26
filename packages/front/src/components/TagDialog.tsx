import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input"; // Assuming you have an Input component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface TagFormDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (data: TagForm) => void;
}

export interface TagForm {
  tag: string;
}

const TagSchema = z.object({
  tag: z.string().min(1, "Name required"),
});

export function TagFormDialog({ isOpen, onCancel, onConfirm }: TagFormDialogProps) {
  const {
    register: tagForm,
    handleSubmit: submitTag,
    formState: { errors: tagError },
  } = useForm<TagForm>({
    resolver: zodResolver(TagSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitTag(onConfirm)} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
              Tag name
            </label>
            <Input id="tag" type="text" {...tagForm("tag")} error={tagError.tag?.message} />
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