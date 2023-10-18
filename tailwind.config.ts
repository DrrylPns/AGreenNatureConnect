import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      colors: {
        'black': '#121212',
        'green': '#24643B',
        'amber': '#F7C35F',
        'semi-transparent-greenish': '#2D5F4DBF',
        'muted-green': '#2D5F4D',
        'pale': '#CFE2CE7F',
        'muted': '#CFE2CE',
        'dark-green': '#344C31',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'livvic': ['Livvic', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive']
      },
      backgroundImage: {
        'hero-pattern': "url('/src/app/images/bannerbg.png')",
        'about': "url('/public/images/about.png')"

      },
    },
  },
 
  plugins: [],
}
export default config
