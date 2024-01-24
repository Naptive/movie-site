import { Button } from "@/components/ui/button";

interface ButtonProps {
  onPress: () => void;
  text: string,
  endContent?: React.ReactNode,
  startContent?: React.ReactNode,
}

export function ButtonWithIcon({ onPress, text, endContent = '',startContent= '' }: ButtonProps) {
  return <Button onClick={onPress}>{startContent} {text} {endContent}</Button>;
}
