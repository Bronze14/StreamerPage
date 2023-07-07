import { ID, databases } from '@/appwrite';
import { getTodosGroupedByColumns } from '@/lib/getTodosGroupedByColumn';
import internal from 'stream';
import { create } from 'zustand'


interface BoardState {
  board: Board;
  getBoard: () => void;
  newTaskInput: string;
  description: string;
  newTaskType: ColumnType;
  setNewTaskInput: (input: string) => void;
  setNewTaskType: (columnId: ColumnType) => void;
  setDescription: (input: string) => void;
  addTask: (todo: string, columnId: ColumnType, description: string) => void;
  addPlus: (streamerId: string) => void;
  addMinus: (streamerId: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: [] as Column[], 
  },
  newTaskInput: "",
  description: "",
  newTaskType: "Twitch",
  getBoard: async () => {
    const board = await getTodosGroupedByColumns();
    set({ board });
  },
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setNewTaskType: (columnId: ColumnType) => set({ newTaskType: columnId }),
  setDescription: (input: string) => set({ description: input }),
  addTask: async (todo: string, columnId: ColumnType, description: string) => {
    try {
      const { $id } = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        ID.unique(),
        {
          title: todo,
          platform: columnId,
          description: description,
          point: 0,
        }
      );
      set({
        newTaskInput: "",
        description: "",
        newTaskType: "Twitch",
      });
      await get().getBoard();
    } catch (error) {
      console.error(error);
    }
  },
 addPlus: async (streamerId: string) => {
  try {
    const board = get().board;
    const updatedBoard = { ...board };
    const columnArray = Array.from(updatedBoard.columns.values());
    for (const column of columnArray) {
      const streamer = column.streamers.find((s) => s.$id === streamerId);
      if (streamer) {
        streamer.point += 1;
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
          streamer.$id,
          {
            point: streamer.point,
          }
        );
        break;
      }
    }
    set({ board: updatedBoard });
  } catch (error) {
    console.error(error);
  }
},
addMinus: async (streamerId: string) => {
  try {
    const board = get().board;
    const updatedBoard = { ...board };
    const columnArray = Array.from(updatedBoard.columns.values());
    for (const column of columnArray) {
      const streamer = column.streamers.find((s) => s.$id === streamerId);
      if (streamer) {
        streamer.point -= 1;
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
          streamer.$id,
          {
            point: streamer.point,
          }
        );
        break;
      }
    }
    set({ board: updatedBoard });
  } catch (error) {
    console.error(error);
  }
},
}));
