import {Link} from "react-router";
import {appRoutes} from "../../routes.ts";
import { Typography } from "@mui/material";

const PageNotFound = ()=>{
    return <div>
        <Typography variant={"h2"}>Page Not Found</Typography>
        <Link to={appRoutes.products()}>
            <Typography variant={"h6"}>Back to catalog</Typography>
        </Link>
    </div>;
}
export default PageNotFound;