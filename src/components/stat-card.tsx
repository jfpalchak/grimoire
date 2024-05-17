import { PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
} & PropsWithChildren;

type AttributeProps = {
  name: string;
  value: ReactNode;
  className?: string;
};


export const Attribute = ({ name, value, className }: AttributeProps) => {
  return (
    <div className={className}>
      <span className="font-semibold">
        {name + ': '}
      </span>
      <span>
        {value}
      </span>
    </div>
  );
};

const Divider = () => <div className="my-2 border-b-2 border-red-800" />;

const CardHeader = ({ className, children }: Props) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }: Props) => {
  return (
    <h1 className={cn('mt-10 text-3xl font-semibold text-red-900', className)}>
      {children}
    </h1>
  );
};

const CardSubtitle = ({ className, children }: Props) => {
  return (
    <div className={cn('mt-1 mb-4 italic', className)}>
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
    <div className={cn('text-red-900', className)}>
      {children}
    </div>
  );
};

const CardFootnote = ({ className, children }: Props) => {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
};

function Card ({ children }: Props) {
  return (
    <div>
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