export default function TableHeader() {
  return (
    <div
      className=" mt-8 grid grid-cols-12 md:grid-cols-11 text-semibold 
            border-b-2 border-slate-300 pb-2 text-[10px] sm:text[12px] md:text-[16px] lg:text-[20px]"
    >
      <p className="col-span-2 md:col-span-1">STATUS</p>
      <p className="col-span-3">TITLE</p>
      <p className="col-span-2">DIFFICULTY</p>
      <p className="col-span-3">CATEGORY</p>
      <p className="col-span-2">SOLUTION</p>
    </div>
  )
}
