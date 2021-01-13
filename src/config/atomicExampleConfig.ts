import { } from "store/tests/groceries-store.test";
import { AppConfig } from "../util/AppConfig";
import rootRoute from "./routes";


type Fruit = string;
interface Veggie {
    veggieName: string
    veggieLike: boolean
}
interface Groceries {
    fruits: Fruit[]
    veggies: Veggie[]
}


const config: AppConfig = {
    rootRoute: rootRoute,
    sections: { forms: rootRoute.nested },


}
export default config;