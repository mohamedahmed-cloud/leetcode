'use client'
// import { problems } from '@/components/problem/problem.mock'
import { LuCheckCircle } from 'react-icons/lu'
import Link from 'next/link'
import { AiFillYoutube } from 'react-icons/ai'
import YoutubeModal from './YoutubeModal'
import { useState } from 'react'
import { DBProblems } from '@/types/problem'

export default function TableContent({
  problems,
  solvedProblems,
}: {
  problems: DBProblems | null
  solvedProblems: string[] | null
}) {
  const [isOpen, setIsOpen] = useState(false)

  const [videoId, setVideoId] = useState<string | undefined>('')
  const handleClick = (videoId: string | undefined) => {
    setVideoId(videoId)
    setIsOpen(true)
  }

  return (
    <div className="pb-8">
      {Array.isArray(problems) &&
        problems.length > 0 &&
        problems.map((problem, indx) => {
          const difficultyLevel =
            problem.difficulty === 'Easy'
              ? 'text-dark-green-s'
              : problem.difficulty === 'Medium'
                ? 'text-dark-yellow'
                : 'text-dark-pink'
          return (
            <div
              key={problem?.id}
              className={`grid grid-cols-12 md:grid-cols-11 text-[12px]  md:text-[16px] lg:text-[20px]
                  ${indx % 2 == 1 ? 'bg-dark-layer-1' : ''} rounded-lg px-2 py-4`}
            >
              <p className="col-span-2 md:col-span-1">
                {' '}
                {solvedProblems?.includes(problem?.id) && (
                  <LuCheckCircle className="text-dark-green-s" />
                )}{' '}
              </p>
              <Link
                href={`/problems/${problem?.id}`}
                className="col-span-3  hover:text-blue-500"
              >
                {problem.title}
              </Link>
              <p className={`col-span-2 ${difficultyLevel}`}>
                {problem.difficulty}{' '}
              </p>
              <p className="col-span-3">{problem.category} </p>
              <div className="col-span-2 h-8">
                {problem.VideoId ? (
                  <button onClick={() => handleClick(problem.VideoId)}>
                    <AiFillYoutube className="hover:text-red-600 cursor-pointer w-8 h-full" />
                  </button>
                ) : (
                  <p className="text-slate-300 ">comming soon</p>
                )}
              </div>
            </div>
          )
        })}
      {isOpen && <YoutubeModal videoId={videoId} setIsOpen={setIsOpen} />}
    </div>
  )
}
