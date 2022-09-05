import axios from "axios";
// Функция поиска по АПИ
export default async function searchCharacters(search, link) {
    if (link) {
        return await axios
            .get(link)
            .then((res, error) => {
                return res.data
            })
    } else {
        return await axios
            .get(`https://lldev.thespacedevs.com/2.2.0/launch/?search=${search}`)
            .then((res, error) => {
                return res.data
            })
    }

}
