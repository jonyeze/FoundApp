export interface DefaultTextareaProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  idName?: string;
}
