import axios from 'axios';

class Request{
    private urlBase = "http://localhost:64814/api/";

    public async Get( url: string ): Promise<any> {
        let ret: any = null;

        await axios.get( `${this.urlBase}${url}`, {
            /* headers:{
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
            },*/
            method: "GET"
        } )
        .then( result => {
            ret = result.data;
        });

        return ret;
    }
}

const client = new Request();
export default client;