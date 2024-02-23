import type { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
}

export const Button = ({ children }: ButtonProps): ReactNode => {
	return <button className="bg-red-700">{children}</button>;
};
