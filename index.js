const fs = require("fs");
const path = require("path");
const [, , action, ...args] = process.argv;

const filePath = path.join(__dirname, "file.json");

switch (action) {
  case "github-activity":
    userActivity(args.join(" "));
    break;
    case "user-details":
      userDetails();
  default:
    break;
}

 function userActivity(userName) {
  let api = `https://api.github.com/users/${userName}/events`;
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      saveFile(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function userDetails() {
   const data = fs.readFileSync(filePath, 'utf-8')
   const parsedData = JSON.parse(data)
   parsedData.map((item)=>{
   console.log(`${item.id} : type - ${item.type} , payload - ${item.payload?.commits?.[0]?.author?.email} , public - ${item.public} , created_at - ${item.created_at}`);
   })

   
}

function saveFile(data) {
 fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
}
