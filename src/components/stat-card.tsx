import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
} & PropsWithChildren;

type AttributeProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export const Divider = () => <div className="my-2 border-b-2 border-red-800" />;

export const Attribute = ({ label, value, className }: AttributeProps) => {
  return (
    <div className={className}>
      <span className="font-semibold">
        {label + ': '}
      </span>
      <span>
        {value}
      </span>
    </div>
  );
};

const CardHeader = ({ className, children }: Props) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }: Props) => {
  return (
    <h1 className={cn(
      'text-3xl font-semibold text-red-900',
      className,
      )}
    >
      {children}
    </h1>
  );
};

const CardSubtitle = ({ className, children }: Props) => {
  return (
    <div className={cn(
      'mt-1 mb-4 italic',
      className,
      )}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children }: Props) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};

const CardStatBlock = ({ className, children }: Props) => {
  return (
    <div className={cn(
      'text-red-900',
      className,
      )}
    >
      {children}
    </div>
  );
};

const CardFootnote = ({ className, children }: Props) => {
  return (
    <div className={cn(
      'mt-8 absolute inset-x-2',
      className,
      )}
    >
      {children}
    </div>
  );
};

type CardProps = { columns?: boolean } & Props;

function Card ({ columns = false, className, children }: CardProps) {
  return (
    <div className={cn(
      'scroll-texture',
      'p-4 shadow-md shadow-slate-500 max-w-5xl mx-auto',
      columns && 'lg:columns-2',
      className,
      )}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.StatBlock = CardStatBlock;
Card.Attribute = Attribute;
Card.Footnote = CardFootnote;
Card.Divider = Divider;

export default Card;