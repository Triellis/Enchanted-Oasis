/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.resolve.extensions.push(".ts", ".tsx");
		return config;
	},
};

module.exports = nextConfig;
