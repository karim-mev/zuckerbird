import Image from "next/image";
import Likes from "./btns/Likes";

// type XeetType = {
//     id: string,
//     author: {
//         name: string,
//         username: string,
//     }
//     title: string
// }

export const revalidate = 0;

export default function Xeets({ xeets }: any) {
  console.log(xeets);
  return (
    <div className="border border-gray-800 border-t-0 p-4 flex-1">
      {xeets?.map((xeet: any) => (
        <div className="flex gap-2">
          <div className="h-12 w-12 rounded-2xl">
            <Image
              src={xeet.author?.avatar_url}
              alt="author avatar"
              width={48}
              height={48}
              className="rounded-full"
              style={{ borderRadius: "2rem" }}
            />
          </div>

          <div key={xeet.id} className="flex flex-col gap-5">
            <p><span className="font-bold">{xeet.author.name}</span>
            <span className="text-sm text-gray-400"> {xeet.author.username}</span></p>
            <p>{xeet.title}</p>
            <Likes xeet={xeet} />
          </div>
        </div>
      ))}
    </div>
  );
}
