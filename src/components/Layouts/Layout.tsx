import { ReactNode } from "react";

import { Footer } from "@components/Layouts/Footer";
import { Header } from "@components/Layouts/Header";

type Props = {
    children: ReactNode;
};

export const Layout = ({ children }: Props) => {
    return (
        <div className={`flex min-h-screen w-screen flex-col items-center justify-between`}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
