import axios from "axios";


export default async function getLaunchList(link) {
    if (link) {
        return await axios
            .get(link)
            .then((res, error) => {
                return res.data
            })
    }
}
