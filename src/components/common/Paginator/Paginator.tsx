import styles from "./Paginator.module.css";
import React, {useState} from "react";
import classNames from "classnames";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftBorder = (portionNumber - 1) * portionSize + 1;
    let rightBorder = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {
                portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>prev</button>
            }

            {
                pages
                    .filter(p => p >= leftBorder && p <= rightBorder)
                    .map(p => {
                        return <span className={classNames({
                            [styles.selectedPage]: currentPage === p
                        }, styles.pageNumber)}
                                     key={p}
                                     onClick={(e) => {
                                         onPageChanged(p)
                                     }}>{p}</span>
                    })
            }

            {
                portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>next</button>
            }
        </div>
    );
}

export default Paginator;