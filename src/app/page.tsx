'use client';

import TestContainer from '@/components/TestContainer';
import ReportModal from '@/components/ReportModal';
import { spellingData, grammarData, overallData } from '@/data/questions';

export default function Home() {
  return (
    <main>
      <h1>IELTS Writing Error Practice</h1>

      <TestContainer
        type="spelling"
        data={spellingData}
        title="1. Spelling Test ✍️"
        description="A hint for a commonly misspelled word will appear. Type the correct English spelling."
      />

      <TestContainer
        type="grammar"
        data={grammarData}
        title="2. Grammar Errors Test 🧐"
        description="A phrase with a grammatical error will be shown. Fill in the blank with the corrected word(s)."
      />

      <TestContainer
        type="overall"
        data={overallData}
        title="3. Overall Errors & Rules Test 🧠"
        description="A question about a key writing rule will be shown. Select an option and check your answer."
      />

      <div>
        <p>
          Constructed: This word means to build or make something, typically a
          physical object or an abstract idea. It's about creation. Synonyms:
          built, created, erected, made.
        </p>
        <br />
        <p>
          Accounted for: This is a phrasal verb that means to form a part of a
          total or to explain the reason for something. It's about explanation,
          data, or proportions. Synonyms: comprised, made up, represented,
          explained.
        </p>
      </div>

      <ReportModal type="spelling" data={spellingData} />
    </main>
  );
}
