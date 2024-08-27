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
          .filter(
            (line) =>
              (line.LineText.trim().startsWith("1") ||
                line.LineText.startsWith("- 1")) &&
              !line.LineText.includes(":") &&
              !line.LineText.includes("Items")
          )
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
