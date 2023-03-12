import { Color, PieceSymbol, Square } from "chess.js";

export default interface BoardData {
    square: Square;
    type: PieceSymbol;
    color: Color;
}