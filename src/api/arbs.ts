import arbitrageData from '../constants/arbs.json'

//method to mock API call and return arbitrage data

export const fetchData = async () => {
    return Promise.resolve(arbitrageData)
}