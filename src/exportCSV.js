import { ExportToCsv } from "export-to-csv";
import fs from "fs";

const options = {
    fieldSeparator: ";",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
};

const csvExporter = new ExportToCsv(options);

export function saveAsCSV(path, data) {
    fs.writeFileSync("./" + path + ".csv", csvExporter.generateCsv(data, true));

    console.log("saved a file");
}
