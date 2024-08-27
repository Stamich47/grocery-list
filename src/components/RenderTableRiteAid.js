export default function RenderTableRiteAid({ jsonResponse }) {
  if (!jsonResponse) return null;

  const tableData = jsonResponse.ParsedResults[0].TextOverlay.Lines;

  return (
    <table width={"50%"} border="1" className="mt-4">
      <thead>
        <tr>
          <th>Line</th>
        </tr>
      </thead>
      <tbody>
        {tableData
          .filter((line) => {
            const lineText = line.LineText.trim();
            const startsWithOne =
              lineText.startsWith("1") || lineText.startsWith("- 1");
            const containsColon = lineText.includes(":");
            const containsItems = lineText.includes("Items");

            const isDollarAmount = lineText[1] === "." || lineText[2] === ".";

            return (
              startsWithOne &&
              !containsColon &&
              !containsItems &&
              !isDollarAmount
            );
          })
          .map((line, index) => {
            const lineText = line.LineText.trim();
            const textAfterOne = lineText.substring(1).trim();
            const textAfterDash = lineText.substring(3).trim();
            return (
              <tr key={index}>
                <td>
                  <ul>
                    <li>
                      {line.LineText.startsWith("- 1")
                        ? textAfterDash
                        : textAfterOne}
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
