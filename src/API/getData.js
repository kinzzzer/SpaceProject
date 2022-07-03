import axios from "axios";


export default async function getData() {
    return  await axios
        .get(`https://lldev.thespacedevs.com/2.2.0/launch?=limit=10`)
        .then((res) => res.data.results)
}
