import { databases } from "@/appwrite"

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  const todos = data.documents;

  const streamer: TypedColumn = {
    id: "streamers",
    streamers: todos.map((todo) => ({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      platform: todo.platform,
      description: todo.description,
      point: todo.point,
    })),
  };

  const board: Board = {
    columns: [streamer],
  };

  return board;
};