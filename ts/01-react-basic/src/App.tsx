import "./index.css";

import logo from "./logo.svg";
import { MeshApp } from "./MeshApp";

export function App() {
	return (
		<div className="app">
			<div className="logo-container">
				<img src={logo} alt="Meshtastic Logo" className="logo mesh-logo" />
			</div>

			<div className="w-full">
				<h1>Meshtastic TS</h1>
				<p>
					Edit <code>src/MeshApp.tsx</code> and save to get started.
				</p>
				<MeshApp />
			</div>
		</div>
	);
}

export default App;
