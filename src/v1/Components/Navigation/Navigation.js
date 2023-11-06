import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAPI, productAPI } from "../../Api";
import { Navbar, Login, Overlay } from "../../Components";
import { actionsCreator } from "../../Redux/actions/actionsCreator";
import SearchResults from "../SearchResults";
import "./Navigation.scss";
import get from "lodash/get";

const mapStateToProps = ({ auth }) => ({
    auth,
});

export default function Navigation() {
    const { auth } = useSelector(mapStateToProps);
    const { showLoginPopup = false, isLoggedIn = false } = auth;
    const dispatch = useDispatch();
    const [overlayOpen, setoverlayOpen] = useState(false);
    const loginstatesetter = () => {
        dispatch(actionsCreator.SHOW_LOGIN());
    };

    const removeLoginPopup = () => {
        dispatch(actionsCreator.SET_LOGIN({ showLoginPopup: false }));
        setoverlayOpen(false);
        setsearchResults([]);
    };

    const [search, setsearch] = useState("");
    const [searchResults, setsearchResults] = useState([]);
    const [pageNumber, setpageNumber] = useState(1);
    const [userDetails, setUserDetails] = useState({});
    const [loadMore, setloadMore] = useState(true);
    const [showSearchResults, setshowSearchResults] = useState(false);
    const searchTermHandler = (term) => {
        setsearch(term);
    };

    const scrollToEnd = () => {
        setpageNumber(pageNumber + 1);
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserDetails();
        }
        window.addEventListener("logout_user", logoutUser);
        return () => {
            window.removeEventListener("logout_user", logoutUser);
        };
    }, []);

    const logoutUser = () => {
        dispatch(actionsCreator.LOGOUT_USER());
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    const fetchSearchResults = async () => {
        try {
            const response = await productAPI.sellableProductSearch({
                search: search,
                page: pageNumber,
            });
            const resData = get(response, "data.results");
            if (pageNumber === 1) setsearchResults(resData);
            else setsearchResults([...searchResults, ...resData]);
            setoverlayOpen(true);
        } catch (error) {
            setloadMore(false);
        }
    };
    const bodyVar = document.querySelector("body");

    useEffect(() => {
        if (search !== "") {
            setshowSearchResults(true);
            fetchSearchResults();
            // bodyVar.style.overflow('hidden')
        } else {
            setsearchResults([]);
            setoverlayOpen(false);
            setpageNumber(1);
            setloadMore(true);
        }
    }, [search, pageNumber]);

    useEffect(() => {
        setpageNumber(1);
        setloadMore(true);
    }, [search]);

    //click outside to close function
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setoverlayOpen(false);
                    setsearchResults([]);
                    setshowSearchResults(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const searchRef = useRef();
    useOutsideAlerter(searchRef);

    const fetchUserDetails = async () => {
        dispatch(actionsCreator.FETCH_USER_DETAILS());
    };

    useEffect(() => {
        if (overlayOpen === true) {
            document.querySelector("body").style.overflow = "hidden";
        } else {
            document.querySelector("body").style.overflow = "auto";
            if (document.querySelector(".navbar-search"))
                document.querySelector(".navbar-search").value = "";
        }
    }, [overlayOpen]);

    return (
        <>
            <Navbar
                clickfunc={loginstatesetter}
                removeLoginPopup={removeLoginPopup}
                search={searchTermHandler}
            />
            {search !== "" && showSearchResults ? (
                <div ref={searchRef}>
                    <SearchResults
                        fetchMoreItems={() => scrollToEnd()}
                        data={searchResults || []}
                        loadMore={loadMore}
                        overlayHandler={setoverlayOpen}
                        resultsHandler={setshowSearchResults}
                        searchTerm={search}
                    />
                </div>
            ) : null}
            {showLoginPopup || overlayOpen ? (
                <Overlay clickfunc={removeLoginPopup} />
            ) : null}
        </>
    );
}
