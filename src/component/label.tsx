'use client'
import { ChevronRight } from "lucide-react"

interface Props {
    title: string;
    chevron?: Boolean
  }

function Label({ title, chevron }: Props) {
  return (
    <section className={`flex justify-between items-center my-5 md:w-min`}>
        <label htmlFor="Recommended" className=" text-[18px] md:text-[16px] font-medium whitespace-nowrap">
          {title}
        </label>
        {chevron && <ChevronRight size={20} color="white"/>}
      </section>
  )
}
export default Label