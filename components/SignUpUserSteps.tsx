import Link from 'next/link'
import Step from './Step'
import Code from '@/components/Code'

const create = `
create table notes (
  id uuid default gen_random_uuid() primary key,
  title text
);

insert into notes(title)
values('Today I connected Next.js to Supabase. It was awesome!');
`.trim()

const server = `
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim()

const client = `
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim()

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <Step title="Sign up your first user">
        <p>
          Head over to the{' '}
          <Link
            href="/login"
            className="font-bold hover:underline text-foreground/80"
          >
            Login
          </Link>{' '}
          page and sign up your first user. It's okay if this is just you for
          now. Your awesome idea will have plenty of users later!
        </p>
      </Step>

      <Step title="Create some tables and insert some data">
        <p>
          Head over to the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
          >
            Table Editor
          </a>{' '}
          for your Supabase project to create a table and insert some example
          data. If you're stuck for creativity, you can copy and paste the
          following into the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
          >
            SQL Editor
          </a>{' '}
          and click RUN!
        </p>
        <Code code={create} />
      </Step>

      <Step title="Query Supabase data from Next.js">
        <p>
          Create a Supabase client and query data from an Async Server
          Component.
        </p>
        <Code code={server} />
        <p>Alternatively, you can use a client component.</p>
        <Code code={client} />
      </Step>

      <Step title="Build in a weekend and scale to millions!">
        <p>You're ready to launch your product to the world! 🚀</p>
      </Step>
    </ol>
  )
}
