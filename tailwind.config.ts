
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
				// Enhanced sawmill brand colors
				sawmill: {
					'orange': '#FF6B35',
					'orange-light': '#FF8C5A',
					'orange-dark': '#E55A2B',
					'dark-brown': '#2C1810',
					'medium-brown': '#4A2C1A',
					'light-brown': '#8B4513',
					'auburn': '#A0522D',
					'forest': '#2D4A2B',
					'cream': '#F5F5DC',
					'warm-white': '#FFFEF7'
				},
				// Modern gradient colors
				gradient: {
					'start': '#FF6B35',
					'middle': '#FF8C5A',
					'end': '#E55A2B',
					'dark-start': '#2C1810',
					'dark-end': '#4A2C1A'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem',
				'3xl': '1.5rem'
			},
			boxShadow: {
				'modern': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'modern-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'modern-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
				'glow-lg': '0 0 40px rgba(255, 107, 53, 0.4)'
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
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'wood-grain': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23000" stroke-width="0.1" opacity="0.1"%3E%3Cpath d="M0 5q10 5 20 0t20 0v1q-10 5-20 0t-20 0z"/%3E%3Cpath d="M0 15q10 5 20 0t20 0v1q-10 5-20 0t-20 0z"/%3E%3Cpath d="M0 25q10 5 20 0t20 0v1q-10 5-20 0t-20 0z"/%3E%3Cpath d="M0 35q10 5 20 0t20 0v1q-10 5-20 0t-20 0z"/%3E%3C/g%3E%3C/svg%3E")'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
