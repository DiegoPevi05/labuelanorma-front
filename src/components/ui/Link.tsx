import { cn } from '../../lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { AnchorHTMLAttributes, FC } from 'react'

export const linkVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer ease-in-out duration-300 ',
  {
    variants: {
      variant: {
        default: 'bg-tertiary text-white hover:bg-secondary',
        colorbg:'blue-green-gradient text-white',
        dark:'bg-tertiary text-primary hover:bg-lime-100 hover:text-tertiary',
        ghost: 'bg-transparent hover:text-white hover:bg-secondary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
}

const Link: FC<LinkProps> = ({
  className,
  children,
  variant,
  size,
  ...props
}) => {
  return (
    <a
      className={cn(linkVariants({ variant, size, className }))}
      {...props}>
      {children}
    </a>
  )
}

export default Link
