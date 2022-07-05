import jsonQuery from "json-query";
import airports from '../airports.json';

export default function ({ query: { id } }, res) {
    
    const data = { airports };
    const {value} = jsonQuery(`airports[code=${id.toUpperCase()}].name`, {
        data: data
    });
    res.status(200).json({
        code: id.toUpperCase(),
        name: value
     });
  }