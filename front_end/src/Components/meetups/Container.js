import "./container.css"
import Seat from "./Seat";
function Container(propes)
{
   
const arr=[];
for(var i=0;i<propes.no;i++)
{
  arr.push(i);

}
return (
<div className="rows balls">
    {arr.map((user) => (
        <Seat rown={propes.row} coln={user} ></Seat>
      ))}
      
</div>
);
}
export default Container;