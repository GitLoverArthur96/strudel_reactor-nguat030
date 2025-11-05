export function Preprocess ({ inputText, volume}) {

   let outputText = inputText;

   outputText = outputText.replaceAll("{$VOLUME}", volume)


   return outputText;
}