import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import TrpcProvider from "../_trpc/provider";

function App() {
	return (
		<ErrorBoundary>
			<TrpcProvider>
				<BrowserRouter>
						<AppRoutes />
				</BrowserRouter>
			</TrpcProvider>
		</ErrorBoundary>
	);
}

export default App;
