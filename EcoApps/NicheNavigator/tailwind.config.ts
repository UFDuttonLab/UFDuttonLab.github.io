import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Game-specific habitat colors
				habitat: {
					wetland: 'hsl(var(--habitat-wetland))',
					forest: 'hsl(var(--habitat-forest))',
					grassland: 'hsl(var(--habitat-grassland))',
					coastal: 'hsl(var(--habitat-coastal))',
					urban: 'hsl(var(--habitat-urban))',
					mangrove: 'hsl(var(--habitat-mangrove))'
				},
				// Species rarity colors
				species: {
					common: 'hsl(var(--species-common))',
					uncommon: 'hsl(var(--species-uncommon))',
					rare: 'hsl(var(--species-rare))',
					endangered: 'hsl(var(--species-endangered))'
				},
				// Game state colors
				game: {
					success: 'hsl(var(--success))',
					warning: 'hsl(var(--warning))',
					conflict: 'hsl(var(--conflict))'
				},
				// Natural Florida colors
				ocean: {
					deep: 'hsl(var(--ocean-deep))',
					light: 'hsl(var(--ocean-light))'
				},
				wetland: {
					DEFAULT: 'hsl(var(--wetland))',
					light: 'hsl(var(--wetland-light))'
				},
				forest: {
					DEFAULT: 'hsl(var(--forest))',
					light: 'hsl(var(--forest-light))'
				},
				grassland: {
					DEFAULT: 'hsl(var(--grassland))',
					light: 'hsl(var(--grassland-light))'
				},
				sand: {
					DEFAULT: 'hsl(var(--sand))',
					dark: 'hsl(var(--sand-dark))'
				},
				coral: {
					DEFAULT: 'hsl(var(--coral))',
					light: 'hsl(var(--coral-light))'
				},
				sunset: 'hsl(var(--sunset))'
			},
			backgroundImage: {
				'gradient-ocean': 'var(--gradient-ocean)',
				'gradient-forest': 'var(--gradient-forest)',
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-wetland': 'var(--gradient-wetland)'
			},
			boxShadow: {
				'habitat': 'var(--shadow-habitat)',
				'species': 'var(--shadow-species)',
				'hover': 'var(--shadow-hover)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
