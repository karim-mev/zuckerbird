import Likes from "./btns/Likes";

// type XeetType = {
//     id: string,
//     author: {
//         name: string,
//         username: string,
//     }
//     title: string
// }

export default function Xeets({xeets} : any) {
  return (
    <div>{xeets?.map((xeet: any) => (
        <div key={xeet.id}>
          <p>{xeet.author.name}</p>
          <p>{xeet.author.username}</p>
          <p>{xeet.title}</p>
          <Likes xeet={xeet} />
        </div>
      ))}</div>
  )
}
