import Button from "react-bootstrap/Button";
import ShoppingList from "./ShoppingList";
import ParseReceipt from "./ParseReceipt";

export default function Main() {
  return (
    <div>
      <h1 className="text-center mt-3">This is the Main page</h1>

      <ShoppingList />
      <ParseReceipt />
    </div>
  );
}
