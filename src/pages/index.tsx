import { useState } from "react";
import { useRecoilState } from "recoil";

import { TestEntity } from "@entites/test-entity";
import { useDisclosure } from "@hooks/useDisclosure";
import { execTestAPI } from "@services/testService";
import { SearchState } from "@store/searchState";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchValue, setSearchValue] = useRecoilState(SearchState);
    const onSetSearchValueClick = () => setSearchValue("clicked!");

    const [testData, setTestData] = useState<TestEntity[] | null>(null);
    const sendRequest = async () => {
        try {
            const result = await execTestAPI();
            setTestData(result);
        } catch (error) {
            setTestData(null);
            console.log(error);
        }
    };

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
            <button onClick={onOpen}>Open Dialog</button>
            <button onClick={sendRequest}>SendRequst</button>
            <p>SearchValue: {searchValue}</p>
            {testData && (
                <>
                    <p>RequestResult:</p>
                    {testData.map(({ name }) => (
                        <>{name}</>
                    ))}
                </>
            )}
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
