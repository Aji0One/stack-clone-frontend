import React from "react";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" ><img style={{
                        width: "150px",
                        padding: 0,
                        cursor: "pointer",
                    }}src="https://upload.wikimedia.org/wikipedia/commons/0/02/Stack_Overflow_logo.svg" alt="logo" /></Link>
                    <h3>Products</h3>
                </div>
                <div className="header-middle">
                    <div className="header-search-container">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-right-container">
                        <Avatar />
                        <InboxIcon />
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;