
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
				/* Apple's color system */
				apple: {
					blue: '#007AFF',
					gray: {
						50: '#F2F2F7',
						100: '#E5E5EA',
						200: '#D1D1D6',
						300: '#C7C7CC',
						400: '#AEAEB2',
						500: '#8E8E93',
						600: '#636366',
						700: '#48484A',
						800: '#3A3A3C',
						900: '#1C1C1E'
					},
					red: '#FF3B30',
					orange: '#FF9500',
					yellow: '#FFCC00',
					green: '#34C759',
					mint: '#00C7BE',
					teal: '#30B0C7',
					cyan: '#32D74B',
					indigo: '#5856D6',
					purple: '#AF52DE',
					pink: '#FF2D92',
					brown: '#A2845E'
				}
			},
			fontFamily: {
				system: [
					'-apple-system',
					'BlinkMacSystemFont',
					'SF Pro Display',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif'
				],
				mono: [
					'SF Mono',
					'Monaco',
					'Inconsolata',
					'Roboto Mono',
					'source-code-pro',
					'monospace'
				]
			},
			fontSize: {
				'apple-title1': ['28px', { lineHeight: '34px', fontWeight: '700' }],
				'apple-title2': ['22px', { lineHeight: '28px', fontWeight: '700' }],
				'apple-title3': ['20px', { lineHeight: '25px', fontWeight: '600' }],
				'apple-headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
				'apple-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
				'apple-callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
				'apple-subhead': ['15px', { lineHeight: '20px', fontWeight: '400' }],
				'apple-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
				'apple-caption1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'apple-caption2': ['11px', { lineHeight: '13px', fontWeight: '400' }]
			},
			spacing: {
				'apple-xs': '4px',
				'apple-s': '8px',
				'apple-m': '16px',
				'apple-l': '24px',
				'apple-xl': '32px',
				'apple-xxl': '48px'
			},
			borderRadius: {
				'apple': '12px',
				'apple-lg': '16px',
				'apple-xl': '20px'
			},
			boxShadow: {
				'apple': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'apple-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'apple-xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
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
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
