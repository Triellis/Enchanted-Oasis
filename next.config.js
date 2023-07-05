/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
