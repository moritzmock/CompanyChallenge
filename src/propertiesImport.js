import PropertiesReader from "properties-reader";

export default function importProperties(name) {
    var properties = PropertiesReader(name);
    let map = [];

    properties.each((key, value) => {
        map.push({
            key,
            value,
        });
    });

    return map;
}
