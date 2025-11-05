export function Preprocess ({ inputText, volume, cpm}) {

   let outputText = inputText;

   outputText = outputText.replaceAll("{$VOLUME}", volume)
   outputText = outputText.replaceAll("{$CPM}", cpm)


   return outputText;
}