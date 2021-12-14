import { getURLs, verifyURLs } from "./companyChallenge.js";
import importProperties from "./propertiesImport.js";
async function run() {
    //DONE: relative links -> does chrome

    //TODO: image on click -> needs to be tested - done
    //TODO: videos on click -> needs to be tested - done
    //TODO: CSV -> check if output os ok - done

    //TODO: 404 status code -> done

    //TODO: testcases
    //TODO: window.location set

    const map = importProperties("websites.properties");

    for (let key in map) {
        let name = map[key].key;
        let website = map[key].value;
        const allURLs = await getURLs(website);
        await verifyURLs(name, allURLs);
    }
}

run();
