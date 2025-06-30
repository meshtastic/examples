import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useMeshtasticConnection } from "./useMeshtasticConnection";
import type { Protobuf } from "@meshtastic/core";

export function MeshApp() {
	// Custom hook to manage Meshtastic connection state and actions
	const {
		meshDevice,
		connectionStatus,
		error,
		handleConnect,
		handleDisconnect,
	} = useMeshtasticConnection();
	const [nodes, setNodes] = useState<Map<number, Protobuf.Mesh.NodeInfo>>(
		new Map(),
	);

	useEffect(() => {
		let subscription: () => void; // Subscription variable for cleanup

		if (connectionStatus === "connected" && meshDevice) {
			// Subscribe to node info packets to update the nodes state
			subscription = meshDevice.events.onNodeInfoPacket.subscribe(
				// Callback function to handle incoming node info packets
				(nodeInfo: Protobuf.Mesh.NodeInfo) => {
					setNodes((prevNodes) => {
						// Update the nodes state with the new node info
						const updatedNodes = new Map(prevNodes);
						// Add or update the node info in the map
						updatedNodes.set(nodeInfo.num, nodeInfo);
						return updatedNodes;
					});
				},
			);
		} else {
			// Clear nodes when disconnected
			setNodes(new Map());
		}
		// Clean up subscription on component unmount or disconnection
		return () => {
			if (meshDevice) meshDevice.events.onNodeInfoPacket.unsub(subscription);
		};
	}, [connectionStatus, meshDevice]); // Depend on connectionStatus and meshDevice

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			// Prevent default form submission behavior
			if (connectionStatus === "connected") {
				// If already connected, disconnect
				handleDisconnect();
			} else {
				const formData: FormData = new FormData(event.currentTarget);
				// Create FormData from the form submission
				handleConnect(formData);
			}
		},
		[connectionStatus, handleConnect, handleDisconnect],
	);

	return (
		<div className="flex flex-col items-center justify-center mt-4 w-full">
			<form
				onSubmit={handleSubmit}
				className="p-6 rounded-lg bg-gray-100 shadow-md flex flex-col gap-4 w-full max-w-sm"
			>
				<h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
					Meshtastic Device Connection
				</h2>

				<label htmlFor="ip-address" className="block text-gray-700 font-medium">
					IP Address:
					<input
						id="ip-address"
						type="text"
						name="ip"
						defaultValue="meshtastic.local"
						required
						className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						disabled={connectionStatus === "connecting"}
					/>
				</label>

				<label
					htmlFor="use-tls"
					className="flex items-center gap-2 text-gray-700 font-medium"
				>
					<input
						id="use-tls"
						type="checkbox"
						name="tls"
						className="w-4 h-4 border border-gray-400 appearance-none rounded-sm bg-white checked:bg-blue-800 checked:border-blue-800 focus:ring-blue-500 focus:ring-1 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={connectionStatus === "connecting"}
					/>
					<span>Use TLS</span>
				</label>

				{connectionStatus === "error" && error && (
					<p className="text-red-600 text-sm">{error}</p>
				)}

				{connectionStatus === "connecting" && (
					<p className="text-blue-600 text-sm">Connecting...</p>
				)}

				{connectionStatus === "connected" && (
					<p className="text-green-600 text-sm">Connected successfully!</p>
				)}

				<button
					type="submit"
					className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out
            ${
							connectionStatus === "connected"
								? "bg-red-500 hover:bg-red-600"
								: "bg-blue-600 hover:bg-blue-700"
						}
            ${
							connectionStatus === "connecting"
								? "opacity-60 cursor-not-allowed"
								: ""
						}
          `}
					disabled={connectionStatus === "connecting"}
				>
					{connectionStatus === "connected" ? "Disconnect" : "Connect"}
				</button>
			</form>

			<section className="bg-white p-6 rounded-lg shadow-md mt-6">
				<h3 className="text-xl font-bold text-gray-800 mb-4">
					Connected Nodes
				</h3>
				{nodes && nodes.size > 0 ? (
					<ul className="grid lg:grid-cols-6 sm:grid-cols-4 gap-2 auto-rows-fr">
						{Array.from(nodes.values()).map((node: Protobuf.Mesh.NodeInfo) => (
							<li
								key={node.num}
								className="bg-gray-50 p-3 rounded-md border border-gray-200 flex flex-col justify-between"
							>
								<p className="font-semibold text-gray-700">
									Node ID: {node.num}
								</p>
								{node.user?.longName && (
									<p className="text-gray-600">Name: {node.user.longName}</p>
								)}
								{node.lastHeard && (
									<p className="text-gray-600">
										Last Heard:{" "}
										{new Date(node.lastHeard * 1000).toLocaleString()}
									</p>
								)}
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600">
						No nodes connected yet or device not connected.
					</p>
				)}
			</section>
		</div>
	);
}
