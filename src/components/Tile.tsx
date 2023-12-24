// types
type TileProps = {
    backgroundColor: string;
    onClick: () => void;
};

const Tile = ({ backgroundColor, onClick }: TileProps) => {
    return (
        <button className="grid" style={{ backgroundColor }} onClick={onClick} />
    );
};

export default Tile;