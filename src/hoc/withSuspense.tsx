import * as React from "react";

export function withSuspense<WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {

    return (props: WCP) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    }
}