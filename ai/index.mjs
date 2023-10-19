import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import path from "path";

// const model = path.resolve(process.cwd(), "/llama-2-7b-chat.ggmlv3.q4_0.bin");
const model = path.join(process.cwd(), "/model/llama-2-7b-chat.ggmlv3.q4_0.bin");

const llama = new LLM(LLamaCpp);
const config = {
    modelPath: model,
    enableLogging: true,
    nCtx: 1024,
    seed: 0,
    f16Kv: false,
    logitsAll: false,
    vocabOnly: false,
    useMlock: false,
    embedding: false,
    useMmap: true,
    nGpuLayers: 0
};

// const template = `How are you?`;
// const prompt = `A chat between a user and an assistant.
// USER: ${template}
// ASSISTANT:`;

// const text = `Now all presets are exports preset config factory function. conventional-changelog-preset-loader now exports new loadPreset and createPresetLoader functions. If you are using presets indirectly, using preset name, no any changes in configuration needed, just upgrade packages to latest versions. Drop node 14 support. Unified presets interface.`
const text = `Provide a component stack as a second argument to onRecoverableError. Fix hydrating into document causing a blank page on mismatch. Fix false positive hydration errors with Suspense. Pass information about server errors to the client. Allow to provide a reason when aborting the HTML stream. Eliminate extraneous text separators in the HTML where possible.`
// const text = `Feature (theming) add M3 slider support. Feature (theming) M3 snackbar support. Feature: theming: M3 toolbar support. Feature (theming) M3 tooltip support.`

// [INST] Summarize the following sentences in one short sentence, keep the summary as brief as possible. [/INST]
// [INST] Summarize the following sentences in one short, brief, condensed sentence. [/INST]
// [INST] Summarize the following sentences in one short sentence, keep the summary as brief as possible. [/INST]

const prompt = `
  <<SYS>>
    You are a helpful, respectful and honest assistant.
    Your job is to summarize software release notes in a condensed, short sentence.
    Respond only the short, condensed, one sentence long summary.
    Always answer as helpfully as possible, while being safe.
    Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct.
    If you don't know the answer to a question, please don't share false information.
  <</SYS>>
  [INST] Summarize the following sentences in one short sentence, keep the summary under 200 characters as succinct as possible. [/INST]
  User: ${text}
`;

const run = async () => {
  await llama.load(config);

  let res = ''

  await llama.createCompletion({
      nThreads: 4,
      nTokPredict: 2048,
      topK: 40,
      topP: 0.1,
      temp: 0.2,
      repeatPenalty: 1,
      prompt,
  }, (response) => {
      process.stdout.write(response.token);
      res += response.token
  });

  // console.log('-------------------------')
  // console.log(res)
  // console.log('-------------------------')
}

run();
