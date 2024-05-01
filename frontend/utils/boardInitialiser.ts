import { BoardTemplateType } from "../src/boardTemplates/boardTemplateType";

export type BoardTile = {
  tileId: number;
  topicId: number;
} | null;

export type BoardType = BoardTile[][];

export const BoardInitialiser = (
  topicIds: number[],
  boardTemplate: BoardTemplateType
) => {
  const board: BoardType = boardTemplate.board.map((row, columnIndex) => {
    return row.map((topicIndex, rowIndex) => {
      const tileId = boardTemplate.board[0].length * columnIndex + rowIndex + 1;
      if (topicIndex === 0) {
        return null;
      }
      return {
        tileId,
        topicId: topicIds[topicIndex],
      };
    });
  });
  return board;
};
