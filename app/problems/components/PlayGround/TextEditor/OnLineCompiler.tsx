'use client'
import axios from 'axios'
import { GetWrapperCode } from '../problemsWrapper/two-sum'
import { CheckArrayAnswer } from '../CheckUserAnswer/CheckArrayAnswer'

export async function OnlineCompiler(
  sourceCode: string,
  lang: string,
  type: string
) {
  const API_KEY = process.env.NEXT_PUBLIC_JUDGE0_API
  console.log(sourceCode, lang, 'before')
  sourceCode = GetWrapperCode(sourceCode, lang, type)
  console.log(sourceCode, lang, type, 'after')

  try {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions'
    const data = {
      language_id: getLanguage(lang),
      source_code: sourceCode,
      redirect_stderr_to_stdout: true,
    }

    const headers = {
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      'X-RapidAPI-Key': API_KEY,
      'Content-Type': 'application/json',
    }

    const response = await axios.post(url, data, { headers })

    if (!response.data.token) {
      throw new Error('Submission creation failed.')
    }

    const submissionId = response.data.token

    const statusResponse = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
      { headers }
    )
    let status = statusResponse.data
    // new code
    console.log(status, 'before')
    while (['In Queue', 'Processing'].includes(status.status.description)) {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for a second
      const updatedStatusResponse = await axios.get(
        `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
        { headers }
      )
      status = updatedStatusResponse.data
    }

    console.log(status, 'after')
    const output = status.stdout
    const description = status.status.description
    console.log('output: ', output, typeof output)
    let wrongAnswer = null
    if (description === 'Accepted') {
      wrongAnswer = CheckArrayAnswer(output)
    }

    console.log(wrongAnswer, 'wrongAnswer')
    return {
      userWrongAnswer: wrongAnswer,
      type: type,
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function getLanguage(lang: string) {
  switch (lang) {
    case 'python':
      return 92
    case 'javascript':
      return 93
    case 'typescript':
      return 94
  }
}
