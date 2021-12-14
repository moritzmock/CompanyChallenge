import importProperties from "./propertiesImport.js";
import {getURLs, verifyURLs} from "./companyChallenge.js";

//this can be adjusted manually, however it only affects this file and not the others
//default value from jest is 5000ms
jest.setTimeout(50000)

describe("testing the setup", () => {

    const file = "websites.properties"
    const data = importProperties(file);

    for(let key in data) {
        let name = data[key].key
        let website = data[key].value
        test("run tests - " + name, async () => {
            const allURLs = await getURLs(website)
            const errors = await verifyURLs(name, allURLs, true, false)
            expect(errors.length, errors.length + " out of " + allURLs.length + " links are broken!").toBe(0)
        })
    }

})