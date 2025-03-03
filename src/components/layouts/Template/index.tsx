import { ReactNode } from "react";

type TemplateProps = {
  children: ReactNode;
};

const Template = ({ children }: TemplateProps) => (
  <div className="h-full w-full overflow-hidden">{children}</div>
);

export default Template;
