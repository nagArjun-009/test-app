import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/theme/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun className='h-4 w-4 mr-2' /> },
    { value: 'dark', label: 'Dark', icon: <Moon className='h-4 w-4 mr-2' /> },
    {
      value: 'system',
      label: 'System',
      icon: <Monitor className='h-4 w-4 mr-2' />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='text-foreground border-foreground/50 hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-600'
        >
          {themeOptions.find((opt) => opt.value === theme)?.icon}
          {themeOptions.find((opt) => opt.value === theme)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='bg-background text-foreground'
      >
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              setTheme(option.value as 'light' | 'dark' | 'system')
            }
            className='flex items-center text-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            {option.icon}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
