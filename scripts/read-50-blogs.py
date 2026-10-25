from pathlib import Path
import openpyxl

desktop = Path(r"c:\Users\PC\Desktop")
xlsx_files = list(desktop.rglob("50-BLOGS*.xlsx"))
docx_files = list(desktop.rglob("50-BLOGS*.docx"))
print("XLSX:")
for p in xlsx_files:
    print(" ", p)
print("DOCX:")
for p in docx_files:
    print(" ", p)

if not xlsx_files:
    raise SystemExit("No xlsx found")

wb = openpyxl.load_workbook(xlsx_files[0], data_only=True)
for sheet in wb.sheetnames:
    ws = wb[sheet]
    print(f"\n=== SHEET: {sheet} rows={ws.max_row} cols={ws.max_column} ===")
    # print header + first 3 rows
    for r in range(1, min(6, ws.max_row + 1)):
        row = []
        for c in range(1, min(ws.max_column + 1, 12)):
            v = ws.cell(r, c).value
            if v is not None:
                s = str(v).replace("\n", " ")[:80]
                row.append(f"{c}:{s}")
        print(f"R{r}:", " | ".join(row))
