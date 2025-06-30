import { MeshDevice } from "@meshtastic/core";
import { TransportHTTP } from "@meshtastic/transport-http";
import { useCallback, useState } from "react";

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface UseMeshtasticConnectionReturn {
	meshDevice: MeshDevice | null;
	connectionStatus: ConnectionStatus;
	error: string | null;
	handleConnect: (formData: FormData) => Promise<void>;
	handleDisconnect: () => void;
}

export function useMeshtasticConnection(): UseMeshtasticConnectionReturn {
	const [meshDevice, setMeshDevice] = useState<MeshDevice | null>(null);
	const [connectionStatus, setConnectionStatus] =
		useState<ConnectionStatus>("disconnected");
	const [error, setError] = useState<string | null>(null);

	const handleConnect = useCallback(async (formData: FormData) => {
		// Reset state before attempting to connect
		setConnectionStatus("connecting");
		// Reset connection status to "connecting"
		setError(null);
		// Reset any previous error message

		// Extract IP and TLS settings from form data
		const ip = formData.get("ip");
		const tls = formData.get("tls") === "on";

		// Validate only a type of string 
		if (typeof ip !== "string" || !ip) {
			setError("IP address is required.");
			setConnectionStatus("disconnected");
			return;
		}

		try {
			// Generate a random ID for the device
			const id: number = Math.floor(Math.random() * 1e9);
			// Create a new TransportHTTP instance, this was desinged to be agonist of the connnection method, and connect 
			// with the provided IP and TLS settings
			const transport: TransportHTTP = await TransportHTTP.create(ip, tls);
			// Create a new MeshDevice instance with the provided IP and TLS settings
			const device: MeshDevice = new MeshDevice(transport, id);
			// Connect to the device
			device.configure();

			setMeshDevice(device);
			setConnectionStatus("connected");
		} catch (err: unknown) {
			console.error("Error connecting to device:", err);
			setError(
				err instanceof Error ? err.message : "Failed to connect to device.",
			);
			setConnectionStatus("error");
			setMeshDevice(null);
		}
	}, []);

	const handleDisconnect = useCallback(() => {
		if (meshDevice) {
			setMeshDevice(null);
			setConnectionStatus("disconnected");
			setError(null);
		}
	}, [meshDevice]);

	return {
		meshDevice,
		connectionStatus,
		error,
		handleConnect,
		handleDisconnect,
	};
}
