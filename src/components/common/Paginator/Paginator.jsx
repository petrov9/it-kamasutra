import styles from "./Paginator.module.css";
import React from "react";

let Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage, visiblePages}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {
                pages.map(p => {
                    if (p <= visiblePages) {
                        return <span onClick={() => {
                            onPageChanged(p)
                        }} className={currentPage === p && styles.selectedPage}>{p}</span>;
                    }
                })
            }
        </div>
    );
}

export default Paginator;