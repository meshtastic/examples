# Meshtastic Examples
Welcome to the `meshtastic/examples` repository! This repository is dedicated to providing easy-to-understand, getting-started code examples for interacting with the Meshtastic mesh network. Whether you're a developer looking to integrate Meshtastic into your applications or a hobbyist eager to explore its capabilities programmatically, this repository aims to be your go-to resource.

## What is Meshtastic?
Meshtastic is an open-source project that allows you to create a secure, off-grid, and long-range mesh communication network using inexpensive LoRa radios. It's perfect for hiking, camping, emergency communication, or any scenario where traditional infrastructure is unavailable or unreliable. With Meshtastic, your devices act as repeaters, extending the range of the network with each new node.

This repository focuses on demonstrating how to build software that can communicate with and leverage the Meshtastic network.

## Getting Started
To get started with these examples, first clone the repository to your local machine:
```
git clone https://github.com/meshtastic/examples.git
cd examples
```
### TypeScript Examples
The initial set of examples will focus on TypeScript, leveraging the official Meshtastic JavaScript/TypeScript client library.

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn or bun 

### Running the TypeScript (TS) Examples
Navigate to the TypeScript examples directory:
```
cd ts/01-react-basic
```

Install the dependencies:
```
npm install
or bun install
or yarn install
```

Each example will typically have its own directory with specific instructions. Please refer to the `README.md` within each specific example directory for detailed instructions on how to configure and run it.

### Repository Structure
The examples are organized by programming language and then by a numbered, descriptive structure
```
├── ts/
│   ├── 01-react-basic/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── App.tsx
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json 
│   │   └── vite.config.ts
│   ├── 02-send-message/
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   └── 03-receive-messages/
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── go/
│   └── (coming soon)
├── python/
│   └── (coming soon)
└── README.md

```
As the repository grows, you can expect to find directories for:
- ts/: Examples using TypeScript (including React-based applications) to interact with Meshtastic devices.
- go/: Examples using Go to interact with Meshtastic devices.
- python/: Examples utilizing Python for various Meshtastic applications.
- And much more!: We plan to expand to other languages and platforms as the community contributes.

## Contributing 
We welcome contributions from the community! If you have a useful Meshtastic code example in any language, or if you want to improve existing ones, please consider contributing.
1. Fork this repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3. Add your code examples, ensuring they are well-commented and include a clear `README.md` with setup and usage instructions.
4. Commit your changes (`git commit -m 'feat: Add new awesome example`).
5. Push to your branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request against the `main` branch of this repository.
Please ensure your code adheres to good practices and is thoroughly tested.

## License
This project is licensed under the GNU v3 License - see the LICENSE file for details.

## Resources
- Meshtastic Official Website: https://meshtastic.org/

- Meshtastic Documentation: https://meshtastic.org/docs/

- Meshtastic GitHub Organization: https://github.com/meshtastic

- Meshtastic Community Forum: https://meshtastic.discourse.group/

We hope these examples help you get started with your Meshtastic projects!ted with your Meshtastic projects!