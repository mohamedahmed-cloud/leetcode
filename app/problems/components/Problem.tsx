import Tabs from './Problem/Tabs'
import ProblemInfo from './Problem/ProblemInfo'
import Description from './Problem/Description'
import Example from './Problem/Example'
import Constraints from './Problem/Constraints'
import { Problem } from '@/utils/types/problem'

type ProblemDescriptionProps = {
  problem: Problem
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { constraints, problemStatement, examples, id, title } = problem
  console.log(problemStatement)
  return (
    <div className="bg-dark-layer-1  ">
      <div className=" bg-dark-layer-2  ">
        <div className="bg-dark-layer-1  ">
          <Tabs text={'Description'} />
          <div className="  pb-7 h-[calc(100vh-106px)] overflow-y-auto">
            <div className="max-w-[800px] p-2 lg:p-4">
              <h1 className="text-xl text-white font-bold">{title}</h1>
              <ProblemInfo like={23} dislike={4} difficulty="Easy" />
              <div className="mt-5">
                {Array.isArray(problemStatement) &&
                  problemStatement?.map((items, indx) => (
                    <div className="mb-1.5" key={items[0]}>
                      {Array.isArray(items) &&
                        items?.map((item, indx) => (
                          <Description
                            key={id}
                            code={item?.code}
                            text={item?.text}
                            boldText={item?.boldText}
                          />
                        ))}
                    </div>
                  ))}
              </div>
              <div>
                {Array.isArray(examples) &&
                  examples?.map((item, indx) => (
                    <Example
                      key={item.id}
                      indx={indx}
                      input={item.input}
                      output={item.output}
                      explanation={item.explanation}
                    />
                  ))}
              </div>
              <Constraints
                rangeConstraints={constraints?.rangeConstraints}
                otherConstraints={constraints?.otherConstraints}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProblemDescription
