
export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (itemId === u[objPropName]) {
            return {...u, ...newObjProps};
        }
        return u;
    })
}