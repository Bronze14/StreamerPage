interface Image {
  buckectId: string;
  fileId: string;
}
type TypedColumn = "Twitch" | "Kick" | "Rumble" | "TikTok" | "Youtube"
interface Streamer {
  $id: string;
  $createdAt: string;
  title: string;
  description: string;
  platform: TypedColumn;
  image?: Image;
  point: number;
}

interface TypedColumn {
  id: "streamers";
  streamers: Streamer[];
}

interface Column {
  id: TypedColumn["id"];
  streamers: TypedColumn["streamers"];
}

interface Board {
  columns: Column[];
}