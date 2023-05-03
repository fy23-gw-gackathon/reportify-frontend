type Props = {
  src: string;
  width: number;
  height: number;
  onClick: () => void;
};

export const ImageButton = ({ src, width, height, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <img src={src} width={width} height={height}></img>
    </button>
  );
};
