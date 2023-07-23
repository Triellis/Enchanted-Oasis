import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

function Icon({ name }: IconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon />;
}

export default Icon;
