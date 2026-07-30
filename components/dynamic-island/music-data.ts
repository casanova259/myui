export interface Song {
  cover: string;
  title: string;
  artist: string;
  duration: number; // seconds
}

// Drop your own album art into /public/covers and point these at it,
// e.g. cover: "/covers/your-track.jpg"
export const songs: Song[] = [
  {
    cover: "/cvr.jpg",
    title: "11 K",
    artist: "Seedhe Maut",
    duration: 180,
  },
];