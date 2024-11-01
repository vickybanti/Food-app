"use client"
import { ShowMoreProps } from "@/types/types"
import { useRouter } from "next/navigation"
import Button from "./Button"
const ShowMore = ({ pageNumber, isNext, setLimit}:ShowMoreProps) => {
  
  const router = useRouter()

  const handleNavigation =() => {
    const newLimit = (pageNumber + 1) *10
    // const newPathName = updateSearchParams("limit",`${newLimit}`)
    // router.push(newPathName)

    setLimit(newLimit)
}
    return (
    <div className="w-full gap-5 mt-10 flex-center">
        {!isNext && (
            <Button 
                type='button'
                title="Show More"
                variant="text-white bg-primary-blue rounded-full"
                onClick={handleNavigation}

            />
        )} 
    </div>
  )
}

export default ShowMore