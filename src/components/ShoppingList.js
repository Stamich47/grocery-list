import { useState } from "react";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);

  const addItem = (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let FormDataObj = Object.fromEntries(formData.entries());
    FormDataObj.purchased = false;
    setShoppingList([...shoppingList, FormDataObj]);
    form.reset();
  };

  const deleteItem = (e) => {
    let itemName = e.target.value;
    let newShoppingList = shoppingList.filter((item) => item.name !== itemName);
    setShoppingList(newShoppingList);
  };

  const getButtonClass = (purchased) => {
    let buttonClass = "btn btn-outline-success btn-sm mx-1";
    if (purchased === true) {
      buttonClass = "btn btn-success btn-sm mx-1";
    } else {
      buttonClass = "btn btn-outline-success btn-sm mx-1";
    }
    return buttonClass;
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mt-3">This is the Shopping List area</h2>
      <div className="d-flex justify-content-center">
        <form
          className="card d-inline-flex flex-row p-2 align-items-center "
          onSubmit={addItem}
        >
          <input
            type="text"
            name="name"
            placeholder="Add item to list..."
          ></input>
          <button type="submit" className="mx-1 btn btn-primary">
            Add
          </button>
        </form>
      </div>
      <div>
        {shoppingList.length > 0 && (
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index} className="d-flex justify-content-center">
                <div
                  className="card my-2 p-2 d-flex flex-row flex-nowrap justify-content-between align-items-center"
                  style={{ width: "50%", minWidth: "300px" }}
                >
                  <h4 className="mx-2 flex-grow-1 text-wrap">{item.name}</h4>
                  <div className="d-flex flex-shrink-0">
                    <button
                      type="button"
                      className={getButtonClass(item.purchased)}
                      onClick={(e) => {
                        if (item.purchased === false) {
                          item.purchased = true;
                          setShoppingList([...shoppingList]);
                          console.log(item.purchased);
                        } else {
                          item.purchased = false;
                          setShoppingList([...shoppingList]);
                          console.log(item.purchased);
                        }
                      }}
                    >
                      Purchased
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm mx-1"
                      onClick={deleteItem}
                      value={item.name}
                    >
                      X
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
