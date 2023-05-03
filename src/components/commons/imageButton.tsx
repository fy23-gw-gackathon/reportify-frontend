import Image from "next/image";

type Props = {
    src: string;
    width: number;
    height: number;
    onClick: () => void;
};

export const ImageButton = ({ src, width, height, onClick }: Props) => {
    return (
        <button onClick={onClick}>
            <Image src={src} width={width} height={height} alt=""></Image>
        </button>
    );
};
