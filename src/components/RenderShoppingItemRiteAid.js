import React, { useState, useEffect } from "react";

export default function RenderShoppingItemRiteAid({
  jsonResponse,
  deleteItem,
}) {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    if (jsonResponse) {
      const tableData = jsonResponse.ParsedResults[0].TextOverlay.Lines;

      const extractedTexts = tableData
        .filter((line) => {
          const lineText = line.LineText.trim();
          const startsWithOne =
            lineText.startsWith("1") || lineText.startsWith("- 1");
          const containsColon = lineText.includes(":");
          const containsItems = lineText.includes("Items");
          const isDollarAmount = lineText[1] === "." || lineText[2] === ".";

          return (
            startsWithOne && !containsColon && !containsItems && !isDollarAmount
          );
        })
        .map((line) => {
          const lineText = line.LineText.trim();
          const textAfterOne = lineText.substring(1).trim();
          const textAfterDash = lineText.substring(3).trim();
          return lineText.startsWith("- 1") ? textAfterDash : textAfterOne;
        });

      const newItems = extractedTexts.map((text) => ({
        name: text,
        purchased: false,
      }));
      setShoppingList(newItems);
    }
  }, [jsonResponse]);

  const togglePurchased = (index) => {
    const updatedList = shoppingList.map((item, i) =>
      i === index ? { ...item, purchased: !item.purchased } : item
    );
    setShoppingList(updatedList);
  };

  const getButtonClass = (purchased) => {
    return purchased
      ? "btn btn-success btn-sm mx-1"
      : "btn btn-outline-success btn-sm mx-1";
  };

  return (
    <div>
      {shoppingList.length > 0 && (
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index} className="d-flex justify-content-center">
              <div
                className="card my-2 p-2 d-flex flex-row flex-nowrap justify-content-between align-items-center"
                style={{ width: "50%", minWidth: "300px" }}
              >
                <h6 className="mx-2 flex-grow-1 text-wrap">{item.name}</h6>
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
                    onClick={() => deleteItem(item.name)}
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
  );
}
