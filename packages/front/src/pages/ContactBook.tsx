import { TagForm, TagFormDialog } from "@/components/TagDialog";
import { ContactForm, ContactFormDialog } from "../components/ContactDialog";
import { Input } from "../components/ui/Input";
import { Check, CheckCircle2, PlusCircleIcon, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { trpc } from "../../_trpc/client";
import useDebounce from '@/hooks/useDebounce';

interface UserCardProps {
	name: string;
	phone: string;
	tags?: string[];
	onTagButtonClick: () => void;
}

const UserCard = ({
	name,
	phone,
	tags = [],
	onTagButtonClick,
}: UserCardProps) => {
	return (
		<div className='flex items-center p-2 bg-gray-100 rounded-lg'>
			<div className='w-9 flex justify-center items-center'>
				<CheckCircle2 className='w-5 h-5' />
			</div>
			<div className='flex flex-auto flex-col pl-2'>
				<span className='font-semibold'>{name}</span>
				<span className='text-gray-700 text-xs'>{phone}</span>
			</div>
			<div className='flex items-center max-w-[25%] flex-wrap pr-3'>
				{tags.map((tag, index) => (
					<div
						key={index}
						className='rounded-[50px] bg-green-300 p-1 min-w-16 text-center text-sm font-medium'
					>
						{tag}
					</div>
				))}
			</div>
			<div className='w-7'>
				<PlusCircleIcon
					className='w-5 h-5 cursor-pointer'
					onClick={onTagButtonClick}
				/>
			</div>
		</div>
	);
};

export default function ContactBook() {
  const [showTagDialog, setShowTagDialog] = useState(false);
	const [showContactDialog, setShowContactDialog] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const { data: contacts, refetch: refetchContacts } =
		trpc.listContacts.useQuery(debouncedSearchTerm);

	const { mutate: createContact } = trpc.createContact.useMutation({
		onSuccess: () => {
			setShowContactDialog(false);
      refetchContacts();
		},
	});

	const { data: tags, refetch: refetchTags } =
		trpc.listTags.useQuery(undefined);

  const { mutate: updateTagStatus } = trpc.updateTagStatus.useMutation({
    onSuccess: () => {
      refetchTags();
    }
  });

	const includedTags = useMemo(
		() => tags?.filter((tag) => tag.status === "included"),
		[tags]
	);
	const excludedTags = useMemo(
		() => tags?.filter((tag) => tag.status === "excluded"),
		[tags]
	);

	const { mutate: createTag } = trpc.createTag.useMutation({
		onSuccess: () => {
			setShowTagDialog(false);
      refetchTags();
		},
	});

	const handleTagButtonClick = () => {
		// setShowTagDialog(true);
	};

	const handleContactConfirm = (data: ContactForm) => {
		console.log("Contact data:", data);
		createContact({
			first_name: data.firstName,
			last_name: data.lastName,
			phone: data.phone,
		});
	};

	const handleTagConfirm = (data: TagForm) => {
		console.log("Tag data:", data);
		createTag({ name: data.tag });
	};

	return (
		<div className='bg-white h-screen w-full'>
			<div className='flex h-full'>
				<div className='w-[25%] min-w-[320px] border-r border-gray-300'>
					<div className='flex flex-col h-full'>
						<div className='max-h-[50%] overflow-y-auto p-5'>
              <div className='flex items-center justify-between'>
							  <h2 className='font-semibold'>Included Tags</h2>
                <PlusCircleIcon className='h-5 w-5 cursor-pointer' onClick={() => setShowTagDialog(true)}/>
              </div>
							<div className='flex flex-col mt-2 gap-1'>
								{includedTags?.map((tag) => (
									<div
										key={tag.id}
										className='flex justify-between items-center px-3 py-2 bg-gray-100 rounded-lg'
									>
										<span>{tag.name}</span>
										<Trash className='w-4 h-4 text-red-500 cursor-pointer' onClick={() => updateTagStatus({
                      id: tag.id,
                      status: 'excluded'
                    })} />
									</div>
								))}
							</div>
						</div>
						<div className='flex flex-col flex-auto p-5'>
							<h2 className='font-semibold'>Excluded Tags</h2>
							<div className='flex flex-col mt-2 gap-1'>
								{excludedTags?.map((tag) => (
									<div
										key={tag.id}
										className='flex justify-between items-center px-3 py-2 bg-gray-100 rounded-lg'
									>
										<span>{tag.name}</span>
										<Check className='w-4 h-4 text-green-500 cursor-pointer' onClick={() => updateTagStatus({
                      id: tag.id,
                      status: 'included'
                    })} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className='flex-auto'>
					<div className='flex flex-col px-2 gap-3'>
						{/* header */}
						<div className='h-12 flex items-center justify-between'>
							<div className='font-semibold text-xl'>
								All Contacts <span>({contacts?.length})</span>
							</div>
							<PlusCircleIcon
								className='w-6 h-6 cursor-pointer'
								onClick={() => setShowContactDialog(true)}
							/>
						</div>

						{/* search */}
						<div className='relative'>
							<Input
								type='text'
								placeholder='Search by name'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-10 h-9'
							/>
						</div>

						{/* select all */}
						<div className='flex items-center justify-between px-2'>
							<div className='flex items-center gap-3'>
								<CheckCircle2 className='w-5 h-5' />
								<span>Select All</span>
							</div>
						</div>

						{/* contacts */}
						<div className='flex flex-col gap-3'>
							{contacts?.length === 0 ? (
								<div>No contacts available</div>
							) : (
								contacts?.map((contact, index) => (
									<UserCard
										key={index}
										name={`${contact?.first_name} ${contact?.last_name}`}
										phone={contact.phone}
										tags={contact?.tags || []}
										onTagButtonClick={handleTagButtonClick}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<TagFormDialog
				isOpen={showTagDialog}
				onCancel={() => setShowTagDialog(false)}
				onConfirm={handleTagConfirm}
			/>

			<ContactFormDialog
				isOpen={showContactDialog}
				onCancel={() => setShowContactDialog(false)}
				onConfirm={handleContactConfirm}
			/>
		</div>
	);
}
