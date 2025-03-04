"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
const RoutingComponent = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/wedding-florist-software')
    }, [])
    return (
        <div>

        </div>
    )
}
export default RoutingComponent