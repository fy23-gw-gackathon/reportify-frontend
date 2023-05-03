import { Inter } from "next/font/google";
import { useRecoilState } from "recoil";

import { useDisclosure } from "@/hooks/useDisclosure";
import { SearchState } from "@/store/searchState";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchValue, setSearchValue] = useRecoilState(SearchState);

    const onSetSearchValueClick = () => setSearchValue("clicked!");

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <button onClick={onOpen}>Open Dialog</button>
            <p>SearchValue: {searchValue}</p>
            <button onClick={onSetSearchValueClick}>SetSearchValue</button>
            {isOpen && (
                <dialog open>
                    <p>Dialog</p>
                    <button onClick={onClose}>close</button>
                </dialog>
            )}
        </main>
    );
}
