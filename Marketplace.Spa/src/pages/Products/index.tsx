import { useState } from "react";
import ProductList from "../../components/ProductList";
import {Box, TextField } from "@mui/material";

const Products = ()=>{
    const [search, setSearch] = useState("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
    <div>
        <Box sx={{ mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>
        <TextField
            name={"search"}
            onChange={handleSearch}
            placeholder="Search.."
            sx={{ width: "500px"}}
        />
        </Box>
        <ProductList search={search}/>
    </div>);
}
export default Products;