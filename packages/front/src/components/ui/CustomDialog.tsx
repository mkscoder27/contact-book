import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import { Button } from "./Button";
import { ReactNode } from "react";

interface CustomDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	confirmButtonText?: string;
	cancelButtonText?: string;
	children: ReactNode;
}

export function CustomDialog({
	children,
	isOpen,
	onClose,
	onConfirm,
	title,
	confirmButtonText = "Confirm",
	cancelButtonText = "Cancel",
}: CustomDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className='space-y-4'>
					{/* <div className="text-left text-gray-800">{tags}</div> */}
					{children}

					<div className='flex justify-end gap-2 pt-4'>
						<Button variant='outline' onClick={onClose}>
							{cancelButtonText}
						</Button>
						<Button  type='submit' onClick={onConfirm}>{confirmButtonText}</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
