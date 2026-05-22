'use client'

import { Switch } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import React from 'react'

const ThemeToggler = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Switch onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
			{({ isSelected }) => (
				<>
					<Switch.Control
						className={`h-7.75 w-12.75 rounded-full  bg-secondary dark:bg-foreground transition-all duration-300
              ${isSelected ? 'bg-primary shadow-[0_0_12px_rgba(244,63,94,0.35)]' : ''}
            `}
					>
						<Switch.Thumb
							className={`size-6.75 rounded-full bg-background shadow-sm ${isSelected ? 'ms-5.5 shadow-lg' : ''}`}
						>
							<Switch.Icon>
								{isSelected ? (
									<Sun className='size-4 text-primary' />
								) : (
									<Moon className='size-4 text-foreground' />
								)}
							</Switch.Icon>
						</Switch.Thumb>
					</Switch.Control>
				</>
			)}
		</Switch>
	)
}

export default ThemeToggler
