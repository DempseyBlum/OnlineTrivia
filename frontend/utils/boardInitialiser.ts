import { BoardTemplateType } from "../src/boardTemplates/boardTemplateType";

export type BoardTile = {
  tileID: number;
  topicID: string;
} | null;

export type BoardType = BoardTile[][];

export const BoardInitialiser = (
  topicIDs: string[],
  boardTemplate: BoardTemplateType
) => {
  const board: BoardType = boardTemplate.board.map((row, columnIndex) => {
    return row.map((topicIndex, rowIndex) => {
      const tileID = boardTemplate.board[0].length * columnIndex + rowIndex + 1;
      if (topicIndex === 0) {
        return null;
      }
      return {
        tileID,
        topicID: topicIDs[topicIndex],
      };
    });
  });
  return board;
};
