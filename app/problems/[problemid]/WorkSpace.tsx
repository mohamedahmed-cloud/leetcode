import Split from 'react-split'
import ProblemContainer from '../components/Problem'
import PlayGround from '../components/PlayGround/PlayGround'
import { Problem } from '@/utils/types/problem'

type WorkSpaceProps = {
  problem: Problem
}
export default function WorkSpace({ problem }: WorkSpaceProps) {
  return (
    <Split className="split min-h-[calc(100vh-106px)]" minSize={0}>
      <ProblemContainer problem={problem} />
      <PlayGround />
    </Split>
  )
}
