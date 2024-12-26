import { trpc } from "./client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

const url = import.meta.env.VITE_API_URL || "http://localhost:3000/trpc";

export default function TrpcProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// staleTime: 1000 * 60 * 5, // 5 minutes
						// cacheTime: 1000 * 60 * 30, // 30 minutes
						retry: 1,
						refetchOnWindowFocus: true,
						refetchOnMount: true,
						refetchOnReconnect: true,
					},
				},
			})
	);
	const [trpcClient] = useState(() => {
		return trpc.createClient({
			links: [
				httpBatchLink({
					url,
					headers: () => {
						const headers: { [key: string]: string } = {};
						// const accessToken = getCookie("token");
						// if (accessToken) {
						// 	headers["Authorization"] = `Bearer ${accessToken}`;
						// }
						return headers;
					},
				}),
			],
		});
	});
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
