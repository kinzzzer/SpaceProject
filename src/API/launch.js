import axios from "axios";


export default async function getLaunchList(pagination) {
    const query = queryString.stringify(pagination)
    return  await axios
        .get(`https://lldev.thespacedevs.com/2.2.0/launch?${query}`)
        .then((res) => res.data.results)
}
