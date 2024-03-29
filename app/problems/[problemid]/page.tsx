'use client'
import HomeNavBar from '@/app/components/NavBar/HomeNavBar'
import WorkSpace from './WorkSpace'
import { getProblems } from '@/utils/problems/index'

type ProblemParamsProps = {
  params: {
    problemid: 'two-sum' | 'reverse-linked-list' | 'reverse-linked-list'
  }
}

export default function Problem({ params }: ProblemParamsProps) {
  const { problemid } = params
  const problem = getProblems[problemid]

  return (
    <div className=" w-full h-screen">
      <HomeNavBar homePage problemId={problemid} />
      <WorkSpace problem={problem} />
    </div>
  )
}
